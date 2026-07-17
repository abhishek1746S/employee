from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.referral_post import ReferralPost
from app.models.application import Application, StatusEnum
from app.models.result import Result
from app.schemas.referral import (
    ReferralPostCreate,
    ReferralPostResponse,
)
from app.core.dependencies import require_role

router = APIRouter(
    prefix="/referrals",
    tags=["Referrals"]
)


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
        slots=data.slots,
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return post


# Anyone browses active referral posts

@router.get("/", response_model=List[ReferralPostResponse])
def get_all_referrals(
    db: Session = Depends(get_db)
):
    return db.query(ReferralPost).all()


# Employee Dashboard Summary

@router.get("/employee/dashboard")
def employee_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    total_referrals = db.query(ReferralPost).filter(
        ReferralPost.employee_id == current_user.id
    ).count()

    active_referrals = db.query(ReferralPost).filter(
        ReferralPost.employee_id == current_user.id,
        ReferralPost.is_active == True
    ).count()

    total_applicants = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id
        )
        .count()
    )

    shortlisted = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id,
            Application.status == StatusEnum.shortlisted
        )
        .count()
    )

    under_review = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id,
            Application.status == StatusEnum.under_review
        )
        .count()
    )

    referred = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id,
            Application.status == StatusEnum.referred
        )
        .count()
    )

    recent_applications = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id
        )
        .order_by(Application.id.desc())
        .limit(5)
        .all()
    )

    recent = []

    for app in recent_applications:
        recent.append({
            "application_id": app.id,
            "student_id": app.student_id,
            "status": app.status
        })

    return {
        "total_referrals": total_referrals,
        "active_referrals": active_referrals,
        "total_applicants": total_applicants,
        "shortlisted": shortlisted,
        "under_review": under_review,
        "referred": referred,
        "recent_applications": recent
    }
# Employee issued referrals

@router.get("/issued")
def get_issued_referrals(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    applications = (
        db.query(Application)
        .join(
            ReferralPost,
            Application.post_id == ReferralPost.id
        )
        .join(
            User,
            Application.student_id == User.id
        )
        .filter(
            ReferralPost.employee_id == current_user.id,
            Application.status == StatusEnum.referred
        )
        .all()
    )

    referrals = []

    accepted = 0
    pending = 0

    for app in applications:

        post = db.query(ReferralPost).filter(
            ReferralPost.id == app.post_id
        ).first()

        student = db.query(User).filter(
            User.id == app.student_id
        ).first()

        if app.status == StatusEnum.referred:
            accepted += 1
        else:
            pending += 1

        referrals.append({
            "application_id": app.id,
            "student_name": student.name if student else "Unknown",
            "company_name": post.company_name if post else "",
            "job_role": post.job_role if post else "",
            "referred_at": app.created_at,
            "status": app.status.value
        })

    return {
        "total_referrals": len(referrals),
        "accepted": accepted,
        "pending": pending,
        "referrals": referrals
    }
# Get single referral post

@router.get("/{post_id}", response_model=ReferralPostResponse)
def get_referral(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = (
        db.query(ReferralPost)
        .filter(ReferralPost.id == post_id)
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Referral post not found"
        )

    return post


# Employee closes a referral post

@router.patch("/{post_id}/close")
def close_referral_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = (
        db.query(ReferralPost)
        .filter(
            ReferralPost.id == post_id,
            ReferralPost.employee_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if not post.is_active:
        raise HTTPException(
            status_code=400,
            detail="Post is already closed"
        )

    post.is_active = False
    db.commit()
    db.refresh(post)

    return {
        "message": "Referral post closed successfully!",
        "is_active": post.is_active
    }
# Employee reopens a referral post

@router.patch("/{post_id}/reopen")
def reopen_referral_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = (
        db.query(ReferralPost)
        .filter(
            ReferralPost.id == post_id,
            ReferralPost.employee_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.is_active:
        raise HTTPException(
            status_code=400,
            detail="Post is already active"
        )

    post.is_active = True
    db.commit()
    db.refresh(post)

    return {
        "message": "Referral post reopened successfully!",
        "is_active": post.is_active
    }
# Employee reopens a referral post

@router.patch("/{post_id}/reopen")
def reopen_referral_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = (
        db.query(ReferralPost)
        .filter(
            ReferralPost.id == post_id,
            ReferralPost.employee_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    if post.is_active:
        raise HTTPException(
            status_code=400,
            detail="Post is already active"
        )

    post.is_active = True
    db.commit()
    db.refresh(post)

    return {
        "message": "Referral post reopened successfully!",
        "is_active": post.is_active
    }
# Employee views ranked candidates

@router.get("/{post_id}/rankings")
def get_rankings(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = (
        db.query(ReferralPost)
        .filter(
            ReferralPost.id == post_id,
            ReferralPost.employee_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    applications = (
        db.query(Application)
        .filter(
            Application.post_id == post_id,
            Application.status == StatusEnum.under_review
        )
        .all()
    )

    if not applications:
        return {
            "message": "No candidates in queue"
        }

    ranked = []

    for app in applications:

        result = (
            db.query(Result)
            .filter(
                Result.application_id == app.id
            )
            .first()
        )

        ranked.append({
            "application_id": app.id,
            "student_id": app.student_id,
            "student_name": app.student.name if app.student else "",
            "resume_score": result.resume_score if result else 0,
            "status": app.status.value,
        })

    ranked.sort(
        key=lambda x: x["resume_score"],
        reverse=True
    )

    for index, candidate in enumerate(ranked, start=1):
        candidate["rank"] = index

    return ranked