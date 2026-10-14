import React from 'react';
import { Link } from 'react-router-dom';
import { TruthLensLogo } from '../brand/Logo';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#040813] border-t border-white/10 mt-24 text-sm text-slate-400 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <TruthLensLogo variant="horizontal" size={36} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-1">
              Real-time multi-domain forensic verification across images, deepfake video, synthetic voice, and altered documents. 100% Free Public Good for all humanity.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-[#EDBB00]" />
              <span>Cryptographically Sealed Public Trust Architecture</span>
            </div>
          </div>

          {/* Verification Engines */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">
              Detection Arsenal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/verify/image" className="hover:text-white transition-colors">AI Image Detector</Link></li>
              <li><Link to="/verify/video" className="hover:text-white transition-colors">Deepfake Video Radar</Link></li>
              <li><Link to="/verify/voice" className="hover:text-white transition-colors">Voice Clone Detector</Link></li>
              <li><Link to="/verify/text" className="hover:text-white transition-colors">AI Text & Essay Scanner</Link></li>
              <li><Link to="/verify/invoice" className="hover:text-white transition-colors">Receipt & Expense Tamper</Link></li>
              <li><Link to="/verify/kyc" className="hover:text-white transition-colors">KYC & Government ID</Link></li>
              <li><Link to="/verify/certificate" className="hover:text-white transition-colors">Medical PDF Engine</Link></li>
            </ul>
          </div>

          {/* Governance & Benchmarks */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">
              Governance & Proof
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/accuracy" className="hover:text-white transition-colors">97.4% ROC AUC Benchmark</Link></li>
              <li><Link to="/university" className="hover:text-white transition-colors">University Review Desk</Link></li>
              <li><Link to="/dashboard/reports/job-demo-deepfake-01" className="hover:text-white transition-colors">HMAC Audit Ledger</Link></li>
              <li><Link to="/sos" className="text-red-400 hover:text-red-300 font-bold transition-colors">Victim SOS Helpline (1930)</Link></li>
              <li><Link to="/learn" className="hover:text-white transition-colors">TruthLens Academy</Link></li>
            </ul>
          </div>

          {/* Integrity & Rights */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider font-mono">
              Ethics & Standards
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">Open Methodology</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Zero Data Harvesting</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Protection</Link></li>
              <li><Link to="/accessibility" className="hover:text-white transition-colors">WCAG 2.1 AA Certified</Link></li>
            </ul>
          </div>

        </div>

        {/* Mandatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-slate-300">Mandatory Algorithmic Safeguard:</strong> TruthLens produces empirical forensic probabilities and multi-signal indicators. No algorithm guarantees 100% certainty. Outputs do not constitute automated punitive determinations. Final actions require authorized human review.
          </p>
          <div className="text-center md:text-right whitespace-nowrap font-medium text-slate-400 font-mono text-[11px]">
            © 2026 TruthLens • Free Digital Verification Standard
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
