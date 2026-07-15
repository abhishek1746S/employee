# app/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, RoleEnum
from app.core.dependencies import require_role
from typing import List
from app.schemas.user import UserResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


# Admin views all unverified employees
@router.get("/unverified-employees", response_model=List[UserResponse])
def get_unverified_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.admin))
):
    return db.query(User).filter(
        User.role == RoleEnum.employee,
        User.is_verified == False
    ).all()


# Admin verifies an employee
@router.patch("/verify/{user_id}")
def verify_employee(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.admin))
):
    user = db.query(User).filter(
        User.id == user_id,
        User.role == RoleEnum.employee
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="Employee already verified")

    user.is_verified = True
    db.commit()
    db.refresh(user)
    return {"message": f"Employee {user.name} verified successfully!"}


# Admin revokes verification
@router.patch("/revoke/{user_id}")
def revoke_employee(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.admin))
):
    user = db.query(User).filter(
        User.id == user_id,
        User.role == RoleEnum.employee
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    user.is_verified = False
    db.commit()
    return {"message": f"Employee {user.name} verification revoked!"}