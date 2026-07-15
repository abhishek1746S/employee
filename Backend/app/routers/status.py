# app/routers/status.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.application import Application
from app.models.referral_post import ReferralPost
from app.models.result import Result
from app.core.dependencies import require_role
from app.models.user import User, RoleEnum
from typing import List

router = APIRouter(prefix="/status", tags=["Status Tracking"])

@router.get("/my-applications")
def track_my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    applications = db.query(Application).filter(
        Application.student_id == current_user.id
    ).all()

    if not applications:
        return {"message": "No applications found"}

    response = []
    for app in applications:
        post = db.query(ReferralPost).filter(
            ReferralPost.id == app.post_id
        ).first()

        result = db.query(Result).filter(
            Result.application_id == app.id
        ).first()

        response.append({
            "application_id": app.id,
            "company": post.company_name if post else "N/A",
            "job_role": post.job_role if post else "N/A",
            "status": app.status,
        })

    return response