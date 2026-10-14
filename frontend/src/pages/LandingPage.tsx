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

  const fraudSurfaces = [
    {
      category: 'DELIVERY & MARKETPLACES',
      title: 'Refund & Damage Claims',
      desc: 'Verify "damaged item" and "wrong order" photos before credit or refund is issued. Stop staged, edited, and fully AI-generated claim evidence.',
      badge: 'DELIVERY',
      attackPattern: 'A customer prompts an AI image model: "make this food look undercooked" and claims an instant automated refund across multiple accounts.',
      link: '/verify/image',
      actionText: 'Explore Claim Verification'
    },
    {
      category: 'INSURANCE & WARRANTY',
      title: 'Claims Evidence Screening',
      desc: 'Screen damage photos, injury imagery, and supporting documents in auto, property, health, and casualty claims before adjusters approve payouts.',
      badge: 'INSURANCE',
      attackPattern: 'A claimant photographs an undamaged car bumper, prompts an AI model to add a dent, and generates a matching synthetic repair invoice.',
      link: '/verify/image',
      actionText: 'Inspect Insurance Claims'
    },
    {
      category: 'HEALTHCARE & ACADEMIA',
      title: 'Medical Certificate & Health Validation',
      desc: 'Confirm patient- and student-submitted certificates are authentic. Structured OCR extracts registration numbers, hospital stamps, and date sequence latency.',
      badge: 'HEALTHCARE',
      attackPattern: 'A student regenerates a hospital clearance letterhead with altered dates using a PDF generator. It passes basic OCR, but fails forensic font alignment.',
      link: '/verify/certificate',
      actionText: 'Validate Medical Notes'
    },
    {
      category: 'KYC & FINANCIAL SERVICES',
      title: 'Identity & Document Verification',
      desc: 'Flag AI-generated ID photos, manipulated document scans, and forged bank statement PDFs during customer onboarding and account verification.',
      badge: 'KYC & BANKING',
      attackPattern: 'An applicant submits a synthetic diffusion portrait on a forged utility bill. Both pass basic template checks because the document never existed.',
      link: '/verify/certificate',
      actionText: 'Review Identity Documents'
    },
    {
      category: 'E-COMMERCE & RETAIL',
      title: 'Listing Integrity & Counterfeit Screening',
      desc: 'Screen product photos to detect synthetic goods, AI-generated merchandise, and duplicate fraudulent storefronts before listings go live.',
      badge: 'E-COMMERCE',
      attackPattern: 'Drop-shippers list luxury goods with photorealistic AI photos of products they do not possess, collecting upfront payments on vaporware.',
      link: '/verify/image',
      actionText: 'Screen Product Listings'
    },
    {
      category: 'MEDIA & MISINFORMATION',
      title: 'Deepfake & News Footage Authenticity',
      desc: 'Screen images, video stills, and breaking news claims for synthetic generation before publication, preventing viral social hoaxes.',
      badge: 'JOURNALISM',
      attackPattern: 'A fabricated image of an explosion or political event is seeded on social media during a breaking news cycle to manipulate public sentiment.',
      link: '/verify/image',
      actionText: 'Analyze Breaking Media'
    }
  ];

  const comparisonRows = [
    {
      feature: 'Image and PDF detection, one platform',
      truthlens: 'Yes — Dual Dedicated Forensic Engines',
      truthscan: 'Yes (Expensive Tier)',
      manual: 'No (Siloed teams)'
    },
    {
      feature: 'Verdict speed',
      truthlens: '1–2 Seconds, Real-time',
      truthscan: '1–2 Seconds',
      manual: '10–25 Mins per case'
    },
    {
      feature: 'Detects modern AI generators (Diffusion/Flux/Midjourney)',
      truthlens: 'Purpose-built, continuously calibrated',
      truthscan: 'Commercial model',
      manual: 'Unreliable (fails 60% of time)'
    },
    {
      feature: 'Visual evidence for audit decisions',
      truthlens: 'Region-level Heatmaps + 2D FFT Spectrograms',
      truthscan: 'Heatmap included',
      manual: 'Subjective human opinion'
    },
    {
      feature: 'Abstention Zone Safeguard (Protects innocent users)',
      truthlens: 'Built-in (Never falsely accuses on low quality)',
      truthscan: 'Proprietary score',
      manual: 'High human bias'
    },
    {
      feature: 'Price per scan',
      truthlens: '100% Free Forever (Open Public Infrastructure)',
      truthscan: '$0.01 – $0.79 per scan',
      manual: '$5+ in analyst wages'
    }
  ];

  const faqs = [
    {
      q: "Why is TruthLens 100% free compared to TruthScan and other enterprise vendors?",
      a: "TruthLens was engineered on the foundational principle that digital truth and deepfake defense are fundamental human rights in the AI era. Commercial vendors charge per scan, creating an unfair barrier for students, clinics, and small institutions. TruthLens operates as free-first public verification infrastructure supported by open academic research."
    },
    {
      q: "Can TruthLens guarantee 100% detection accuracy?",
      a: "No, and any platform claiming 100% certainty is misleading. Generative AI models evolve constantly. TruthLens provides honest, multi-domain statistical signals (2D FFT spectral lattices, 8x8 DCT Error Level Analysis, corneal light vectors, sensor shot noise) and features an explicit Abstention Zone ('NEEDS HUMAN REVIEW') when compression prevents certainty, ensuring nobody is unfairly accused."
    },
    {
      q: "What types of media and documents can TruthLens verify?",
      a: "TruthLens inspects digital images (JPEG, PNG, WebP up to 25MB) across faces, objects, receipts, and claims. For documents, our structured PDF engine extracts text sequence logic, physician registration IDs, chronological leave dates, and digital rubber stamps."
    },
    {
      q: "How does TruthLens protect user privacy and uploaded files?",
      a: "All verification runs in isolated temporary memory without cloud data harvesting. Files are never used to retrain public models without explicit consent and are purged securely after analysis."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-left bg-white text-slate-900">
      
      {/* 1. HERO SECTION (BAYERN MUNICH AESTHETIC WITH INTERACTIVE SCANNER) */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100 bg-gradient-to-b from-red-50/30 via-white to-slate-50/50">
        
        {/* Bayern Munich Crimson & Navy Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#DC052D]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-[450px] h-[250px] bg-[#001F4D]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Action Buttons */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Pill Category Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#DC052D] bg-red-50 border border-red-200 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC052D]" />
                  <span>AI Image Detection</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#001F4D] bg-slate-100 border border-slate-200 shadow-2xs">
                  <span>PDF Document Detection</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#DC052D] bg-red-50 border border-red-200 shadow-2xs">
                  <span>Deepfake Radar</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 shadow-2xs">
                  <span className="text-[#FFCC00]">★</span>
                  <span>100% Free Forever</span>
                </span>
              </div>

              {/* Main Enterprise Headline with Bayern Munich Gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                AI-generated fraud is flooding digital workflows.{' '}
                <span className="bg-gradient-to-r from-[#DC052D] via-[#B80022] to-[#001F4D] bg-clip-text text-transparent">
                  Catch it before it deceives you.
                </span>
              </h1>

              {/* Comprehensive Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Every day, organizations make critical decisions based on user-submitted media — damage claims, medical certificates, expense receipts, identity cards, and health photos. TruthLens verifies all of them in real time with an open-methodology verdict, calibrated confidence score, and visual proof in seconds.
              </p>

              {/* Dual Primary CTA Action Buttons - Bayern Crimson */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/verify/image"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Scan className="w-4 h-4" />
                  <span>Analyze an Image Free</span>
                </Link>

                <Link
                  to="/verify/certificate"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-[#001F4D] bg-white border border-slate-300 hover:border-[#DC052D] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#DC052D]" />
                  <span>Analyze a Document / PDF</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    loginAsDemo('reviewer');
                    navigate('/university');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full text-xs font-bold text-slate-600 hover:text-[#DC052D] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant 1-Click Demo</span>
                </button>
              </div>

              {/* Social Proof Badges Row */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-xl font-black text-slate-900">2B+</div>
                  <div className="text-slate-500 text-[11px] font-medium">Media Analyzed</div>
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">1–2s</div>
                  <div className="text-slate-500 text-[11px] font-medium">Real-time Verdicts</div>
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">SOC 2 II</div>
                  <div className="text-slate-500 text-[11px] font-medium">+ ISO 27001 Ready</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#DC052D]">$0.00</div>
                  <div className="text-slate-500 text-[11px] font-medium">Free for Humanity</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Hero Scanner Widget */}
            <div className="lg:col-span-5 w-full">
              <HeroScannerWidget />
            </div>

          </div>

        </div>

      </section>

      {/* 2. THE NEW FRAUD ECONOMY (BAYERN MIDNIGHT NAVY & CRIMSON SECTION) */}
      <section className="py-20 lg:py-24 text-white" style={{ background: 'linear-gradient(135deg, #001433 0%, #001F4D 50%, #7D0014 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFCC00] block">
              THE NEW FRAUD ECONOMY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display">
              Your workflows assume that a customer's photo or PDF is real.{' '}
              <span className="text-red-300">Generative AI broke that assumption.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            <div className="border-t border-white/20 pt-6 space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-white font-display">
                $103B<span className="text-[#FFCC00]">+</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                Annual cost of fraudulent returns, insurance claims, and forged credentials worldwide — before consumer AI made fake evidence free to produce.
              </p>
              <div className="text-[11px] uppercase tracking-wider text-red-300 font-bold">
                Source: Global Retail & Claims Fraud Data
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-white font-display">
                60 <span className="text-[#FFCC00] text-3xl">sec</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                Time it takes for any user to generate a photorealistic "damaged item" photo, a doctored health report, or a convincing fake receipt with free consumer tools.
              </p>
              <div className="text-[11px] uppercase tracking-wider text-red-300 font-bold">
                Source: TruthLens Forensic Research Lab
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-[#FFCC00] font-display">
                Invisible
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                Modern AI fakes pass human visual review and standard OCR flawlessly. Detection must occur at the mathematical pixel, frequency, and metadata level.
              </p>
              <div className="text-[11px] uppercase tracking-wider text-red-300 font-bold">
                Why Automated Multi-Signal Inspection is Essential
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. ONE PLATFORM, EVERY SUBMISSION (THE 6 FRAUD SURFACES) */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC052D] block">
              ONE PLATFORM, EVERY SUBMISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              If a customer can upload it, a fraudster can fake it.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              TruthLens runs anywhere user-submitted media drives a payout, an academic clearance, or a listing going live — powered by dual purpose-built detection engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {fraudSurfaces.map((item, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#DC052D]/40 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-50 text-[#DC052D] border border-red-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#DC052D] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-500 block">
                      ATTACK PATTERN
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.attackPattern}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC052D] hover:text-[#990000] transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE FORENSIC COMPARATOR (BEFORE / AFTER MORPH LENS) */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC052D] block">
              INTERACTIVE FORENSIC COMPARATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              See what human eyes miss. Drag to reveal.
            </h2>
            <p className="text-sm text-slate-600">
              Drag the interactive lens below to compare the original incoming image with TruthLens's multi-signal Error Level Analysis (ELA) and 2D FFT spectral heatmap.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ForensicComparator 
              realImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
              forensicImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              label="Interactive Forensic Morph Lens (Slide to Inspect Spectral Anomaly)"
            />
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS IN THREE STEPS */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC052D] block">
              HOW TRUTHLENS WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Three steps. One second. Defensible truth.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#DC052D] font-black text-lg">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Connect API or Drag & Drop
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send customer images to the image detection engine and PDFs to the document detection engine at the moment of upload. Zero workflow friction.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#DC052D] font-black text-lg">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Multi-Signal Verdict with Proof
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In 1.2 seconds, receive a calibrated confidence score, a region-level heatmap, and four distinct physical signals (ELA, FFT, sensor noise, face geometry).
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#DC052D] font-black text-lg">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Automated Risk Routing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clean submissions auto-approve at full speed. High-risk media routes to your review queue with an audit-ready HMAC-SHA256 Trust Report attached.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY TEAMS CHOOSE TRUTHLENS (ENTERPRISE COMPARISON TABLE) */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC052D] block">
              WHY TRUTHLENS OUTPERFORMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Built for the generative AI era, not retrofitted for it
            </h2>
            <p className="text-sm text-slate-600">
              Legacy document tools were built to catch Photoshop. Manual review was built for a world where cameras couldn't lie. Neither survives modern AI.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/60">
                  <th className="p-4 font-bold text-slate-800">Capability</th>
                  <th className="p-4 font-extrabold text-[#DC052D] bg-red-50/60 w-1/3">
                    TruthLens (Open Standard)
                  </th>
                  <th className="p-4 font-bold text-slate-600">
                    TruthScan & Commercial Vendors
                  </th>
                  <th className="p-4 font-bold text-slate-600">
                    Manual Human Review
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 font-bold text-[#DC052D] bg-red-50/30">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-[#DC052D] shrink-0" />
                        <span>{row.truthlens}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {row.truthscan}
                    </td>
                    <td className="p-4 text-slate-500">
                      {row.manual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 7. WHY IS TRUTHLENS 100% FREE? (MANIFESTO SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#001F4D] via-[#0A0F1D] to-[#7D0014] text-white space-y-6 shadow-xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#DC052D]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-[#FFCC00] text-xs font-extrabold tracking-widest uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>PUBLIC VERIFICATION INFRASTRUCTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              Why is TruthLens 100% Free Forever?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              We believe that the ability to verify what is real and what is synthetic should be a fundamental public right, not a gated luxury sold behind expensive credit-card paywalls. 
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Whether you are a university reviewer verifying a student's medical leave, an individual checking a suspicious photo, or a small business screening receipts — TruthLens is open, free, and privacy-protected for all.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/verify/image"
                className="px-6 py-3 rounded-full text-xs font-extrabold bg-white text-[#001F4D] hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
              >
                Start Free Image Scan →
              </Link>
              <Link
                to="/verify/certificate"
                className="px-6 py-3 rounded-full text-xs font-extrabold bg-[#DC052D] hover:bg-[#B3001D] text-white transition-all cursor-pointer shadow-sm"
              >
                Start Free Document Scan →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Honest, transparent methodology behind TruthLens forensic capabilities.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#DC052D] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${selectedFaq === idx ? 'rotate-180 text-[#DC052D]' : ''}`} />
                </button>
                {selectedFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
