from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class RoleEnum(str, Enum):
    student = "student"
    employee = "employee"
    admin = "admin"


# ==========================
# Auth
# ==========================

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


# ==========================
# Update Profile
# ==========================

class ProfileUpdate(BaseModel):

    # Common
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    bio: Optional[str] = None
    linkedin: Optional[str] = None

    # Student
    skills: Optional[str] = None
    github: Optional[str] = None

    # Employee
    company_name: Optional[str] = None
    company_email: Optional[str] = None
    phone: Optional[str] = None
    designation: Optional[str] = None
    address: Optional[str] = None


# ==========================
# Change Password
# ==========================

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


# ==========================
# Student Own Profile
# ==========================

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


# ==========================
# Student Public Profile
# ==========================

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


# ==========================
# Employee Public Profile
# ==========================

class EmployeePublicProfile(BaseModel):
    id: int
    name: str
    role: str

    company_name: Optional[str]
    designation: Optional[str]

    bio: Optional[str]
    linkedin: Optional[str]

    profile_pic: Optional[str]

    is_verified: bool
    total_posts: int

    class Config:
        from_attributes = True


# ==========================
# Employee Own Profile
# ==========================

class MyEmployeeProfile(BaseModel):
    id: int
    name: str
    email: str
    role: str

    company_name: Optional[str]
    company_email: Optional[str]

    phone: Optional[str]
    designation: Optional[str]
    address: Optional[str]

    bio: Optional[str]
    linkedin: Optional[str]

    profile_pic: Optional[str]

    is_verified: bool
    total_posts: int

    class Config:
        from_attributes = True