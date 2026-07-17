from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
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

    # Relationships
    employee = relationship(
        "User",
        back_populates="referral_posts"
    )

    applications = relationship(
        "Application",
        back_populates="post",
        cascade="all, delete-orphan"
    )