from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone

from app.models.subscription import Subscription
from app.models.application import Application

FREE_WEEKLY_LIMIT = 3


# -----------------------------
# Get or create subscription
# -----------------------------
def get_or_create_subscription(user_id: int, db: Session) -> Subscription:
    sub = db.query(Subscription).filter(
        Subscription.user_id == user_id
    ).first()

    if not sub:
        sub = Subscription(
            user_id=user_id,
            plan="free",
            is_active=True
        )
        db.add(sub)
        db.commit()
        db.refresh(sub)

    return sub


# -----------------------------
# Downgrade if expired (PRO → FREE)
# -----------------------------
def check_and_downgrade_if_expired(sub: Subscription, db: Session) -> Subscription:
    if sub.plan == "pro" and sub.expiry_date:
        now = datetime.now(timezone.utc)

        # ensure expiry_date is also timezone-aware in DB
        if sub.expiry_date.tzinfo is None:
            sub_expiry = sub.expiry_date.replace(tzinfo=timezone.utc)
        else:
            sub_expiry = sub.expiry_date

        if now > sub_expiry:
            sub.plan = "free"
            sub.is_active = True
            sub.start_date = None
            sub.expiry_date = None
            sub.razorpay_order_id = None
            sub.razorpay_payment_id = None

            db.commit()
            db.refresh(sub)

    return sub


# -----------------------------
# Weekly application count
# -----------------------------
def get_weekly_application_count(user_id: int, db: Session) -> int:
    now = datetime.now(timezone.utc)

    last_monday = (
        now - timedelta(days=now.weekday())
    ).replace(hour=0, minute=0, second=0, microsecond=0)

    return db.query(Application).filter(
        Application.student_id == user_id,
        Application.created_at >= last_monday
    ).count()


# -----------------------------
# Main check: can user apply?
# -----------------------------
def can_apply(user_id: int, db: Session) -> dict:
    sub = get_or_create_subscription(user_id, db)
    sub = check_and_downgrade_if_expired(sub, db)

    # PRO PLAN
    if sub.plan == "pro":
        return {
            "allowed": True,
            "plan": "pro",
            "message": "Pro plan — unlimited applications"
        }

    # FREE PLAN
    weekly_count = get_weekly_application_count(user_id, db)
    remaining = max(0, FREE_WEEKLY_LIMIT - weekly_count)

    if remaining <= 0:
        return {
            "allowed": False,
            "plan": "free",
            "remaining": 0,
            "message": "❌ Weekly limit reached. Upgrade to Pro for unlimited applications."
        }

    if remaining == 1:
        return {
            "allowed": True,
            "plan": "free",
            "remaining": 1,
            "message": "⚠️ 1 application remaining this week. Upgrade to Pro for unlimited."
        }

    return {
        "allowed": True,
        "plan": "free",
        "remaining": remaining,
        "message": f"{remaining} applications remaining this week."
    }