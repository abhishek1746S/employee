# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class RoleEnum(str, Enum):
    student = "student"
    employee = "employee"
    admin = "admin"

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum
    company_email: Optional[str] = None
    company_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: RoleEnum
    is_verified: bool

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# update own profile
class ProfileUpdate(BaseModel):
    name: Optional[str] = None

    email: Optional[EmailStr] = None

    company_name: Optional[str] = None
    company_email: Optional[str] = None

    bio: Optional[str] = None

    skills: Optional[str] = None

    linkedin: Optional[str] = None

    github: Optional[str] = None

# what student sees of their own profile
class MyStudentProfile(BaseModel):
    id: int
    name: str
    email: str
    role: str
    bio: Optional[str]
    skills: Optional[str]
    linkedin: Optional[str]
    github: Optional[str]
    profile_pic: Optional[str]
    profile_resume: Optional[str]

    class Config:
        from_attributes = True

# what employee sees of student profile
class StudentPublicProfile(BaseModel):
    id: int
    name: str
    role: str
    bio: Optional[str]
    skills: Optional[str]
    linkedin: Optional[str]
    github: Optional[str]
    profile_pic: Optional[str]
    profile_resume: Optional[str]

    class Config:
        from_attributes = True

# what student sees of employee profile
class EmployeePublicProfile(BaseModel):
    id: int
    name: str
    role: str
    company_name: Optional[str]
    bio: Optional[str]
    linkedin: Optional[str]
    profile_pic: Optional[str]
    is_verified: bool
    total_posts: int

    class Config:
        from_attributes = True

# what employee sees of their own profile
class MyEmployeeProfile(BaseModel):
    id: int
    name: str
    email: str
    role: str
    company_name: Optional[str]
    company_email: Optional[str]
    bio: Optional[str]
    linkedin: Optional[str]
    profile_pic: Optional[str]
    is_verified: bool
    total_posts: int

    class Config:
        from_attributes = True