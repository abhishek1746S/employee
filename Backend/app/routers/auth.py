# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, RoleEnum
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserResponse
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
def register(data: UserRegister, db: Session = Depends(get_db)):
    # check if email already exists
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # employee must provide company email and company name
    if data.role == RoleEnum.employee:
        if not data.company_email:
            raise HTTPException(
                status_code=400,
                detail="Company email is required for employees"
            )
        if not data.company_name:
            raise HTTPException(
                status_code=400,
                detail="Company name is required for employees"
            )

    # auto verify employee based on company email domain
    is_verified = False
    if data.role == RoleEnum.employee and data.company_email and data.company_name:
        company_domain = data.company_email.split("@")[-1].lower()  # google.com
        company_name = data.company_name.lower().replace(" ", "")    # google

        if company_name in company_domain:
            is_verified = True

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        role=data.role,
        company_email=data.company_email,
        company_name=data.company_name,
        is_verified=is_verified
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }