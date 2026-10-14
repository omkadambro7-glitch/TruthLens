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
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
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

  const navigationItems = [
    {
      to: '/',
      label: 'Home & Scanner',
      icon: Home,
      badge: null
    },
    {
      to: '/verify/image',
      label: t('nav.verify_image'),
      icon: Eye,
      badge: 'Spectral'
    },
    {
      to: '/verify/certificate',
      label: t('nav.verify_certificate'),
      icon: FileText,
      badge: 'OCR'
    },
    {
      to: '/sos',
      label: t('nav.sos'),
      icon: AlertOctagon,
      highlight: true,
      badge: '1930 SOS'
    },
    {
      to: '/university',
      label: t('nav.university'),
      icon: GraduationCap,
      badge: 'Reviewer'
    },
    {
      to: '/accuracy',
      label: t('nav.accuracy'),
      icon: BarChart3,
      badge: null
    },
    {
      to: '/learn',
      label: t('nav.learn'),
      icon: BookOpen,
      badge: 'Challenge'
    },
    {
      to: '/dashboard/reports/job-demo-deepfake-01',
      label: 'Trust Reports',
      icon: Share2,
      badge: 'HMAC'
    }
  ];

  const secondaryItems = [
    { to: '/about', label: 'Methodology', icon: ShieldCheck },
    { to: '/privacy', label: 'Zero-Leakage Privacy', icon: Lock },
    { to: '/accessibility', label: 'WCAG 2.1 AA', icon: HelpCircle }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FFFFFF] border-r border-[#E2E8F0] shadow-xs select-none">
      
      {/* Sidebar Header Section with Collapse Toggle */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-black uppercase tracking-widest text-[#0B132B] font-display"
            >
              Navigation Hub
            </motion.span>
          )}
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-1.5 rounded-lg text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Navigation List */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                active
                  ? 'bg-gradient-to-r from-[#0B132B] to-[#1E293B] text-white shadow-md'
                  : item.highlight
                  ? 'text-[#DC2626] hover:bg-[#FEF2F2]'
                  : 'text-[#475569] hover:text-[#0B132B] hover:bg-[#F8FAFC]'
              }`}
            >
              <Icon 
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  active 
                    ? 'text-[#60A5FA]' 
                    : item.highlight 
                    ? 'text-[#DC2626]' 
                    : 'text-[#2563EB]'
                }`} 
              />
              
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate flex-1"
                >
                  {item.label}
                </motion.span>
              )}

              {isOpen && item.badge && (
                <span className={`text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                  active 
                    ? 'bg-white/20 text-white' 
                    : item.highlight
                    ? 'bg-red-100 text-red-700'
                    : 'bg-[#EFF6FF] text-[#2563EB]'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Active royal blue indicator pill on edge */}
              {active && (
                <motion.div 
                  layoutId="activeSidebarIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#3B82F6] rounded-r-full"
                />
              )}
            </Link>
          );
        })}

        {/* Section Divider */}
        <div className="pt-4 pb-2">
          <div className="h-px bg-[#F1F5F9]" />
          {isOpen && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] px-3 pt-3 block">
              Governance & Ethics
            </span>
          )}
        </div>

        {/* Secondary Governance Links */}
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                active 
                  ? 'text-[#2563EB] bg-[#EFF6FF] font-bold' 
                  : 'text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              {isOpen && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-3 border-t border-[#F1F5F9] bg-[#FAF9F6]">
        {isOpen ? (
          <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#64748B]">Forensic Engine</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Operational
              </span>
            </div>
            <div className="text-[10px] text-[#94A3B8] font-mono truncate">
              Spectra-v2.4 • Zero-Leakage
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Engine Operational">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside 
        className={`hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-[#0B132B]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 max-w-[85vw] h-full z-10"
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
