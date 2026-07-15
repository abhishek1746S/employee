# app/models/application.py
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, func
from app.database import Base
from datetime import datetime
import enum

class StatusEnum(str, enum.Enum):
    applied = "applied"
    assessment_pending = "assessment_pending"
    under_review = "under_review"
    shortlisted = "shortlisted"
    referred = "referred"
    rejected = "rejected"

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("referral_posts.id"), nullable=False)
    resume_url = Column(String, nullable=True)
    resume_score = Column(Integer, default=0)
    status = Column(Enum(StatusEnum), default=StatusEnum.applied)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),nullable=False)