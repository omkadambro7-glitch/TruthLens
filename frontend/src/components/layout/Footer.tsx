import React from 'react';
import { Link } from 'react-router-dom';
import { TruthLensLogo } from '../brand/Logo';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E8E5DC] mt-24 text-sm text-[#687386]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <TruthLensLogo variant="horizontal" size={36} />
            <p className="text-xs text-[#687386] leading-relaxed max-w-sm mt-1">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#101B35] bg-[#FBF8EE] border border-[#E6D5A2] px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-[#C6A45C]" />
              <span>{t('footer.consortium')}</span>
            </div>
          </div>

          {/* Verification Tools */}
          <div>
            <h4 className="font-bold text-[#101B35] mb-3 text-xs uppercase tracking-wider">
              {t('common.verdict')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/verify/image" className="hover:text-[#233F8C] transition-colors">{t('nav.verify_image')}</Link></li>
              <li><Link to="/verify/certificate" className="hover:text-[#233F8C] transition-colors">{t('nav.verify_certificate')}</Link></li>
              <li><Link to="/accuracy" className="hover:text-[#233F8C] transition-colors">{t('nav.accuracy')}</Link></li>
              <li><Link to="/university" className="hover:text-[#233F8C] transition-colors">{t('nav.university')}</Link></li>
            </ul>
          </div>

          {/* Support & Education */}
          <div>
            <h4 className="font-bold text-[#101B35] mb-3 text-xs uppercase tracking-wider">
              {t('nav.learn')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/sos" className="hover:text-[#DC2626] font-bold text-[#DC2626] transition-colors">{t('nav.sos')}</Link></li>
              <li><Link to="/learn" className="hover:text-[#233F8C] transition-colors">{t('learn.title')}</Link></li>
              <li><Link to="/learn" className="hover:text-[#233F8C] transition-colors">{t('learn.game_title')}</Link></li>
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-[#233F8C]"
                >
                  National Cyber Helpline (1930) <ExternalLink className="w-3 h-3 text-[#C6A45C]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy */}
          <div>
            <h4 className="font-bold text-[#101B35] mb-3 text-xs uppercase tracking-wider">
              {t('footer.ethics')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/about" className="hover:text-[#101B35] transition-colors">{t('footer.methodology')}</Link></li>
              <li><Link to="/privacy" className="hover:text-[#101B35] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#101B35] transition-colors">Terms of Use</Link></li>
              <li><Link to="/accessibility" className="hover:text-[#101B35] transition-colors">{t('footer.wcag')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Mandatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#E8E5DC] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#737D90]">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-[#101B35]">Mandatory Algorithmic & Integrity Notice:</strong> TruthLens provides computational forensic signals and empirical estimates. No model guarantees 100% detection. Verification outputs do not constitute automated disciplinary determinations. All consequential outcomes require authorized human review.
          </p>
          <div className="text-center md:text-right whitespace-nowrap font-medium text-[#101B35]">
            © 2026 TruthLens • Royal Verification Infrastructure
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
