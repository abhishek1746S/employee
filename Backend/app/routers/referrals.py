# app/routers/referrals.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.referral_post import ReferralPost
from app.models.application import Application, StatusEnum
from app.models.result import Result
from app.schemas.referral import ReferralPostCreate, ReferralPostResponse
from app.core.dependencies import require_role

router = APIRouter(prefix="/referrals", tags=["Referrals"])


# Employee creates a referral post
@router.post("/", response_model=ReferralPostResponse)
def create_referral(
    data: ReferralPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    if not current_user.is_verified:
        raise HTTPException(
            status_code=403,
            detail="Your account is not verified yet."
        )
    post = ReferralPost(
        employee_id=current_user.id,
        company_name=data.company_name,
        job_role=data.job_role,
        required_skills=data.required_skills,
        eligibility=data.eligibility,
        slots=data.slots
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


# Anyone browses active referral posts
@router.get("/", response_model=List[ReferralPostResponse])
def get_all_referrals(db: Session = Depends(get_db)):
    return db.query(ReferralPost).filter(
        ReferralPost.is_active == True
    ).all()


# Get single referral post
@router.get("/{post_id}", response_model=ReferralPostResponse)
def get_referral(post_id: int, db: Session = Depends(get_db)):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Referral post not found")
    return post


# Employee closes a post
@router.patch("/{post_id}/close")
def close_referral_post(
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
    if not post.is_active:
        raise HTTPException(status_code=400, detail="Post is already closed")
    post.is_active = False
    db.commit()
    return {"message": "Referral post closed successfully!"}


# Employee reopens a post
@router.patch("/{post_id}/reopen")
def reopen_referral_post(
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
    if post.is_active:
        raise HTTPException(status_code=400, detail="Post is already active")
    post.is_active = True
    db.commit()
    return {"message": "Referral post reopened successfully!"}


# Employee views ranked candidates
@router.get("/{post_id}/rankings")
def get_rankings(
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

    # only rank candidates in queue
    applications = db.query(Application).filter(
        Application.post_id == post_id,
        Application.status == StatusEnum.under_review
    ).all()

    if not applications:
        return {"message": "No candidates in queue"}

    ranked = []
    for app in applications:
        result = db.query(Result).filter(
            Result.application_id == app.id
        ).first()
        if result:
            ranked.append({
                "application_id": app.id,
                "student_id": app.student_id,
                "resume_score": result.resume_score,
                "status": app.status
            })

    # rank by resume score only
    ranked.sort(key=lambda x: x["resume_score"], reverse=True)
    for i, candidate in enumerate(ranked):
        candidate["rank"] = i + 1

    return ranked