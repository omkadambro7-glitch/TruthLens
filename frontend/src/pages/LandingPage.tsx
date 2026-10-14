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
import { ZeninIcon, ZeninLogo } from '../components/brand/Logo';
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
      title: 'AI Image & Diffusion ELA Detector',
      desc: 'Screen customer submissions, claim photos, and profile images. Detects Midjourney v6, Flux, Stable Diffusion, and Error Level Analysis (ELA) anomalies.',
      badge: 'SPECTRAL ELA',
      icon: Eye,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/image',
      speed: '0.8s verdict'
    },
    {
      title: 'Deepfake Video Glitch Radar',
      desc: 'Frame-by-frame temporal consistency screening for face-swaps, synthetic lip-sync, unnatural blink frequencies, and facial boundary mask shearing.',
      badge: 'BIOMETRIC GLITCH',
      icon: Video,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/video',
      speed: '1.2s keyframe'
    },
    {
      title: 'AI Voice Clone & TTS Detector',
      desc: 'Analyze executive voice notes, audio claims, and telephone calls. Detects ElevenLabs, Tortoise, robotic pitch quantization, and 16kHz vocoder cutoffs.',
      badge: 'ACOUSTIC SPECTROGRAM',
      icon: Mic,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/voice',
      speed: '0.6s latency'
    },
    {
      title: 'AI Text & Essay Scanner',
      desc: 'Linguistic perplexity and sentence burstiness analyzer. Highlights synthetic tokens and LLM boilerplate across student essays, resumes, and reviews.',
      badge: 'PERPLEXITY & BURST',
      icon: FileCode,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/text',
      speed: '0.4s token scan'
    },
    {
      title: 'Receipt & Expense Tamper Auditor',
      desc: 'Line-by-line mathematical sum reconciliation and font kerning analysis. Detects Photoshop-altered totals on taxi receipts, meals, and vendor bills.',
      badge: 'MATH & PIXEL AUDIT',
      icon: Receipt,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/invoice',
      speed: '0.5s OCR parse'
    },
    {
      title: 'KYC & Government ID Authenticator',
      desc: 'Inspect passports, driver licenses, and national IDs. Compares primary photos against ghost watermarks and verifies ICAO 9303 MRZ checksums.',
      badge: 'MRZ & BIOMETRIC MATCH',
      icon: CreditCard,
      borderGlow: 'hover:border-[#C5A059]',
      link: '/verify/kyc',
      speed: '0.7s validation'
    }
  ];

  const comparisonRows = [
    {
      feature: 'Comprehensive All-in-One Engine (Image, Video, Voice, Text, Invoices, KYC)',
      zenin: 'Yes — 7 Dedicated Specialized Workstations',
      commercial: 'Fragmented Paywalled APIs',
      manual: 'Fragmented & Slow'
    },
    {
      feature: 'Scan Cost & Licensing',
      zenin: '100% Free Forever (Open Public Infrastructure)',
      commercial: '$0.01 – $0.79 per scan',
      manual: '$5+ in analyst labor'
    },
    {
      feature: 'Processing Speed',
      zenin: 'Instant 0.4s – 1.2s Real-time',
      commercial: '1.5s+ API latency',
      manual: '15 – 30 Minutes per file'
    },
    {
      feature: 'Visual Forensic Proof',
      zenin: 'Heatmap Saliency + Audio Waveforms + Keyframe Scrubber',
      commercial: 'Basic Heatmap only',
      manual: 'Subjective Eyeballing'
    },
    {
      feature: 'Abstention Zone for Low Quality Media',
      zenin: 'Yes — Explicit "Needs Human Review" safeguard',
      commercial: 'Binary Forced Output',
      manual: 'Inconsistent'
    },
    {
      feature: 'Data Privacy & Zero Retention',
      zenin: 'Zero Data Harvesting — Files Purged from RAM in 60s',
      commercial: 'Stored in commercial data silos',
      manual: 'Unsecured email attachments'
    }
  ];

  const faqs = [
    {
      q: "Why is Zenin 100% free compared to expensive commercial alternatives?",
      a: "Zenin was founded on the principle that digital authenticity and defense against synthetic deception are essential public goods. Commercial vendors charge per scan, creating high financial barriers for students, fraud victims, and public institutions. Zenin operates as free-first public verification infrastructure supported by open academic research."
    },
    {
      q: "Can Zenin guarantee 100% detection accuracy on all AI media?",
      a: "No, and any platform claiming 100% infallible detection is misleading. Generative AI models evolve constantly. Zenin provides multi-domain physical and mathematical signals (spectral FFT lattice, 8x8 DCT Error Level Analysis, acoustic vocoder truncation, blink frequency cadence) and includes an explicit Abstention Zone ('NEEDS HUMAN REVIEW') whenever low resolution prevents reliable classification."
    },
    {
      q: "How does the Deepfake Video and Audio Voice Clone detection work?",
      a: "For videos, our pipeline extracts frames at 30fps to measure temporal facial landmark micro-jitter, blink cadence anomalies, and boundary neck mask shearing. For audio, we compute Short-Time Fourier Transforms (STFT) to identify sharp high-frequency harmonic cutoffs (>16kHz) characteristic of neural vocoders like ElevenLabs."
    },
    {
      q: "How are uploaded files and privacy protected?",
      a: "All forensic analysis is executed strictly in volatile memory. Uploaded files are never used to train public AI models and are purged automatically once your analysis session concludes."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-left bg-[#FAFBFD] text-[#0B1B3D] selection:bg-[#C5A059]/20 selection:text-[#0B1B3D]">
      
      {/* 1. HERO SECTION: BLEACH-INSPIRED EDITORIAL HIGH-CONTRAST HEADER */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#0B1B3D]/10 bg-gradient-to-b from-white via-[#FAFBFD] to-[#F4F7FC]">
        
        {/* Subtle Ethereal Gold & Navy Light Accents */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-radial from-[#C5A059]/10 via-[#0B1B3D]/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-5 w-[500px] h-[300px] bg-radial from-[#0B1B3D]/5 via-[#C5A059]/8 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Headline & Pitch Container */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Top Gold Pill Category Ribbon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/40 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#0B1B3D] tracking-wide">
                100% Free Public Standard • Digital Authenticity Intelligence
              </span>
            </div>

            {/* Bleach-style Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0B1B3D] tracking-tight leading-[1.08] font-display">
              Digital Authenticity in the Age of{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#0B1B3D] via-[#1E3A8A] to-[#C5A059] bg-clip-text text-transparent">
                  Synthetic Reality.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#3E5274] leading-relaxed max-w-3xl mx-auto font-sans font-normal">
              Screen photos, deepfake videos, cloned voices, and altered documents in real time. Powered by multi-domain spectral decomposition, cryptographic tamper seals, and zero paywalls.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/verify/image"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-[#FAFBFD] bg-[#0B1B3D] hover:bg-[#152B5B] shadow-[0_6px_24px_rgba(11,27,61,0.2)] border border-[#C5A059]/60 transition-all cursor-pointer active:scale-95 group"
              >
                <Scan className="w-4 h-4 text-[#C5A059] group-hover:rotate-90 transition-transform duration-300" />
                <span>Launch Free Scanner</span>
              </Link>

              <a
                href="#engines-grid"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-[#0B1B3D] bg-white hover:bg-[#F0F4FA] border border-[#0B1B3D]/15 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <span>Explore 7 Forensic Engines</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </a>
            </div>

          </div>

          {/* THE PRODUCT INTERFACE COMES FIRST (FRONT AND CENTER!) */}
          <div className="pt-2 max-w-5xl mx-auto">
            <HeroScannerWidget />
          </div>

        </div>
      </section>

      {/* 2. SCROLLING DOWN EXPERIENCE: 7-ENGINE DETECTION ARSENAL BENTO GRID */}
      <section id="engines-grid" className="py-24 border-b border-[#0B1B3D]/10 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059] block">
              CHAPTER 01 // FORENSIC ARSENAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1B3D] tracking-tight font-display">
              7 Specialized Engines. One Unified Standard.
            </h2>
            <p className="text-sm sm:text-base text-[#556987] leading-relaxed">
              Every digital modality exhibits unique physical and mathematical signatures when manipulated. Zenin deploys specialized forensic detectors designed for each threat vector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectionEngines.map((engine, idx) => {
              const Icon = engine.icon;
              return (
                <Link
                  key={idx}
                  to={engine.link}
                  className={`group relative p-7 rounded-3xl bg-[#FAFBFD] border border-[#0B1B3D]/10 ${engine.borderGlow} transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(11,27,61,0.06)] hover:shadow-[0_12px_30px_rgba(197,160,89,0.15)] flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-[#0B1B3D] text-[#C5A059] shadow-sm border border-[#C5A059]/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#0B1B3D] bg-white px-2.5 py-1 rounded-md border border-[#0B1B3D]/15">
                        {engine.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#0B1B3D] font-display group-hover:text-[#C5A059] transition-colors">
                        {engine.title}
                      </h3>
                      <p className="text-xs text-[#556987] leading-relaxed">
                        {engine.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#0B1B3D]/8 flex items-center justify-between text-xs font-bold text-[#3E5274] group-hover:text-[#0B1B3D]">
                    <span className="font-mono text-[11px] text-[#64748B]">{engine.speed}</span>
                    <span className="flex items-center gap-1 text-[#C5A059] group-hover:translate-x-1 transition-transform font-bold">
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
      <section className="py-24 border-b border-[#0B1B3D]/10 bg-[#FAFBFD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059] block">
              CHAPTER 02 // SPECTRAL DECOMPOSITION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1B3D] tracking-tight font-display">
              See Beyond Human Perception
            </h2>
            <p className="text-sm sm:text-base text-[#556987] leading-relaxed">
              Diffusion models and deepfakes look seamless to the naked eye. Under 2D Fourier spectral decomposition and 8x8 DCT Error Level Analysis, algorithmic fingerprints become unmistakable.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ForensicComparator />
          </div>

        </div>
      </section>

      {/* 4. COMPARISON MATRIX: ZENIN VS COMMERCIAL PAYWALLS VS MANUAL */}
      <section className="py-24 border-b border-[#0B1B3D]/10 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059] block">
              CHAPTER 03 // ARCHITECTURE & ETHICS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1B3D] tracking-tight font-display">
              Engineered as a Public Defense Standard
            </h2>
            <p className="text-sm sm:text-base text-[#556987] leading-relaxed">
              Why pay commercial vendors up to $0.79 per scan when truth should be accessible to every citizen, student, and investigator?
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#0B1B3D]/15 bg-[#FAFBFD] shadow-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0B1B3D] text-[#FAFBFD] font-bold uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="py-4 px-6">Verification Dimension</th>
                  <th className="py-4 px-6 text-[#C5A059] font-black">Zenin (Free Public Standard)</th>
                  <th className="py-4 px-6 text-slate-300">Commercial Vendors</th>
                  <th className="py-4 px-6 text-slate-300">Manual Eyeball Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1B3D]/10">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B1B3D]">{row.feature}</td>
                    <td className="py-4 px-6 font-bold text-[#0B1B3D] flex items-center gap-1.5 bg-[#FAF6EE]/50">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{row.zenin}</span>
                    </td>
                    <td className="py-4 px-6 text-[#64748B]">{row.commercial}</td>
                    <td className="py-4 px-6 text-[#64748B]">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION */}
      <section className="py-24 border-b border-[#0B1B3D]/10 bg-[#FAFBFD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059] block">
              TRANSPARENCY & METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = selectedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-[#0B1B3D]/10 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F7FC]"
                  >
                    <span className="text-sm font-bold text-[#0B1B3D] font-display">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#C5A059]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="p-5 pt-0 text-xs text-[#556987] leading-relaxed border-t border-[#0B1B3D]/5">
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
      <section className="py-20 bg-gradient-to-b from-[#FAFBFD] via-white to-[#F0F4FA] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="p-10 rounded-3xl bg-[#0B1B3D] text-[#FAFBFD] border border-[#C5A059]/40 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient Gold Corner Reticles */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#C5A059]" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#C5A059]" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#C5A059]" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#C5A059]" />

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Start Screening Media in Seconds.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              No registration or credit card required. Free forever for individuals, students, investigators, and organizations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/verify/image"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-[#071530] bg-[#C5A059] hover:bg-[#D4AF37] shadow-xl border border-[#F2D06B] transition-all cursor-pointer active:scale-95"
              >
                Launch Verification Workbench
              </Link>

              <Link
                to="/sos"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-sm transition-all cursor-pointer active:scale-95"
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
