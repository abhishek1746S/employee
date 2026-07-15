from sqlalchemy import Column, Integer, String, Boolean, Enum ,Text
from app.database import Base
import enum

class RoleEnum(str, enum.Enum):
    student = "student"
    employee = "employee"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    is_verified = Column(Boolean, default=False)  # for employees
    company_email = Column(String, nullable=True)  # for employees
    company_name = Column(String, nullable=True)

    # profile fields
    bio = Column(Text, nullable=True)
    skills = Column(String, nullable=True)
    profile_pic = Column(String, nullable=True)
    profile_resume = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)