from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.database import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("referral_posts.id"), nullable=False)  # ← changed
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    question = Column(Text, nullable=False)
    options = Column(String, nullable=False)   # JSON string of options
    correct_answer = Column(String, nullable=False)
    student_answer = Column(String, nullable=True)