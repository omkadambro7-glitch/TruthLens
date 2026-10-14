from datetime import datetime, date
import re
from typing import Optional, Tuple, List, Dict, Any

DATE_FORMATS = [
    "%Y-%m-%d",
    "%d/%m/%Y",
    "%d-%m-%Y",
    "%d.%m.%Y",
    "%m/%d/%Y",
    "%d %b %Y",
    "%d %B %Y",
    "%b %d, %Y",
    "%B %d, %Y"
]

def parse_date_string(date_str: Optional[str]) -> Optional[date]:
    if not date_str:
        return None
    cleaned = date_str.strip()
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(cleaned, fmt).date()
        except ValueError:
            continue
    # Try simple regex extraction for DD/MM/YYYY or YYYY-MM-DD
    match = re.search(r'(\d{1,2})[/\.-](\d{1,2})[/\.-](\d{2,4})', cleaned)
    if match:
        d, m, y = match.groups()
        if len(y) == 2:
            y = "20" + y
        try:
            return date(int(y), int(m), int(d))
        except ValueError:
            pass
    return None

def validate_date_logic(
    issue_date_str: Optional[str],
    start_date_str: Optional[str],
    end_date_str: Optional[str],
    stated_duration_days: Optional[int] = None
) -> Tuple[bool, List[Dict[str, Any]], Optional[int]]:
    """
    Validates logical consistency between medical leave dates.
    Returns:
        (is_valid: bool, issues: List[dict], calculated_duration_days: Optional[int])
    """
    issues = []
    issue_d = parse_date_string(issue_date_str)
    start_d = parse_date_string(start_date_str)
    end_d = parse_date_string(end_date_str)
    
    calculated_days = None
    
    if not start_d and not end_d:
        issues.append({
            "check": "Date Extraction",
            "passed": False,
            "severity": "high",
            "explanation": "Leave start or end dates could not be parsed from document."
        })
        return False, issues, None
        
    if start_d and end_d:
        # Check start date after end date
        if start_d > end_d:
            issues.append({
                "check": "Chronological Sequence",
                "passed": False,
                "severity": "high",
                "explanation": f"Leave start date ({start_d}) occurs after leave end date ({end_d}). This is a chronological impossibility."
            })
        else:
            # Inclusive days
            calculated_days = (end_d - start_d).days + 1
            issues.append({
                "check": "Chronological Sequence",
                "passed": True,
                "severity": "info",
                "explanation": f"Chronological order valid: {start_d} to {end_d} ({calculated_days} days)."
            })
            
            # Check duration plausibility
            if calculated_days > 45:
                issues.append({
                    "check": "Duration Plausibility",
                    "passed": False,
                    "severity": "warning",
                    "explanation": f"Unusually prolonged outpatient medical leave ({calculated_days} days). Policy recommends secondary verification."
                })
            elif calculated_days <= 0:
                issues.append({
                    "check": "Duration Plausibility",
                    "passed": False,
                    "severity": "high",
                    "explanation": f"Computed leave duration is non-positive ({calculated_days} days)."
                })
            else:
                issues.append({
                    "check": "Duration Plausibility",
                    "passed": True,
                    "severity": "info",
                    "explanation": f"Leave duration of {calculated_days} days is within typical outpatient parameters."
                })
                
        # Compare calculated duration with stated duration if present
        if stated_duration_days is not None and calculated_days is not None:
            if stated_duration_days != calculated_days:
                issues.append({
                    "check": "Duration Statement Consistency",
                    "passed": False,
                    "severity": "warning",
                    "explanation": f"Stated leave duration ({stated_duration_days} days) does not match calendar difference ({calculated_days} days)."
                })
            else:
                issues.append({
                    "check": "Duration Statement Consistency",
                    "passed": True,
                    "severity": "info",
                    "explanation": "Stated duration precisely matches calendar interval."
                })
                
    # Check issue date relation to leave start
    if issue_d and start_d:
        delta_issue_start = (start_d - issue_d).days
        if delta_issue_start < -14:
            issues.append({
                "check": "Issue Date Latency",
                "passed": False,
                "severity": "warning",
                "explanation": f"Certificate was issued {abs(delta_issue_start)} days after medical leave commenced (retrospective certification)."
            })
        elif delta_issue_start > 30:
            issues.append({
                "check": "Issue Date Latency",
                "passed": False,
                "severity": "warning",
                "explanation": f"Certificate was issued {delta_issue_start} days prior to leave start date."
            })
            
    is_valid = not any(i["severity"] == "high" for i in issues)
    return is_valid, issues, calculated_days
