from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

from app.core.config import settings

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ==========================================
# Password Hash
# ==========================================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# Compatibility Function
# profile.py uses get_password_hash()
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# ==========================================
# Verify Password
# ==========================================

def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )


# ==========================================
# Create JWT Token
# ==========================================

def create_access_token(data: dict) -> str:

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {
            "exp": expire,
            "sub": str(to_encode.get("sub")),
        }
    )

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


# ==========================================
# Decode JWT Token
# ==========================================

def decode_token(token: str) -> dict:

    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM],
    )