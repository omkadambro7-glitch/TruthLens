from typing import List, Optional, Any, Dict
from datetime import datetime
from pydantic import BaseModel

class CertificateFieldOut(BaseModel):
    field_name: str
    value: Optional[str]
    confidence: str # high, medium, low
    source_extracted: bool

class IntegrityFlagOut(BaseModel):
    check_name: str
    severity: str # info, warning, high
    passed: bool
    explanation: str

class CertificateVerificationOut(BaseModel):
    job_id: str
    file_name: str
    file_hash_sha256: str
    risk_category: str # 'Low apparent integrity risk' | 'Review recommended' | 'High-priority human review' | 'Insufficient information'
    requires_human_review: bool = True
    doctor_name: Optional[str] = None
    registration_number: Optional[str] = None
    hospital_name: Optional[str] = None
    patient_name: Optional[str] = None
    issue_date: Optional[str] = None
    leave_start: Optional[str] = None
    leave_end: Optional[str] = None
    duration_days: Optional[int] = None
    signature_detected: bool = False
    stamp_detected: bool = False
    ocr_confidence: str = "high"
    raw_ocr_snippet: Optional[str] = None
    registry_status: str = "Registry verification unavailable"
    integrity_flags: List[IntegrityFlagOut]
    suggested_review_actions: List[str]
    case_id: Optional[str] = None
    created_at: datetime
    mandatory_safeguard_notice: str = (
        "Mandatory Safeguard: TruthLens assists human reviewers and student self-checks. "
        "Automated rejection, disciplinary action, or conclusive determination of fraud is strictly prohibited without authorized human review."
    )

class ReviewActionIn(BaseModel):
    decision: str # APPROVED_GENUINE, REJECTED_DISCREPANCY, ESCALATED_BOARD, CLARIFICATION_NEEDED
    reviewer_notes: str
    priority: Optional[str] = None

class ReviewCaseOut(BaseModel):
    id: str
    certificate_id: str
    patient_name: Optional[str]
    hospital_name: Optional[str]
    doctor_name: Optional[str]
    risk_category: str
    status: str
    priority: str
    decision: Optional[str]
    reviewer_notes: Optional[str]
    created_at: datetime
    resolution_date: Optional[datetime]
