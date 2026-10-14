import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Globe, 
  Sparkles, 
  Search,
  LayoutGrid,
  ShieldCheck,
  Scan,
  User as UserIcon,
  LogOut,
  ChevronDown,
  LogIn
} from 'lucide-react';
import { MahiraLogo } from '../brand/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onToggleDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleDrawer
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isDemo, logout, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleDemoClick = () => {
    loginAsDemo('reviewer');
    navigate('/university');
  };

  const navLinks = [
    { to: '/verify/image', label: 'Image ELA' },
    { to: '/verify/video', label: 'Deepfake Video' },
    { to: '/verify/voice', label: 'Voice Clone' },
    { to: '/verify/text', label: 'AI Text' },
    { to: '/verify/invoice', label: 'Invoices' },
    { to: '/verify/kyc', label: 'KYC Cards' },
    { to: '/university', label: 'Review Desk' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#0B1B3D]/10 h-16 transition-all text-[#0B1B3D] shadow-[0_2px_12px_rgba(11,27,61,0.04)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Section: Drawer Toggle & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Bleach Editorial Drawer Trigger ("ENGINES") */}
          <button
            onClick={onToggleDrawer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAFBFD] hover:bg-[#F0F4FA] border border-[#0B1B3D]/15 text-xs font-bold text-[#0B1B3D] transition-all cursor-pointer shadow-xs active:scale-95"
            title="Open Forensic Arsenal Drawer"
            aria-label="Open Navigation Drawer"
          >
            <LayoutGrid className="w-4 h-4 text-[#C5A059]" />
            <span className="hidden md:inline font-mono font-bold tracking-wider text-[11px]">ENGINES</span>
          </button>

          {/* Mahira Editorial Logo */}
          <Link to="/" className="flex items-center group cursor-pointer active:scale-98 transition-transform">
            <MahiraLogo variant="horizontal" size={36} />
          </Link>
        </div>

        {/* Center Section: Modern Nav Links with Navy/Gold Active State */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#F5F7FC] px-2.5 py-1 rounded-full border border-[#0B1B3D]/10 text-xs font-medium">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-full transition-all text-xs ${
                  active 
                    ? 'bg-[#0B1B3D] text-[#FAFBFD] font-bold shadow-xs border border-[#C5A059]/40' 
                    : 'text-[#3E5274] hover:text-[#0B1B3D] hover:bg-white/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher, Auth Button, & Launch Scanner */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher Pill */}
          <div className="hidden sm:flex items-center bg-[#F5F7FC] p-1 rounded-xl border border-[#0B1B3D]/10 text-xs font-bold text-[#3E5274]">
            <Globe className="w-3.5 h-3.5 ml-1 mr-1 text-[#C5A059]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'en' 
                  ? 'bg-white text-[#0B1B3D] font-black shadow-xs border border-[#0B1B3D]/10' 
                  : 'hover:text-[#0B1B3D]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'hi' 
                  ? 'bg-white text-[#0B1B3D] font-black shadow-xs border border-[#0B1B3D]/10' 
                  : 'hover:text-[#0B1B3D]'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'mr' 
                  ? 'bg-white text-[#0B1B3D] font-black shadow-xs border border-[#0B1B3D]/10' 
                  : 'hover:text-[#0B1B3D]'
              }`}
            >
              MR
            </button>
          </div>

          {/* User / Authentication Dropdown or Direct Sign In Link */}
          {isAuthenticated || isDemo ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 bg-[#FAFBFD] hover:bg-[#F0F4FA] border border-[#C5A059]/40 text-[#0B1B3D] px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="hidden sm:inline font-mono text-[11px] text-[#C5A059]">
                  {isDemo ? 'DEMO:' : 'USER:'}
                </span>
                <span className="truncate max-w-[80px] sm:max-w-[100px]">
                  {user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Member'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#3E5274]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#0B1B3D]/10 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-[#0B1B3D]/5">
                    <p className="text-[11px] font-mono text-[#3E5274] uppercase">Signed in as</p>
                    <p className="text-xs font-bold text-[#0B1B3D] truncate">{user?.email || 'Demo Session'}</p>
                  </div>
                  <Link
                    to="/university"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B1B3D] hover:bg-[#F5F7FC]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Reviewer Desk</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B1B3D] hover:bg-[#F5F7FC]"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#3E5274]" />
                    <span>Switch / Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B1B3D] hover:bg-[#F5F7FC]"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#3E5274]" />
                    <span>Create New Account</span>
                  </Link>
                  <div className="border-t border-[#0B1B3D]/5 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit / Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="flex items-center gap-1 text-xs font-bold text-[#0B1B3D] hover:text-[#C5A059] px-2.5 py-1.5 rounded-xl hover:bg-[#F5F7FC] transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <button
                onClick={handleDemoClick}
                className="hidden md:flex items-center gap-1 bg-[#FAFBFD] hover:bg-[#F0F4FA] text-[#0B1B3D] px-2.5 py-1.5 rounded-xl border border-[#0B1B3D]/15 text-xs font-bold transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Demo</span>
              </button>
            </div>
          )}

          {/* Primary Action Button: Launch Free Scanner */}
          <Link
            to="/verify/image"
            className="flex items-center gap-2 bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] text-xs font-bold px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(11,27,61,0.18)] border border-[#C5A059]/50 transition-all cursor-pointer active:scale-95 group"
          >
            <Scan className="w-3.5 h-3.5 text-[#C5A059] group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Launch Free Scanner</span>
            <span className="sm:hidden">Scan</span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
