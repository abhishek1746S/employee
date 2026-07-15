# app/models/result.py
from sqlalchemy import Column, Integer, ForeignKey, Float
from app.database import Base

class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    resume_score = Column(Float, default=0.0)
    assessment_score = Column(Float, nullable=True)  # null until submitted