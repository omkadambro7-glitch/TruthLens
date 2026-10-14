import React from 'react';
import { Link } from 'react-router-dom';
import { ZeninLogo } from '../brand/Logo';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#0B1B3D]/10 mt-20 text-sm text-[#556987] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <ZeninLogo variant="horizontal" size={42} />
            <p className="text-xs sm:text-sm text-[#556987] leading-relaxed max-w-sm mt-1">
              Real-time multi-domain forensic verification across images, deepfake video, synthetic voice, and altered documents. 100% Free Public Standard for all humanity.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Cryptographically Sealed Public Trust Architecture</span>
            </div>
          </div>

          {/* Verification Engines */}
          <div>
            <h4 className="font-bold text-[#0B1B3D] mb-3 text-xs uppercase tracking-wider font-mono">
              Detection Arsenal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/verify/image" className="hover:text-[#C5A059] transition-colors">AI Image & Diffusion ELA</Link></li>
              <li><Link to="/verify/video" className="hover:text-[#C5A059] transition-colors">Deepfake Video Radar</Link></li>
              <li><Link to="/verify/voice" className="hover:text-[#C5A059] transition-colors">AI Voice Clone Detector</Link></li>
              <li><Link to="/verify/text" className="hover:text-[#C5A059] transition-colors">AI Text & Essay Scanner</Link></li>
              <li><Link to="/verify/invoice" className="hover:text-[#C5A059] transition-colors">Receipt & Expense Tamper</Link></li>
              <li><Link to="/verify/kyc" className="hover:text-[#C5A059] transition-colors">KYC & Government ID</Link></li>
              <li><Link to="/verify/certificate" className="hover:text-[#C5A059] transition-colors">Medical PDF Engine</Link></li>
            </ul>
          </div>

          {/* Governance & Benchmarks */}
          <div>
            <h4 className="font-bold text-[#0B1B3D] mb-3 text-xs uppercase tracking-wider font-mono">
              Governance & Proof
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/accuracy" className="hover:text-[#C5A059] transition-colors">97.4% ROC AUC Benchmark</Link></li>
              <li><Link to="/university" className="hover:text-[#C5A059] transition-colors">University Review Desk</Link></li>
              <li><Link to="/dashboard/reports/job-demo-deepfake-01" className="hover:text-[#C5A059] transition-colors">HMAC Audit Ledger</Link></li>
              <li><Link to="/sos" className="text-[#C5A059] hover:text-[#9A7B38] font-bold transition-colors">Victim SOS Helpline (1930)</Link></li>
              <li><Link to="/learn" className="hover:text-[#C5A059] transition-colors">Zenin Defense Academy</Link></li>
            </ul>
          </div>

          {/* Integrity & Rights */}
          <div>
            <h4 className="font-bold text-[#0B1B3D] mb-3 text-xs uppercase tracking-wider font-mono">
              Ethics & Standards
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/about" className="hover:text-[#C5A059] transition-colors">Open Methodology</Link></li>
              <li><Link to="/privacy" className="hover:text-[#C5A059] transition-colors">Zero Data Harvesting</Link></li>
              <li><Link to="/terms" className="hover:text-[#C5A059] transition-colors">Terms of Protection</Link></li>
              <li><Link to="/accessibility" className="hover:text-[#C5A059] transition-colors">WCAG 2.1 AA Certified</Link></li>
            </ul>
          </div>

        </div>

        {/* Mandatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#0B1B3D]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-[#0B1B3D]">Mandatory Algorithmic Safeguard:</strong> Zenin produces empirical forensic probabilities and multi-signal indicators. No algorithm guarantees 100% certainty. Outputs do not constitute automated punitive determinations. Final actions require authorized human review.
          </p>
          <div className="text-center md:text-right whitespace-nowrap font-medium text-[#0B1B3D] font-mono text-[11px]">
            © 2026 Zenin • Free Digital Verification Standard
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
