from pydantic import BaseModel
from typing import Optional
from app.models.application import StatusEnum

class ApplicationResponse(BaseModel):
    id: int
    student_id: int
    post_id: int
    resume_url: Optional[str]
    resume_score: int
    status: StatusEnum

    class Config:
        from_attributes = True


class ApplicationStatusUpdate(BaseModel):
    status: StatusEnum