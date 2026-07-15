# app/services/cloudinary_service.py
import cloudinary
import cloudinary.uploader
from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

def upload_resume(file_bytes: bytes, filename: str) -> str:
    result = cloudinary.uploader.upload(
        file_bytes,
        resource_type="raw",
        folder="referralx/resumes",
        public_id=filename
    )
    return result["secure_url"]