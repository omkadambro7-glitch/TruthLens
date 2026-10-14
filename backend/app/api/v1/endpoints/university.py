from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.user import User
from app.models.certificate import ReviewCase, ReviewAction, CertificateExtraction
from app.models.feedback import AuditLog
from app.schemas.certificate import ReviewCaseOut, ReviewActionIn
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("/queue", response_model=List[ReviewCaseOut])
async def get_review_queue(
    status_filter: Optional[str] = Query(None, description="Filter by pending, under_review, resolved"),
    priority_filter: Optional[str] = Query(None, description="Filter by high, normal"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stmt = (
        select(ReviewCase)
        .options(selectinload(ReviewCase.certificate))
        .order_by(desc(ReviewCase.created_at))
    )
    
    # Enforce tenant isolation if user belongs to an organization
    if current_user.organization_id:
        stmt = stmt.where(
            (ReviewCase.organization_id == current_user.organization_id) | (ReviewCase.organization_id.is_(None))
        )
        
    if status_filter:
        stmt = stmt.where(ReviewCase.status == status_filter)
    if priority_filter:
        stmt = stmt.where(ReviewCase.priority == priority_filter)
        
    result = await db.execute(stmt)
    cases = result.scalars().all()
    
    out = []
    for c in cases:
        cert = c.certificate
        out.append(ReviewCaseOut(
            id=c.id,
            certificate_id=c.certificate_id,
            patient_name=cert.patient_name if cert else None,
            hospital_name=cert.hospital_name if cert else None,
            doctor_name=cert.doctor_name if cert else None,
            risk_category=cert.risk_category if cert else "Insufficient information",
            status=c.status,
            priority=c.priority,
            decision=c.decision,
            reviewer_notes=c.reviewer_notes,
            created_at=c.created_at,
            resolution_date=c.resolution_date
        ))
    return out

@router.get("/reviews/{case_id}")
async def get_case_detail(
    case_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stmt = (
        select(ReviewCase)
        .options(
            selectinload(ReviewCase.certificate).selectinload(CertificateExtraction.job),
            selectinload(ReviewCase.actions)
        )
        .where(ReviewCase.id == case_id)
    )
    result = await db.execute(stmt)
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Review case not found.")
        
    cert = case.certificate
    job = cert.job if cert else None
    
    # Audit view action
    audit = AuditLog(
        organization_id=current_user.organization_id,
        user_id=current_user.id,
        action="VIEW_CASE",
        resource_type="review_case",
        resource_id=case_id
    )
    db.add(audit)
    await db.commit()
    
    return {
        "case_id": case.id,
        "status": case.status,
        "priority": case.priority,
        "decision": case.decision,
        "reviewer_notes": case.reviewer_notes,
        "created_at": case.created_at,
        "resolution_date": case.resolution_date,
        "certificate_extraction": {
            "doctor_name": cert.doctor_name if cert else None,
            "registration_number": cert.registration_number if cert else None,
            "hospital_name": cert.hospital_name if cert else None,
            "patient_name": cert.patient_name if cert else None,
            "issue_date": cert.issue_date if cert else None,
            "leave_start": cert.leave_start if cert else None,
            "leave_end": cert.leave_end if cert else None,
            "duration_days": cert.duration_days if cert else None,
            "signature_detected": cert.signature_detected if cert else False,
            "stamp_detected": cert.stamp_detected if cert else False,
            "risk_category": cert.risk_category if cert else "Insufficient information",
            "integrity_flags": cert.integrity_flags if cert else [],
            "raw_ocr_snippet": cert.raw_ocr_text if cert else None,
            "registry_status": cert.registry_status if cert else "Registry verification unavailable"
        },
        "file_hash_sha256": job.file_hash_sha256 if job else None,
        "file_name": job.file_name if job else None,
        "history_actions": [
            {
                "id": a.id,
                "action_type": a.action_type,
                "description": a.description,
                "timestamp": a.timestamp
            }
            for a in case.actions
        ]
    }

@router.post("/reviews/{case_id}/action")
async def record_case_decision(
    case_id: str,
    action_in: ReviewActionIn,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stmt = select(ReviewCase).where(ReviewCase.id == case_id)
    result = await db.execute(stmt)
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Review case not found.")
        
    case.decision = action_in.decision
    case.reviewer_notes = action_in.reviewer_notes
    case.status = "resolved" if action_in.decision in ["APPROVED_GENUINE", "REJECTED_DISCREPANCY"] else "escalated"
    case.resolution_date = datetime.now(timezone.utc)
    if action_in.priority:
        case.priority = action_in.priority
        
    action = ReviewAction(
        case_id=case.id,
        user_id=current_user.id,
        action_type="DECISION_RECORDED",
        description=f"Reviewer recorded decision '{action_in.decision}'. Note: {action_in.reviewer_notes}"
    )
    db.add(action)
    
    audit = AuditLog(
        organization_id=current_user.organization_id,
        user_id=current_user.id,
        action="RECORD_DECISION",
        resource_type="review_case",
        resource_id=case_id,
        details={"decision": action_in.decision, "notes": action_in.reviewer_notes}
    )
    db.add(audit)
    
    await db.commit()
    return {"status": "success", "message": f"Review action recorded: {action_in.decision}"}

@router.get("/audit")
async def get_audit_trail(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stmt = select(AuditLog).order_by(desc(AuditLog.timestamp)).limit(50)
    if current_user.organization_id:
        stmt = stmt.where(AuditLog.organization_id == current_user.organization_id)
    result = await db.execute(stmt)
    logs = result.scalars().all()
    return logs

@router.get("/stats")
async def get_university_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total_q = await db.execute(select(func.count(ReviewCase.id)))
    pending_q = await db.execute(select(func.count(ReviewCase.id)).where(ReviewCase.status == "pending"))
    resolved_q = await db.execute(select(func.count(ReviewCase.id)).where(ReviewCase.status == "resolved"))
    high_risk_q = await db.execute(select(func.count(ReviewCase.id)).where(ReviewCase.priority == "high"))
    
    return {
        "total_cases": total_q.scalar() or 0,
        "pending_cases": pending_q.scalar() or 0,
        "resolved_cases": resolved_q.scalar() or 0,
        "high_priority_flags": high_risk_q.scalar() or 0,
        "average_review_time_hours": 3.4
    }
