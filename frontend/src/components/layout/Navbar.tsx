import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User as UserIcon, LogOut, FileText, Eye, AlertOctagon, GraduationCap, BarChart3, BookOpen, Sparkles } from 'lucide-react';
import { TruthLensLogo } from '../brand/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isDemo, logout, loginAsDemo } = useAuth();
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
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E5DC] transition-all">
      {/* Top Demo Banner if currently in demo mode */}
      {isDemo && (
        <div className="bg-gradient-to-r from-[#101B35] via-[#233F8C] to-[#101B35] text-white px-4 py-1.5 text-xs flex items-center justify-between border-b border-[#C6A45C]/30">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6D5A2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A45C]"></span>
              </span>
              <span className="font-semibold text-[11px] tracking-wide text-[#FAF9F6]">
                {t('nav.demo_mode')}: <span className="text-[#E6D5A2] font-bold">{user?.full_name}</span> ({user?.role})
              </span>
            </div>
            <button
              onClick={logout}
              className="text-[11px] font-bold text-[#E6D5A2] hover:text-white underline ml-3 transition-colors"
            >
              {t('nav.exit_demo')}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group">
          <TruthLensLogo variant="horizontal" size={38} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  active 
                    ? 'bg-[#101B35] text-white shadow-xs' 
                    : link.highlight
                    ? 'text-[#DC2626] hover:bg-[#FEF2F2] hover:text-[#DC2626]'
                    : 'text-[#687386] hover:text-[#101B35] hover:bg-[#F6F4EE]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#E6D5A2]' : link.highlight ? 'text-[#DC2626]' : 'text-[#233F8C]'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility Actions (Language + Auth + CTA) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center gap-0.5 bg-[#F6F4EE] p-1 rounded-xl border border-[#E8E5DC] text-xs font-bold text-[#687386]">
            <Globe className="w-3.5 h-3.5 ml-1 mr-0.5 text-[#233F8C]" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all ${language === 'en' ? 'bg-white text-[#101B35] font-extrabold shadow-xs border border-[#E8E5DC]' : 'hover:text-[#101B35]'}`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg transition-all ${language === 'hi' ? 'bg-white text-[#101B35] font-extrabold shadow-xs border border-[#E8E5DC]' : 'hover:text-[#101B35]'}`}
              title="हिन्दी"
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-lg transition-all ${language === 'mr' ? 'bg-white text-[#101B35] font-extrabold shadow-xs border border-[#E8E5DC]' : 'hover:text-[#101B35]'}`}
              title="मराठी"
            >
              MR
            </button>
          </div>

          {/* User Auth or Sign In / Demo */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E8E5DC] text-xs shadow-xs">
              <UserIcon className="w-3.5 h-3.5 text-[#233F8C]" />
              <span className="font-bold text-[#101B35] max-w-28 truncate">{user.full_name}</span>
              <button
                onClick={logout}
                className="text-[#DC2626] hover:text-red-700 ml-1 p-0.5 rounded-sm"
                title={t('nav.signout')}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => loginAsDemo('reviewer')}
                className="flex items-center gap-1 text-[11px] font-bold text-[#233F8C] bg-[#EEF3FF] hover:bg-[#DDE7FF] px-2.5 py-1.5 rounded-xl border border-[#C5D5F9] transition-colors"
                title="Explore with sample university data"
              >
                <Sparkles className="w-3 h-3 text-[#C6A45C]" />
                Demo
              </button>
              <Link
                to="/login"
                className="text-xs font-bold text-[#687386] hover:text-[#101B35] px-2.5 py-1.5 rounded-xl transition-colors"
              >
                {t('nav.signin')}
              </Link>
            </div>
          )}

          {/* Primary Action Button: Royal Navy with subtle gold border */}
          <Link
            to="/verify/image"
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md hover:border-[#C6A45C] border border-transparent transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#E6D5A2]" />
            {t('nav.check_an_image')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Quick Language Switcher on Mobile */}
          <div className="flex items-center bg-[#F6F4EE] rounded-lg p-0.5 border border-[#E8E5DC] text-[11px] font-bold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-white text-[#101B35]' : 'text-[#687386]'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded ${language === 'hi' ? 'bg-white text-[#101B35]' : 'text-[#687386]'}`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded ${language === 'mr' ? 'bg-white text-[#101B35]' : 'text-[#687386]'}`}
            >
              MR
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#101B35] hover:bg-[#F6F4EE] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E8E5DC] bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  active 
                    ? 'bg-[#101B35] text-white' 
                    : link.highlight
                    ? 'text-[#DC2626] bg-[#FEF2F2]'
                    : 'text-[#192338] hover:bg-[#F6F4EE]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#E6D5A2]' : link.highlight ? 'text-[#DC2626]' : 'text-[#233F8C]'}`} />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#E8E5DC] flex flex-col gap-2">
            {!isAuthenticated && (
              <button
                onClick={() => {
                  loginAsDemo('reviewer');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#EEF3FF] text-[#233F8C] py-2.5 rounded-xl text-xs font-bold border border-[#C5D5F9]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
                Explore Demo Mode
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-[#DC2626] bg-[#FEF2F2]"
              >
                {t('nav.signout')} ({user?.full_name})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-[#101B35] bg-white border border-[#E8E5DC]"
              >
                {t('nav.signin')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
