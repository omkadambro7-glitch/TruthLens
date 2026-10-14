import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  FileText, 
  AlertOctagon, 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Home, 
  Share2, 
  X, 
  Sparkles, 
  Lock, 
  HelpCircle, 
  Video, 
  Mic, 
  FileCode, 
  Receipt, 
  CreditCard, 
  Scan, 
  ChevronRight,
  ShieldAlert,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { MahiraIcon, MahiraLogo } from '../brand/Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | null;
  badgeColor?: string;
  subtitle?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();
  const { isDemo, user } = useAuth();
  const location = useLocation();

  const detectionEngines: NavItem[] = [
    {
      to: '/verify/image',
      label: 'AI Image & Diffusion ELA',
      icon: Eye,
      badge: 'Spectral ELA',
      badgeColor: 'bg-[#0B1B3D] text-[#C5A059] border-[#C5A059]/40',
      subtitle: 'Midjourney, Flux, Stable Diffusion & GANs'
    },
    {
      to: '/verify/video',
      label: 'Deepfake Video Radar',
      icon: Video,
      badge: 'Biometric',
      badgeColor: 'bg-[#0B1B3D] text-[#60A5FA] border-[#0B1B3D]/30',
      subtitle: 'Face-swaps & Temporal Landmark Jitter'
    },
    {
      to: '/verify/voice',
      label: 'AI Voice Clone Detector',
      icon: Mic,
      badge: 'Acoustic',
      badgeColor: 'bg-[#C5A059]/15 text-[#9A7B38] border-[#C5A059]/40',
      subtitle: 'ElevenLabs & 16kHz Neural Vocoders'
    },
    {
      to: '/verify/text',
      label: 'AI Text & Essay Scanner',
      icon: FileCode,
      badge: 'Perplexity',
      badgeColor: 'bg-[#0B1B3D] text-[#93C5FD] border-[#0B1B3D]/20',
      subtitle: 'ChatGPT, Claude & Sentence Burstiness'
    },
    {
      to: '/verify/certificate',
      label: 'PDF & Document Engine',
      icon: FileText,
      badge: 'OCR & Dates',
      badgeColor: 'bg-[#C5A059]/15 text-[#9A7B38] border-[#C5A059]/40',
      subtitle: 'Medical Leave & Official Clearances'
    },
    {
      to: '/verify/invoice',
      label: 'Receipt & Expense Tamper',
      icon: Receipt,
      badge: 'Financial',
      badgeColor: 'bg-[#0B1B3D] text-[#C5A059] border-[#C5A059]/40',
      subtitle: 'Photoshop Font & Mathematical Sum Audit'
    },
    {
      to: '/verify/kyc',
      label: 'KYC & ID Card Authenticator',
      icon: CreditCard,
      badge: 'Security',
      badgeColor: 'bg-[#0B1B3D] text-[#60A5FA] border-[#0B1B3D]/20',
      subtitle: 'ICAO 9303 MRZ & Ghost Watermarks'
    }
  ];

  const governanceItems: NavItem[] = [
    {
      to: '/university',
      label: 'Reviewer Desk & Portal',
      icon: GraduationCap,
      badge: 'Queue',
      badgeColor: 'bg-[#C5A059]/15 text-[#9A7B38] border-[#C5A059]/40',
      subtitle: 'Human Evaluator Queue & Multi-sign'
    },
    {
      to: '/dashboard/reports/job-demo-deepfake-01',
      label: 'HMAC Cryptographic Ledger',
      icon: Share2,
      badge: 'SHA-256',
      badgeColor: 'bg-[#0B1B3D] text-[#93C5FD] border-[#0B1B3D]/20',
      subtitle: 'Tamper-Evident Court Proof'
    },
    {
      to: '/accuracy',
      label: 'Model Accuracy & ROC AUC',
      icon: BarChart3,
      badge: '97.4%',
      badgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
      subtitle: 'Calibration, F1-Scores & Benchmarks'
    }
  ];

  const safetyItems: NavItem[] = [
    {
      to: '/sos',
      label: 'Victim SOS Emergency Desk',
      icon: AlertOctagon,
      highlight: true,
      badge: '1930 Helpline',
      badgeColor: 'bg-[#0B1B3D] text-[#C5A059] border-[#C5A059]/50 shadow-xs',
      subtitle: 'Instant Indian Cyber Police Kit'
    },
    {
      to: '/learn',
      label: 'Mahira Defense Academy',
      icon: BookOpen,
      badge: 'Quizzes',
      badgeColor: 'bg-[#C5A059]/15 text-[#9A7B38] border-[#C5A059]/40',
      subtitle: 'Interactive Spot-the-Deepfake Modules'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderNavGroup = (chapterNumber: string, title: string, items: NavItem[]) => (
    <div className="space-y-2 pt-5">
      <div className="flex items-center justify-between px-3 mb-1">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#0B1B3D] flex items-center gap-1.5 uppercase">
          <span className="text-[#C5A059] font-black">{chapterNumber}</span>
          <span>// {title}</span>
        </span>
        <span className="text-[9px] font-mono text-[#C5A059] font-bold bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#C5A059]/30">
          FREE
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group relative ${
                active
                  ? 'bg-[#0B1B3D] text-[#FAFBFD] shadow-md border-l-4 border-[#C5A059]'
                  : item.highlight
                  ? 'text-[#0B1B3D] bg-[#FAF6EE] hover:bg-[#F2ECE0] border border-[#C5A059]/50 shadow-xs'
                  : 'text-[#3E5274] hover:text-[#0B1B3D] hover:bg-[#F0F4FA] border border-transparent'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 transition-all ${
                active 
                  ? 'bg-[#C5A059] text-[#0B1B3D]' 
                  : item.highlight
                  ? 'bg-[#0B1B3D] text-[#C5A059]'
                  : 'bg-[#FAFBFD] text-[#0B1B3D] group-hover:bg-[#0B1B3D] group-hover:text-[#C5A059] border border-[#0B1B3D]/10'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex items-center justify-between flex-1 min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className={`truncate leading-tight font-sans ${active ? 'text-white' : 'text-[#0B1B3D]'}`}>
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span className={`text-[10px] truncate leading-tight mt-0.5 ${
                      active ? 'text-slate-300' : 'text-[#64748B]'
                    }`}>
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {item.badge && (
                  <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md ml-2 shrink-0 border ${
                    active 
                      ? 'bg-white/15 text-white border-white/30' 
                      : item.badgeColor || 'bg-white text-[#3E5274] border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-start">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1B3D]/60 backdrop-blur-sm"
          />

          {/* Bleach Editorial Drawer Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-88 max-w-[92vw] h-full bg-[#FAFBFD] border-r border-[#0B1B3D]/15 text-[#0B1B3D] shadow-[0_20px_60px_rgba(11,27,61,0.25)] z-10 flex flex-col overflow-hidden"
          >
            {/* Top Navy Banner Accent with Gold Hairline */}
            <div className="h-1 bg-gradient-to-r from-[#0B1B3D] via-[#C5A059] to-[#0B1B3D]" />

            {/* Drawer Header */}
            <div className="h-18 px-5 flex items-center justify-between border-b border-[#0B1B3D]/10 bg-white shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <MahiraIcon size={34} />
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-[#0B1B3D] font-display">
                    Mahira<span className="text-[#C5A059]">.</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
                    Forensic Intelligence • 2026
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-[#F0F4FA] hover:bg-[#E2E8F0] text-[#0B1B3D] transition-colors cursor-pointer border border-[#0B1B3D]/10"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Scroller */}
            <div className="flex-1 py-4 px-4 overflow-y-auto space-y-1 relative z-10 custom-sidebar-scroll">
              {/* Home Trigger */}
              <Link
                to="/"
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group ${
                  location.pathname === '/'
                    ? 'bg-[#0B1B3D] text-[#FAFBFD] shadow-md border-l-4 border-[#C5A059]'
                    : 'text-[#3E5274] hover:text-[#0B1B3D] hover:bg-[#F0F4FA]'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  location.pathname === '/' ? 'bg-[#C5A059] text-[#0B1B3D]' : 'bg-[#FAFBFD] text-[#0B1B3D] group-hover:bg-[#0B1B3D] group-hover:text-[#C5A059] border border-[#0B1B3D]/10'
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="font-display">Home & Live Cockpit</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              </Link>

              {renderNavGroup('01', 'DETECTION ARSENAL', detectionEngines)}
              {renderNavGroup('02', 'GOVERNANCE & TRUST', governanceItems)}
              {renderNavGroup('03', 'SAFETY & CITADEL', safetyItems)}
            </div>

            {/* Drawer Footer Banner & Direct Authentication Actions */}
            <div className="p-4 border-t border-[#0B1B3D]/10 bg-white relative z-10 shrink-0 space-y-3">
              {/* Direct Auth Shortcuts so user ALWAYS sees Sign In / Account */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F0F4FA] hover:bg-[#E2E8F0] border border-[#0B1B3D]/15 text-xs font-bold text-[#0B1B3D] transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] border border-[#C5A059]/40 text-xs font-bold transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Register</span>
                </Link>
              </div>

              {/* Public Good Guarantee Box */}
              <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#C5A059]/30 space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#9A7B38] uppercase tracking-wider flex items-center gap-1">
                    <span>★</span>
                    <span>100% Free Public Good</span>
                  </span>
                  <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-100/60 px-1 rounded">SECURED</span>
                </div>
                <p className="text-[10px] text-[#556987] leading-relaxed">
                  Cryptographic digital authenticity standard. No paywalls, zero data harvesting.
                </p>
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-between text-[10px] text-[#64748B] px-1 font-medium">
                <Link to="/about" onClick={onClose} className="hover:text-[#0B1B3D] transition-colors">Methodology</Link>
                <Link to="/privacy" onClick={onClose} className="hover:text-[#0B1B3D] transition-colors">Zero-Harvesting</Link>
                <Link to="/accessibility" onClick={onClose} className="hover:text-[#0B1B3D] transition-colors">WCAG 2.1 AA</Link>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
