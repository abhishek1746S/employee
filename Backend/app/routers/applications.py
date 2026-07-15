# app/routers/applications.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import json
import pdfplumber
import io

from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.referral_post import ReferralPost
from app.models.application import Application, StatusEnum
from app.models.result import Result
from app.schemas.application import ApplicationResponse
from app.core.dependencies import require_role
from app.services.cloudinary_service import upload_resume
from app.services.gemini_service import analyze_resume
from app.services.subscription_service import can_apply

router = APIRouter(prefix="/applications", tags=["Applications"])


class DecisionInput(BaseModel):
    action: str  # "refer" or "reject"




@router.post("/apply/{post_id}", response_model=ApplicationResponse)
def apply_for_referral(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    # Check if user is allowed to apply
    limit_check = can_apply(current_user.id, db)

    if not limit_check["allowed"]:
        raise HTTPException(
            status_code=403,
            detail=limit_check["message"]
        )

    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id
    ).first()

    if not post or not post.is_active:
        raise HTTPException(
            status_code=404,
            detail="Referral post not found or inactive"
        )

    existing = db.query(Application).filter(
        Application.student_id == current_user.id,
        Application.post_id == post_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already applied for this referral"
        )

    application = Application(
        student_id=current_user.id,
        post_id=post_id,
        status=StatusEnum.applied
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    # Recalculate after application is inserted
    updated_subscription = can_apply(current_user.id, db)

    response = ApplicationResponse.model_validate(application)

    return JSONResponse(
        content={
            "application": response.model_dump(),
            "subscription": updated_subscription
        }
    )
# Student uploads resume → AI analyzes → enters queue
@router.post("/{application_id}/upload-resume", response_model=ApplicationResponse)
def upload_resume_endpoint(
    application_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    application = db.query(Application).filter(
        Application.id == application_id,
        Application.student_id == current_user.id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    if application.status != StatusEnum.applied:
        raise HTTPException(status_code=400, detail="Resume already uploaded")

    file_bytes = file.file.read()

    # extract text from PDF
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            resume_text = "\n".join(
                page.extract_text() for page in pdf.pages if page.extract_text()
            )
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read PDF file")

    # upload to cloudinary
    resume_url = upload_resume(file_bytes, f"resume_{current_user.id}_{application_id}")

    # AI resume analysis
    post = db.query(ReferralPost).filter(ReferralPost.id == application.post_id).first()
    analysis = analyze_resume(resume_text, post.required_skills)
    resume_score = analysis.get("score", 0)

    # save result with resume score only
    result = Result(
        application_id=application_id,
        resume_score=resume_score,
    )
    db.add(result)

    # update application → enters queue
    application.resume_url = resume_url
    application.resume_score = resume_score
    application.status = StatusEnum.under_review

    db.commit()
    db.refresh(application)
    return application


# Employee views all applicants for a specific post
@router.get("/employee/{post_id}", response_model=List[ApplicationResponse])
def get_applications_for_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id,
        ReferralPost.employee_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    applications = db.query(Application).filter(
        Application.post_id == post_id
    ).all()

    if not applications:
        raise HTTPException(status_code=404, detail="No applications found for this post")

    return applications


# Employee auto shortlists top N candidates by resume score
@router.post("/auto-shortlist/{post_id}")
def auto_shortlist(
    post_id: int,
    top_n: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id,
        ReferralPost.employee_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if top_n < 1:
        raise HTTPException(status_code=400, detail="top_n must be at least 1")

    # get all applications in queue
    applications = db.query(Application).filter(
        Application.post_id == post_id,
        Application.status == StatusEnum.under_review
    ).all()

    if not applications:
        raise HTTPException(status_code=404, detail="No applications in queue")

    # get results for each application
    scored = []
    for app in applications:
        result = db.query(Result).filter(
            Result.application_id == app.id
        ).first()
        if result:
            scored.append((app, result))

    if not scored:
        raise HTTPException(status_code=404, detail="No scored applications found in queue")

    # sort by resume score descending
    scored.sort(key=lambda x: x[1].resume_score, reverse=True)

    # shortlist top N only — rest stay in queue
    shortlisted = []
    for i, (app, result) in enumerate(scored):
        if i < top_n:
            app.status = StatusEnum.shortlisted
            shortlisted.append({
                "application_id": app.id,
                "student_id": app.student_id,
                "resume_score": result.resume_score,
                "rank": i + 1
            })

    db.commit()

    remaining_in_queue = len(scored) - len(shortlisted)
    return {
        "message": f"Top {top_n} candidates shortlisted. {remaining_in_queue} remain in queue.",
        "shortlisted": shortlisted,
        "remaining_in_queue": remaining_in_queue,
        "slots_remaining": post.slots
    }


@router.patch("/{application_id}/decision")
def decide_candidate(
    application_id: int,
    data: DecisionInput,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    if data.action not in ["refer", "reject"]:
        raise HTTPException(
            status_code=400,
            detail="Action must be 'refer' or 'reject'"
        )

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    post = db.query(ReferralPost).filter(
        ReferralPost.id == application.post_id,
        ReferralPost.employee_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(status_code=403, detail="Access forbidden")

    if post.slots <= 0:
        raise HTTPException(status_code=400, detail="No slots remaining")

    if application.status != StatusEnum.shortlisted:
        raise HTTPException(
            status_code=400,
            detail="Only shortlisted candidates can be referred or rejected"
        )

    # -------------------------
    # REJECT FLOW
    # -------------------------
    if data.action == "reject":
        application.status = StatusEnum.under_review
        db.commit()
        db.refresh(application)

        return {
            "message": "Candidate moved back to queue.",
            "application_id": application_id,
            "status": application.status,
            "slots_remaining": post.slots
        }

    # -------------------------
    # REFER FLOW
    # -------------------------
    application.status = StatusEnum.referred
    post.slots -= 1

    db.commit()
    db.refresh(application)
    db.refresh(post)

    return {
        "message": "Referral issued! 🎉",
        "application_id": application_id,
        "status": application.status,
        "slots_remaining": post.slots
    }


# Employee views shortlisted candidates with profiles and assessment scores
@router.get("/shortlisted/{post_id}")
def get_shortlisted_candidates(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id,
        ReferralPost.employee_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    applications = db.query(Application).filter(
        Application.post_id == post_id,
        Application.status.in_([
            StatusEnum.shortlisted,
            StatusEnum.assessment_pending
        ])
    ).all()

    if not applications:
        return {"message": "No shortlisted candidates"}

    submitted = []
    pending = []

    for app in applications:
        student = db.query(User).filter(User.id == app.student_id).first()
        result = db.query(Result).filter(Result.application_id == app.id).first()

        candidate = {
            "application_id": app.id,
            "resume_score": app.resume_score,
            "assessment_score": result.assessment_score if result and result.assessment_score is not None else None,
            "assessment_status": "submitted" if app.status == StatusEnum.shortlisted else "pending",
            "student": {
                "id": student.id,
                "name": student.name,
                "bio": student.bio,
                "skills": student.skills,
                "linkedin": student.linkedin,
                "github": student.github,
                "profile_pic": student.profile_pic,
                "profile_resume": student.profile_resume
            }
        }

        if app.status == StatusEnum.shortlisted and result and result.assessment_score is not None:
            submitted.append(candidate)
        else:
            pending.append(candidate)

    # rank submitted candidates by assessment score
    submitted.sort(key=lambda x: x["assessment_score"], reverse=True)
    for i, candidate in enumerate(submitted):
        candidate["rank"] = i + 1

    # pending candidates have no rank
    for candidate in pending:
        candidate["rank"] = None

    return {
        "submitted": submitted,    # ranked by assessment score
        "pending": pending,        # waiting to submit
        "total_shortlisted": len(submitted) + len(pending)
    }