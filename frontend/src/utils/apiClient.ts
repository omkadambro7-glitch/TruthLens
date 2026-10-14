import { ImageVerificationResult, CertificateVerificationResult, ReviewCase } from '../types';

export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || '';
};

// Seeded realistic sample data for instant exploration & demo mode
export const SAMPLE_IMAGE_CASES: Record<string, Partial<ImageVerificationResult>> = {
  deepfake: {
    job_id: 'job-demo-deepfake-01',
    file_name: 'synthetic_portrait_gan_v4.png',
    file_hash_sha256: '9a84f331b26859eecb081190cf61311029eef27b2311893c8378614946d29947',
    verdict: 'LIKELY FAKE',
    confidence_score: 0.94,
    uncertainty_level: 'Low',
    summary_explanation: 'Strong periodic frequency artifacts in 2D FFT spectral profiling and significant bilateral facial landmark asymmetry indicate synthetic generative synthesis.',
    is_experimental: false,
    model_identifier: 'TruthLens-Spectra-v2.4',
    execution_time_ms: 182.4,
    created_at: new Date().toISOString(),
    disclaimer: 'Statistical forensic probability based on multi-signal frequency and compression analysis.',
    heatmap_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    evidence_breakdown: [
      {
        id: 'ev-1',
        signal_name: '2D FFT Spectral Profile',
        signal_score: 0.96,
        weight: 0.35,
        verdict_impact: 'supports_fake',
        description: 'Harmonic high-frequency checkerboard grid patterns characteristic of transposed convolutional upsamplers detected.'
      },
      {
        id: 'ev-2',
        signal_name: 'Facial Landmark & Iris Geometry',
        signal_score: 0.92,
        weight: 0.25,
        verdict_impact: 'supports_fake',
        description: 'Corneal specular highlight mismatch between left and right pupils indicates inconsistent virtual light vectors.'
      },
      {
        id: 'ev-3',
        signal_name: 'Error Level Analysis (ELA)',
        signal_score: 0.89,
        weight: 0.20,
        verdict_impact: 'supports_fake',
        description: 'DCT compression gradient delta exceeds 3.4 standard deviations between face perimeter and background canvas.'
      },
      {
        id: 'ev-4',
        signal_name: 'Noise Inconsistency Analysis',
        signal_score: 0.86,
        weight: 0.20,
        verdict_impact: 'supports_fake',
        description: 'Local sensor Poisson shot noise is unnaturally smoothed across skin surfaces compared to camera sensor baseline.'
      }
    ],
    metadata_observations: {
      generator_signature: 'Diffusion Model Artifact (Latent Upscaler)',
      color_space: 'sRGB',
      compression_quality: '96%'
    }
  },

  real: {
    job_id: 'job-demo-authentic-02',
    file_name: 'camera_raw_portrait_fuji_x100v.jpg',
    file_hash_sha256: '4f8b229a73810ec5418b3345892c90f283d88195a63901bce987251fa7c41940',
    verdict: 'LIKELY REAL',
    confidence_score: 0.91,
    uncertainty_level: 'Low',
    summary_explanation: 'Coherent optical sensor shot noise, natural corneal light reflections, and absence of spectral generator artifacts support camera capture authenticity.',
    is_experimental: false,
    model_identifier: 'TruthLens-Spectra-v2.4',
    execution_time_ms: 145.2,
    created_at: new Date().toISOString(),
    disclaimer: 'Statistical forensic probability based on multi-signal frequency and compression analysis.',
    heatmap_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    evidence_breakdown: [
      {
        id: 'ev-real-1',
        signal_name: '2D FFT Spectral Profile',
        signal_score: 0.08,
        weight: 0.35,
        verdict_impact: 'supports_real',
        description: 'Natural power law falloff (1/f) observed without unnatural periodic peaks or lattice anomalies.'
      },
      {
        id: 'ev-real-2',
        signal_name: 'Facial Landmark & Iris Geometry',
        signal_score: 0.12,
        weight: 0.25,
        verdict_impact: 'supports_real',
        description: 'Physiologically consistent pupillary contour and matching reflection vectors from unified ambient lighting.'
      },
      {
        id: 'ev-real-3',
        signal_name: 'Error Level Analysis (ELA)',
        signal_score: 0.14,
        weight: 0.20,
        verdict_impact: 'supports_real',
        description: 'Uniform error decay across 8x8 DCT boundary blocks without local splicing variations.'
      },
      {
        id: 'ev-real-4',
        signal_name: 'Noise Inconsistency Analysis',
        signal_score: 0.11,
        weight: 0.20,
        verdict_impact: 'supports_real',
        description: 'Continuous ISO 400 Poisson-Gaussian camera sensor noise distribution across all quadrants.'
      }
    ],
    metadata_observations: {
      camera_model: 'Fujifilm X100V',
      focal_length: '23mm (35mm equiv)',
      exposure_time: '1/250s at f/2.8, ISO 400'
    }
  },

  compressed: {
    job_id: 'job-demo-review-03',
    file_name: 'whatsapp_shared_compression_borderline.jpg',
    file_hash_sha256: '7c320d91a938c8234be812046522c19e58841028445199859ecaa30485918231',
    verdict: 'NEEDS HUMAN REVIEW',
    confidence_score: 0.52,
    uncertainty_level: 'High',
    summary_explanation: 'Severe repeated social media re-compression (Q<65) obfuscates fine sensor noise and FFT spectral patterns. TruthLens abstains from declaring a binary verdict to avoid false accusations.',
    is_experimental: false,
    model_identifier: 'TruthLens-Spectra-v2.4',
    execution_time_ms: 168.0,
    created_at: new Date().toISOString(),
    disclaimer: 'Abstention Zone Activated: Score falls within 33%–67% corridor. Requires human reviewer inspection.',
    heatmap_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    evidence_breakdown: [
      {
        id: 'ev-rev-1',
        signal_name: 'Error Level Analysis (ELA)',
        signal_score: 0.55,
        weight: 0.35,
        verdict_impact: 'inconclusive',
        description: 'Severe double-JPEG blocking artifacts across all color channels. Splicing indicators masked by re-quantization.'
      },
      {
        id: 'ev-rev-2',
        signal_name: '2D FFT Spectral Profile',
        signal_score: 0.48,
        weight: 0.35,
        verdict_impact: 'inconclusive',
        description: 'High frequency cutoff at 0.6 Nyquist prevents reliable discriminator feature extraction.'
      },
      {
        id: 'ev-rev-3',
        signal_name: 'Facial Landmark & Iris Geometry',
        signal_score: 0.51,
        weight: 0.30,
        verdict_impact: 'inconclusive',
        description: 'Pupillary edge blur exceeds calibrated tolerance threshold for automated corneal reflection profiling.'
      }
    ],
    metadata_observations: {
      compression_quality: 'Estimated 58%',
      quantization_matrix: 'Standard WhatsApp Mobile Recompression Table'
    }
  }
};

export const SAMPLE_CERTIFICATE_CASES: Record<string, CertificateVerificationResult> = {
  latency: {
    job_id: 'cert-demo-latency-01',
    file_name: 'Medical_Certificate_Malhotra_Oct26.pdf',
    file_hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    risk_category: 'Review recommended',
    requires_human_review: true,
    doctor_name: 'Dr. Rajesh Sharma, MD (Internal Medicine)',
    registration_number: 'MCI-MH-48291',
    hospital_name: 'Apex Memorial Multi-Specialty Hospital',
    patient_name: 'Karan Malhotra',
    issue_date: '14/10/2026',
    leave_start: '10/10/2026',
    leave_end: '18/10/2026',
    duration_days: 8,
    signature_detected: true,
    stamp_detected: true,
    ocr_confidence: '96.4%',
    raw_ocr_snippet: 'This is to certify that Karan Malhotra has been under my medical care from 10/10/2026 to 18/10/2026. Advised bed rest for acute gastroenteritis.',
    registry_status: 'Active practitioner in Maharashtra Medical Council directory',
    created_at: new Date().toISOString(),
    case_id: 'CASE-NMU-2026-084',
    mandatory_safeguard_notice: 'TruthLens is an integrity pre-check assistant, never an automated disciplinary decision tool. Leave is never automatically rejected. Requires authorized human assessment.',
    integrity_flags: [
      {
        check_name: 'Date Logic: Issue Date Latency',
        severity: 'warning',
        passed: false,
        explanation: 'Certificate was issued 4 days after the stated medical leave commenced (retrospective visit).'
      },
      {
        check_name: 'Physician Identification',
        severity: 'info',
        passed: true,
        explanation: 'Dr. Rajesh Sharma, MD identified with matching council registry record.'
      },
      {
        check_name: 'Endorsement Stamp & Signature',
        severity: 'info',
        passed: true,
        explanation: 'Physical wet-ink stroke variations and hospital rubber stamp contour detected.'
      }
    ],
    suggested_review_actions: [
      'Contact clinic registry desk to confirm outpatient entry for 14/10/2026',
      'Request student upload clinic fee receipt or prescription slip',
      'Non-punitive inquiry: Offer student opportunity to submit supporting documentation'
    ]
  },

  authentic: {
    job_id: 'cert-demo-auth-02',
    file_name: 'St_Jude_Outpatient_Clearance_2026.pdf',
    file_hash_sha256: '88a319401bf28490a19488102c40182810a01294850128491028301928401923',
    risk_category: 'Low apparent integrity risk',
    requires_human_review: false,
    doctor_name: 'Dr. Priya Desai, MBBS, MS',
    registration_number: 'MMC-2015-88192',
    hospital_name: 'St. Jude Metropolitan Health Center',
    patient_name: 'Ananya Verma',
    issue_date: '12/10/2026',
    leave_start: '12/10/2026',
    leave_end: '15/10/2026',
    duration_days: 3,
    signature_detected: true,
    stamp_detected: true,
    ocr_confidence: '99.1%',
    raw_ocr_snippet: 'Certified that Ms. Ananya Verma attended clinic on 12/10/2026 suffering from acute viral pyrexia. Unfit for academic work 12/10/2026 to 15/10/2026 inclusive.',
    registry_status: 'Verified active registration with National Medical Commission',
    created_at: new Date().toISOString(),
    case_id: 'CASE-NMU-2026-085',
    mandatory_safeguard_notice: 'Document integrity pre-check passed. Clear chronological alignment.',
    integrity_flags: [
      {
        check_name: 'Chronological Sequence Alignment',
        severity: 'info',
        passed: true,
        explanation: 'Issue date matches leave start date precisely. No latency flags.'
      },
      {
        check_name: 'Hospital Credentials Verification',
        severity: 'info',
        passed: true,
        explanation: 'Official letterhead font alignment, registration number format valid.'
      },
      {
        check_name: 'Ink Stroke Ballpoint Detection',
        severity: 'info',
        passed: true,
        explanation: 'Natural pressure gradations and micro-feathering confirmed on signature.'
      }
    ],
    suggested_review_actions: [
      'Direct approval eligible under university routine illness policy (<= 3 days)'
    ]
  },

  missing: {
    job_id: 'cert-demo-missing-03',
    file_name: 'Community_Clinic_Slip_Unregistered.pdf',
    file_hash_sha256: '55b0a19491823019840192840192840192840192840192840192840192840192',
    risk_category: 'High-priority human review',
    requires_human_review: true,
    doctor_name: 'Dr. R. K. Gupta',
    registration_number: 'NOT PROVIDED',
    hospital_name: 'City Care Dispensary',
    patient_name: 'Rahul Nair',
    issue_date: '08/10/2026',
    leave_start: '01/10/2026',
    leave_end: '14/10/2026',
    duration_days: 14,
    signature_detected: true,
    stamp_detected: false,
    ocr_confidence: '91.8%',
    raw_ocr_snippet: 'Medical rest certificate for Rahul Nair for 14 days due to back ache.',
    registry_status: 'Unable to verify: Medical Council registration number missing from letterhead',
    created_at: new Date().toISOString(),
    case_id: 'CASE-NMU-2026-086',
    mandatory_safeguard_notice: 'Deficiencies in documentation noted. In accordance with student welfare guidelines, request formal clarification without disciplinary prejudice.',
    integrity_flags: [
      {
        check_name: 'Physician Registration Number',
        severity: 'high',
        passed: false,
        explanation: 'Mandatory Medical Council registration number is missing from document header.'
      },
      {
        check_name: 'Physical Clinic Stamp',
        severity: 'warning',
        passed: false,
        explanation: 'No institutional rubber stamp or seal detected on certificate.'
      },
      {
        check_name: 'Duration & Date Latency',
        severity: 'warning',
        passed: false,
        explanation: 'Certificate issued 7 days post-hoc for extended 14-day absence.'
      }
    ],
    suggested_review_actions: [
      'Send student standard form request for physician registration number',
      'Do not penalize attendance pending verification response window (7 business days)'
    ]
  }
};

export const SAMPLE_REVIEW_CASES: ReviewCase[] = [
  {
    id: 'case-01',
    certificate_id: 'cert-demo-latency-01',
    patient_name: 'Karan Malhotra',
    hospital_name: 'Apex Memorial Multi-Specialty Hospital',
    doctor_name: 'Dr. Rajesh Sharma, MD',
    risk_category: 'Review recommended',
    status: 'pending',
    priority: 'normal',
    reviewer_notes: 'Awaiting student confirmation regarding date sequence latency before mid-semester exams.',
    created_at: '2026-10-14T10:15:00Z'
  },
  {
    id: 'case-02',
    certificate_id: 'cert-demo-auth-02',
    patient_name: 'Ananya Verma',
    hospital_name: 'St. Jude Metropolitan Health Center',
    doctor_name: 'Dr. Priya Desai, MBBS, MS',
    risk_category: 'Low apparent integrity risk',
    status: 'resolved',
    priority: 'normal',
    decision: 'Approved: 3-day absence under standard viral pyrexia clearance guidelines.',
    reviewer_notes: 'Verified clinic credentials with registry. Full compliance.',
    created_at: '2026-10-13T14:20:00Z',
    resolution_date: '2026-10-13T16:00:00Z'
  },
  {
    id: 'case-03',
    certificate_id: 'cert-demo-missing-03',
    patient_name: 'Rahul Nair',
    hospital_name: 'City Care Dispensary',
    doctor_name: 'Dr. R. K. Gupta',
    risk_category: 'High-priority human review',
    status: 'escalated',
    priority: 'high',
    reviewer_notes: 'Physician registration number missing and retroactive 14-day duration. Sent clarification email to student.',
    created_at: '2026-10-12T09:45:00Z'
  },
  {
    id: 'case-04',
    certificate_id: 'cert-demo-04',
    patient_name: 'Simran Gill',
    hospital_name: 'Fortis Healthcare Academic Unit',
    doctor_name: 'Dr. Arvind Singhania, MD',
    risk_category: 'Low apparent integrity risk',
    status: 'resolved',
    priority: 'normal',
    decision: 'Approved: Orthopedic evaluation for fractured metacarpal.',
    reviewer_notes: 'Physical stamp and radiological referral attached.',
    created_at: '2026-10-11T11:30:00Z',
    resolution_date: '2026-10-11T15:10:00Z'
  }
];
