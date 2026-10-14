import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Shield, User as UserIcon, LogOut, FileText, Eye, AlertOctagon, GraduationCap, BarChart3, BookOpen } from 'lucide-react';
import { TruthLensLogo } from '../brand/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/verify/image', label: t('nav.verify_image'), icon: Eye },
    { to: '/verify/certificate', label: t('nav.verify_certificate'), icon: FileText },
    { to: '/sos', label: t('nav.sos'), icon: AlertOctagon, highlight: true },
    { to: '/accuracy', label: t('nav.accuracy'), icon: BarChart3 },
    { to: '/learn', label: t('nav.learn'), icon: BookOpen },
    { to: '/university', label: t('nav.university'), icon: GraduationCap },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E6DF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group">
          <TruthLensLogo variant="horizontal" size={36} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active 
                    ? 'bg-[#116B67] text-white shadow-xs' 
                    : link.highlight
                    ? 'text-[#DC2626] hover:bg-[#FEE2E2]/60'
                    : 'text-[#68717D] hover:text-[#20252B] hover:bg-[#F0EEE8]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : link.highlight ? 'text-[#DC2626]' : 'text-[#116B67]'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility Actions (Language + Auth + CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[#F0EEE8] p-1 rounded-xl border border-[#E8E6DF] text-xs font-bold text-[#68717D]">
            <Globe className="w-3.5 h-3.5 ml-1 text-[#116B67]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-colors ${language === 'en' ? 'bg-white text-[#20252B] shadow-xs' : 'hover:text-[#20252B]'}`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-colors ${language === 'hi' ? 'bg-white text-[#20252B] shadow-xs' : 'hover:text-[#20252B]'}`}
              title="हिन्दी"
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-lg transition-colors ${language === 'mr' ? 'bg-white text-[#20252B] shadow-xs' : 'hover:text-[#20252B]'}`}
              title="मराठी"
            >
              MR
            </button>
          </div>

          {/* User Auth or Sign In */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E8E6DF] text-xs">
              <UserIcon className="w-3.5 h-3.5 text-[#116B67]" />
              <span className="font-semibold text-[#20252B] max-w-28 truncate">{user.full_name}</span>
              <button
                onClick={logout}
                className="text-[#DC2626] hover:text-red-700 ml-1 p-0.5 rounded-sm"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold text-[#68717D] hover:text-[#20252B] px-3 py-2 rounded-xl transition-colors"
            >
              {t('nav.signin')}
            </Link>
          )}

          {/* Primary Action Button */}
          <Link
            to="/verify/image"
            className="brand-gradient text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:opacity-95 transition-opacity"
          >
            Check an Image
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#20252B] hover:bg-[#F0EEE8] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E6DF] bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  active 
                    ? 'bg-[#116B67] text-white' 
                    : link.highlight
                    ? 'text-[#DC2626] bg-[#FEE2E2]/60'
                    : 'text-[#20252B] hover:bg-[#F0EEE8]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : link.highlight ? 'text-[#DC2626]' : 'text-[#116B67]'}`} />
                {link.label}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-[#E8E6DF] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#68717D]">
              <span>Select Language:</span>
              <div className="flex gap-2">
                <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded-sm ${language === 'en' ? 'bg-[#116B67] text-white' : ''}`}>EN</button>
                <button onClick={() => setLanguage('hi')} className={`px-2 py-1 rounded-sm ${language === 'hi' ? 'bg-[#116B67] text-white' : ''}`}>HI</button>
                <button onClick={() => setLanguage('mr')} className={`px-2 py-1 rounded-sm ${language === 'mr' ? 'bg-[#116B67] text-white' : ''}`}>MR</button>
              </div>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#E8E6DF] text-xs">
                <span>Signed in as <strong>{user.full_name}</strong></span>
                <button onClick={logout} className="text-[#DC2626] font-bold">Sign Out</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-[#E8E6DF] bg-white font-bold text-xs"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
