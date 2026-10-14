export type VerdictType = 'LIKELY REAL' | 'LIKELY FAKE' | 'NEEDS HUMAN REVIEW';
export type UncertaintyType = 'Low' | 'Moderate' | 'High';
export type RiskCategoryType = 
  | 'Low apparent integrity risk'
  | 'Review recommended'
  | 'High-priority human review'
  | 'Insufficient information';

export interface EvidenceItem {
  id: string;
  signal_name: string;
  signal_score: number;
  weight: number;
  verdict_impact: 'supports_fake' | 'supports_real' | 'inconclusive';
  description: string;
  details?: Record<string, any>;
}

export interface ImageVerificationResult {
  job_id: string;
  file_name: string;
  file_hash_sha256: string;
  verdict: VerdictType;
  confidence_score: number;
  uncertainty_level: UncertaintyType;
  summary_explanation: string;
  is_experimental: boolean;
  model_identifier: string;
  evidence_breakdown: EvidenceItem[];
  metadata_observations: Record<string, any>;
  face_analysis_results?: Record<string, any>;
  heatmap_url?: string;
  execution_time_ms: number;
  created_at: string;
  disclaimer: string;
}

export interface IntegrityFlag {
  check_name: string;
  severity: 'info' | 'warning' | 'high';
  passed: boolean;
  explanation: string;
}

export interface CertificateVerificationResult {
  job_id: string;
  file_name: string;
  file_hash_sha256: string;
  risk_category: RiskCategoryType;
  requires_human_review: boolean;
  doctor_name?: string;
  registration_number?: string;
  hospital_name?: string;
  patient_name?: string;
  issue_date?: string;
  leave_start?: string;
  leave_end?: string;
  duration_days?: number;
  signature_detected: boolean;
  stamp_detected: boolean;
  ocr_confidence: string;
  raw_ocr_snippet?: string;
  registry_status: string;
  integrity_flags: IntegrityFlag[];
  suggested_review_actions: string[];
  case_id?: string;
  created_at: string;
  mandatory_safeguard_notice: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'individual' | 'student' | 'reviewer' | 'admin';
  organization_id?: string;
}

export interface ReviewCase {
  id: string;
  certificate_id: string;
  patient_name?: string;
  hospital_name?: string;
  doctor_name?: string;
  risk_category: RiskCategoryType;
  status: 'pending' | 'under_review' | 'resolved' | 'escalated';
  priority: 'normal' | 'high';
  decision?: string;
  reviewer_notes?: string;
  created_at: string;
  resolution_date?: string;
}
