import io
import time
import hashlib
from typing import Dict, Any, List
from PIL import Image

from app.services.image_analysis.ela import perform_ela
from app.services.image_analysis.frequency_fft import analyze_frequency_spectrum
from app.services.image_analysis.noise_analysis import analyze_noise_consistency
from app.services.image_analysis.metadata_forensics import analyze_metadata_and_exif
from app.services.image_analysis.face_forensics import analyze_facial_forensics

def run_image_verification_pipeline(image_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Executes the multi-signal forensic verification pipeline on an image.
    Integrates ELA, 2D FFT frequency spectrum, noise variance, metadata, and face forensics.
    Returns structured results with calibrated confidence, uncertainty, and evidence breakdown.
    """
    start_time = time.time()
    
    # Cryptographic hash
    file_hash_sha256 = hashlib.sha256(image_bytes).hexdigest()
    
    # Open image with PIL
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.load()
    except Exception as e:
        raise ValueError(f"Failed to decode image: {str(e)}")
        
    evidence_items = []
    
    # 1. Error Level Analysis (ELA)
    ela_score, heatmap_filename, ela_details = perform_ela(image)
    evidence_items.append({
        "id": "sig_ela",
        "signal_name": "Error Level Analysis (ELA)",
        "signal_score": round(ela_score, 2),
        "weight": 0.28,
        "verdict_impact": "supports_fake" if ela_score > 0.65 else ("supports_real" if ela_score < 0.3 else "inconclusive"),
        "description": "Measures localized recompression discrepancies across 8x8 pixel blocks.",
        "details": ela_details
    })
    
    # 2. 2D FFT Frequency Analysis
    fft_score, fft_details = analyze_frequency_spectrum(image)
    evidence_items.append({
        "id": "sig_fft",
        "signal_name": "High-Frequency Spectral Profile",
        "signal_score": round(fft_score, 2),
        "weight": 0.28,
        "verdict_impact": "supports_fake" if fft_score > 0.65 else ("supports_real" if fft_score < 0.3 else "inconclusive"),
        "description": "Tests for periodic grid artifacts and deviations from natural 1/f power-law decay.",
        "details": fft_details
    })
    
    # 3. Sensor Noise & Laplacian Consistency
    noise_score, noise_details = analyze_noise_consistency(image)
    evidence_items.append({
        "id": "sig_noise",
        "signal_name": "Sensor Noise Distribution",
        "signal_score": round(noise_score, 2),
        "weight": 0.22,
        "verdict_impact": "supports_fake" if noise_score > 0.65 else ("supports_real" if noise_score < 0.3 else "inconclusive"),
        "description": "Examines uniformity of optical shot noise against synthetic smoothing and inconsistent blur.",
        "details": noise_details
    })
    
    # 4. Metadata & Container Inspection
    meta_score, meta_details = analyze_metadata_and_exif(image, image_bytes)
    evidence_items.append({
        "id": "sig_meta",
        "signal_name": "Container & EXIF Metadata",
        "signal_score": round(meta_score, 2),
        "weight": 0.12,
        "verdict_impact": "supports_fake" if meta_details.get("ai_marker_detected") else ("supports_real" if meta_details.get("has_exif") else "inconclusive"),
        "description": meta_details.get("metadata_summary", "Inspected container headers and camera tags."),
        "details": meta_details
    })
    
    # 5. Facial Forensics
    face_detected, face_score, face_details = analyze_facial_forensics(image)
    if face_detected:
        evidence_items.append({
            "id": "sig_face",
            "signal_name": "Facial Symmetry & Texture",
            "signal_score": round(face_score, 2),
            "weight": 0.20,
            "verdict_impact": "supports_fake" if face_score > 0.65 else ("supports_real" if face_score < 0.3 else "inconclusive"),
            "description": "Evaluates skin texture smoothness ratio and facial lighting symmetry.",
            "details": face_details
        })
        
    # Ensemble weighted score calculation
    total_weight = sum(item["weight"] for item in evidence_items)
    weighted_score = sum(item["signal_score"] * item["weight"] for item in evidence_items) / total_weight
    
    # Check for direct AI signature override
    if meta_details.get("ai_marker_detected"):
        weighted_score = max(weighted_score, 0.88)
        
    # Calibrated confidence & explicit verdict mapping
    # Rule: Distinguish LIKELY REAL, LIKELY FAKE, NEEDS HUMAN REVIEW
    scores = [item["signal_score"] for item in evidence_items if item["id"] != "sig_meta"]
    score_variance = float(max(scores) - min(scores)) if scores else 0.0
    
    if meta_details.get("ai_marker_detected") or (weighted_score >= 0.68 and score_variance < 0.55):
        verdict = "LIKELY FAKE"
        confidence = round(min(0.95, weighted_score), 2)
        uncertainty = "Low" if weighted_score > 0.80 else "Moderate"
        summary = (
            "Multiple forensic signals exhibit patterns consistent with synthetic AI generation or localized digital manipulation. "
            "This signal alone cannot establish definitive intent or legal proof."
        )
    elif weighted_score <= 0.32 and max(scores) < 0.60:
        verdict = "LIKELY REAL"
        # For real images, confidence is 1.0 - synthetic_score
        confidence = round(min(0.92, 1.0 - weighted_score), 2)
        uncertainty = "Low" if weighted_score < 0.20 else "Moderate"
        summary = (
            "Image displays natural optical noise, consistent error levels, and authentic spectral decay. "
            "No prominent generative or compositing anomalies detected."
        )
    else:
        verdict = "NEEDS HUMAN REVIEW"
        confidence = round(abs(weighted_score - 0.5) * 2.0, 2)
        uncertainty = "High"
        summary = (
            "Analysis yielded conflicting or borderline forensic signals. "
            "Compression artifacts, image resizing, or complex lighting prevent a conclusive automated verdict."
        )
        
    execution_time_ms = round((time.time() - start_time) * 1000, 1)
    
    disclaimer = (
        "TruthLens uses multi-spectral signal heuristics and experimental forensic models. "
        "No automated tool provides 100% certainty. Results must be reviewed in context."
    )
    
    return {
        "file_name": filename,
        "file_hash_sha256": file_hash_sha256,
        "verdict": verdict,
        "confidence_score": confidence,
        "uncertainty_level": uncertainty,
        "summary_explanation": summary,
        "is_experimental": True,
        "model_identifier": "TruthLens Ensemble Forensics v1.2",
        "evidence_breakdown": evidence_items,
        "metadata_observations": meta_details,
        "face_analysis_results": face_details if face_detected else None,
        "heatmap_filename": heatmap_filename,
        "execution_time_ms": execution_time_ms,
        "disclaimer": disclaimer
    }
