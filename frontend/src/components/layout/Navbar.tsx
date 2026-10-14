import React from 'react';
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
  LogOut
} from 'lucide-react';
import { TruthLensLogo } from '../brand/Logo';
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

  const handleDemoClick = () => {
    loginAsDemo('reviewer');
    navigate('/university');
  };

  const navLinks = [
    { to: '/verify/image', label: 'Images' },
    { to: '/verify/video', label: 'Deepfake Video' },
    { to: '/verify/voice', label: 'Voice Clones' },
    { to: '/verify/text', label: 'AI Text' },
    { to: '/verify/invoice', label: 'Invoices' },
    { to: '/verify/kyc', label: 'KYC Cards' },
    { to: '/university', label: 'Review Queue' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060B18]/85 backdrop-blur-xl border-b border-white/10 h-16 transition-all text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        
        {/* Left Section: Drawer Toggle & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Drawer Trigger Button ("All Engines") */}
          <button
            onClick={onToggleDrawer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs"
            title="Open Detection Arsenal Drawer"
            aria-label="Open Navigation Drawer"
          >
            <LayoutGrid className="w-4 h-4 text-[#EDBB00]" />
            <span className="hidden md:inline font-mono">ENGINES</span>
          </button>

          {/* Large Pinned Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <TruthLensLogo variant="horizontal" size={38} />
          </Link>
        </div>

        {/* Center Section: Sleek Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/4 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  active 
                    ? 'bg-gradient-to-r from-[#A50044] to-[#004D98] text-white font-bold shadow-md' 
                    : 'text-slate-300 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher, Demo Mode & Primary Launch Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher Pill */}
          <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-bold text-slate-300">
            <Globe className="w-3.5 h-3.5 ml-1 mr-1 text-[#EDBB00]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'en' 
                  ? 'bg-white/20 text-white font-extrabold shadow-2xs' 
                  : 'hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'hi' 
                  ? 'bg-white/20 text-white font-extrabold shadow-2xs' 
                  : 'hover:text-white'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'mr' 
                  ? 'bg-white/20 text-white font-extrabold shadow-2xs' 
                  : 'hover:text-white'
              }`}
            >
              MR
            </button>
          </div>

          {/* 1-Click Demo Badge */}
          {isDemo ? (
            <div className="flex items-center gap-1.5 bg-[#A50044]/20 border border-[#A50044]/40 text-red-200 px-3 py-1 rounded-xl text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#A50044] animate-pulse" />
              <span className="hidden sm:inline">Demo:</span> {user?.full_name?.split(' ')[0]}
              <button
                onClick={logout}
                className="ml-1 text-[10px] text-red-300 hover:text-white hover:underline"
                title="Exit Demo"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={handleDemoClick}
              className="hidden md:flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EDBB00]" />
              <span>Reviewer Portal</span>
            </button>
          )}

          {/* Primary Action Button: Launch Free Scanner */}
          <Link
            to="/verify/image"
            className="flex items-center gap-2 bg-gradient-to-r from-[#A50044] via-[#70002E] to-[#004D98] hover:from-[#C70039] hover:to-[#0066B2] text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(165,0,68,0.4)] border border-white/15 transition-all cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch Free Scanner</span>
            <span className="sm:hidden">Scan</span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
