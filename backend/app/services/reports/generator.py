import hmac
import hashlib
import json
import secrets
from datetime import datetime, timezone, timedelta, date
from typing import Dict, Any, Tuple
import numpy as np
from app.core.config import settings

def custom_json_serializer(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, (np.bool_, bool)):
        return bool(obj)
    if isinstance(obj, (np.integer, int)):
        return int(obj)
    if isinstance(obj, (np.floating, float)):
        return float(obj)
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    return str(obj)

def compute_manifest_signature(data: Dict[str, Any]) -> str:
    """
    Computes a cryptographic HMAC-SHA256 signature over canonicalized JSON representation
    of the report findings to guarantee tamper evidence.
    """
    canonical_bytes = json.dumps(data, sort_keys=True, default=custom_json_serializer).encode("utf-8")
    return hmac.new(settings.SECRET_KEY.encode("utf-8"), canonical_bytes, hashlib.sha256).hexdigest()

def generate_truth_report(
    job_id: str,
    job_type: str,
    file_name: str,
    file_hash_sha256: str,
    findings: Dict[str, Any],
    expires_in_days: int = 30
) -> Tuple[Dict[str, Any], str, str]:
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(days=expires_in_days)
    share_token = secrets.token_urlsafe(32)
    
    report_content = {
        "report_id": f"TLR-{now.strftime('%Y%m%d')}-{secrets.token_hex(4).upper()}",
        "schema_version": "1.0",
        "generated_at_utc": now.isoformat(),
        "expires_at_utc": expires_at.isoformat(),
        "file_metadata": {
            "file_name": file_name,
            "sha256_hash": file_hash_sha256,
            "job_type": job_type,
            "analysis_engine": "TruthLens Multi-Spectral Forensic Engine v1.2"
        },
        "findings": findings,
        "governance": {
            "organization": "TruthLens Open Authenticity Consortium",
            "attestation": "This report documents computational forensic observations and statistical model scores. It does not constitute legal proof or a medical diagnosis.",
            "free_public_verification": "Verify manifest signature online at https://truthlens.org/verify/manifest"
        }
    }
    
    manifest_signature = compute_manifest_signature(report_content)
    report_content["tamper_evident_seal"] = {
        "algorithm": "HMAC-SHA256",
        "signature": manifest_signature
    }
    
    # Ensure serializable for JSON column in SQLAlchemy
    clean_report_data = json.loads(json.dumps(report_content, default=custom_json_serializer))
    
    return clean_report_data, share_token, manifest_signature
