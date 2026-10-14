from typing import Any, Dict, Optional
from datetime import datetime
from pydantic import BaseModel

class ReportOut(BaseModel):
    report_id: str
    share_token: str
    job_id: str
    job_type: str
    file_name: str
    file_hash_sha256: str
    manifest_signature: str
    verdict_or_risk: str
    confidence_or_category: str
    summary: str
    evidence_data: Dict[str, Any]
    is_revoked: bool
    expires_at: Optional[datetime]
    created_at: datetime
    disclaimer: str

class ShareTokenOut(BaseModel):
    share_url: str
    share_token: str
    expires_at: Optional[datetime]
