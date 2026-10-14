import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, JSON, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    share_token = Column(String(64), unique=True, index=True, nullable=False)
    job_id = Column(String(36), ForeignKey("verification_jobs.id"), nullable=False)
    
    # Tamper-evident cryptographic manifest
    manifest_signature = Column(String(128), nullable=False)
    report_data = Column(JSON, nullable=False)
    is_revoked = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    job = relationship("VerificationJob", back_populates="report")
