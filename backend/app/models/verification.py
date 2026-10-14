import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Float, Text, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class VerificationJob(Base):
    __tablename__ = "verification_jobs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    job_type = Column(String(50), default="image")  # image, certificate
    file_name = Column(String(255), nullable=False)
    file_hash_sha256 = Column(String(64), index=True, nullable=False)
    file_type = Column(String(50), nullable=False)
    file_size_bytes = Column(Float, nullable=False)
    file_path = Column(String(500), nullable=False)
    
    # Analysis outputs
    status = Column(String(50), default="completed")  # processing, completed, failed
    verdict = Column(String(50), nullable=False)      # LIKELY REAL, LIKELY FAKE, NEEDS HUMAN REVIEW
    confidence_score = Column(Float, nullable=False)  # 0.0 to 1.0 (calibrated / model estimate)
    uncertainty_level = Column(String(50), default="low") # low, moderate, high
    summary_text = Column(Text, nullable=False)
    heatmap_path = Column(String(500), nullable=True)
    execution_time_ms = Column(Float, default=0.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="verification_jobs")
    evidence_records = relationship("AnalysisEvidence", back_populates="job", cascade="all, delete-orphan")
    certificate_extraction = relationship("CertificateExtraction", back_populates="job", uselist=False, cascade="all, delete-orphan")
    report = relationship("Report", back_populates="job", uselist=False, cascade="all, delete-orphan")

class AnalysisEvidence(Base):
    __tablename__ = "analysis_evidence"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    job_id = Column(String(36), ForeignKey("verification_jobs.id"), nullable=False)
    signal_name = Column(String(100), nullable=False)  # ELA, Frequency FFT, Noise Discontinuity, Metadata, Face Symmetry
    signal_score = Column(Float, nullable=False)       # 0.0 to 1.0
    weight = Column(Float, default=1.0)
    verdict_impact = Column(String(50), default="neutral") # supports_fake, supports_real, inconclusive
    description = Column(Text, nullable=False)
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    job = relationship("VerificationJob", back_populates="evidence_records")
