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
  GraduationCap
} from 'lucide-react';
import { TruthLensIcon } from '../components/brand/Logo';
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

  const handleExploreDemoClick = () => {
    loginAsDemo('reviewer');
    navigate('/university');
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
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Subtle royal background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#C6A45C]/10 via-[#233F8C]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Royal Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] px-3.5 py-1.5 rounded-full w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
              <span className="text-xs font-bold text-[#101B35] tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#101B35] leading-[1.12] font-serif-display">
              {t('hero.title_part1')} <br />
              <span className="royal-gradient-text">{t('hero.title_part2')}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#687386] leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/verify/image"
                className="bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-xl shadow-md hover:shadow-xl hover:border-[#C6A45C] border border-transparent transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#E6D5A2]" />
                <span>{t('hero.cta_image')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/verify/certificate"
                className="bg-white border-2 border-[#101B35] text-[#101B35] hover:bg-[#F6F4EE] hover:border-[#233F8C] font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-xs"
              >
                <FileCheck2 className="w-4 h-4 text-[#233F8C]" />
                <span>{t('hero.cta_certificate')}</span>
              </Link>

              <button
                onClick={handleExploreDemoClick}
                className="bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] hover:bg-[#F5EFD7] font-bold text-xs sm:text-sm px-5 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C6A45C]" />
                <span>{t('hero.explore_demo')}</span>
              </button>
            </div>

            {/* Honest Uncertainty Disclaimer */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-[#737D90]">
              <Shield className="w-4 h-4 text-[#C6A45C] shrink-0" />
              <span>{t('hero.safeguard')}</span>
            </div>
          </motion.div>

          {/* Right Column: Real Interactive Upload Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="royal-card p-6 sm:p-7 bg-white border border-[#E8E5DC] relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#F1EFE8] mb-5">
                <div className="flex items-center gap-2.5">
                  <TruthLensIcon size={30} />
                  <span className="font-bold text-sm text-[#101B35] font-sans">
                    {t('hero.quick_lens')}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#101B35] bg-[#FBF8EE] border border-[#E6D5A2] px-2.5 py-0.5 rounded-full">
                  Verified Engine
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-7 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-[#233F8C] bg-[#EEF3FF] scale-[1.01]' 
                    : 'border-[#D8D4C7] hover:border-[#C6A45C] hover:bg-[#FAF9F6]'
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
                <div className="w-13 h-13 rounded-2xl bg-[#F6F4EE] text-[#101B35] border border-[#E8E5DC] flex items-center justify-center mb-3 shadow-xs">
                  <Upload className="w-5 h-5 text-[#233F8C]" />
                </div>
                <p className="text-sm font-bold text-[#101B35] mb-1">
                  {t('hero.drop_title')}
                </p>
                <p className="text-xs text-[#687386] max-w-xs leading-relaxed">
                  {t('hero.drop_sub')}
                </p>
                <button
                  type="button"
                  className="mt-4 text-xs font-bold text-[#101B35] bg-white border border-[#D8D4C7] px-4 py-2 rounded-xl shadow-xs hover:border-[#C6A45C] hover:bg-[#FBF8EE] transition-all cursor-pointer"
                >
                  {t('hero.browse_files')}
                </button>
              </div>

              {/* Direct Demo Test Shortcuts */}
              <div className="mt-4 pt-3.5 border-t border-[#F1EFE8] flex items-center justify-between text-xs">
                <span className="text-[#737D90] font-medium">Or test sample:</span>
                <div className="flex items-center gap-2">
                  <Link 
                    to="/verify/image?sample=deepfake" 
                    className="text-[11px] font-bold text-[#DC2626] bg-[#FEF2F2] px-2 py-1 rounded-lg border border-red-200 hover:bg-red-100"
                  >
                    AI Deepfake
                  </Link>
                  <Link 
                    to="/verify/image?sample=real" 
                    className="text-[11px] font-bold text-[#1E824C] bg-[#EDF7F1] px-2 py-1 rounded-lg border border-green-200 hover:bg-green-100"
                  >
                    Authentic
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-[#E8E5DC] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#233F8C] mb-2">
              Transparent Methodology
            </h2>
            <h3 className="text-3xl font-extrabold text-[#101B35] font-serif-display">
              {t('steps.title')}
            </h3>
            <p className="text-xs text-[#687386] mt-2">
              {t('steps.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="royal-card p-8 bg-[#FAF9F6] relative flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-[#101B35]/20 font-serif-display">01</span>
              <h4 className="text-base font-bold text-[#101B35]">{t('steps.step1_title')}</h4>
              <p className="text-xs text-[#687386] leading-relaxed">
                {t('steps.step1_desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="royal-card p-8 bg-[#FAF9F6] relative flex flex-col gap-3 border-[#C6A45C]/40">
              <span className="text-4xl font-extrabold text-[#C6A45C]/40 font-serif-display">02</span>
              <h4 className="text-base font-bold text-[#101B35]">{t('steps.step2_title')}</h4>
              <p className="text-xs text-[#687386] leading-relaxed">
                {t('steps.step2_desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="royal-card p-8 bg-[#FAF9F6] relative flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-[#233F8C]/30 font-serif-display">03</span>
              <h4 className="text-base font-bold text-[#101B35]">{t('steps.step3_title')}</h4>
              <p className="text-xs text-[#687386] leading-relaxed">
                {t('steps.step3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#C6A45C] mb-2 font-bold">
            Built for High-Stakes Reality
          </h2>
          <h3 className="text-3xl font-extrabold text-[#101B35] font-serif-display">
            Comprehensive Verification Modules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: AI Image Detection */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EEF3FF] text-[#233F8C] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">{t('image.title')}</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              {t('image.subtitle')}
            </p>
            <Link to="/verify/image" className="mt-auto pt-4 text-xs font-bold text-[#233F8C] hover:text-[#101B35] flex items-center gap-1">
              <span>{t('hero.cta_image')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Medical Certificate Pre-Check */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FBF8EE] text-[#C6A45C] flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">{t('cert.title')}</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              {t('cert.subtitle')}
            </p>
            <Link to="/verify/certificate" className="mt-auto pt-4 text-xs font-bold text-[#233F8C] hover:text-[#101B35] flex items-center gap-1">
              <span>{t('hero.cta_certificate')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Victim SOS Center */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3 border-red-200">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">{t('nav.sos')}</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              100% private, local incident checklists, takedown demand templates, and 24/7 official helplines (India 1930 / US CyberTipline).
            </p>
            <Link to="/sos" className="mt-auto pt-4 text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1">
              <span>Access SOS Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: University Workspace */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F6F4EE] text-[#101B35] flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">{t('univ.title')}</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              {t('univ.subtitle')}
            </p>
            <Link to="/university" className="mt-auto pt-4 text-xs font-bold text-[#233F8C] hover:text-[#101B35] flex items-center gap-1">
              <span>Open Review Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Media Literacy & Game */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EEF3FF] text-[#233F8C] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">{t('learn.title')}</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              Interactive Spot-the-Fake challenge, corneal reflection guides, and community media education.
            </p>
            <Link to="/learn" className="mt-auto pt-4 text-xs font-bold text-[#233F8C] hover:text-[#101B35] flex items-center gap-1">
              <span>Play Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6: Privacy by Design */}
          <div className="royal-card p-7 bg-white flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EDF7F1] text-[#1E824C] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#101B35]">Zero-Leakage Privacy</h4>
            <p className="text-xs text-[#687386] leading-relaxed">
              Anti-SSRF IP filtering, in-memory forensic execution, and no data harvesting for model retraining.
            </p>
            <Link to="/privacy" className="mt-auto pt-4 text-xs font-bold text-[#1E824C] hover:underline flex items-center gap-1">
              <span>Review Privacy Guarantees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white border-t border-[#E8E5DC] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#233F8C] mb-2 font-bold">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl font-extrabold text-[#101B35] font-serif-display">
              Honest Answers About Digital Authenticity
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = selectedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="royal-card bg-[#FAF9F6] border border-[#E8E5DC] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setSelectedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#101B35] hover:text-[#233F8C] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#737D90] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#687386] leading-relaxed border-t border-[#F1EFE8] pt-4">
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
