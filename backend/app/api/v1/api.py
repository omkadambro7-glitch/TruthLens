from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    verify_image,
    verify_certificate,
    reports,
    university,
    sos,
    accuracy,
    feedback,
    health
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(verify_image.router, prefix="/verify/image", tags=["Image Verification"])
api_router.include_router(verify_certificate.router, prefix="/verify/certificate", tags=["Certificate Verification"])
api_router.include_router(reports.router, prefix="/reports", tags=["Trust Reports"])
api_router.include_router(university.router, prefix="/university", tags=["University Review Workspace"])
api_router.include_router(sos.router, prefix="/sos", tags=["Victim SOS"])
api_router.include_router(accuracy.router, prefix="/accuracy", tags=["Model Accuracy & Metrics"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
