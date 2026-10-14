import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Upload, 
  Link as LinkIcon, 
  Camera, 
  Shield, 
  Clock, 
  Hash, 
  AlertCircle, 
  Check, 
  Eye, 
  Layers, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Sparkles, 
  Scan,
  RefreshCw
} from 'lucide-react';
import { ConfidenceRing } from '../components/ui/ConfidenceRing';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { HeatmapViewer } from '../components/ui/HeatmapViewer';
import { ImageVerificationResult, EvidenceItem } from '../types';

export const ImageVerifyPage: React.FC = () => {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<ImageVerificationResult | null>(null);
  const [inputTab, setInputTab] = useState<'upload' | 'url'>('upload');
  
  // Feedback state
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('accurate');
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');

  // Check if an initial file was passed from the landing page
  useEffect(() => {
    if (location.state && (location.state as any).initialFile) {
      const file = (location.state as any).initialFile as File;
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      triggerAnalysis(file);
    }
  }, [location.state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMsg(null);
      setResult(null);
      setFeedbackSent(false);
      triggerAnalysis(file);
    }
  };

  const triggerAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/v1/verify/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Analysis request failed.');
      }

      const data: ImageVerificationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during image forensic analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    setResult(null);
    setPreviewUrl(imageUrlInput);
    setFeedbackSent(false);

    try {
      const response = await fetch('/api/v1/verify/image/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrlInput.trim() }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to fetch and verify remote URL.');
      }

      const data: ImageVerificationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'SSRF check or remote fetch failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!result) return;
    try {
      await fetch('/api/v1/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: result.job_id,
          is_helpful: feedbackHelpful ?? true,
          feedback_category: feedbackCategory,
          comments: feedbackNotes,
        }),
      });
      setFeedbackSent(true);
    } catch (e) {
      setFeedbackSent(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8">
      
      {/* Header breadcrumb & title */}
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#68717D]">
          <Link to="/" className="hover:text-[#116B67]">Home</Link>
          <span>/</span>
          <span className="text-[#20252B]">Image Verification</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#20252B] tracking-tight font-display mt-1">
          Deepfake & AI Image Detector
        </h1>
        <p className="text-sm text-[#68717D]">
          Analyze visual media for synthetic generation markers, localized ELA anomalies, and 2D FFT frequency artifacts.
        </p>
      </div>

      {/* Input Selection Card */}
      <div className="card-elevation p-6 bg-white border border-[#E8E6DF]">
        <div className="flex items-center gap-2 border-b border-[#E8E6DF] pb-4 mb-6">
          <button
            onClick={() => setInputTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              inputTab === 'upload' ? 'bg-[#116B67] text-white' : 'text-[#68717D] hover:bg-[#FAF9F6]'
            }`}
          >
            <Upload className="w-4 h-4" />
            File Upload / Camera
          </button>
          <button
            onClick={() => setInputTab('url')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              inputTab === 'url' ? 'bg-[#116B67] text-white' : 'text-[#68717D] hover:bg-[#FAF9F6]'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Remote Image URL (Safe Fetch)
          </button>
        </div>

        {inputTab === 'upload' && (
          <div
            onClick={() => document.getElementById('image-upload-input')?.click()}
            className="border-2 border-dashed border-[#D5D2C8] hover:border-[#116B67] hover:bg-[#FAF9F6] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
          >
            <input
              id="image-upload-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 rounded-xl bg-[#E6F3F2] text-[#116B67] flex items-center justify-center mb-3">
              <Scan className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#20252B]">
              {selectedFile ? selectedFile.name : "Select or drag & drop image"}
            </p>
            <p className="text-xs text-[#68717D] mt-1">
              Supports JPEG, PNG, and WebP (up to 15MB). Decodes in isolated memory.
            </p>
          </div>
        )}

        {inputTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-[#D5D2C8] bg-[#FAF9F6] text-sm focus:outline-hidden focus:border-[#116B67]"
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="brand-gradient text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs hover:opacity-95 disabled:opacity-50"
            >
              Analyze Remote URL
            </button>
          </form>
        )}

        {errorMsg && (
          <div className="mt-4 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-3 text-xs text-[#DC2626]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Real Scanning Lens Animation while analyzing */}
      {isAnalyzing && (
        <div className="card-elevation p-12 bg-white flex flex-col items-center justify-center text-center gap-4">
          <div className="relative w-24 h-24 rounded-full border-4 border-[#116B67]/20 flex items-center justify-center animate-pulse-ring">
            <div className="w-16 h-16 rounded-full bg-[#E6F3F2] text-[#116B67] flex items-center justify-center">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#20252B] font-display">
              Multi-Spectral Forensic Ingestion in Progress
            </h3>
            <p className="text-xs text-[#68717D] mt-1">
              Computing 2D Fast Fourier Transform, Error Level Analysis (ELA), and sensor noise variance...
            </p>
          </div>
        </div>
      )}

      {/* RESULTS INTERFACE */}
      {result && !isAnalyzing && (
        <div className="flex flex-col gap-8">
          
          {/* Executive Verdict Hero Card */}
          <div className="card-elevation p-8 bg-white border border-[#E8E6DF] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Verdict and Plain Language Summary */}
            <div className="lg:col-span-8 flex flex-col gap-4 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <VerdictBadge verdict={result.verdict} size="lg" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EEE8] text-[#68717D]">
                  Uncertainty: <strong>{result.uncertainty_level}</strong>
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E6F3F2] text-[#116B67]">
                  {result.model_identifier}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#20252B] font-display">
                {result.verdict === 'LIKELY FAKE' && "High Probability of Synthetic AI Generation or Manipulation"}
                {result.verdict === 'LIKELY REAL' && "Authentic Optical Sensor Signatures Observed"}
                {result.verdict === 'NEEDS HUMAN REVIEW' && "Inconclusive Signals — Human Review Recommended"}
              </h2>

              <p className="text-sm text-[#374151] leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E6DF]">
                {result.summary_explanation}
              </p>

              {/* Cryptographic hash and audit details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#68717D]">
                <div className="flex items-center gap-1.5 truncate">
                  <Hash className="w-3.5 h-3.5 text-[#116B67] shrink-0" />
                  <span className="font-mono text-[11px] truncate" title={result.file_hash_sha256}>
                    SHA-256: {result.file_hash_sha256.slice(0, 16)}...
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#116B67] shrink-0" />
                  <span>Execution: {result.execution_time_ms} ms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#116B67] shrink-0" />
                  <span>Calibrated Experimental</span>
                </div>
              </div>
            </div>

            {/* Right: Confidence Ring Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-[#E8E6DF]">
              <ConfidenceRing score={result.confidence_score} verdict={result.verdict} size={150} />
              <div className="mt-4 text-center">
                <span className="text-[11px] text-[#68717D] block">
                  Statistical Signal Calibration
                </span>
                <span className="text-xs font-bold text-[#20252B]">
                  Abstention Band: 0.33 – 0.67
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Heatmap Viewer */}
          {previewUrl && (
            <HeatmapViewer
              originalImageUrl={previewUrl}
              heatmapUrl={result.heatmap_url ? result.heatmap_url : undefined}
            />
          )}

          {/* Detailed Forensic Evidence Breakdown */}
          <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#20252B] font-display flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#116B67]" />
                  Multi-Spectral Forensic Evidence Items
                </h3>
                <p className="text-xs text-[#68717D] mt-0.5">
                  Breakdown of independent signal detectors contributing to the ensemble verdict.
                </p>
              </div>
              <span className="text-xs font-bold text-[#116B67] bg-[#E6F3F2] px-3 py-1 rounded-full">
                {result.evidence_breakdown.length} Signals Tested
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.evidence_breakdown.map((item) => {
                const isSupportsFake = item.verdict_impact === 'supports_fake';
                const isSupportsReal = item.verdict_impact === 'supports_real';
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isSupportsFake
                        ? 'border-[#FECACA] bg-[#FEF2F2]/40'
                        : isSupportsReal
                        ? 'border-[#BCE3E0] bg-[#E6F3F2]/30'
                        : 'border-[#E8E6DF] bg-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-[#20252B] font-display">
                        {item.signal_name}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isSupportsFake
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : isSupportsReal
                            ? 'bg-[#E6F3F2] text-[#116B67]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}
                      >
                        Score: {Math.round(item.signal_score * 100)}%
                      </span>
                    </div>

                    <p className="text-xs text-[#4B5563] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.details && (
                      <div className="text-[11px] font-mono text-[#68717D] bg-white p-2.5 rounded-lg border border-[#E8E6DF] space-y-1">
                        {Object.entries(item.details).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2">
                            <span className="capitalize">{k.replace(/_/g, ' ')}:</span>
                            <strong className="text-[#20252B]">{String(v)}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions & Official Report Link */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#FAF9F6] rounded-2xl border border-[#E8E6DF]">
            <div>
              <h4 className="font-bold text-sm text-[#20252B]">Official Cryptographically Sealed Report</h4>
              <p className="text-xs text-[#68717D]">
                View or share the tamper-evident HMAC-SHA256 Trust Report for this verification.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/dashboard/reports/${result.job_id}`}
                className="brand-gradient text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:opacity-95 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                View Trust Report
              </Link>
              <a
                href={`/api/v1/reports/${result.job_id}/print-view`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#D5D2C8] text-[#20252B] hover:bg-[#FAF9F6] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Printable PDF
              </a>
            </div>
          </div>

          {/* User Feedback & Governance */}
          <div className="card-elevation p-6 bg-white border border-[#E8E6DF] text-left">
            <h4 className="font-bold text-sm text-[#20252B] mb-1">Was this verification helpful?</h4>
            <p className="text-xs text-[#68717D] mb-4">
              Your feedback is audited anonymously. We never use uploaded images to retrain public models without explicit permission.
            </p>

            {feedbackSent ? (
              <div className="p-3 bg-[#E6F3F2] text-[#116B67] rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! Your feedback has been queued for forensic audit.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFeedbackHelpful(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                      feedbackHelpful === true ? 'bg-[#116B67] text-white border-[#116B67]' : 'bg-white border-[#E8E6DF] text-[#68717D]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Yes, accurate
                  </button>
                  <button
                    onClick={() => setFeedbackHelpful(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                      feedbackHelpful === false ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-white border-[#E8E6DF] text-[#68717D]'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    I believe this is incorrect
                  </button>
                </div>

                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-[#20252B] text-white text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-black transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default ImageVerifyPage;
