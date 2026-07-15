# app/routers/subscription.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.subscription import Subscription
from app.services.subscription_service import (
    get_or_create_subscription,
    check_and_downgrade_if_expired,
    get_weekly_application_count,
    FREE_WEEKLY_LIMIT
)
from app.core.dependencies import require_role
from datetime import datetime, timedelta

router = APIRouter(prefix="/subscription", tags=["Subscription"])


# Student checks their current plan and remaining applications
@router.get("/status")
def get_subscription_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    sub = get_or_create_subscription(current_user.id, db)
    sub = check_and_downgrade_if_expired(sub, db)

    if sub.plan == "pro":
        return {
            "plan": "pro",
            "expiry_date": sub.expiry_date,
            "message": "Pro plan — unlimited applications 🚀"
        }

    weekly_count = get_weekly_application_count(current_user.id, db)
    remaining = FREE_WEEKLY_LIMIT - weekly_count

    return {
        "plan": "free",
        "weekly_limit": FREE_WEEKLY_LIMIT,
        "used_this_week": weekly_count,
        "remaining_this_week": max(remaining, 0),
        "resets_on": "Every Monday",
        "message": "Upgrade to Pro for unlimited applications!"
    }


# Dummy upgrade endpoint — company will add Razorpay here later
@router.post("/upgrade")
def upgrade_to_pro(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    sub = get_or_create_subscription(current_user.id, db)

    if sub.plan == "pro" and sub.expiry_date and datetime.utcnow() < sub.expiry_date:
        raise HTTPException(
            status_code=400,
            detail=f"Already on Pro plan. Expires on {sub.expiry_date.strftime('%d %b %Y')}"
        )

    # dummy upgrade — Razorpay will replace this block later
    sub.plan = "pro"
    sub.start_date = datetime.utcnow()
    sub.expiry_date = datetime.utcnow() + timedelta(days=30)
    sub.is_active = True
    # sub.razorpay_order_id = "will_come_from_razorpay"
    # sub.razorpay_payment_id = "will_come_from_razorpay"

    db.commit()
    db.refresh(sub)

    return {
        "message": "Successfully upgraded to Pro! 🎉",
        "plan": "pro",
        "start_date": sub.start_date,
        "expiry_date": sub.expiry_date,
        "note": "Payment integration coming soon"
    }


# Razorpay create order — placeholder for company to implement
@router.post("/create-order")
def create_razorpay_order(
    current_user: User = Depends(require_role(RoleEnum.student))
):
    # TODO: company will implement this with their Razorpay keys
    # import razorpay
    # client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    # order = client.order.create({
    #     "amount": 9900,  # ₹99 in paise
    #     "currency": "INR",
    #     "payment_capture": 1
    # })
    # return {"order_id": order["id"], "amount": 9900, "currency": "INR"}

    return {
        "message": "Razorpay integration coming soon!",
        "amount": 9900,
        "currency": "INR",
        "note": "Company will integrate Razorpay keys here"
    }


# Razorpay verify payment — placeholder for company to implement
@router.post("/verify-payment")
def verify_razorpay_payment(
    current_user: User = Depends(require_role(RoleEnum.student))
):
    # TODO: company will implement payment verification here
    # import razorpay
    # client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    # verify signature, then upgrade plan

    return {
        "message": "Payment verification coming soon!",
        "note": "Company will implement Razorpay verification here"
    }