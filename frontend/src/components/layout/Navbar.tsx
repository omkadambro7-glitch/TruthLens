import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Globe, 
  User as UserIcon, 
  LogOut, 
  Eye, 
  Sparkles, 
  Search,
  Sidebar as SidebarIcon
} from 'lucide-react';
import { TruthLensLogo } from '../brand/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenMobileSidebar
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isDemo, logout, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    loginAsDemo('reviewer');
    navigate('/university');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] h-16 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        
        {/* Left Section: Sidebar Toggle & Large Pinned Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Mobile Sidebar Trigger */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-[#0B132B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Open Navigation Sidebar"
          >
            <Menu className="w-5 h-5 text-[#0B132B]" />
          </button>

          {/* Desktop Sidebar Toggle Icon */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-xl text-[#64748B] hover:text-[#0B132B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            title="Toggle Sidebar Navigation"
          >
            <SidebarIcon className="w-5 h-5" />
          </button>

          {/* Prominent Large Logo on the Far Left */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <TruthLensLogo variant="horizontal" size={40} />
          </Link>
        </div>

        {/* Center Section: Quick Search & Forensic Shortcuts */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-2.5" />
            <input
              type="text"
              readOnly
              onClick={() => navigate('/verify/image')}
              placeholder="Search forensic models, check certificate, or incident response..."
              className="w-full pl-9 pr-12 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#93C5FD] text-xs text-[#0F172A] placeholder-[#94A3B8] transition-all cursor-pointer"
            />
            <span className="absolute right-2.5 top-2 text-[10px] font-bold text-[#64748B] bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Section: Language Switcher, Demo Mode Pill, and Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Clean Language Switcher Pill */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B]">
            <Globe className="w-3.5 h-3.5 ml-1 mr-1 text-[#2563EB]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'en' 
                  ? 'bg-white text-[#0B132B] font-extrabold shadow-2xs border border-[#E2E8F0]' 
                  : 'hover:text-[#0B132B]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'hi' 
                  ? 'bg-white text-[#0B132B] font-extrabold shadow-2xs border border-[#E2E8F0]' 
                  : 'hover:text-[#0B132B]'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'mr' 
                  ? 'bg-white text-[#0B132B] font-extrabold shadow-2xs border border-[#E2E8F0]' 
                  : 'hover:text-[#0B132B]'
              }`}
            >
              MR
            </button>
          </div>

          {/* 1-Click Demo Badge */}
          {isDemo ? (
            <div className="flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] px-3 py-1 rounded-xl text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="hidden sm:inline">Demo:</span> {user?.full_name?.split(' ')[0]}
              <button
                onClick={logout}
                className="ml-1 text-[10px] text-[#DC2626] hover:underline"
                title="Exit Demo"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={handleDemoClick}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] hover:from-[#DBEAFE] hover:to-[#BFDBFE] text-[#1E40AF] px-3 py-1.5 rounded-xl border border-[#BFDBFE] text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Explore Demo</span>
            </button>
          )}

          {/* User Sign In or Avatar */}
          {isAuthenticated && user && !isDemo ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs shadow-2xs">
              <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-bold text-[#0B132B] max-w-28 truncate">{user.full_name}</span>
              <button onClick={logout} className="text-[#DC2626] ml-1 p-0.5">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !isDemo ? (
            <Link
              to="/login"
              className="text-xs font-bold text-[#475569] hover:text-[#0B132B] px-3 py-1.5 rounded-xl transition-colors"
            >
              {t('nav.signin')}
            </Link>
          ) : null}

          {/* Primary Quick Check Button */}
          <Link
            to="/verify/image"
            className="flex items-center gap-2 bg-gradient-to-r from-[#0B132B] via-[#1E293B] to-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-md hover:border-[#F59E0B] border border-transparent transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span className="hidden sm:inline">{t('nav.check_an_image')}</span>
            <span className="sm:hidden">Scan</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
