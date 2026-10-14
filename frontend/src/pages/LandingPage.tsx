import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Upload, 
  FileCheck2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Eye,
  AlertOctagon,
  ChevronDown,
  GraduationCap,
  Layers,
  Scan,
  Activity,
  CheckCircle2,
  Cpu,
  Share2
} from 'lucide-react';
import { TruthLensIcon } from '../components/brand/Logo';
import { ForensicComparator } from '../components/ui/ForensicComparator';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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

  const interactiveShowcases = [
    {
      id: 'deepfake',
      title: 'Synthesized AI Portrait (Diffusion v6)',
      tag: 'LIKELY FAKE (94%)',
      tagColor: 'text-[#DC2626] bg-[#FEF2F2] border-red-200',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      anomaly: 'Corneal specular mismatch & high-frequency checkerboard grid artifacts.',
      link: '/verify/image?sample=deepfake'
    },
    {
      id: 'authentic',
      title: 'Optical Sensor Portrait (Fuji X100V)',
      tag: 'LIKELY REAL (91%)',
      tagColor: 'text-[#10B981] bg-[#ECFDF5] border-emerald-200',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      anomaly: 'Natural Poisson-Gaussian sensor noise and coherent ambient light reflection.',
      link: '/verify/image?sample=real'
    },
    {
      id: 'certificate',
      title: 'Retrospective Medical Leave Note',
      tag: 'REVIEW RECOMMENDED',
      tagColor: 'text-[#F59E0B] bg-[#FFFBEB] border-amber-200',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      anomaly: 'Certificate issued 4 days after leave commenced. Verified physician credentials.',
      link: '/verify/certificate'
    },
    {
      id: 'compressed',
      title: 'Social Media Re-compression (WhatsApp)',
      tag: 'NEEDS HUMAN REVIEW',
      tagColor: 'text-[#6366F1] bg-[#EEF2FF] border-indigo-200',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      anomaly: 'Abstention zone triggered: Q<65 compression masks fine forensic signals.',
      link: '/verify/image?sample=compressed'
    }
  ];

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
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-left">
      
      {/* HERO SECTION WITH INTERACTIVE FORENSIC COMPARATOR */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Soft Modern Tech Background Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-tr from-[#2563EB]/15 via-[#38BDF8]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-[500px] h-[280px] bg-gradient-to-bl from-[#F59E0B]/10 via-[#FBBF24]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Modern Headline & Key Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-5 text-left"
          >
            {/* Live Infrastructure Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-1.5 rounded-full w-fit shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
              </span>
              <span className="text-xs font-black text-[#1E40AF] tracking-wide uppercase font-display">
                Next-Gen Multi-Spectral Forensic Engine
              </span>
            </div>

            {/* Main Headline - Ultra Modern & Punchy */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B132B] leading-[1.08] font-display">
              See what's real. <br />
              <span className="gradient-text-royal">Know what to trust.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-medium">
              Check images for signs of AI manipulation, review academic medical certificates with structured OCR, and generate cryptographic HMAC Trust Reports — free, with zero-leakage privacy.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/verify/image"
                className="bg-gradient-to-r from-[#0B132B] via-[#1E293B] to-[#2563EB] text-white font-extrabold text-xs sm:text-sm px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:border-[#F59E0B] border border-transparent transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#FDE68A]" />
                <span>Launch Image Lens</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/verify/certificate"
                className="bg-white border-2 border-[#E2E8F0] hover:border-[#2563EB] text-[#0B132B] font-bold text-xs sm:text-sm px-5 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-center shadow-xs cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-[#2563EB]" />
                <span>Verify Certificate</span>
              </Link>

              <button
                onClick={() => {
                  loginAsDemo('reviewer');
                  navigate('/university');
                }}
                className="bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] hover:bg-[#FEF3C7] font-bold text-xs sm:text-sm px-4 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Explore Demo</span>
              </button>
            </div>

            {/* Quick Metrics & Safeguard Guarantee */}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>100% Free Public Tool</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>33%–67% Honest Abstention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Zero Model Retraining</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Real-Life Morph Lens Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Draggable Interactive Morph Lens with Real Portrait */}
            <div className="sleek-card p-5 sm:p-6 bg-white border border-[#E2E8F0]">
              <ForensicComparator 
                realImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                forensicImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                label="Live Forensic Split-Lens (Slide to Reveal Synthetic Grid)"
              />

              {/* Quick Direct Drop Ingestion */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`mt-4 border-2 border-dashed rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-[#2563EB] bg-[#EFF6FF]' 
                    : 'border-[#CBD5E1] hover:border-[#2563EB] hover:bg-[#F8FAFC]'
                }`}
                onClick={() => document.getElementById('hero-direct-upload')?.click()}
              >
                <input
                  id="hero-direct-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                    <Upload className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B132B] block">
                      Drop any photo or PDF here
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Instant analysis via in-memory forensic worker
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0B132B] hover:bg-[#2563EB] transition-colors"
                >
                  Browse File
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE FORENSIC SHOWCASE: REAL IMAGES & TAMPER ARTIFACTS */}
      <section className="py-16 bg-[#FFFFFF] border-y border-[#E2E8F0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-1 font-display">
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Forensic Gallery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] font-display">
                Real Test Cases & Detection Artifacts
              </h2>
              <p className="text-xs text-[#64748B] mt-1 max-w-xl">
                Click any case to launch instant forensic inspection and inspect corneal light vectors, ELA quantization, and date sequence latency.
              </p>
            </div>

            <Link
              to="/verify/image"
              className="text-xs font-bold text-[#2563EB] hover:text-[#0B132B] flex items-center gap-1 shrink-0"
            >
              <span>Explore All Test Datasets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactiveShowcases.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                className="sleek-card overflow-hidden bg-white flex flex-col group cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border shadow-xs ${card.tagColor}`}>
                      {card.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-[#38BDF8]" />
                      Launch Forensic Deep-Dive →
                    </span>
                  </div>
                </div>

                <div className="p-4.5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-bold text-[#0B132B] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                    {card.anomaly}
                  </p>
                  <div className="pt-2 border-t border-[#F1F5F9] text-[11px] font-bold text-[#2563EB] flex items-center justify-between">
                    <span>Inspect Evidence</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THREE-STEP EXPLAINABLE METHODOLOGY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-1 block font-display">
            Transparent Pipeline
          </span>
          <h2 className="text-3xl font-black text-[#0B132B] font-display">
            How TruthLens Inspects Media in Three Steps
          </h2>
          <p className="text-xs text-[#64748B] mt-2">
            No black-box guesses. We deliver peer-reviewed mathematical decomposition and clear human review corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="sleek-card p-7 bg-white relative flex flex-col gap-3">
            <span className="text-4xl font-black text-[#2563EB]/15 font-display">01</span>
            <h3 className="text-base font-bold text-[#0B132B]">Upload & Secure Ingestion</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Files are processed in memory with strict anti-SSRF IP filtering. No data is harvested or retained for commercial model retraining.
            </p>
          </div>

          <div className="sleek-card p-7 bg-white relative flex flex-col gap-3 border-[#93C5FD]">
            <span className="text-4xl font-black text-[#F59E0B]/25 font-display">02</span>
            <h3 className="text-base font-bold text-[#0B132B]">Multi-Signal Forensic Engines</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Simultaneous extraction of Error Level Analysis (ELA), 2D Fourier spectral lattices, facial pupil reflections, and OCR chronological logic.
            </p>
          </div>

          <div className="sleek-card p-7 bg-white relative flex flex-col gap-3">
            <span className="text-4xl font-black text-[#10B981]/20 font-display">03</span>
            <h3 className="text-base font-bold text-[#0B132B]">HMAC-SHA256 Sealed Reports</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every verification generates a tamper-evident digital certificate with calibrated confidence intervals and human escalation pathways.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white border-t border-[#E2E8F0] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Honest principles about detection limits, privacy, and non-punitive safeguards.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = selectedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="sleek-card bg-[#FAF9F6] border border-[#E2E8F0] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setSelectedFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs text-[#0B132B] hover:text-[#2563EB] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4.5 text-xs text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
