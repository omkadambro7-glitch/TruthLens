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
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Lock,
  HelpCircle,
  Video,
  Mic,
  FileCode,
  Receipt,
  CreditCard,
  Scan,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { TruthLensIcon } from '../brand/Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
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
  onToggle,
  isMobileOpen,
  onMobileClose,
}) => {
  const { t } = useLanguage();
  const { isDemo, user } = useAuth();
  const location = useLocation();

  // 1. Detection Engines (Full TruthScan + TruthLens Suite)
  const detectionEngines: NavItem[] = [
    {
      to: '/verify/image',
      label: 'AI Image Detector',
      icon: Eye,
      badge: 'Spectral ELA',
      badgeColor: 'bg-[#DC052D]/20 text-[#FF4D6D] border-[#DC052D]/40',
      subtitle: 'Midjourney & Diffusion'
    },
    {
      to: '/verify/certificate',
      label: 'PDF & Document Detector',
      icon: FileText,
      badge: 'OCR & Dates',
      badgeColor: 'bg-[#FFCC00]/20 text-[#FFD700] border-[#FFCC00]/40',
      subtitle: 'Medical, Invoices & Claims'
    },
    {
      to: '/verify/video',
      label: 'Deepfake Video Radar',
      icon: Video,
      badge: 'Biometric',
      badgeColor: 'bg-[#DC052D]/20 text-[#FF4D6D] border-[#DC052D]/40',
      subtitle: 'Face Swaps & Lip Sync'
    },
    {
      to: '/verify/voice',
      label: 'AI Voice Clone Detector',
      icon: Mic,
      badge: 'Acoustic',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      subtitle: 'ElevenLabs & Synthetic TTS'
    },
    {
      to: '/verify/text',
      label: 'AI Text & Essay Scanner',
      icon: FileCode,
      badge: 'Perplexity',
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
      subtitle: 'ChatGPT & Token Burstiness'
    },
    {
      to: '/verify/invoice',
      label: 'Receipt & Expense Tamper',
      icon: Receipt,
      badge: 'Financial',
      badgeColor: 'bg-[#FFCC00]/20 text-[#FFD700] border-[#FFCC00]/40',
      subtitle: 'Photoshop Inconsistency'
    },
    {
      to: '/verify/kyc',
      label: 'KYC & ID Card Scanner',
      icon: CreditCard,
      badge: 'Security',
      badgeColor: 'bg-[#DC052D]/20 text-[#FF4D6D] border-[#DC052D]/40',
      subtitle: 'Passports & National IDs'
    }
  ];

  // 2. Governance & Audit Trail
  const managementItems: NavItem[] = [
    {
      to: '/university',
      label: 'University & Review Portal',
      icon: GraduationCap,
      badge: 'Queue',
      badgeColor: 'bg-[#FFCC00]/20 text-[#FFD700] border-[#FFCC00]/40',
      subtitle: 'Human Evaluator Desk'
    },
    {
      to: '/dashboard/reports/job-demo-deepfake-01',
      label: 'HMAC Cryptographic Ledger',
      icon: Share2,
      badge: 'SHA-256',
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
      subtitle: 'Verifiable Proof Reports'
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

  // 3. Emergency & Education
  const educationAndHelp: NavItem[] = [
    {
      to: '/sos',
      label: 'Victim SOS Emergency',
      icon: AlertOctagon,
      highlight: true,
      badge: '1930 Helpline',
      badgeColor: 'bg-[#DC052D] text-white border-white/40 shadow-[0_0_8px_#DC052D]',
      subtitle: 'Immediate Cyber Assistance'
    },
    {
      to: '/learn',
      label: 'TruthLens Academy',
      icon: BookOpen,
      badge: 'Quizzes',
      badgeColor: 'bg-[#FFCC00]/20 text-[#FFD700] border-[#FFCC00]/40',
      subtitle: 'Field Guides & Training'
    }
  ];

  const secondaryItems = [
    { to: '/about', label: 'Open Methodology', icon: ShieldCheck },
    { to: '/privacy', label: 'Zero-Harvesting Shield', icon: Lock },
    { to: '/accessibility', label: 'WCAG 2.1 AA Certified', icon: HelpCircle }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    const cleanPath = path.split('?')[0];
    if (path.includes('?')) {
      return location.pathname === cleanPath && location.search === path.substring(cleanPath.length);
    }
    return location.pathname === cleanPath;
  };

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="space-y-1 pt-3.5">
      {isOpen && (
        <div className="flex items-center justify-between px-3 mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FFCC00]/90 font-display flex items-center gap-1.5">
            <span className="text-[#FFCC00]">★</span>
            <span>{title}</span>
          </span>
          <span className="text-[9px] font-mono text-slate-400">FREE</span>
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={isMobileOpen ? onMobileClose : undefined}
            title={!isOpen ? `${item.label} (${item.badge})` : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
              active
                ? 'bg-gradient-to-r from-[#DC052D] via-[#B80022] to-[#800014] text-white shadow-[0_4px_20px_rgba(220,5,45,0.4)] border-l-4 border-[#FFCC00]'
                : item.highlight
                ? 'text-white bg-[#DC052D]/20 hover:bg-[#DC052D]/30 border border-[#DC052D]/50 shadow-[0_0_12px_rgba(220,5,45,0.2)]'
                : 'text-slate-300 hover:text-white hover:bg-white/6 hover:border-slate-700/60'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 transition-all ${
              active 
                ? 'bg-white/20 text-white' 
                : item.highlight
                ? 'bg-[#DC052D] text-white'
                : 'bg-white/5 text-slate-300 group-hover:text-[#FFCC00] group-hover:bg-white/10'
            }`}>
              <Icon className="w-4 h-4" />
            </div>

            {isOpen && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="truncate leading-tight">{item.label}</span>
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
            )}
          </Link>
        );
      })}
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#001433] border-r border-[#002B66] shadow-2xl select-none text-white overflow-hidden relative">
      
      {/* Ambient Bayern Munich Gradient Glow at the top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#DC052D]/15 via-[#001F4D]/20 to-transparent pointer-events-none" />

      {/* Sidebar Header with Bayern Crest Aura */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#002B66]/80 relative z-10 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0">
            <TruthLensIcon size={32} />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#DC052D] shadow-[0_0_8px_#DC052D] animate-pulse" />
          </div>

          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col min-w-0"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wider text-white font-display uppercase">
                  Truth<span className="text-[#DC052D]">Lens</span>
                </span>
                <span className="text-[9px] uppercase font-mono font-black text-[#FFCC00] bg-[#FFCC00]/10 px-1 py-0.2 rounded border border-[#FFCC00]/30">
                  MIA SAN MIA
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-[#FFCC00] font-mono">
                <span>★★★★★</span>
                <span className="text-slate-400">Bayern Edition</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
        </button>
      </div>

      {/* Primary Navigation List */}
      <div className="flex-1 py-3 px-3 overflow-y-auto space-y-1 relative z-10 custom-sidebar-scroll">
        
        {/* Home & Live Scanner Trigger */}
        <Link
          to="/"
          onClick={isMobileOpen ? onMobileClose : undefined}
          title={!isOpen ? 'Home & Live Scanner' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
            location.pathname === '/'
              ? 'bg-gradient-to-r from-[#DC052D] via-[#B80022] to-[#800014] text-white shadow-[0_4px_20px_rgba(220,5,45,0.4)] border-l-4 border-[#FFCC00]'
              : 'text-slate-300 hover:text-white hover:bg-white/6 hover:border-slate-700/60'
          }`}
        >
          <div className={`p-1.5 rounded-lg shrink-0 ${
            location.pathname === '/' ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-300 group-hover:text-[#FFCC00]'
          }`}>
            <Home className="w-4 h-4" />
          </div>
          {isOpen && (
            <div className="flex items-center justify-between flex-1">
              <span className="truncate">Home & Live Scanner</span>
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                LIVE
              </span>
            </div>
          )}
        </Link>

        {renderNavGroup('DETECTION ENGINES', detectionEngines)}
        {renderNavGroup('GOVERNANCE & AUDIT', managementItems)}
        {renderNavGroup('HELP & ACADEMY', educationAndHelp)}

      </div>

      {/* Bottom Bayern Munich Free Forever Banner Card */}
      {isOpen && (
        <div className="p-3 border-t border-[#002B66]/80 bg-[#001026] relative z-10 space-y-2 shrink-0">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#DC052D]/20 via-[#001F4D] to-[#001433] border border-[#DC052D]/40 text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1 font-display">
                <span className="text-[#FFCC00]">★</span>
                <span>100% Free Forever</span>
              </span>
              <span className="text-[9px] font-mono text-[#FFCC00] font-bold">ZERO PAYWALLS</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-tight">
              Public authenticity infrastructure for all humanity. No subscriptions or per-scan billing.
            </p>
          </div>

          {/* Secondary Quick Links */}
          <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 pt-1">
            {secondaryItems.map((sec) => (
              <Link
                key={sec.to}
                to={sec.to}
                onClick={isMobileOpen ? onMobileClose : undefined}
                className="hover:text-[#FFCC00] transition-colors"
              >
                {sec.label.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Demo Profile Indicator Card */}
      {isOpen && isDemo && user && (
        <div className="p-2.5 bg-[#DC052D]/20 border-t border-[#DC052D]/40 shrink-0">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#DC052D] animate-ping" />
              <span className="font-extrabold text-white truncate max-w-[130px]">{user.full_name}</span>
            </div>
            <span className="text-[9px] uppercase font-mono font-bold text-[#FFCC00] bg-[#001433] px-1.5 py-0.5 rounded border border-[#FFCC00]/30">
              {user.role}
            </span>
          </div>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Drawer - Allianz Arena Night Bavarian Navy */}
      <aside 
        className={`hidden lg:block fixed left-0 top-16 bottom-0 z-30 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-72' : 'w-20'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />

            {/* Mobile Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-76 max-w-[85vw] h-full z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
