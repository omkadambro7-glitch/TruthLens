import os
import uuid
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import settings
from app.core.ssrf import fetch_remote_image_safely
from app.db.session import get_db
from app.models.user import User
from app.models.verification import VerificationJob, AnalysisEvidence
from app.models.report import Report
from app.schemas.image_analysis import ImageVerificationOut, EvidenceItemOut, UrlVerificationIn
from app.services.image_analysis.pipeline import run_image_verification_pipeline
from app.services.reports.generator import generate_truth_report
from app.api.v1.endpoints.auth import get_optional_user

router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

@router.post("/upload", response_model=ImageVerificationOut)
async def verify_image_upload(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    # Validate content type
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image format '{file.content_type}'. Supported formats: JPEG, PNG, WebP."
        )
        
    contents = await file.read()
    if len(contents) > settings.MAX_IMAGE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size ({settings.MAX_IMAGE_BYTES / (1024*1024)}MB)."
        )
        
    if len(contents) < 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty or corrupted."
        )
        
    # Save original image securely outside web root
    safe_filename = f"img_{uuid.uuid4().hex[:12]}_{file.filename or 'upload.jpg'}"
    stored_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    with open(stored_path, "wb") as f:
        f.write(contents)
        
    # Run forensic pipeline
    try:
        pipeline_result = run_image_verification_pipeline(contents, file.filename or "uploaded_image")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to process and analyze image: {str(e)}"
        )
        
    # Persist VerificationJob in DB
    job = VerificationJob(
        user_id=current_user.id if current_user else None,
        job_type="image",
        file_name=file.filename or "uploaded_image",
        file_hash_sha256=pipeline_result["file_hash_sha256"],
        file_type=file.content_type or "image/jpeg",
        file_size_bytes=len(contents),
        file_path=stored_path,
        verdict=pipeline_result["verdict"],
        confidence_score=pipeline_result["confidence_score"],
        uncertainty_level=pipeline_result["uncertainty_level"],
        summary_text=pipeline_result["summary_explanation"],
        heatmap_path=pipeline_result.get("heatmap_filename"),
        execution_time_ms=pipeline_result["execution_time_ms"]
    )
    db.add(job)
    await db.flush()
    
    # Save Evidence records
    for ev in pipeline_result["evidence_breakdown"]:
        ev_record = AnalysisEvidence(
            job_id=job.id,
            signal_name=ev["signal_name"],
            signal_score=ev["signal_score"],
            weight=ev["weight"],
            verdict_impact=ev["verdict_impact"],
            description=ev["description"],
            details=ev.get("details")
        )
        db.add(ev_record)
        
    # Automatically generate Trust Report
    report_dict, share_token, manifest_sig = generate_truth_report(
        job_id=job.id,
        job_type="image",
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        findings=pipeline_result
    )
    report = Report(
        job_id=job.id,
        share_token=share_token,
        manifest_signature=manifest_sig,
        report_data=report_dict
    )
    db.add(report)
    await db.commit()
    await db.refresh(job)
    
    heatmap_url = f"/api/v1/verify/image/artifacts/{pipeline_result['heatmap_filename']}" if pipeline_result.get("heatmap_filename") else None
    
    evidence_outs = [
        EvidenceItemOut(
            id=ev["id"],
            signal_name=ev["signal_name"],
            signal_score=ev["signal_score"],
            weight=ev["weight"],
            verdict_impact=ev["verdict_impact"],
            description=ev["description"],
            details=ev.get("details")
        )
        for ev in pipeline_result["evidence_breakdown"]
    ]
    
    return ImageVerificationOut(
        job_id=job.id,
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        verdict=job.verdict,
        confidence_score=job.confidence_score,
        uncertainty_level=job.uncertainty_level,
        summary_explanation=job.summary_text,
        is_experimental=True,
        model_identifier="TruthLens Ensemble Forensics v1.2",
        evidence_breakdown=evidence_outs,
        metadata_observations=pipeline_result["metadata_observations"],
        face_analysis_results=pipeline_result.get("face_analysis_results"),
        heatmap_url=heatmap_url,
        execution_time_ms=job.execution_time_ms,
        created_at=job.created_at,
        disclaimer=pipeline_result["disclaimer"]
    )

@router.post("/url", response_model=ImageVerificationOut)
async def verify_image_url(
    payload: UrlVerificationIn,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    contents, content_type, err_msg = await fetch_remote_image_safely(payload.image_url)
    if err_msg or not contents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=err_msg or "Failed to safely fetch remote image."
        )
        
    safe_filename = f"url_{uuid.uuid4().hex[:12]}.jpg"
    stored_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    with open(stored_path, "wb") as f:
        f.write(contents)
        
    pipeline_result = run_image_verification_pipeline(contents, payload.image_url)
    
    job = VerificationJob(
        user_id=current_user.id if current_user else None,
        job_type="image",
        file_name=payload.image_url[:100],
        file_hash_sha256=pipeline_result["file_hash_sha256"],
        file_type=content_type or "image/jpeg",
        file_size_bytes=len(contents),
        file_path=stored_path,
        verdict=pipeline_result["verdict"],
        confidence_score=pipeline_result["confidence_score"],
        uncertainty_level=pipeline_result["uncertainty_level"],
        summary_text=pipeline_result["summary_explanation"],
        heatmap_path=pipeline_result.get("heatmap_filename"),
        execution_time_ms=pipeline_result["execution_time_ms"]
    )
    db.add(job)
    await db.flush()
    
    report_dict, share_token, manifest_sig = generate_truth_report(
        job_id=job.id,
        job_type="image",
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        findings=pipeline_result
    )
    report = Report(
        job_id=job.id,
        share_token=share_token,
        manifest_signature=manifest_sig,
        report_data=report_dict
    )
    db.add(report)
    await db.commit()
    await db.refresh(job)
    
    heatmap_url = f"/api/v1/verify/image/artifacts/{pipeline_result['heatmap_filename']}" if pipeline_result.get("heatmap_filename") else None
    
    evidence_outs = [
        EvidenceItemOut(
            id=ev["id"],
            signal_name=ev["signal_name"],
            signal_score=ev["signal_score"],
            weight=ev["weight"],
            verdict_impact=ev["verdict_impact"],
            description=ev["description"],
            details=ev.get("details")
        )
        for ev in pipeline_result["evidence_breakdown"]
    ]
    
    return ImageVerificationOut(
        job_id=job.id,
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        verdict=job.verdict,
        confidence_score=job.confidence_score,
        uncertainty_level=job.uncertainty_level,
        summary_explanation=job.summary_text,
        is_experimental=True,
        model_identifier="TruthLens Ensemble Forensics v1.2",
        evidence_breakdown=evidence_outs,
        metadata_observations=pipeline_result["metadata_observations"],
        face_analysis_results=pipeline_result.get("face_analysis_results"),
        heatmap_url=heatmap_url,
        execution_time_ms=job.execution_time_ms,
        created_at=job.created_at,
        disclaimer=pipeline_result["disclaimer"]
    )

@router.get("/artifacts/{filename}")
async def get_artifact_heatmap(filename: str):
    # Prevent path traversal
    safe_name = os.path.basename(filename)
    path = os.path.join(settings.ARTIFACTS_DIR, safe_name)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Artifact not found.")
    return FileResponse(path, media_type="image/jpeg")
