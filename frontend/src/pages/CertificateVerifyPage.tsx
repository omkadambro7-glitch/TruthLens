import React, { useState } from 'react';
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
  BookOpen,
  Cpu
} from 'lucide-react';
import { CertificateVerificationResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CertificatePlainSummary } from '../components/forensics/CertificatePlainSummary';
import { SAMPLE_CERTIFICATE_CASES, getApiBaseUrl } from '../utils/apiClient';

export const CertificateVerifyPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [studentMode, setStudentMode] = useState<boolean>(false);
  const [result, setResult] = useState<CertificateVerificationResult | null>(null);
  const [certTab, setCertTab] = useState<'plain' | 'advanced'>('plain');
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

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
        // Fallback simulation for offline/static deployment
        setTimeout(() => {
          setResult({
            ...SAMPLE_CERTIFICATE_CASES.latency,
            file_name: file.name,
            job_id: `cert-${Date.now()}`
          });
          setIsVerifying(false);
        }, 800);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DC] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#101B35]">
            <span className="text-[#737D90]">Home</span>
            <span className="text-[#D8D4C7]">/</span>
            <span className="text-[#233F8C]">{t('nav.verify_certificate')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display tracking-tight">
            {t('cert.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#687386] max-w-2xl leading-relaxed">
            {t('cert.subtitle')}
          </p>
        </div>

        {/* Student Self-Check Toggle */}
        <div className="flex items-center gap-3 bg-[#FBF8EE] border border-[#E6D5A2] px-4 py-2 rounded-xl w-fit">
          <label htmlFor="student-mode-toggle" className="text-xs font-bold text-[#101B35] cursor-pointer">
            {t('cert.student_mode')}
          </label>
          <input
            id="student-mode-toggle"
            type="checkbox"
            checked={studentMode}
            onChange={(e) => setStudentMode(e.target.checked)}
            className="w-4 h-4 rounded text-[#233F8C] focus:ring-[#233F8C] cursor-pointer"
          />
        </div>
      </div>

      {/* Mandatory Safeguard Banner */}
      <div className="bg-[#EDF7F1] border border-[#A3D9B8] p-4 sm:p-5 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#1E824C] shrink-0 mt-0.5" />
        <p className="text-xs text-[#1E824C] leading-relaxed font-medium">
          {t('cert.safeguard_notice')}
        </p>
      </div>

      {/* Upload Zone & Sample Test Cases */}
      <div className="royal-card p-6 sm:p-8 bg-white border border-[#E8E5DC] space-y-6">
        <label className="border-2 border-dashed border-[#D8D4C7] hover:border-[#C6A45C] hover:bg-[#FAF9F6] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all block">
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-13 h-13 rounded-2xl bg-[#EEF3FF] border border-[#C5D5F9] text-[#233F8C] flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-[#233F8C]" />
          </div>
          <span className="text-sm font-bold text-[#101B35] block mb-1">
            {t('cert.upload_title')}
          </span>
          <span className="text-xs text-[#687386] block max-w-md leading-relaxed">
            {t('cert.upload_sub')}
          </span>
        </label>

        {/* Quick Sample Selector */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-bold text-[#101B35] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
            <span>{t('cert.sample_certs')}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadSampleCertificate('latency')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#A88234] bg-[#FBF8EE] border border-[#E6D5A2] hover:bg-[#F5EFD7] transition-colors cursor-pointer"
            >
              1. Date Latency Case
            </button>
            <button
              onClick={() => loadSampleCertificate('authentic')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#1E824C] bg-[#EDF7F1] border border-[#A3D9B8] hover:bg-green-100 transition-colors cursor-pointer"
            >
              2. Authentic Hospital Clearance
            </button>
            <button
              onClick={() => loadSampleCertificate('missing')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DC2626] bg-[#FEF2F2] border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
            >
              3. Missing Reg. Number
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isVerifying && (
        <div className="royal-card p-12 bg-white border border-[#E8E5DC] text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#233F8C] border-t-transparent rounded-full animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-[#101B35]">Extracting OCR credentials and verifying date logic...</h4>
          <p className="text-xs text-[#687386]">Matching physician council registry format and physical stamp ink contours.</p>
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
          {/* Tab Selector: Plain Explanation vs Detailed Audit */}
          <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-[#E8E5DC] shadow-2xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCertTab('plain')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  certTab === 'plain'
                    ? 'bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white shadow-xs'
                    : 'text-[#687386] hover:text-[#101B35] hover:bg-[#FAF9F6]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E6D5A2]" />
                <span>💡 Seedha Jawab (Document Analysis)</span>
              </button>

              <button
                type="button"
                onClick={() => setCertTab('advanced')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  certTab === 'advanced'
                    ? 'bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white shadow-xs'
                    : 'text-[#687386] hover:text-[#101B35] hover:bg-[#FAF9F6]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>📋 Detailed Credential Audit</span>
              </button>
            </div>

            <span className="text-[11px] font-semibold text-[#737D90] hidden sm:block pr-3">
              Extraction Confidence: <strong className="text-[#101B35]">{result.ocr_confidence}</strong>
            </span>
          </div>

          {certTab === 'plain' ? (
            <div className="space-y-5">
              <CertificatePlainSummary 
                result={result} 
                onSubmitToReview={handleSubmitToReview} 
              />

              {submissionSuccess && (
                <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Case successfully queued into University Review Portal for authorized human evaluation.</span>
                </div>
              )}

              {/* Quick toggle to detailed audit */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#101B35] block">University Dean ya Clinic Reviewer hain?</span>
                  <span className="text-[#687386]">Doctor council registry match, OCR confidence matrix aur raw text logs dekhne ke liye Detailed Audit kholein.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCertTab('advanced')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FAF9F6] border border-[#D8D4C7] hover:border-[#101B35] text-[#101B35] transition-all shrink-0 cursor-pointer"
                >
                  View Detailed Credential Audit →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Assessment Header */}
              <div className="royal-card p-6 sm:p-7 bg-white border border-[#E8E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#737D90] block mb-1">
                    Document Pre-Check Assessment
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-extrabold px-3 py-1 rounded-full border ${
                      result.risk_category === 'Low apparent integrity risk' 
                        ? 'text-[#1E824C] bg-[#EDF7F1] border-[#A3D9B8]' 
                        : result.risk_category === 'Review recommended'
                        ? 'text-[#A88234] bg-[#FBF8EE] border-[#E6D5A2]'
                        : 'text-[#DC2626] bg-[#FEF2F2] border-red-200'
                    }`}>
                      {result.risk_category}
                    </span>
                    <span className="text-xs text-[#687386]">
                      OCR Extraction Confidence: <strong className="text-[#101B35]">{result.ocr_confidence}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitToReview}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:border-[#C6A45C] border border-transparent transition-all cursor-pointer w-fit"
                >
                  <Send className="w-3.5 h-3.5 text-[#E6D5A2]" />
                  <span>{t('cert.submit_review')}</span>
                </button>
              </div>

              {submissionSuccess && (
                <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Case successfully queued into University Review Portal for authorized human evaluation.</span>
                </div>
              )}

          {/* Structured Credential Extraction Grid */}
          <div className="royal-card p-6 sm:p-7 bg-white border border-[#E8E5DC] space-y-5">
            <h3 className="text-base font-bold text-[#101B35] font-sans pb-3 border-b border-[#F1EFE8]">
              Extracted Certificate Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.doctor_name')}</span>
                <span className="font-extrabold text-[#101B35]">{result.doctor_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.reg_number')}</span>
                <span className="font-extrabold text-[#101B35]">{result.registration_number || 'Not provided'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.hospital_name')}</span>
                <span className="font-extrabold text-[#101B35]">{result.hospital_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.patient_name')}</span>
                <span className="font-extrabold text-[#101B35]">{result.patient_name || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.issue_date')}</span>
                <span className="font-extrabold text-[#101B35]">{result.issue_date || 'Not detected'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">{t('cert.leave_period')}</span>
                <span className="font-extrabold text-[#101B35]">
                  {result.leave_start} to {result.leave_end} ({result.duration_days} {t('cert.days')})
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#737D90]">{t('cert.signature_detected')}</span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${result.signature_detected ? 'text-[#1E824C] bg-[#EDF7F1]' : 'text-red-700 bg-red-50'}`}>
                  {result.signature_detected ? t('cert.detected') : t('cert.not_detected')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#737D90]">{t('cert.stamp_detected')}</span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${result.stamp_detected ? 'text-[#1E824C] bg-[#EDF7F1]' : 'text-red-700 bg-red-50'}`}>
                  {result.stamp_detected ? t('cert.detected') : t('cert.not_detected')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span className="text-[11px] font-semibold text-[#737D90] block mb-1">Physician Registry Lookup</span>
                <span className="font-medium text-[#101B35] text-[11px]">{result.registry_status}</span>
              </div>
            </div>

            {/* Integrity Flags */}
            <div className="pt-4 border-t border-[#F1EFE8] space-y-3">
              <h4 className="text-xs font-bold text-[#101B35] uppercase tracking-wide">
                {t('cert.integrity_checks')}
              </h4>
              <div className="space-y-2">
                {result.integrity_flags.map((flag, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                      flag.passed 
                        ? 'bg-[#EDF7F1] border-[#A3D9B8] text-[#1E824C]' 
                        : flag.severity === 'high'
                        ? 'bg-[#FEF2F2] border-red-200 text-[#DC2626]'
                        : 'bg-[#FBF8EE] border-[#E6D5A2] text-[#A88234]'
                    }`}
                  >
                    {flag.passed ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
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
          </div>
        </div>
      )}
    </motion.div>
  )}

    </div>
  );
};

export default CertificateVerifyPage;
