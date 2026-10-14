import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Share2, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  Clock, 
  Hash, 
  AlertCircle, 
  Lock,
  Layers
} from 'lucide-react';
import { VerdictBadge } from '../components/ui/VerdictBadge';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [revoked, setRevoked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/v1/reports/${id}`)
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Report not found.');
        }
        return res.json();
      })
      .then(data => {
        setReport(data);
        setRevoked(data.is_revoked);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [id]);

  const copyShareLink = () => {
    if (!report) return;
    const shareUrl = `${window.location.origin}/dashboard/reports/${report.report_id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRevoke = async () => {
    if (!report) return;
    if (window.confirm("Revoking this report immediately invalidates public access. Are you sure?")) {
      try {
        const res = await fetch(`/api/v1/reports/${report.report_id}/revoke`, { method: 'POST' });
        if (res.ok) {
          setRevoked(true);
        }
      } catch (e) {}
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#116B67] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#68717D]">Fetching cryptographically sealed Trust Report...</p>
      </div>
    );
  }

  if (errorMsg || !report) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#20252B]">Trust Report Unavailable</h2>
        <p className="text-xs text-[#68717D]">{errorMsg || "The requested verification report does not exist or has expired."}</p>
        <Link to="/" className="inline-block mt-4 text-xs font-bold text-[#116B67] hover:underline">
          Return to TruthLens Home →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex flex-col gap-8 text-left">
      
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6DF]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#116B67] block">
            Cryptographically Sealed Verification Report
          </span>
          <h1 className="text-2xl font-bold text-[#20252B] font-display mt-0.5">
            Report {report.report_id}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {!revoked && (
            <button
              onClick={copyShareLink}
              className="bg-white border border-[#D5D2C8] text-[#20252B] hover:bg-[#FAF9F6] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#116B67]" />
                  <span>Share Link</span>
                </>
              )}
            </button>
          )}

          <a
            href={`/api/v1/reports/${report.report_id}/print-view`}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:opacity-95 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>

          {!revoked && (
            <button
              onClick={handleRevoke}
              className="text-xs text-[#DC2626] hover:bg-red-50 p-2 rounded-xl border border-transparent hover:border-red-200"
              title="Revoke Share Link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {revoked && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>This share link was revoked by the authorized creator and is no longer publicly verifiable.</span>
        </div>
      )}

      {/* Main Report Document Card */}
      <div className="card-elevation p-8 bg-white border border-[#E8E6DF] space-y-6">
        
        {/* Verdict Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E6DF]">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#68717D] tracking-wider block mb-1">
              Analysis Conclusion
            </span>
            <VerdictBadge verdict={report.verdict_or_risk} size="lg" />
          </div>

          <div className="text-xs text-[#68717D] space-y-1 sm:text-right">
            <div>Confidence: <strong>{report.confidence_or_category}</strong></div>
            <div>Generated: {new Date(report.created_at).toUTCString()}</div>
          </div>
        </div>

        {/* Target Metadata Box */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E6DF] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#68717D]">Artifact Filename:</span>
            <strong className="text-[#20252B]">{report.file_name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#68717D]">Analysis Classification:</span>
            <strong className="text-[#20252B] capitalize">{report.job_type} Forensics</strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 pt-1 border-t border-[#E8E6DF]">
            <span className="text-[#68717D]">Cryptographic SHA-256:</span>
            <span className="font-mono text-[11px] text-[#20252B] break-all">{report.file_hash_sha256}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h3 className="text-sm font-bold text-[#20252B] font-display mb-2">
            Forensic Findings Summary
          </h3>
          <p className="text-xs text-[#374151] leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E6DF]">
            {report.summary}
          </p>
        </div>

        {/* Cryptographic Tamper-Evident HMAC Seal */}
        <div className="p-5 rounded-xl border border-[#7663D8]/30 bg-[#FAF8FF] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7663D8]">
            <Lock className="w-4 h-4" />
            <span>Tamper-Evident HMAC-SHA256 Manifest Seal</span>
          </div>
          <p className="text-[11px] font-mono text-[#4B5563] break-all bg-white p-3 rounded-lg border border-[#E8E6DF]">
            {report.manifest_signature}
          </p>
          <p className="text-[10px] text-[#68717D]">
            This cryptographic hash represents an immutable seal calculated over the raw canonical findings. Any post-generation modification invalidates the seal.
          </p>
        </div>

        {/* Disclaimers & Ethics */}
        <div className="pt-4 border-t border-[#E8E6DF] text-[11px] text-[#8A92A0] leading-relaxed">
          {report.disclaimer}
        </div>

      </div>

    </div>
  );
};

export default ReportDetailPage;
