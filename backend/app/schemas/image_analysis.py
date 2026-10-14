from typing import List, Optional, Any, Dict
from datetime import datetime
from pydantic import BaseModel

class EvidenceItemOut(BaseModel):
    id: str
    signal_name: str
    signal_score: float # 0.0 to 1.0
    weight: float
    verdict_impact: str # supports_fake, supports_real, inconclusive
    description: str
    details: Optional[Dict[str, Any]] = None

class ImageVerificationOut(BaseModel):
    job_id: str
    file_name: str
    file_hash_sha256: str
    verdict: str # 'LIKELY REAL' | 'LIKELY FAKE' | 'NEEDS HUMAN REVIEW'
    confidence_score: float # calibrated estimate
    uncertainty_level: str # 'Low' | 'Moderate' | 'High'
    summary_explanation: str
    is_experimental: bool = True
    model_identifier: str = "TruthLens Ensemble Forensics v1.2"
    evidence_breakdown: List[EvidenceItemOut]
    metadata_observations: Dict[str, Any]
    face_analysis_results: Optional[Dict[str, Any]] = None
    heatmap_url: Optional[str] = None
    original_image_url: Optional[str] = None
    execution_time_ms: float
    created_at: datetime
    disclaimer: str

class UrlVerificationIn(BaseModel):
    image_url: str
