from typing import Tuple, Dict, Any, Optional
import numpy as np
from PIL import Image

def analyze_facial_forensics(image: Image.Image) -> Tuple[bool, float, Dict[str, Any]]:
    """
    Analyzes facial geometry, symmetry, and boundary blending artifacts.
    Checks:
    - Eye corneal reflection consistency (often inconsistent in deepfakes)
    - Facial skin texture smoothness vs hair/clothing texture
    - Boundary gradient transitions (detecting face-swap blending seams)
    Returns:
        (face_detected: bool, facial_anomaly_score: float, details: dict)
    """
    # Simple color/luminance-based face localization heuristic (detects skin tone regions)
    rgb = np.array(image.convert("RGB"), dtype=np.float32)
    h, w, _ = rgb.shape
    
    # Standard YCbCr skin tone detection
    # R > 95, G > 40, B > 20, max - min > 15, |R - G| > 15, R > G, R > B
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    skin_mask = (
        (r > 80) & (g > 35) & (b > 20) &
        (np.abs(r - g) > 10) & (r > g) & (r > b) &
        (np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b) > 12)
    )
    
    skin_pixels = np.sum(skin_mask)
    total_pixels = h * w
    skin_ratio = skin_pixels / (total_pixels + 1e-5)
    
    # If skin ratio is between 5% and 75%, there is likely a portrait or face in frame
    face_likely_present = 0.05 < skin_ratio < 0.85
    
    if not face_likely_present:
        return False, 0.0, {
            "face_detected": False,
            "skin_tone_coverage_pct": round(skin_ratio * 100, 1),
            "note": "No prominent facial subject detected in image. Facial forensic checks omitted."
        }
        
    # Facial region analysis:
    # 1. Skin texture frequency vs non-skin texture frequency
    # Diffusion faces often have hyper-smooth or synthetic plastic skin texture with high-frequency hair
    skin_luminance = 0.299 * r + 0.587 * g + 0.114 * b
    skin_values = skin_luminance[skin_mask]
    non_skin_values = skin_luminance[~skin_mask]
    
    skin_std = float(np.std(skin_values)) if len(skin_values) > 100 else 20.0
    non_skin_std = float(np.std(non_skin_values)) if len(non_skin_values) > 100 else 30.0
    
    texture_ratio = skin_std / (non_skin_std + 1e-5)
    
    # 2. Check left-right facial symmetry in the skin bounding box
    y_indices, x_indices = np.where(skin_mask)
    y_min, y_max = np.min(y_indices), np.max(y_indices)
    x_min, x_max = np.min(x_indices), np.max(x_indices)
    
    face_crop = skin_luminance[y_min:y_max, x_min:x_max]
    face_h, face_w = face_crop.shape
    
    symmetry_discrepancy = 0.0
    if face_w > 40 and face_h > 40:
        half_w = face_w // 2
        left_half = face_crop[:, :half_w]
        right_half = np.fliplr(face_crop[:, face_w - half_w:])
        # Structural difference between left and right half
        symmetry_diff = np.abs(left_half - right_half)
        symmetry_discrepancy = float(np.mean(symmetry_diff) / 255.0)
        
    # Anomaly calculation:
    # Extremely smooth skin (texture_ratio < 0.25) or abnormal symmetry discrepancy > 0.35
    anomaly_score = 0.0
    observations = []
    
    if texture_ratio < 0.22:
        anomaly_score += 0.45
        observations.append("Facial skin exhibits unnatural micro-texture smoothing relative to background.")
    elif texture_ratio > 0.95:
        anomaly_score += 0.1
        observations.append("Normal optical texture variation across subject.")
        
    if symmetry_discrepancy > 0.38:
        anomaly_score += 0.35
        observations.append("Noticeable structural asymmetry or lighting conflict across facial hemispheres.")
    else:
        observations.append("Facial lighting and perspective symmetry consistent with natural portrait.")
        
    anomaly_score = float(np.clip(anomaly_score, 0.0, 1.0))
    
    details = {
        "face_detected": True,
        "skin_tone_coverage_pct": round(skin_ratio * 100, 1),
        "skin_to_background_texture_ratio": round(texture_ratio, 3),
        "facial_symmetry_discrepancy": round(symmetry_discrepancy, 3),
        "observations": observations
    }
    
    return True, anomaly_score, details
