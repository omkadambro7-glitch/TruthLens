from typing import Dict, Any, List

def compute_risk_assessment(
    extracted_fields: Dict[str, Any],
    integrity_flags: List[Dict[str, Any]],
    raw_text: str
) -> tuple[str, List[str]]:
    """
    Computes an honest risk category and prescribes appropriate review actions.
    Enforces mandatory safeguards:
    - Never equates risk score with probability of fraud.
    - Prohibits automated adverse determinations.
    Returns:
        (risk_category: str, suggested_review_actions: List[str])
    """
    high_issues = [f for f in integrity_flags if f.get("severity") == "high" and not f.get("passed")]
    warning_issues = [f for f in integrity_flags if f.get("severity") == "warning" and not f.get("passed")]
    
    # Check if there is enough text to analyze
    if len(raw_text.strip()) < 40 and not extracted_fields.get("patient_name") and not extracted_fields.get("doctor_name"):
        risk_category = "Insufficient information"
        suggested_actions = [
            "Request higher-resolution document upload or physical paper certificate.",
            "Verify whether the file is unreadable, corrupted, or cropped.",
            "Contact student to submit clear, legible copy."
        ]
        return risk_category, suggested_actions
        
    suggested_actions = []
    
    if len(high_issues) > 0:
        risk_category = "High-priority human review"
        suggested_actions.append("Direct reviewer review required prior to processing attendance records.")
        for issue in high_issues:
            suggested_actions.append(f"Examine flag: {issue['check_name']} — {issue['explanation']}")
        suggested_actions.append("Contact student for verbal clarification or supplementary discharge summary.")
        suggested_actions.append("Do NOT issue an automated sanction or disciplinary action.")
    elif len(warning_issues) >= 2 or (not extracted_fields.get("registration_number") and not extracted_fields.get("doctor_name")):
        risk_category = "Review recommended"
        suggested_actions.append("Standard administrative review recommended.")
        suggested_actions.append("Verify doctor registration credentials against state medical registry.")
        suggested_actions.append("Confirm hospital or clinic address and phone listing.")
    else:
        risk_category = "Low apparent integrity risk"
        suggested_actions.append("Document exhibits consistent formatting, valid date sequences, and legible physician identifiers.")
        suggested_actions.append("Proceed with standard institutional workflow.")

    return risk_category, suggested_actions
