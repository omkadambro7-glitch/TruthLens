import os
import uuid
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db
from app.models.user import User
from app.models.verification import VerificationJob
from app.models.certificate import CertificateExtraction, ReviewCase, ReviewAction
from app.models.report import Report
from app.schemas.certificate import CertificateVerificationOut, IntegrityFlagOut
from app.services.document_analysis.pipeline import run_certificate_verification_pipeline
from app.services.reports.generator import generate_truth_report
from app.api.v1.endpoints.auth import get_optional_user

router = APIRouter()

ALLOWED_DOC_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp"
]

@router.post("/upload", response_model=CertificateVerificationOut)
async def verify_certificate_upload(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    if file.content_type not in ALLOWED_DOC_TYPES and not file.filename.lower().endswith(('.pdf', '.jpg', '.jpeg', '.png', '.webp')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported document format '{file.content_type}'. Supported: PDF, JPEG, PNG, WebP."
        )
        
    contents = await file.read()
    if len(contents) > settings.MAX_DOC_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Document exceeds maximum allowed size ({settings.MAX_DOC_BYTES / (1024*1024)}MB)."
        )
        
    # Store document outside public web root
    safe_filename = f"cert_{uuid.uuid4().hex[:12]}_{file.filename or 'certificate.pdf'}"
    stored_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    with open(stored_path, "wb") as f:
        f.write(contents)
        
    try:
        doc_result = run_certificate_verification_pipeline(contents, file.filename or "certificate")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to process and analyze certificate: {str(e)}"
        )
        
    # Create VerificationJob
    job = VerificationJob(
        user_id=current_user.id if current_user else None,
        job_type="certificate",
        file_name=file.filename or "certificate",
        file_hash_sha256=doc_result["file_hash_sha256"],
        file_type=file.content_type or "application/pdf",
        file_size_bytes=len(contents),
        file_path=stored_path,
        verdict=doc_result["risk_category"],
        confidence_score=0.85,
        uncertainty_level="Moderate",
        summary_text=f"Medical certificate integrity evaluation completed. Result category: {doc_result['risk_category']}.",
        execution_time_ms=doc_result["execution_time_ms"]
    )
    db.add(job)
    await db.flush()
    
    # Create CertificateExtraction
    extraction = CertificateExtraction(
        job_id=job.id,
        doctor_name=doc_result.get("doctor_name"),
        registration_number=doc_result.get("registration_number"),
        hospital_name=doc_result.get("hospital_name"),
        patient_name=doc_result.get("patient_name"),
        issue_date=doc_result.get("issue_date"),
        leave_start=doc_result.get("leave_start"),
        leave_end=doc_result.get("leave_end"),
        duration_days=doc_result.get("duration_days"),
        signature_detected=doc_result.get("signature_detected", False),
        stamp_detected=doc_result.get("stamp_detected", False),
        raw_ocr_text=doc_result.get("raw_ocr_snippet"),
        ocr_confidence=doc_result.get("ocr_confidence", "high"),
        risk_category=doc_result["risk_category"],
        integrity_flags=doc_result["integrity_flags"],
        registry_status=doc_result["registry_status"]
    )
    db.add(extraction)
    await db.flush()
    
    # Create university ReviewCase
    case_priority = "high" if doc_result["risk_category"] == "High-priority human review" else "normal"
    review_case = ReviewCase(
        certificate_id=extraction.id,
        organization_id=current_user.organization_id if (current_user and current_user.organization_id) else None,
        status="pending",
        priority=case_priority
    )
    db.add(review_case)
    await db.flush()
    
    # Initial audit action
    action = ReviewAction(
        case_id=review_case.id,
        user_id=current_user.id if current_user else None,
        action_type="SUBMITTED",
        description="Certificate uploaded and queued for human reviewer integrity assessment."
    )
    db.add(action)
    
    # Generate Trust Report
    report_dict, share_token, manifest_sig = generate_truth_report(
        job_id=job.id,
        job_type="certificate",
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        findings=doc_result
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
    await db.refresh(extraction)
    
    flag_outs = [
        IntegrityFlagOut(
            check_name=f["check_name"],
            severity=f["severity"],
            passed=f["passed"],
            explanation=f["explanation"]
        )
        for f in doc_result["integrity_flags"]
    ]
    
    return CertificateVerificationOut(
        job_id=job.id,
        file_name=job.file_name,
        file_hash_sha256=job.file_hash_sha256,
        risk_category=doc_result["risk_category"],
        requires_human_review=True,
        doctor_name=extraction.doctor_name,
        registration_number=extraction.registration_number,
        hospital_name=extraction.hospital_name,
        patient_name=extraction.patient_name,
        issue_date=extraction.issue_date,
        leave_start=extraction.leave_start,
        leave_end=extraction.leave_end,
        duration_days=extraction.duration_days,
        signature_detected=extraction.signature_detected,
        stamp_detected=extraction.stamp_detected,
        ocr_confidence=extraction.ocr_confidence,
        raw_ocr_snippet=extraction.raw_ocr_text,
        registry_status=extraction.registry_status,
        integrity_flags=flag_outs,
        suggested_review_actions=doc_result["suggested_review_actions"],
        case_id=review_case.id,
        created_at=job.created_at,
        mandatory_safeguard_notice=doc_result["mandatory_safeguard_notice"]
    )
