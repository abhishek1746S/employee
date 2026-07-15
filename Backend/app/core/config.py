# app/core/config.py
from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    GEMINI_API_KEY: str
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    RAZORPAY_KEY_ID: str        
    RAZORPAY_KEY_SECRET: str    

    class Config:
        env_file = ".env"

settings = Settings()