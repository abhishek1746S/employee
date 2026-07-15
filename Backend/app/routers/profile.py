# app/routers/profile.py
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

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

router = APIRouter(prefix="/profile", tags=["Profile"])


# =====================================================
# View own profile
# =====================================================
@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return build_own_profile(current_user, db)


# =====================================================
# Update own profile
# =====================================================
@router.put("/me")
def update_my_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if data.name:
        current_user.name = data.name
    if data.bio is not None:
        current_user.bio = data.bio
    if data.linkedin is not None:
        current_user.linkedin = data.linkedin

    # student only fields
    if current_user.role == RoleEnum.student:
        if data.skills is not None:
            current_user.skills = data.skills
        if data.github is not None:
            current_user.github = data.github

    db.commit()
    db.refresh(current_user)
    return {
        "message": "Profile updated successfully!",
        "profile": build_own_profile(current_user, db)
    }


# =====================================================
# Upload profile picture
# =====================================================
@router.post("/me/upload-pic")
def upload_profile_pic(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    file_bytes = file.file.read()
    result = cloudinary.uploader.upload(
        file_bytes,
        folder="referralx/profile_pics",
        public_id=f"profile_{current_user.id}",
        overwrite=True,
        resource_type="image"
    )
    current_user.profile_pic = result["secure_url"]
    db.commit()
    return {
        "message": "Profile picture updated!",
        "profile_pic": current_user.profile_pic
    }


# =====================================================
# Upload profile resume (students only)
# =====================================================
@router.post("/me/upload-resume")
def upload_profile_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != RoleEnum.student:
        raise HTTPException(
            status_code=403,
            detail="Only students can upload a profile resume"
        )

    file_bytes = file.file.read()
    result = cloudinary.uploader.upload(
        file_bytes,
        folder="referralx/profile_resumes",
        public_id=f"profile_resume_{current_user.id}",
        overwrite=True,
        resource_type="raw"
    )
    current_user.profile_resume = result["secure_url"]
    db.commit()
    return {
        "message": "Profile resume updated!",
        "profile_resume": current_user.profile_resume
    }


# =====================================================
# View anyone's profile (with role based visibility)
# =====================================================
@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # viewing own profile
    if current_user.id == user_id:
        return build_own_profile(current_user, db)

    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")

    # student cannot view another student profile
    if current_user.role == RoleEnum.student and target.role == RoleEnum.student:
        raise HTTPException(
            status_code=403,
            detail="Students cannot view other student profiles"
        )

    # employee cannot view another employee profile
    if current_user.role == RoleEnum.employee and target.role == RoleEnum.employee:
        raise HTTPException(
            status_code=403,
            detail="Employees cannot view other employee profiles"
        )

    # student views employee profile
    if current_user.role == RoleEnum.student and target.role == RoleEnum.employee:
        total_posts = db.query(ReferralPost).filter(
            ReferralPost.employee_id == target.id
        ).count()
        return {
            "id": target.id,
            "name": target.name,
            "role": target.role,
            "company_name": target.company_name,
            "bio": target.bio,
            "linkedin": target.linkedin,
            "profile_pic": target.profile_pic,
            "is_verified": target.is_verified,
            "total_posts": total_posts
        }

    # employee views student profile
    if current_user.role == RoleEnum.employee and target.role == RoleEnum.student:
        return {
            "id": target.id,
            "name": target.name,
            "role": target.role,
            "bio": target.bio,
            "skills": target.skills,
            "linkedin": target.linkedin,
            "github": target.github,
            "profile_pic": target.profile_pic,
            "profile_resume": target.profile_resume
        }

    # admin views anyone
    return build_own_profile(target, db)


# =====================================================
# Helper — build full profile based on role
# =====================================================
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
            "profile_resume": user.profile_resume
        }
    elif user.role == RoleEnum.employee:
        total_posts = db.query(ReferralPost).filter(
            ReferralPost.employee_id == user.id
        ).count()
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "company_name": user.company_name,
            "company_email": user.company_email,
            "bio": user.bio,
            "linkedin": user.linkedin,
            "profile_pic": user.profile_pic,
            "is_verified": user.is_verified,
            "total_posts": total_posts
        }
    else:  # admin
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }