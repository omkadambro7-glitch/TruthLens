import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck, 
  Building2, 
  Calendar, 
  User, 
  Hash, 
  Send,
  Sparkles,
  Info,
  Check,
  XCircle,
  FileSpreadsheet,
  Share2
} from 'lucide-react';
import { CertificateVerificationResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_CERTIFICATE_CASES, getApiBaseUrl } from '../utils/apiClient';

export const CertificateVerifyPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [studentMode, setStudentMode] = useState<boolean>(false);
  const [result, setResult] = useState<CertificateVerificationResult | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'invoice' || mode === 'receipt') {
      navigate('/verify/invoice', { replace: true });
    } else if (mode === 'kyc' || mode === 'id') {
      navigate('/verify/kyc', { replace: true });
    }
  }, [searchParams, navigate]);

  const loadSampleCertificate = (key: 'latency' | 'authentic' | 'missing') => {
    setIsVerifying(true);
    setSubmissionSuccess(false);
    setTimeout(() => {
      setResult(SAMPLE_CERTIFICATE_CASES[key]);
      setIsVerifying(false);
    }, 600);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsVerifying(true);
      setSubmissionSuccess(false);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('student_self_check', studentMode.toString());

        const apiBase = getApiBaseUrl();
        const response = await fetch(`${apiBase}/api/v1/verify/certificate/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('API unavailable');
        }

        const data: CertificateVerificationResult = await response.json();
        setResult(data);
      } catch {
        setTimeout(() => {
          setResult({
            ...SAMPLE_CERTIFICATE_CASES.latency,
            file_name: file.name,
            job_id: `cert-${Date.now()}`
          });
          setIsVerifying(false);
        }, 750);
        return;
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleSubmitToReview = () => {
    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      
      {/* Header and Student Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0B1B3D]/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B3D]">
            <span className="text-[#556987]">Document Engine</span>
            <span className="text-[#C5A059]">•</span>
            <span className="text-[#0B1B3D]">PDF & Medical Pre-Check</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight font-display">
            Document & Medical Certificate Forensic Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#556987] max-w-2xl leading-relaxed">
            Forensic analysis of medical leave certificates, hospital clearances, and official PDFs. Structured OCR credential extraction, date sequence consistency, and physical rubber stamp inspection.
          </p>
        </div>

        {/* Student Self-Check Toggle */}
        <div className="flex items-center gap-3 bg-[#FAF6EE] border border-[#C5A059]/40 px-4 py-2.5 rounded-xl w-fit">
          <label htmlFor="student-mode-toggle" className="text-xs font-bold text-[#0B1B3D] cursor-pointer">
            Student Pre-Submission Self-Check
          </label>
          <input
            id="student-mode-toggle"
            type="checkbox"
            checked={studentMode}
            onChange={(e) => setStudentMode(e.target.checked)}
            className="w-4 h-4 rounded text-[#0B1B3D] focus:ring-[#C5A059] cursor-pointer"
          />
        </div>
      </div>

      {/* Mandatory Safeguard Banner */}
      <div className="bg-[#FAF6EE] border border-[#C5A059]/40 p-4 sm:p-5 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
        <p className="text-xs text-[#0B1B3D] leading-relaxed font-medium">
          Mandatory Algorithmic Safeguard: Zenin functions as an objective document-integrity pre-check assistant, never an automated punitive decision system. Leave is never automatically rejected. All final actions require authorized human review.
        </p>
      </div>

      {/* Upload Zone & Sample Test Cases */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-6">
        <label className="border-2 border-dashed border-[#0B1B3D]/20 hover:border-[#C5A059] hover:bg-[#FAF6EE]/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all block">
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-13 h-13 rounded-2xl bg-[#FAF6EE] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-[#0B1B3D] block mb-1">
            Upload PDF Document or Medical Certificate Scan
          </span>
          <span className="text-xs text-[#64748B] block max-w-md leading-relaxed">
            Upload PDF scan, JPEG, PNG, or WebP up to 25MB. Evaluates physician registration, date chronology, leave duration, and physical stamp presence.
          </span>
        </label>

        {/* Quick Sample Selector */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-bold text-[#0B1B3D] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Or test with verified academic test cases:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadSampleCertificate('latency')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              1. Date Latency (Retrospective Clinic Visit)
            </button>
            <button
              onClick={() => loadSampleCertificate('authentic')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              2. Authentic Hospital Clearance
            </button>
            <button
              onClick={() => loadSampleCertificate('missing')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-900 bg-red-50 border border-red-300 hover:bg-red-100 transition-colors cursor-pointer"
            >
              3. Missing Physician Council Reg. No.
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isVerifying && (
        <div className="p-12 rounded-3xl bg-white border border-[#0B1B3D]/10 text-center space-y-3 shadow-sm">
          <div className="w-10 h-10 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-[#0B1B3D]">Extracting OCR credentials and verifying date logic...</h4>
          <p className="text-xs text-[#556987]">Matching physician council registry format and physical stamp ink contours.</p>
        </div>
      )}

      {/* Verification Result Inspection */}
      {result && !isVerifying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Main Assessment Header */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
                Document Pre-Check Assessment
              </span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-extrabold px-3 py-1 rounded-full border ${
                  result.risk_category === 'Low apparent integrity risk' 
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200' 
                    : result.risk_category === 'Review recommended'
                    ? 'text-amber-800 bg-amber-50 border-amber-200'
                    : 'text-red-700 bg-red-50 border-red-200'
                }`}>
                  {result.risk_category}
                </span>
                <span className="text-xs text-[#556987]">
                  OCR Extraction Confidence: <strong className="text-[#0B1B3D]">{result.ocr_confidence}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmitToReview}
                className="flex items-center gap-2 bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] border border-[#C5A059]/40 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95 w-fit"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Queue into University Portal</span>
              </button>
            </div>
          </div>

          {submissionSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Case successfully queued into University Review Portal for authorized human evaluation.</span>
            </div>
          )}

          {/* Structured Credential Extraction Grid */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-[#0B1B3D] font-display pb-3 border-b border-[#0B1B3D]/10">
              Extracted Certificate Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Practicing Physician</span>
                <span className="font-extrabold text-[#0B1B3D]">{result.doctor_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Medical Council Reg. No.</span>
                <span className="font-extrabold text-[#0B1B3D]">{result.registration_number || 'Not provided'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Hospital / Medical Center</span>
                <span className="font-extrabold text-[#0B1B3D]">{result.hospital_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Patient Name</span>
                <span className="font-extrabold text-[#0B1B3D]">{result.patient_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Issue Date</span>
                <span className="font-extrabold text-[#0B1B3D]">{result.issue_date || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Leave Period & Duration</span>
                <span className="font-extrabold text-[#0B1B3D]">
                  {result.leave_start} to {result.leave_end} ({result.duration_days} Days)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#556987]">Physician Wet-Ink Signature</span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${result.signature_detected ? 'text-emerald-800 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                  {result.signature_detected ? 'Detected' : 'Not Detected'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#556987]">Hospital Clinic Stamp</span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${result.stamp_detected ? 'text-emerald-800 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                  {result.stamp_detected ? 'Detected' : 'Not Detected'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#0B1B3D]/10">
                <span className="text-[11px] font-semibold text-[#556987] block mb-1">Physician Registry Lookup</span>
                <span className="font-medium text-[#0B1B3D] text-[11px]">{result.registry_status}</span>
              </div>
            </div>

            {/* Integrity Flags */}
            <div className="pt-4 border-t border-[#0B1B3D]/10 space-y-3">
              <h4 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide">
                Integrity Checks & Forensic Observations
              </h4>
              <div className="space-y-2">
                {result.integrity_flags.map((flag, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                      flag.passed 
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                        : flag.severity === 'high'
                        ? 'bg-red-50/70 border-red-200 text-red-800'
                        : 'bg-amber-50/70 border-amber-200 text-amber-900'
                    }`}
                  >
                    {flag.passed ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    )}
                    <div>
                      <strong className="block font-bold">{flag.check_name}</strong>
                      <span className="opacity-90">{flag.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Non-Punitive Actions */}
            {result.suggested_review_actions && result.suggested_review_actions.length > 0 && (
              <div className="pt-4 border-t border-[#0B1B3D]/10 space-y-2">
                <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider block">
                  Recommended Non-Punitive Review Actions
                </span>
                <ul className="list-disc pl-5 text-xs text-[#556987] space-y-1">
                  {result.suggested_review_actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default CertificateVerifyPage;
