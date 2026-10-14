import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck2, 
  Upload, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Building, 
  User as UserIcon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Share2, 
  Download,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { CertificateVerificationResult } from '../types';

export const CertificateVerifyPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<CertificateVerificationResult | null>(null);
  const [isStudentPrecheck, setIsStudentPrecheck] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMsg(null);
      triggerAnalysis(file);
    }
  };

  const triggerAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/v1/verify/certificate/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Certificate analysis failed.');
      }

      const data: CertificateVerificationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during certificate verification.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Header breadcrumb & title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#68717D]">
          <Link to="/" className="hover:text-[#116B67]">Home</Link>
          <span>/</span>
          <span className="text-[#20252B]">Certificate Verification</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div>
            <h1 className="text-3xl font-extrabold text-[#20252B] tracking-tight font-display">
              Medical Certificate Integrity & Pre-Check
            </h1>
            <p className="text-sm text-[#68717D] mt-0.5">
              Structured OCR field extraction, date sequence consistency, and layout integrity checks for universities and clinics.
            </p>
          </div>

          {/* Student self-check toggle */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E8E6DF] text-xs font-semibold">
            <span className={isStudentPrecheck ? 'text-[#116B67]' : 'text-[#68717D]'}>
              Student Self-Check Mode
            </span>
            <input
              type="checkbox"
              checked={isStudentPrecheck}
              onChange={(e) => setIsStudentPrecheck(e.target.checked)}
              className="accent-[#116B67] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Safeguard Banner */}
      <div className="p-4 rounded-2xl bg-[#E6F3F2] border border-[#BCE3E0] flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-[#116B67] shrink-0 mt-0.5" />
        <div className="text-xs text-[#116B67] leading-relaxed">
          <strong>Mandatory Safeguard:</strong> TruthLens is a document-integrity assessment and human-review assistant, not an automated disciplinary decision system. Our platform <strong>never</strong> automatically rejects leave or labels a student dishonest. All consequential outcomes require authorized human review.
        </div>
      </div>

      {/* File Upload Zone */}
      <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF]">
        <div
          onClick={() => document.getElementById('cert-upload-input')?.click()}
          className="border-2 border-dashed border-[#D5D2C8] hover:border-[#116B67] hover:bg-[#FAF9F6] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
        >
          <input
            id="cert-upload-input"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-12 h-12 rounded-xl bg-[#EFEFFC] text-[#7663D8] flex items-center justify-center mb-3">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[#20252B]">
            {selectedFile ? selectedFile.name : "Upload Medical Certificate (PDF or Image)"}
          </p>
          <p className="text-xs text-[#68717D] mt-1 max-w-md">
            Upload PDF scan, JPEG, PNG, or WebP. Evaluates practitioner registration, dates, leave duration, and physical stamp presence.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-3 text-xs text-[#DC2626]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isAnalyzing && (
        <div className="card-elevation p-12 bg-white flex flex-col items-center justify-center text-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#7663D8] border-t-transparent animate-spin" />
          <h3 className="text-base font-bold text-[#20252B]">
            Extracting Physician Credentials & Validating Date Sequences...
          </h3>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && !isAnalyzing && (
        <div className="flex flex-col gap-8">
          
          {/* Executive Risk Category Card */}
          <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <VerdictBadge verdict={result.risk_category} size="lg" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF9F6] text-[#68717D] border border-[#E8E6DF]">
                  File: {result.file_name}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#20252B] font-display">
                {result.risk_category === 'Low apparent integrity risk' && "Standard Document Format & Valid Date Sequences"}
                {result.risk_category === 'Review recommended' && "Minor Inconsistencies Detected — Review Recommended"}
                {result.risk_category === 'High-priority human review' && "Critical Date or Identity Discrepancy — Requires Human Review"}
                {result.risk_category === 'Insufficient information' && "Document Unreadable or Missing Critical Fields"}
              </h2>
              <p className="text-xs text-[#68717D] max-w-2xl">
                Cryptographic hash: <code className="bg-[#FAF9F6] px-2 py-0.5 rounded-sm border border-[#E8E6DF]">{result.file_hash_sha256}</code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/dashboard/reports/${result.job_id}`}
                className="brand-gradient text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:opacity-95 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                Trust Report
              </Link>
              <a
                href={`/api/v1/reports/${result.job_id}/print-view`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#D5D2C8] text-[#20252B] hover:bg-[#FAF9F6] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Print Summary
              </a>
            </div>
          </div>

          {/* Structured Field Extractions Grid */}
          <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF]">
            <h3 className="text-base font-bold text-[#20252B] font-display mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#116B67]" />
              Structured OCR Field Extractions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF]">
                <div className="flex items-center gap-1.5 text-xs text-[#68717D] mb-1">
                  <UserIcon className="w-3.5 h-3.5 text-[#116B67]" />
                  <span>Physician Name</span>
                </div>
                <strong className="text-sm text-[#20252B] block truncate">
                  {result.doctor_name || <span className="text-amber-600 font-normal">Not detected</span>}
                </strong>
                <span className="text-[10px] text-[#8A92A0] block mt-1">
                  Reg: {result.registration_number || "Unspecified"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF]">
                <div className="flex items-center gap-1.5 text-xs text-[#68717D] mb-1">
                  <Building className="w-3.5 h-3.5 text-[#116B67]" />
                  <span>Hospital / Clinic</span>
                </div>
                <strong className="text-sm text-[#20252B] block truncate">
                  {result.hospital_name || <span className="text-amber-600 font-normal">Not detected</span>}
                </strong>
                <span className="text-[10px] text-[#8A92A0] block mt-1">
                  Registry: {result.registry_status}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF]">
                <div className="flex items-center gap-1.5 text-xs text-[#68717D] mb-1">
                  <UserIcon className="w-3.5 h-3.5 text-[#116B67]" />
                  <span>Patient Designated</span>
                </div>
                <strong className="text-sm text-[#20252B] block truncate">
                  {result.patient_name || <span className="text-amber-600 font-normal">Not detected</span>}
                </strong>
                <span className="text-[10px] text-[#8A92A0] block mt-1">
                  Issued: {result.issue_date || "Date unreadable"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6DF]">
                <div className="flex items-center gap-1.5 text-xs text-[#68717D] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#116B67]" />
                  <span>Medical Leave Period</span>
                </div>
                <strong className="text-sm text-[#20252B] block truncate">
                  {result.leave_start} → {result.leave_end}
                </strong>
                <span className="text-[10px] text-[#8A92A0] block mt-1">
                  Duration: {result.duration_days ?? 'Unknown'} days
                </span>
              </div>

            </div>

            {/* Stamp & Signature Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[#E8E6DF] text-xs">
              <div className="flex items-center gap-2">
                {result.signature_detected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-600" />
                )}
                <span>Signatory Pen Strokes: <strong>{result.signature_detected ? 'Detected' : 'Not Found'}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {result.stamp_detected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-[#68717D]" />
                )}
                <span>Colored Clinic Seal: <strong>{result.stamp_detected ? 'Present' : 'Not detected (standard for digital bills)'}</strong></span>
              </div>
            </div>
          </div>

          {/* Integrity Flags List */}
          <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF]">
            <h3 className="text-base font-bold text-[#20252B] font-display mb-4">
              Integrity Logic Checks ({result.integrity_flags.length})
            </h3>

            <div className="space-y-3">
              {result.integrity_flags.map((flag, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    !flag.passed && flag.severity === 'high'
                      ? 'bg-[#FEF2F2] border-[#FECACA]'
                      : !flag.passed && flag.severity === 'warning'
                      ? 'bg-[#FFFBEB] border-[#FDE68A]'
                      : 'bg-[#FAF9F6] border-[#E8E6DF]'
                  }`}
                >
                  {flag.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : flag.severity === 'high' ? (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-xs text-[#20252B] block">
                      {flag.check_name}
                    </span>
                    <span className="text-xs text-[#4B5563] mt-0.5 block leading-relaxed">
                      {flag.explanation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Review Actions */}
          <div className="card-elevation p-6 bg-[#FAF9F6] border border-[#E8E6DF]">
            <h4 className="font-bold text-sm text-[#20252B] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#116B67]" />
              Recommended Human Review Next Steps
            </h4>
            <ul className="space-y-1.5 text-xs text-[#4B5563] list-disc list-inside">
              {result.suggested_review_actions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};

export default CertificateVerifyPage;
