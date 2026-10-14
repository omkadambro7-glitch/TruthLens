import pytest
import io
from PIL import Image
from httpx import AsyncClient, ASGITransport

from app.main import app
from app.core.ssrf import is_ip_allowed, validate_and_resolve_url
from app.services.document_analysis.date_logic import validate_date_logic
from app.services.image_analysis.pipeline import run_image_verification_pipeline
from app.services.document_analysis.pipeline import run_certificate_verification_pipeline
from app.services.reports.generator import compute_manifest_signature

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/healthz")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] in ["healthy", "degraded"]
        assert "forensics_engine" in data["subsystems"]

def test_ssrf_protection_disallowed_ips():
    # Loopback
    assert is_ip_allowed("127.0.0.1") is False
    assert is_ip_allowed("127.0.0.2") is False
    # Cloud metadata service (AWS/GCP/Azure)
    assert is_ip_allowed("169.254.169.254") is False
    # Private RFC 1918
    assert is_ip_allowed("10.0.0.1") is False
    assert is_ip_allowed("192.168.1.1") is False
    assert is_ip_allowed("172.16.0.1") is False
    # IPv6 Loopback
    assert is_ip_allowed("::1") is False
    # Public IP should pass
    assert is_ip_allowed("8.8.8.8") is True
    assert is_ip_allowed("1.1.1.1") is True

def test_ssrf_url_validation_blocks_internal_hosts():
    valid, msg, _ = validate_and_resolve_url("http://localhost:8000/secret")
    assert valid is False
    assert "internal" in msg.lower() or "restricted" in msg.lower() or "forbidden" in msg.lower()

    valid, msg, _ = validate_and_resolve_url("ftp://example.com/test.jpg")
    assert valid is False
    assert "only http and https" in msg.lower()

def test_date_logic_chronological_violation():
    # Start date AFTER End date
    is_valid, issues, days = validate_date_logic(
        issue_date_str="12/10/2026",
        start_date_str="20/10/2026",
        end_date_str="15/10/2026",
        stated_duration_days=5
    )
    assert is_valid is False
    assert any("chronological impossibility" in i["explanation"].lower() for i in issues)

def test_date_logic_valid_sequence():
    is_valid, issues, days = validate_date_logic(
        issue_date_str="10/10/2026",
        start_date_str="10/10/2026",
        end_date_str="14/10/2026",
        stated_duration_days=5
    )
    assert is_valid is True
    assert days == 5

def test_image_verification_pipeline():
    # Create test image in memory
    img = Image.new("RGB", (256, 256), color=(200, 150, 100))
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    img_bytes = buf.getvalue()

    result = run_image_verification_pipeline(img_bytes, "test_synthetic.jpg")
    assert "verdict" in result
    assert result["verdict"] in ["LIKELY REAL", "LIKELY FAKE", "NEEDS HUMAN REVIEW"]
    assert "confidence_score" in result
    assert "evidence_breakdown" in result
    assert len(result["evidence_breakdown"]) >= 3
    assert result["file_hash_sha256"] is not None

def test_certificate_verification_pipeline():
    # Sample certificate image
    img = Image.new("RGB", (300, 400), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    img_bytes = buf.getvalue()

    result = run_certificate_verification_pipeline(img_bytes, "sample_cert.jpg")
    assert "risk_category" in result
    assert result["risk_category"] in [
        "Low apparent integrity risk",
        "Review recommended",
        "High-priority human review",
        "Insufficient information"
    ]
    assert result["requires_human_review"] is True
    assert "mandatory_safeguard_notice" in result

def test_manifest_signature_tamper_evidence():
    data1 = {"job_id": "123", "verdict": "LIKELY REAL", "hash": "abc"}
    data2 = {"job_id": "123", "verdict": "LIKELY FAKE", "hash": "abc"} # Tampered verdict
    sig1 = compute_manifest_signature(data1)
    sig2 = compute_manifest_signature(data2)
    assert sig1 != sig2

@pytest.mark.asyncio
async def test_auth_and_sos_endpoints():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # SOS resources
        sos_res = await ac.get("/api/v1/sos/resources")
        assert sos_res.status_code == 200
        assert len(sos_res.json()["resources"]) >= 4

        # Accuracy metrics
        acc_res = await ac.get("/api/v1/accuracy/metrics")
        assert acc_res.status_code == 200
        assert "benchmarks" in acc_res.json()
