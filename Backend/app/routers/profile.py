from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.referral_post import ReferralPost
from app.schemas.user import ProfileUpdate
from app.core.dependencies import get_current_user

import cloudinary
import cloudinary.uploader

from app.core.config import settings


# ==========================================
# Cloudinary Config
# ==========================================

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


# ==========================================
# Router
# ==========================================

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


# ==========================================
# View Own Profile
# ==========================================

@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return build_own_profile(current_user, db)
# ==========================================
# Update Own Profile
# ==========================================

@router.put("/me")
def update_my_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # ----------------------------------
    # Common Fields
    # ----------------------------------

    if data.name is not None:
        current_user.name = data.name

    if data.email is not None:

        existing_user = (
            db.query(User)
            .filter(
                User.email == data.email,
                User.id != current_user.id
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        current_user.email = data.email

    if data.bio is not None:
        current_user.bio = data.bio

    if data.linkedin is not None:
        current_user.linkedin = data.linkedin

    # ----------------------------------
    # Employee Fields
    # ----------------------------------

    if current_user.role == RoleEnum.employee:

        if data.company_name is not None:
            current_user.company_name = data.company_name

        if data.company_email is not None:
            current_user.company_email = data.company_email

        if data.phone is not None:
            current_user.phone = data.phone

        if data.designation is not None:
            current_user.designation = data.designation

        if data.address is not None:
            current_user.address = data.address

    # ----------------------------------
    # Student Fields
    # ----------------------------------

    elif current_user.role == RoleEnum.student:

        if data.skills is not None:
            current_user.skills = data.skills

        if data.github is not None:
            current_user.github = data.github

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully!",
        "profile": build_own_profile(current_user, db),
    }
# ==========================================
# Update Own Profile
# ==========================================

@router.put("/me")
def update_my_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # ----------------------------------
    # Common Fields
    # ----------------------------------

    if data.name is not None:
        current_user.name = data.name

    if data.email is not None:

        existing_user = (
            db.query(User)
            .filter(
                User.email == data.email,
                User.id != current_user.id
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        current_user.email = data.email

    if data.bio is not None:
        current_user.bio = data.bio

    if data.linkedin is not None:
        current_user.linkedin = data.linkedin

    # ----------------------------------
    # Employee Fields
    # ----------------------------------

    if current_user.role == RoleEnum.employee:

        if data.company_name is not None:
            current_user.company_name = data.company_name

        if data.company_email is not None:
            current_user.company_email = data.company_email

        if data.phone is not None:
            current_user.phone = data.phone

        if data.designation is not None:
            current_user.designation = data.designation

        if data.address is not None:
            current_user.address = data.address

    # ----------------------------------
    # Student Fields
    # ----------------------------------

    elif current_user.role == RoleEnum.student:

        if data.skills is not None:
            current_user.skills = data.skills

        if data.github is not None:
            current_user.github = data.github

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully!",
        "profile": build_own_profile(current_user, db),
    }
# ==========================================
# View Any User Profile
# ==========================================

@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.id == user_id:
        return build_own_profile(current_user, db)

    target = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not target:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # Student -> Student ❌
    if (
        current_user.role == RoleEnum.student
        and target.role == RoleEnum.student
    ):
        raise HTTPException(
            status_code=403,
            detail="Students cannot view other student profiles",
        )

    # Employee -> Employee ❌
    if (
        current_user.role == RoleEnum.employee
        and target.role == RoleEnum.employee
    ):
        raise HTTPException(
            status_code=403,
            detail="Employees cannot view other employee profiles",
        )

    # Student -> Employee
    if (
        current_user.role == RoleEnum.student
        and target.role == RoleEnum.employee
    ):

        total_posts = (
            db.query(ReferralPost)
            .filter(
                ReferralPost.employee_id == target.id
            )
            .count()
        )

        return {
            "id": target.id,
            "name": target.name,
            "role": target.role,
            "company_name": target.company_name,
            "designation": target.designation,
            "bio": target.bio,
            "linkedin": target.linkedin,
            "profile_pic": target.profile_pic,
            "is_verified": target.is_verified,
            "total_posts": total_posts,
        }

    # Employee -> Student
    if (
        current_user.role == RoleEnum.employee
        and target.role == RoleEnum.student
    ):

        return {
            "id": target.id,
            "name": target.name,
            "role": target.role,
            "bio": target.bio,
            "skills": target.skills,
            "linkedin": target.linkedin,
            "github": target.github,
            "profile_pic": target.profile_pic,
            "profile_resume": target.profile_resume,
        }

    return build_own_profile(target, db)


# ==========================================
# Helper - Build Profile Based On Role
# ==========================================

def build_own_profile(user: User, db: Session) -> dict:

    if user.role == RoleEnum.student:

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,

            "bio": user.bio,
            "skills": user.skills,

            "linkedin": user.linkedin,
            "github": user.github,

            "profile_pic": user.profile_pic,
            "profile_resume": user.profile_resume,
        }

    elif user.role == RoleEnum.employee:

        total_posts = (
            db.query(ReferralPost)
            .filter(
                ReferralPost.employee_id == user.id
            )
            .count()
        )

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,

            "role": user.role,

            "company_name": user.company_name,
            "company_email": user.company_email,

            "phone": user.phone,
            "designation": user.designation,
            "address": user.address,

            "bio": user.bio,
            "linkedin": user.linkedin,

            "profile_pic": user.profile_pic,

            "is_verified": user.is_verified,
            "total_posts": total_posts,
        }

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    }