from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base

# models (for table creation)
from app.models import user, referral_post, assessment, result, application, subscription

# routers (for API endpoints)
from app.routers import auth, referrals, applications, assessments, status, admin
from app.routers import profile, subscription

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ReferralX API",
    version="1.0.0",
    swagger_ui_parameters={"persistAuthorization": True}
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(referrals.router)
app.include_router(applications.router)
app.include_router(assessments.router)
app.include_router(status.router)
app.include_router(admin.router)
app.include_router(profile.router)
app.include_router(subscription.router)

@app.get("/")
def root():
    return {"message": "ReferralX backend is live 🚀"}