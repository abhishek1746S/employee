# app/schemas/referral.py
from pydantic import BaseModel
from typing import Optional

class ReferralPostCreate(BaseModel):
    company_name: str
    job_role: str
    required_skills: str  # comma separated e.g. "Python, FastAPI, SQL"
    eligibility: Optional[str] = None
    slots: int = 1

class ReferralPostResponse(BaseModel):
    id: int
    employee_id: int
    company_name: str
    job_role: str
    
    required_skills: str
    eligibility: Optional[str]
    slots: int
    is_active: bool

    class Config:
        from_attributes = True