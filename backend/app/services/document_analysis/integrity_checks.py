from typing import Dict, Any, List
from PIL import Image

def perform_document_integrity_checks(
    image: Image.Image,
    extracted_fields: Dict[str, Any],
    raw_text: str,
    date_issues: List[Dict[str, Any]],
    signature_detected: bool,
    stamp_detected: bool
) -> List[Dict[str, Any]]:
    """
    Evaluates physical and textual integrity signals across the medical document.
    Categorizes evidence into:
    - Info (expected attributes)
    - Warning (heuristic anomaly, layout inconsistency, or missing optional field)
    - High (critical chronological or mandatory identity absence requiring review)
    """
    flags = []
    
    # 1. Mandatory Identity Fields
    if not extracted_fields.get("doctor_name"):
        flags.append({
            "check_name": "Physician Identification",
            "severity": "warning",
            "passed": False,
            "explanation": "Doctor or physician name could not be reliably extracted from letterhead or signatory line."
        })
    else:
        flags.append({
            "check_name": "Physician Identification",
            "severity": "info",
            "passed": True,
            "explanation": f"Physician identified: {extracted_fields['doctor_name']}."
        })
        
    if not extracted_fields.get("registration_number"):
        flags.append({
            "check_name": "Medical Council Registration",
            "severity": "warning",
            "passed": False,
            "explanation": "Medical practitioner registration number (MCI/NMC/State Council) is missing or unreadable."
        })
    else:
        flags.append({
            "check_name": "Medical Council Registration",
            "severity": "info",
            "passed": True,
            "explanation": f"Registration reference noted: {extracted_fields['registration_number']}."
        })

    if not extracted_fields.get("patient_name"):
        flags.append({
            "check_name": "Patient Identification",
            "severity": "warning",
            "passed": False,
            "explanation": "Patient name could not be unambiguously resolved from the certificate body."
        })
    else:
        flags.append({
            "check_name": "Patient Identification",
            "severity": "info",
            "passed": True,
            "explanation": f"Patient designated: {extracted_fields['patient_name']}."
        })

    # 2. Date consistency flags (inherited from date_logic)
    for issue in date_issues:
        flags.append({
            "check_name": f"Date Logic: {issue['check']}",
            "severity": issue["severity"],
            "passed": issue["passed"],
            "explanation": issue["explanation"]
        })

    # 3. Signature & Stamp Verification
    if not signature_detected:
        flags.append({
            "check_name": "Signatory Pen Stroke Presence",
            "severity": "warning",
            "passed": False,
            "explanation": "No distinct handwriting signature stroke detected in the endorsement quadrant. Document may be unsigned."
        })
    else:
        flags.append({
            "check_name": "Signatory Pen Stroke Presence",
            "severity": "info",
            "passed": True,
            "explanation": "Endorsement signature ink patterns detected."
        })
        
    if not stamp_detected:
        flags.append({
            "check_name": "Official Hospital Stamp / Seal",
            "severity": "info", # Not all clinics use colored stamps
            "passed": False,
            "explanation": "No colored clinic/hospital stamp ink detected. Some authorized clinics issue black-and-white electronic receipts."
        })
    else:
        flags.append({
            "check_name": "Official Hospital Stamp / Seal",
            "severity": "info",
            "passed": True,
            "explanation": "Colored clinic/hospital stamp or seal detected."
        })

    # 4. Text and Font Consistency
    # If raw text contains common generative document template placeholder phrases
    template_placeholders = ["[hospital name]", "[insert date]", "[doctor's name]", "lorem ipsum", "template by"]
    has_placeholder = any(p in raw_text.lower() for p in template_placeholders)
    if has_placeholder:
        flags.append({
            "check_name": "Template Placeholder Residuals",
            "severity": "high",
            "passed": False,
            "explanation": "Document contains unedited bracketed template placeholders (e.g., '[Doctor Name]' or 'Lorem Ipsum')."
        })
    else:
        flags.append({
            "check_name": "Template Placeholder Residuals",
            "severity": "info",
            "passed": True,
            "explanation": "No draft placeholder text patterns found."
        })

    return flags
