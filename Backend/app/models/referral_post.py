from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, ARRAY
from app.database import Base

class ReferralPost(Base):
    __tablename__ = "referral_posts"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    company_name = Column(String, nullable=False)
    job_role = Column(String, nullable=False)
    required_skills = Column(String, nullable=False)  # comma-separated
    eligibility = Column(String, nullable=True)
    slots = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)