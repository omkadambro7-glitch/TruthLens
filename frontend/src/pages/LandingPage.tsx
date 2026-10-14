import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Upload, 
  Search, 
  FileCheck2, 
  AlertTriangle, 
  Lock, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { TruthLensIcon } from '../components/brand/Logo';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Navigate to /verify/image with file stored in state
      navigate('/verify/image', { state: { initialFile: file } });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      navigate('/verify/image', { state: { initialFile: file } });
    }
  };

  const faqs = [
    {
      q: "Can TruthLens guarantee 100% detection accuracy?",
      a: "No, and any platform that claims 100% accuracy is misleading you. Deepfake synthesis, diffusion generators, and document editing tools evolve continuously. TruthLens communicates honest statistical signals across multiple forensic domains (ELA, 2D FFT frequency spectrum, noise variance, EXIF container structures) and always provides an explicit abstention verdict ('NEEDS HUMAN REVIEW') when signals conflict."
    },
    {
      q: "What image and document formats are supported?",
      a: "TruthLens supports JPEG, PNG, and WebP for image forensic analysis up to 15MB. For medical certificates and documents, we support PDF documents and scanned images (JPEG, PNG, WebP) up to 25MB."
    },
    {
      q: "Can an automated tool reject a student's medical leave?",
      a: "Strictly NO. TruthLens operates with a mandatory algorithmic safeguard: our system assists human reviewers and provides student self-checks. Consequential decisions (such as leave denial, disciplinary inquiries, or accusations of dishonesty) require authorized human review and proper appeal channels."
    },
    {
      q: "How does TruthLens protect my uploaded files and privacy?",
      a: "Uploaded files are processed securely in isolated memory and stored outside the public web root. We do not sell your data, use your private files to retrain public models without explicit consent, or share student records across institutions. You can delete uploaded files anytime from your settings."
    },
    {
      q: "What should I do if a verification result is inconclusive?",
      a: "An inconclusive verdict means available signals were insufficient to make a high-confidence determination, often due to heavy social media re-compression or low image resolution. We recommend obtaining the original raw capture with intact EXIF metadata, requesting a physical signed document, or consulting an expert forensic examiner."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#E6F3F2] border border-[#BCE3E0] px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#116B67]" />
              <span className="text-xs font-bold text-[#116B67] tracking-wide">
                Free-First Public Verification Infrastructure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#20252B] leading-[1.12] font-display">
              See what's real. <br />
              <span className="brand-gradient-text">Know what to trust.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#68717D] leading-relaxed max-w-xl">
              Check images for signs of AI manipulation, review document authenticity, and understand the evidence — free, with privacy and transparency built in.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/verify/image"
                className="brand-gradient text-white font-bold text-sm px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Check an Image</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/verify/certificate"
                className="bg-white border-2 border-[#116B67] text-[#116B67] hover:bg-[#E6F3F2] font-bold text-sm px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-center"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Verify a Certificate</span>
              </Link>
            </div>

            {/* Honest Uncertainty Disclaimer */}
            <div className="flex items-center gap-3 pt-3 text-xs text-[#68717D]">
              <Shield className="w-4 h-4 text-[#116B67] shrink-0" />
              <span>
                Calibrated confidence scores • Clear abstention zone • No fabricated certainty
              </span>
            </div>
          </div>

          {/* Right Column: Real Interactive Upload Card */}
          <div className="lg:col-span-5">
            <div className="card-elevation p-6 sm:p-8 bg-white border border-[#E8E6DF] relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] mb-6">
                <div className="flex items-center gap-2.5">
                  <TruthLensIcon size={28} />
                  <span className="font-bold text-sm text-[#20252B] font-display">Quick Verification Lens</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#116B67] bg-[#E6F3F2] px-2.5 py-0.5 rounded-full">
                  Live
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-[#116B67] bg-[#E6F3F2]/40 scale-[1.01]' 
                    : 'border-[#D5D2C8] hover:border-[#116B67] hover:bg-[#FAF9F6]'
                }`}
                onClick={() => document.getElementById('hero-file-input')?.click()}
              >
                <input
                  id="hero-file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="w-14 h-14 rounded-2xl bg-[#E6F3F2] text-[#116B67] flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                <p className="text-sm font-bold text-[#20252B] mb-1">
                  Drop an image or document here
                </p>
                <p className="text-xs text-[#68717D] max-w-xs">
                  JPEG, PNG, WebP, or PDF up to 15MB. Analysis runs with real explainable forensic pipelines.
                </p>
                <button
                  type="button"
                  className="mt-5 text-xs font-bold text-[#116B67] bg-white border border-[#BCE3E0] px-4 py-2 rounded-xl shadow-2xs hover:bg-[#E6F3F2] transition-colors"
                >
                  Browse Files
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8E6DF] flex items-center justify-between text-xs text-[#68717D]">
                <span>URL Analysis & Camera also supported</span>
                <Link to="/verify/image" className="text-[#116B67] font-bold hover:underline">
                  Advanced Mode →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-[#E8E6DF] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#116B67] mb-2 font-display">
              Transparent Methodology
            </h2>
            <h3 className="text-3xl font-bold text-[#20252B] font-display">
              How TruthLens Verifies Media in Three Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#FAF9F6] border border-[#E8E6DF] p-8 rounded-2xl relative flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-[#116B67]/20 font-display">01</span>
              <h4 className="text-lg font-bold text-[#20252B] font-display">1. Upload & Safe Ingestion</h4>
              <p className="text-xs text-[#68717D] leading-relaxed">
                Provide an image or document via file picker, paste, camera, or remote URL. Strict anti-SSRF protections and memory-isolated processing ensure zero network leakage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF9F6] border border-[#E8E6DF] p-8 rounded-2xl relative flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-[#7663D8]/20 font-display">02</span>
              <h4 className="text-lg font-bold text-[#20252B] font-display">2. Multi-Spectral Forensics</h4>
              <p className="text-xs text-[#68717D] leading-relaxed">
                The image passes through Error Level Analysis (ELA), 2D FFT frequency spectrum profiling, localized noise variance, EXIF container forensics, and facial symmetry checks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF9F6] border border-[#E8E6DF] p-8 rounded-2xl relative flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-[#FF806F]/30 font-display">03</span>
              <h4 className="text-lg font-bold text-[#20252B] font-display">3. Understand Honest Evidence</h4>
              <p className="text-xs text-[#68717D] leading-relaxed">
                Review the verdict: <strong>LIKELY REAL</strong>, <strong>LIKELY FAKE</strong>, or <strong>NEEDS HUMAN REVIEW</strong>. Inspect interactive heatmaps, calibrated confidence, and tamper-evident Trust Reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7663D8] mb-2 font-display">
            Built for High-Stakes Reality
          </h2>
          <h3 className="text-3xl font-bold text-[#20252B] font-display">
            Comprehensive Verification Modules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: AI Image Detection */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6F3F2] text-[#116B67] flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">AI Image Detection</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Detects diffusion model fingerprints, GAN periodic grid peaks in Fourier space, and localized splicing seams using calibrated multi-signal ensembles.
            </p>
            <Link to="/verify/image" className="text-xs font-bold text-[#116B67] mt-auto flex items-center gap-1 hover:underline">
              Test Image Detector →
            </Link>
          </div>

          {/* Card 2: Certificate Integrity Pre-Check */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EFEFFC] text-[#7663D8] flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">Medical Certificate Integrity</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Extracts physician credentials, registration numbers, and dates. Validates chronological sequences, leaves durations, and verifies physical stamps.
            </p>
            <Link to="/verify/certificate" className="text-xs font-bold text-[#7663D8] mt-auto flex items-center gap-1 hover:underline">
              Verify Certificate →
            </Link>
          </div>

          {/* Card 3: Victim SOS Support */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3 border-l-4 border-l-[#DC2626]">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">Victim SOS Center</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Discreet, compassionate support for people targeted by deepfakes. Takedown templates, evidence preservation checklists, and official cybercrime links without uploading sensitive imagery.
            </p>
            <Link to="/sos" className="text-xs font-bold text-[#DC2626] mt-auto flex items-center gap-1 hover:underline">
              Access SOS Center →
            </Link>
          </div>

          {/* Card 4: Trust Reports */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FEF8EC] text-[#D97706] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">Tamper-Evident Trust Reports</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Every verification generates a cryptographically signed HMAC-SHA256 report with revocable share links, SHA-256 hashes, and printable formal summaries.
            </p>
            <Link to="/accuracy" className="text-xs font-bold text-[#D97706] mt-auto flex items-center gap-1 hover:underline">
              Review Methodology →
            </Link>
          </div>

          {/* Card 5: University Review Queue */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6F3F2] text-[#116B67] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">Human-in-the-Loop Review</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Dedicated university review queue with strict tenant isolation, case note recording, and audit trails ensuring human discretion before any academic determination.
            </p>
            <Link to="/university" className="text-xs font-bold text-[#116B67] mt-auto flex items-center gap-1 hover:underline">
              University Workspace →
            </Link>
          </div>

          {/* Card 6: Privacy by Design */}
          <div className="card-elevation p-7 bg-white card-elevation-hover flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EFEFFC] text-[#7663D8] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#20252B] font-display">Privacy-First Architecture</h4>
            <p className="text-xs text-[#68717D] leading-relaxed">
              Randomized internal filenames, private storage outside web root, zero tracking, and on-demand file purging ensure user dignity and data protection.
            </p>
            <Link to="/privacy" className="text-xs font-bold text-[#7663D8] mt-auto flex items-center gap-1 hover:underline">
              Read Privacy Policy →
            </Link>
          </div>

        </div>
      </section>

      {/* TRUST AND ETHICS COMMITMENT */}
      <section className="bg-white border-t border-[#E8E6DF] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto card-elevation bg-[#FAF9F6] p-8 sm:p-12 border border-[#E8E6DF]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E8E6DF]">
            <div>
              <h3 className="text-2xl font-bold text-[#20252B] font-display">
                The TruthLens Free-Forever Public Commitment
              </h3>
              <p className="text-xs text-[#68717D] mt-1">
                Why we believe media authentication must remain accessible to students, journalists, and victims.
              </p>
            </div>
            <div className="bg-[#116B67] text-white text-xs font-bold px-4 py-2 rounded-xl">
              100% Free Public Good
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-xs text-[#68717D] leading-relaxed">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#20252B]">
                <CheckCircle className="w-4 h-4 text-[#116B67]" />
                <span>What We Check</span>
              </div>
              <p>
                We examine quantifiable mathematical anomalies: re-compression variance (ELA), 2D Fourier spectral spikes, sensor noise patterns, metadata consistency, and date sequences.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#20252B]">
                <CheckCircle className="w-4 h-4 text-[#116B67]" />
                <span>What We Cannot Establish</span>
              </div>
              <p>
                An automated detector cannot establish legal intent, motive, or definitive guilt. Compression artifacts and social media re-saving are NOT evidence of malicious forgery.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#20252B]">
                <CheckCircle className="w-4 h-4 text-[#116B67]" />
                <span>Zero Commercial Paywalls</span>
              </div>
              <p>
                Verification tools should not be restricted to wealthy corporations. We commit to keeping core verification free without fake premium lockouts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#20252B]">
                <CheckCircle className="w-4 h-4 text-[#116B67]" />
                <span>Mandatory Human Review Safeguard</span>
              </div>
              <p>
                Our system strictly refuses to issue automated sanctions, leave rejections, or disciplinary penalties against any individual without qualified human evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#116B67] mb-2 font-display">
            Got Questions?
          </h2>
          <h3 className="text-3xl font-bold text-[#20252B] font-display">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-elevation bg-white border border-[#E8E6DF] overflow-hidden">
              <button
                onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#20252B] hover:text-[#116B67] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${selectedFaq === idx ? 'rotate-180 text-[#116B67]' : 'text-[#68717D]'}`} />
              </button>
              {selectedFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#68717D] leading-relaxed border-t border-[#E8E6DF] pt-4 bg-[#FAF9F6]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
