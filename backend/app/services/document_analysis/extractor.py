import re
import io
from typing import Dict, Any, Optional
from PIL import Image
import numpy as np

# Medical patterns
PATIENT_PATTERNS = [
    r"(?:Patient|Mr\.|Ms\.|Mrs\.|Shri|Smt\.|Name)\s*[:\-]?\s*([A-Za-z\s]{3,35})",
    r"certif(?:y|ies)\s+that\s+([A-Za-z\s]{3,35})\s+is\s+suffering",
    r"patient\s+named\s+([A-Za-z\s]{3,35})"
]

DOCTOR_PATTERNS = [
    r"(?:Dr\.|Doctor|Physician)\s*[:\-]?\s*([A-Za-z\.\s]{3,35})",
    r"issued\s+by\s+(?:Dr\.)?\s*([A-Za-z\.\s]{3,35})"
]

REG_NO_PATTERNS = [
    r"(?:Reg(?:istration)?\.?\s*(?:No|Number|#)?)\s*[:\-]?\s*([A-Za-z0-9\-/]{4,20})",
    r"(?:MCI|NMC|State\s*Council|Council\s*Reg)\s*[:\-]?\s*([A-Za-z0-9\-/]{4,20})"
]

HOSPITAL_PATTERNS = [
    r"([A-Za-z\s]{3,40}(?:Hospital|Clinic|Medical\s*Center|Healthcare|Infirmary|Dispensary))",
    r"Department\s+of\s+([A-Za-z\s]{3,35})"
]

DATE_PATTERNS = [
    r"(?:Date|Dated|Issue\s*Date)\s*[:\-]?\s*(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})",
    r"(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4})"
]

LEAVE_START_PATTERNS = [
    r"(?:from|w\.e\.f\.?|commencing)\s*[:\-]?\s*(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})",
    r"advised\s+rest\s+from\s*[:\-]?\s*(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4})"
]

LEAVE_END_PATTERNS = [
    r"(?:to|till|upto|until)\s*[:\-]?\s*(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})",
    r"rest\s+up\s+to\s*[:\-]?\s*(\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4})"
]

DURATION_PATTERNS = [
    r"(?:period\s+of|duration\s+of|for)\s*(\d{1,3})\s*(?:days|day)",
    r"advised\s*(\d{1,3})\s*(?:days|day)\s+bed\s+rest"
]

def extract_signature_and_stamp(image: Image.Image) -> tuple[bool, bool, dict]:
    """
    Checks for the presence of an official stamp (circular/colored ink density)
    and signature stroke paths (irregular dark ink stroke variance) in bottom quadrant.
    """
    img_rgb = image.convert("RGB")
    w, h = img_rgb.size
    
    # Focus on lower 40% of document where stamps/signatures are typically affixed
    lower_crop = img_rgb.crop((0, int(h * 0.6), w, h))
    arr = np.array(lower_crop)
    
    # Check for colored stamp ink (blue, violet, or red ink which contrasts with black text)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    # Blue/Violet stamp ink: B > 110, B > R + 25, B > G + 20
    blue_stamp_mask = (b > 110) & (b > r + 25) & (b > g + 20)
    # Red stamp ink: R > 140, R > G + 35, R > B + 35
    red_stamp_mask = (r > 140) & (r > g + 35) & (r > b + 35)
    stamp_pixels = int(np.sum(blue_stamp_mask) + np.sum(red_stamp_mask))
    
    stamp_detected = bool(stamp_pixels > 400)
    
    # Signature stroke detection: look for concentrated dark cursive strokes
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    dark_mask = luminance < 85
    dark_pixels = int(np.sum(dark_mask))
    signature_detected = bool(dark_pixels > 800)
    
    details = {
        "colored_stamp_pixels": stamp_pixels,
        "dark_stroke_pixels": dark_pixels,
        "stamp_found": stamp_detected,
        "signature_found": signature_detected
    }
    
    return signature_detected, stamp_detected, details

def extract_fields_from_text(raw_text: str) -> Dict[str, Any]:
    extracted = {
        "doctor_name": None,
        "registration_number": None,
        "hospital_name": None,
        "patient_name": None,
        "issue_date": None,
        "leave_start": None,
        "leave_end": None,
        "duration_days": None,
    }
    
    for pattern in DOCTOR_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            doc_name = match.group(1).strip()
            if not doc_name.lower().startswith("dr"):
                doc_name = f"Dr. {doc_name}"
            extracted["doctor_name"] = doc_name
            break
            
    for pattern in REG_NO_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            extracted["registration_number"] = match.group(1).strip()
            break
            
    for pattern in HOSPITAL_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            extracted["hospital_name"] = match.group(1).strip()
            break
            
    for pattern in PATIENT_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            name = match.group(1).strip()
            name = re.sub(r'^(is|was|that|the)\s+', '', name, flags=re.IGNORECASE)
            extracted["patient_name"] = name
            break
            
    for pattern in DATE_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            extracted["issue_date"] = match.group(1).strip()
            break
            
    for pattern in LEAVE_START_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            extracted["leave_start"] = match.group(1).strip()
            break
            
    for pattern in LEAVE_END_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            extracted["leave_end"] = match.group(1).strip()
            break
            
    for pattern in DURATION_PATTERNS:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            try:
                extracted["duration_days"] = int(match.group(1).strip())
            except ValueError:
                pass
            break
            
    return extracted
