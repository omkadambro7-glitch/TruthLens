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
  Sidebar as SidebarIcon,
  ShieldAlert
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        
        {/* Left Section: Sidebar Toggle & Large Pinned Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Mobile Sidebar Trigger */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Navigation Sidebar"
          >
            <Menu className="w-5 h-5 text-slate-900" />
          </button>

          {/* Desktop Sidebar Toggle Icon */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-[#DC052D] hover:bg-red-50/50 transition-colors cursor-pointer"
            title="Toggle Sidebar Navigation"
          >
            <SidebarIcon className="w-5 h-5" />
          </button>

          {/* Prominent Large Logo on the Far Left with Bayern Red */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <TruthLensLogo variant="horizontal" size={40} />
          </Link>
        </div>

        {/* Center Section: Quick Search & Forensic Shortcuts */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              readOnly
              onClick={() => navigate('/verify/image')}
              placeholder="Search forensic models, check certificate, or incident response..."
              className="w-full pl-9 pr-12 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#DC052D] text-xs text-slate-900 placeholder-slate-400 transition-all cursor-pointer"
            />
            <span className="absolute right-2.5 top-2 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Section: Language Switcher, Demo Mode Pill, and Bayern Red Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Clean Language Switcher Pill */}
          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
            <Globe className="w-3.5 h-3.5 ml-1 mr-1 text-[#DC052D]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'en' 
                  ? 'bg-white text-[#DC052D] font-extrabold shadow-2xs border border-slate-200' 
                  : 'hover:text-[#DC052D]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'hi' 
                  ? 'bg-white text-[#DC052D] font-extrabold shadow-2xs border border-slate-200' 
                  : 'hover:text-[#DC052D]'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'mr' 
                  ? 'bg-white text-[#DC052D] font-extrabold shadow-2xs border border-slate-200' 
                  : 'hover:text-[#DC052D]'
              }`}
            >
              MR
            </button>
          </div>

          {/* 1-Click Demo Badge */}
          {isDemo ? (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-[#990000] px-3 py-1 rounded-xl text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#DC052D] animate-pulse" />
              <span className="hidden sm:inline">Demo:</span> {user?.full_name?.split(' ')[0]}
              <button
                onClick={logout}
                className="ml-1 text-[10px] text-red-600 hover:underline"
                title="Exit Demo"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={handleDemoClick}
              className="hidden sm:flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore Demo</span>
            </button>
          )}

          {/* User Sign In or Avatar */}
          {isAuthenticated && user && !isDemo ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <UserIcon className="w-3.5 h-3.5 text-[#DC052D]" />
              <span className="font-bold text-slate-900 max-w-28 truncate">{user.full_name}</span>
              <button onClick={logout} className="text-red-600 ml-1 p-0.5">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !isDemo ? (
            <Link
              to="/login"
              className="text-xs font-bold text-slate-600 hover:text-[#DC052D] px-3 py-1.5 rounded-xl transition-colors"
            >
              {t('nav.signin')}
            </Link>
          ) : null}

          {/* Primary Quick Check Button - Bayern Crimson Gradient */}
          <Link
            to="/verify/image"
            className="flex items-center gap-2 bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#FFCC00]" />
            <span className="hidden sm:inline">Check an Image</span>
            <span className="sm:hidden">Scan</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
