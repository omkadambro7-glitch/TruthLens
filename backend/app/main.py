from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.core.config import settings
from app.db.session import engine, Base, AsyncSessionLocal
from app.api.v1.api import api_router
from app.models.user import User, Organization
from app.models.certificate import ReviewCase, CertificateExtraction
from app.models.verification import VerificationJob
from app.core.security import get_password_hash

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("truthlens")

async def seed_initial_demo_data():
    """Seeds obviously fictional demo records for local development."""
    async with AsyncSessionLocal() as session:
        # Check if organization exists
        from sqlalchemy import select
        res = await session.execute(select(Organization).where(Organization.slug == "national-univ"))
        if not res.scalar_one_or_none():
            univ = Organization(
                name="National Metropolitan University",
                slug="national-univ",
                org_type="university",
                domain="nmu.edu"
            )
            session.add(univ)
            await session.flush()
            
            # Reviewer user
            reviewer = User(
                email="reviewer@truthlens.org",
                hashed_password=get_password_hash("truthlens2026!"),
                full_name="Dr. Eleanor Vance",
                role="reviewer",
                organization_id=univ.id
            )
            session.add(reviewer)
            
            # Student user
            student = User(
                email="student@truthlens.org",
                hashed_password=get_password_hash("truthlens2026!"),
                full_name="Karan Malhotra",
                role="student",
                organization_id=univ.id
            )
            session.add(student)
            await session.flush()
            
            # Sample demo certificate verification job
            job = VerificationJob(
                user_id=student.id,
                job_type="certificate",
                file_name="Medical_Certificate_Malhotra_Oct26.pdf",
                file_hash_sha256="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                file_type="application/pdf",
                file_size_bytes=142050,
                file_path="./storage/uploads/sample_cert.pdf",
                verdict="Review recommended",
                confidence_score=0.82,
                uncertainty_level="Moderate",
                summary_text="Certificate exhibits date latency between exam period and retrospective clinic visit.",
                execution_time_ms=124.5
            )
            session.add(job)
            await session.flush()
            
            cert = CertificateExtraction(
                job_id=job.id,
                doctor_name="Dr. Rajesh Sharma, MD",
                registration_number="MH-48291",
                hospital_name="Apex Memorial Multi-Specialty Hospital",
                patient_name="Karan Malhotra",
                issue_date="12/10/2026",
                leave_start="10/10/2026",
                leave_end="16/10/2026",
                duration_days=7,
                signature_detected=True,
                stamp_detected=True,
                risk_category="Review recommended",
                integrity_flags=[
                    {"check_name": "Date Logic: Issue Date Latency", "severity": "warning", "passed": False, "explanation": "Certificate was issued 2 days after stated medical leave commenced."},
                    {"check_name": "Physician Identification", "severity": "info", "passed": True, "explanation": "Dr. Rajesh Sharma, MD identified."},
                    {"check_name": "Signatory Pen Stroke Presence", "severity": "info", "passed": True, "explanation": "Endorsement signature ink patterns detected."}
                ]
            )
            session.add(cert)
            await session.flush()
            
            case = ReviewCase(
                certificate_id=cert.id,
                organization_id=univ.id,
                status="pending",
                priority="normal",
                reviewer_notes="Awaiting student clarification regarding examination conflict on Oct 11."
            )
            session.add(case)
            
            await session.commit()
            logger.info("Successfully seeded initial demo organizations and review records.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database schemas initialized.")
    await seed_initial_demo_data()
    yield
    # Shutdown
    await engine.dispose()
    logger.info("Database connections cleanly closed.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="See what's real. Trustworthy digital media and document authenticity verification platform.",
    version="1.2.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global error handler to prevent internal trace leakage
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal service error occurred. Please try again or contact support."}
    )

# Include v1 API routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "product": "TruthLens",
        "tagline": "See what's real.",
        "api_docs": "/docs",
        "health": f"{settings.API_V1_STR}/healthz"
    }
