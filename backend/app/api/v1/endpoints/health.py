import os
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.core.config import settings

router = APIRouter()

@router.get("/healthz")
async def health_check(db: AsyncSession = Depends(get_db)):
    db_healthy = False
    try:
        await db.execute(text("SELECT 1"))
        db_healthy = True
    except Exception:
        db_healthy = False
        
    storage_healthy = os.path.exists(settings.UPLOAD_DIR) and os.access(settings.UPLOAD_DIR, os.W_OK)
    
    status_str = "healthy" if (db_healthy and storage_healthy) else "degraded"
    
    return {
        "status": status_str,
        "service": "TruthLens Backend API",
        "version": "1.2.0",
        "subsystems": {
            "database": "online" if db_healthy else "offline",
            "storage": "writable" if storage_healthy else "unwritable",
            "forensics_engine": "operational"
        }
    }

@router.get("/ready")
async def readiness_check():
    return {"ready": True}
