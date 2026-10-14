import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Share2,
  Zap,
  Globe,
  FileText,
  Check,
  X,
  ExternalLink,
  Video,
  Mic,
  FileCode,
  Receipt,
  CreditCard,
  HeartHandshake
} from 'lucide-react';
import { TruthLensIcon, TruthLensLogo } from '../components/brand/Logo';
import { HeroScannerWidget } from '../components/home/HeroScannerWidget';
import { ForensicComparator } from '../components/ui/ForensicComparator';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const detectionEngines = [
    {
      title: 'AI Image & Diffusion Detector',
      desc: 'Screen customer photos, claim imagery, and profile photos. Detects Midjourney, Flux, Stable Diffusion, and Photoshop Error Level Analysis (ELA).',
      badge: 'SPECTRAL ELA',
      icon: Eye,
      gradient: 'from-[#A50044] to-[#70002E]',
      borderGlow: 'hover:border-[#A50044]/60',
      link: '/verify/image',
      speed: '0.8s verdict'
    },
    {
      title: 'Deepfake Video Glitch Radar',
      desc: 'Frame-by-frame temporal consistency screening for face-swaps, synthetic lip-sync, unnatural blink frequencies, and facial boundary warping.',
      badge: 'BIOMETRIC GLITCH',
      icon: Video,
      gradient: 'from-[#004D98] to-[#0A1128]',
      borderGlow: 'hover:border-[#004D98]/60',
      link: '/verify/video',
      speed: '1.4s keyframe'
    },
    {
      title: 'AI Voice Clone Detector',
      desc: 'Analyze executive voice notes, audio claims, and telephone calls. Detects ElevenLabs, Tortoise, robotic pitch quantization, and 16kHz vocoder cutoffs.',
      badge: 'ACOUSTIC SPECTROGRAM',
      icon: Mic,
      gradient: 'from-[#A50044] via-[#70002E] to-[#004D98]',
      borderGlow: 'hover:border-[#EDBB00]/60',
      link: '/verify/voice',
      speed: '0.6s latency'
    },
    {
      title: 'AI Text & Essay Scanner',
      desc: 'Linguistic perplexity and sentence burstiness analyzer. Highlights synthetic tokens and LLM boilerplate across student essays, resumes, and reviews.',
      badge: 'PERPLEXITY & BURST',
      icon: FileCode,
      gradient: 'from-[#004D98] to-[#002D5C]',
      borderGlow: 'hover:border-[#004D98]/60',
      link: '/verify/text',
      speed: '0.4s token scan'
    },
    {
      title: 'Receipt & Expense Tamper Auditor',
      desc: 'Line-by-line mathematical sum reconciliation and font kerning analysis. Detects Photoshop-altered totals on taxi receipts, meals, and vendor bills.',
      badge: 'MATH & PIXEL AUDIT',
      icon: Receipt,
      gradient: 'from-[#A50044] to-[#800030]',
      borderGlow: 'hover:border-[#A50044]/60',
      link: '/verify/invoice',
      speed: '0.5s OCR parse'
    },
    {
      title: 'KYC & Government ID Authenticator',
      desc: 'Inspect passports, driver licenses, and national IDs. Compares primary photos against ghost watermarks and verifies ICAO 9303 MRZ checksums.',
      badge: 'MRZ & BIOMETRIC MATCH',
      icon: CreditCard,
      gradient: 'from-[#004D98] to-[#A50044]',
      borderGlow: 'hover:border-[#EDBB00]/60',
      link: '/verify/kyc',
      speed: '0.7s validation'
    }
  ];

  const comparisonRows = [
    {
      feature: 'Comprehensive All-in-One Engine (Image, Video, Voice, Text, Invoices, KYC)',
      truthlens: 'Yes — 7 Dedicated Specialized Workstations',
      truthscan: 'Separate Paywalled APIs',
      manual: 'Fragmented & Manual'
    },
    {
      feature: 'Scan Cost & Licensing',
      truthlens: '100% Free Forever (Open Public Infrastructure)',
      truthscan: '$0.01 – $0.79 per scan',
      manual: '$5+ in analyst labor'
    },
    {
      feature: 'Processing Speed',
      truthlens: 'Instant 0.4s – 1.4s Real-time',
      truthscan: '1.2s API round-trip',
      manual: '15 – 30 Minutes per file'
    },
    {
      feature: 'Visual Forensic Proof',
      truthlens: 'Heatmap Saliency + Waveforms + Frame Scrubber',
      truthscan: 'Basic Heatmap only',
      manual: 'Subjective Eyeballing'
    },
    {
      feature: 'Abstention Zone for Low Quality Media',
      truthlens: 'Yes — Explicit "Needs Human Review" safeguard',
      truthscan: 'Binary Forced Output',
      manual: 'Inconsistent'
    },
    {
      feature: 'Data Privacy & Retention',
      truthlens: 'Zero Data Harvesting — Files Purged from RAM',
      truthscan: 'Commercial cloud storage',
      manual: 'Unsecured email attachments'
    }
  ];

  const faqs = [
    {
      q: "Why is TruthLens 100% free compared to expensive enterprise vendors?",
      a: "TruthLens was founded on the belief that digital authenticity and deepfake protection are fundamental human rights in the AI era. Commercial vendors charge per scan, creating high financial barriers for students, fraud victims, and small businesses. TruthLens operates as free-first public verification infrastructure supported by open academic research."
    },
    {
      q: "Can TruthLens guarantee 100% detection accuracy on all AI media?",
      a: "No, and any vendor claiming 100% certainty is misleading. Generative AI models evolve daily. TruthLens provides rigorous multi-domain statistical signals (spectral FFT lattice, 8x8 DCT Error Level Analysis, acoustic vocoder truncation, blink frequency timing) and includes an explicit Abstention Zone ('NEEDS HUMAN REVIEW') when extreme compression prevents reliable certainty."
    },
    {
      q: "How does the Deepfake Video and Audio Voice Clone detection work?",
      a: "For videos, our pipeline decomposes frames at 30fps to analyze temporal facial landmark micro-jitter, blink cadence, and neck mask boundary splicing. For audio, we compute Short-Time Fourier Transforms (STFT) to identify sharp high-frequency harmonic cutoffs (>16kHz) characteristic of neural vocoders like ElevenLabs."
    },
    {
      q: "How are uploaded files and user privacy protected?",
      a: "All forensic analysis is executed in isolated temporary server memory without cloud harvesting. Your files are never used to train public models and are automatically purged after your session."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-left bg-[#060B18] text-[#F8FAFC] selection:bg-[#A50044]/30 selection:text-white">
      
      {/* 1. HERO SECTION: USER INTERFACE COMES FIRST (APPLE / LUXURY PALMKVIST AESTHETIC) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-white/10">
        
        {/* Soft Luxury Blaugrana Ethereal Mesh Orbs */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-radial from-[#A50044]/20 via-[#004D98]/15 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[350px] bg-radial from-[#004D98]/20 via-[#A50044]/15 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Headline & Pitch Container */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Top Pill Category Ribbon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#EDBB00] animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-300">
                100% Free Public Good • Digital Authenticity Standard
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-display">
              Digital Authenticity in the Age of{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">
                Synthetic Reality.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans font-normal">
              Screen photos, deepfake videos, cloned voices, and altered documents in real time. Powered by multi-domain spectral decomposition, cryptographic tamper seals, and zero paywalls.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/verify/image"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#A50044] via-[#70002E] to-[#004D98] hover:from-[#C70039] hover:to-[#0066B2] shadow-[0_0_30px_rgba(165,0,68,0.5)] border border-white/15 transition-all cursor-pointer"
              >
                <Scan className="w-4 h-4" />
                <span>Launch Free Scanner</span>
              </Link>

              <a
                href="#engines-grid"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 shadow-sm transition-all cursor-pointer"
              >
                <span>Explore 7 Forensic Engines</span>
                <ArrowRight className="w-4 h-4 text-[#EDBB00]" />
              </a>
            </div>

          </div>

          {/* THE PRODUCT INTERFACE COMES FIRST (FRONT AND CENTER!) */}
          <div className="pt-4 max-w-5xl mx-auto">
            <HeroScannerWidget />
          </div>

        </div>
      </section>

      {/* 2. SCROLLING DOWN EXPERIENCE: 7-ENGINE DETECTION ARSENAL BENTO GRID */}
      <section id="engines-grid" className="py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EDBB00] block">
              COMPREHENSIVE FORENSIC SUITE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              7 Specialized Engines. One Unified Public Standard.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Every media modality exhibits unique physical and mathematical signatures when manipulated. TruthLens deploys dedicated detectors tailored to each fraud vector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectionEngines.map((engine, idx) => {
              const Icon = engine.icon;
              return (
                <Link
                  key={idx}
                  to={engine.link}
                  className={`group relative p-7 rounded-3xl bg-[#090F22]/80 backdrop-blur-xl border border-white/10 ${engine.borderGlow} transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${engine.gradient} text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        {engine.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-[#EDBB00] transition-colors">
                        {engine.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {engine.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
                    <span className="font-mono text-[11px] text-slate-500">{engine.speed}</span>
                    <span className="flex items-center gap-1 text-[#EDBB00] group-hover:translate-x-1 transition-transform">
                      <span>Launch Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE BEFORE / AFTER MORPH SPLITTER */}
      <section className="py-24 border-b border-white/10 bg-[#040813] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EDBB00] block">
              OPTICAL TRUTH VS SYNTHETIC ARTIFACTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              See Beyond Human Perception
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Diffusion models and deepfake synthesizers look photorealistic to the human naked eye. Under 2D Fourier spectral decomposition and 8x8 DCT analysis, the underlying mathematical fingerprints become undeniable.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ForensicComparator />
          </div>

        </div>
      </section>

      {/* 4. COMPARISON MATRIX: TRUTHLENS VS TRUTHSCAN VS MANUAL */}
      <section className="py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EDBB00] block">
              BENCHMARK & PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Engineered as a Public Defense Infrastructure
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Why pay commercial vendors up to $0.79 per scan when truth should be accessible to every investigator, student, and victim?
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#090F22]/80 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/5 border-b border-white/10 text-slate-300 font-bold uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="py-4 px-6">Verification Dimension</th>
                  <th className="py-4 px-6 text-[#EDBB00]">TruthLens (Free Public Good)</th>
                  <th className="py-4 px-6 text-slate-400">TruthScan (Commercial Tier)</th>
                  <th className="py-4 px-6 text-slate-400">Manual Eyeball Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/3 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{row.feature}</td>
                    <td className="py-4 px-6 font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.truthlens}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">{row.truthscan}</td>
                    <td className="py-4 px-6 text-slate-400">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION */}
      <section className="py-24 border-b border-white/10 bg-[#040813]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EDBB00] block">
              TRANSPARENCY & METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = selectedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#090F22]/70 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5"
                  >
                    <span className="text-sm font-bold text-white font-display">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#EDBB00]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CTA: LAUNCH WORKSPACE & EMERGENCY SOS */}
      <section className="py-20 bg-gradient-to-b from-[#060B18] via-[#0A1128] to-[#060B18] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="p-10 rounded-3xl bg-gradient-to-r from-[#A50044]/30 via-[#0A1128] to-[#004D98]/30 border border-white/15 backdrop-blur-2xl space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Start Screening Media in Seconds.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              No registration required to verify digital files. Free forever for individuals, students, investigators, and organizations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/verify/image"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#A50044] via-[#70002E] to-[#004D98] hover:from-[#C70039] hover:to-[#0066B2] shadow-xl border border-white/20 transition-all"
              >
                Launch Verification Workbench
              </Link>

              <Link
                to="/sos"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-red-300 bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 shadow-sm transition-all"
              >
                Victim SOS Helpline 1930
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
