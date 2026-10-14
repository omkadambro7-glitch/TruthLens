import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, Integer, Text, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class CertificateExtraction(Base):
    __tablename__ = "certificate_extractions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    job_id = Column(String(36), ForeignKey("verification_jobs.id"), nullable=False)
    
    # Extracted fields
    doctor_name = Column(String(255), nullable=True)
    registration_number = Column(String(100), nullable=True)
    hospital_name = Column(String(255), nullable=True)
    patient_name = Column(String(255), nullable=True)
    issue_date = Column(String(50), nullable=True)
    leave_start = Column(String(50), nullable=True)
    leave_end = Column(String(50), nullable=True)
    duration_days = Column(Integer, nullable=True)
    signature_detected = Column(Boolean, default=False)
    stamp_detected = Column(Boolean, default=False)
    
    # OCR and Integrity
    raw_ocr_text = Column(Text, nullable=True)
    ocr_confidence = Column(String(50), default="high") # high, medium, low
    risk_category = Column(String(100), nullable=False)  # Low apparent integrity risk, Review recommended, High-priority human review, Insufficient information
    integrity_flags = Column(JSON, nullable=True)        # list of detected red flags / checks
    registry_status = Column(String(100), default="Registry verification unavailable")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    job = relationship("VerificationJob", back_populates="certificate_extraction")
    review_case = relationship("ReviewCase", back_populates="certificate", uselist=False)

class ReviewCase(Base):
    __tablename__ = "review_cases"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    certificate_id = Column(String(36), ForeignKey("certificate_extractions.id"), nullable=False)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    assigned_reviewer_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    
    # Case status
    status = Column(String(50), default="pending") # pending, under_review, approved, rejected, escalated, clarification_requested
    priority = Column(String(50), default="normal") # normal, elevated, high
    reviewer_notes = Column(Text, nullable=True)
    decision = Column(String(50), nullable=True)   # APPROVED_GENUINE, REJECTED_DISCREPANCY, ESCALATED_BOARD, CLARIFICATION_NEEDED
    resolution_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    organization = relationship("Organization", back_populates="review_cases")
    certificate = relationship("CertificateExtraction", back_populates="review_case")
    actions = relationship("ReviewAction", back_populates="case", cascade="all, delete-orphan")

class ReviewAction(Base):
    __tablename__ = "review_actions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    case_id = Column(String(36), ForeignKey("review_cases.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    action_type = Column(String(100), nullable=False) # ASSIGNED, STATUS_CHANGE, NOTE_ADDED, DECISION_RECORDED
    description = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    case = relationship("ReviewCase", back_populates="actions")
