from typing import Tuple, Dict, Any
from PIL import Image, ExifTags

KNOWN_AI_GENERATION_MARKERS = [
    "stable diffusion",
    "comfyui",
    "automatic1111",
    "midjourney",
    "dall-e",
    "novelai",
    "civitai",
    "generator: dreamstudio",
    "invokeai",
    "parameters:",
    "negative prompt:"
]

KNOWN_EDITING_SOFTWARE_MARKERS = [
    "photoshop",
    "gimp",
    "lightroom",
    "canva",
    "affinity",
    "pixlr"
]

def analyze_metadata_and_exif(image: Image.Image, raw_bytes: bytes) -> Tuple[float, Dict[str, Any]]:
    """
    Parses EXIF, XMP, software headers, and compression metadata.
    Discloses:
    - Presence of direct generative software headers (strong indicator)
    - Editing software tags (indicates post-processing, not necessarily generative manipulation)
    - Metadata stripping (very common on social media, not evidence of forgery)
    Returns:
        (metadata_synthetic_risk_score: float, details: dict)
    """
    findings = []
    exif_data = {}
    software_found = None
    has_exif = False
    ai_signature_found = False
    editing_signature_found = False
    
    # 1. Parse EXIF
    try:
        raw_exif = image.getexif()
        if raw_exif:
            has_exif = True
            for tag_id, value in raw_exif.items():
                tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
                if isinstance(value, (str, int, float)):
                    exif_data[tag_name] = str(value)
                elif isinstance(value, bytes):
                    try:
                        exif_data[tag_name] = value.decode("utf-8", errors="ignore")[:100]
                    except Exception:
                        pass
    except Exception:
        pass
        
    # Check software tag
    if "Software" in exif_data:
        software_found = exif_data["Software"].lower()
    
    # 2. Raw byte header scanning for AI prompts / PNG chunks / XMP
    raw_str_lower = raw_bytes[:65536].lower() # Check first 64KB for headers
    
    for marker in KNOWN_AI_GENERATION_MARKERS:
        if marker.encode("utf-8") in raw_str_lower:
            ai_signature_found = True
            findings.append(f"Discovered explicit generative parameter marker in image headers: '{marker}'")
            break
            
    if not ai_signature_found and software_found:
        for marker in KNOWN_EDITING_SOFTWARE_MARKERS:
            if marker in software_found:
                editing_signature_found = True
                findings.append(f"Detected photo-editing software tag: '{exif_data['Software']}'")
                break

    # Determine risk score
    if ai_signature_found:
        risk_score = 0.95
        summary = "Explicit generative AI generation parameters or tags detected in file container headers."
    elif editing_signature_found:
        risk_score = 0.45
        summary = "Image container shows standard photo-editing software tags (indicates post-processing; not proof of deepfake)."
    elif not has_exif:
        risk_score = 0.25
        summary = "EXIF camera metadata is absent. Note: This is standard for modern web and social platforms and does not indicate forgery."
    else:
        risk_score = 0.10
        camera_make = exif_data.get("Make", "")
        camera_model = exif_data.get("Model", "")
        summary = f"Standard camera sensor EXIF metadata present ({camera_make} {camera_model})."
        
    details = {
        "has_exif": has_exif,
        "camera_make": exif_data.get("Make"),
        "camera_model": exif_data.get("Model"),
        "software": exif_data.get("Software"),
        "dimensions": f"{image.width}x{image.height}",
        "format": image.format,
        "color_mode": image.mode,
        "ai_marker_detected": ai_signature_found,
        "editing_marker_detected": editing_signature_found,
        "findings": findings,
        "metadata_summary": summary,
        "disclosure": "Metadata absence is common on social media and is NOT evidence of forgery. Editing tags indicate re-saving, not necessarily synthetic creation."
    }
    
    return risk_score, details
