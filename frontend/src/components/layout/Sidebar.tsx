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
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { TruthLensIcon } from '../brand/Logo';

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
      label: 'AI Image Detector',
      icon: Eye,
      badge: 'Spectral ELA',
      badgeColor: 'bg-[#A50044]/20 text-[#FF4D6D] border-[#A50044]/40',
      subtitle: 'Midjourney, Diffusion & GANs'
    },
    {
      to: '/verify/video',
      label: 'Deepfake Video Radar',
      icon: Video,
      badge: 'Biometric',
      badgeColor: 'bg-[#004D98]/20 text-[#60A5FA] border-[#004D98]/40',
      subtitle: 'Face-swaps & Temporal Glitches'
    },
    {
      to: '/verify/voice',
      label: 'AI Voice Clone Detector',
      icon: Mic,
      badge: 'Acoustic',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      subtitle: 'ElevenLabs & Neural Vocoders'
    },
    {
      to: '/verify/text',
      label: 'AI Text & Essay Scanner',
      icon: FileCode,
      badge: 'Perplexity',
      badgeColor: 'bg-[#A50044]/20 text-[#FF4D6D] border-[#A50044]/40',
      subtitle: 'ChatGPT, Claude & Burstiness'
    },
    {
      to: '/verify/certificate',
      label: 'PDF & Document Engine',
      icon: FileText,
      badge: 'OCR & Dates',
      badgeColor: 'bg-[#EDBB00]/20 text-[#FFD700] border-[#EDBB00]/40',
      subtitle: 'Medical Leave & Clearances'
    },
    {
      to: '/verify/invoice',
      label: 'Receipt & Expense Tamper',
      icon: Receipt,
      badge: 'Financial',
      badgeColor: 'bg-[#EDBB00]/20 text-[#FFD700] border-[#EDBB00]/40',
      subtitle: 'Photoshop Font & Math Audit'
    },
    {
      to: '/verify/kyc',
      label: 'KYC & ID Card Scanner',
      icon: CreditCard,
      badge: 'Security',
      badgeColor: 'bg-[#004D98]/20 text-[#60A5FA] border-[#004D98]/40',
      subtitle: 'Passports & National IDs'
    }
  ];

  const governanceItems: NavItem[] = [
    {
      to: '/university',
      label: 'University & Review Desk',
      icon: GraduationCap,
      badge: 'Queue',
      badgeColor: 'bg-[#EDBB00]/20 text-[#FFD700] border-[#EDBB00]/40',
      subtitle: 'Human Evaluator Portal'
    },
    {
      to: '/dashboard/reports/job-demo-deepfake-01',
      label: 'HMAC Cryptographic Ledger',
      icon: Share2,
      badge: 'SHA-256',
      badgeColor: 'bg-[#004D98]/20 text-[#60A5FA] border-[#004D98]/40',
      subtitle: 'Tamper-Evident Proof'
    },
    {
      to: '/accuracy',
      label: 'Model Accuracy & ROC AUC',
      icon: BarChart3,
      badge: '97.4%',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
      subtitle: 'Calibration & Benchmarks'
    }
  ];

  const safetyItems: NavItem[] = [
    {
      to: '/sos',
      label: 'Victim SOS Emergency',
      icon: AlertOctagon,
      highlight: true,
      badge: '1930 Helpline',
      badgeColor: 'bg-[#A50044] text-white border-white/40 shadow-[0_0_10px_#A50044]',
      subtitle: 'Instant Cyber Police Kit'
    },
    {
      to: '/learn',
      label: 'TruthLens Academy',
      icon: BookOpen,
      badge: 'Quizzes',
      badgeColor: 'bg-[#EDBB00]/20 text-[#FFD700] border-[#EDBB00]/40',
      subtitle: 'Interactive Spot-the-Fake'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="space-y-1.5 pt-4">
      <div className="flex items-center justify-between px-3 mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#EDBB00]/90 font-mono flex items-center gap-1.5">
          <span className="text-[#EDBB00]">★</span>
          <span>{title}</span>
        </span>
        <span className="text-[9px] font-mono text-slate-400 font-bold">100% FREE</span>
      </div>

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
                ? 'bg-gradient-to-r from-[#A50044] via-[#800030] to-[#0A1128] text-white shadow-[0_4px_24px_rgba(165,0,68,0.4)] border-l-4 border-[#EDBB00]'
                : item.highlight
                ? 'text-white bg-[#A50044]/25 hover:bg-[#A50044]/35 border border-[#A50044]/50 shadow-[0_0_14px_rgba(165,0,68,0.25)]'
                : 'text-slate-300 hover:text-white hover:bg-white/6 hover:border-slate-700/60'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 transition-all ${
              active 
                ? 'bg-white/20 text-white' 
                : item.highlight
                ? 'bg-[#A50044] text-white shadow-md'
                : 'bg-white/5 text-slate-300 group-hover:text-[#EDBB00] group-hover:bg-white/10'
            }`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="truncate leading-tight font-display">{item.label}</span>
                {item.subtitle && (
                  <span className={`text-[10px] truncate leading-tight mt-0.5 ${
                    active ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {item.subtitle}
                  </span>
                )}
              </div>

              {item.badge && (
                <span className={`text-[9px] uppercase font-mono font-extrabold px-1.5 py-0.5 rounded-md ml-2 shrink-0 border ${
                  active 
                    ? 'bg-white/20 text-white border-white/40' 
                    : item.badgeColor || 'bg-white/10 text-slate-300 border-white/15'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        );
      })}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Slide-Out Glass Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-84 max-w-[90vw] h-full bg-[#070D1E]/95 backdrop-blur-2xl border-r border-white/10 text-white shadow-[0_0_80px_rgba(0,0,0,0.9)] z-10 flex flex-col overflow-hidden"
          >
            {/* Ambient Sapphire & Garnet Glow */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#A50044]/20 via-[#004D98]/15 to-transparent pointer-events-none" />

            {/* Drawer Header */}
            <div className="h-18 px-5 flex items-center justify-between border-b border-white/10 shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <TruthLensIcon size={34} />
                <div className="flex flex-col">
                  <span className="text-sm font-black font-display tracking-tight text-white">
                    Truth<span className="bg-gradient-to-r from-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">Lens</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Forensic Workspace</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                    ? 'bg-gradient-to-r from-[#A50044] via-[#800030] to-[#0A1128] text-white shadow-lg border-l-4 border-[#EDBB00]'
                    : 'text-slate-300 hover:text-white hover:bg-white/6'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  location.pathname === '/' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-300 group-hover:text-[#EDBB00]'
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="font-display">Home & Live Workbench</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    LIVE
                  </span>
                </div>
              </Link>

              {renderNavGroup('DETECTION ARSENAL', detectionEngines)}
              {renderNavGroup('GOVERNANCE & TRUST', governanceItems)}
              {renderNavGroup('SAFETY & COMMUNITY', safetyItems)}
            </div>

            {/* Drawer Footer Banner */}
            <div className="p-4 border-t border-white/10 bg-[#050914] relative z-10 shrink-0 space-y-2.5">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#004D98]/20 via-[#0A1128] to-[#A50044]/25 border border-white/10 space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-[#EDBB00] uppercase tracking-wider flex items-center gap-1">
                    <span>★</span>
                    <span>100% Free Public Good</span>
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Open cryptographic digital authenticity infrastructure. Zero subscriptions, zero paywalls.
                </p>
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                <Link to="/about" onClick={onClose} className="hover:text-white transition-colors">Methodology</Link>
                <Link to="/privacy" onClick={onClose} className="hover:text-white transition-colors">Zero-Harvesting</Link>
                <Link to="/accessibility" onClick={onClose} className="hover:text-white transition-colors">WCAG 2.1 AA</Link>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
