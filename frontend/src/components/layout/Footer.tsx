import React from 'react';
import { Link } from 'react-router-dom';
import { TruthLensLogo } from '../brand/Logo';
import { ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8E6DF] mt-24 text-sm text-[#68717D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <TruthLensLogo variant="horizontal" size={34} />
            <p className="text-xs text-[#68717D] leading-relaxed max-w-sm mt-2">
              Free-first digital authenticity platform making trustworthy image and document verification accessible to everyone. Built with privacy, transparency, and honest uncertainty.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#116B67] bg-[#E6F3F2] px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Open Authenticity Consortium • Free Public Tool</span>
            </div>
          </div>

          {/* Verification Tools */}
          <div>
            <h4 className="font-bold text-[#20252B] mb-3 text-xs uppercase tracking-wider">Verification</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/verify/image" className="hover:text-[#116B67] transition-colors">AI Image Detector</Link></li>
              <li><Link to="/verify/certificate" className="hover:text-[#116B67] transition-colors">Medical Certificate Pre-Check</Link></li>
              <li><Link to="/accuracy" className="hover:text-[#116B67] transition-colors">Evaluation Benchmarks</Link></li>
              <li><Link to="/university" className="hover:text-[#116B67] transition-colors">University Workspace</Link></li>
            </ul>
          </div>

          {/* Support & Education */}
          <div>
            <h4 className="font-bold text-[#20252B] mb-3 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/sos" className="hover:text-[#DC2626] font-semibold text-[#DC2626] transition-colors">Victim SOS Center</Link></li>
              <li><Link to="/learn" className="hover:text-[#116B67] transition-colors">Media Literacy Hub</Link></li>
              <li><Link to="/learn#game" className="hover:text-[#116B67] transition-colors">Spot-the-Fake Game</Link></li>
              <li><a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#116B67]">Cyber Crime Portal (1930) <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Governance & Privacy */}
          <div>
            <h4 className="font-bold text-[#20252B] mb-3 text-xs uppercase tracking-wider">Ethics & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#20252B] transition-colors">About & Methodology</Link></li>
              <li><Link to="/privacy" className="hover:text-[#20252B] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#20252B] transition-colors">Terms of Use</Link></li>
              <li><Link to="/accessibility" className="hover:text-[#20252B] transition-colors">Accessibility (WCAG 2.1)</Link></li>
            </ul>
          </div>

        </div>

        {/* Mandatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#E8E6DF] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A92A0]">
          <p className="max-w-2xl text-center md:text-left">
            <strong>Mandatory Legal & Algorithmic Notice:</strong> TruthLens provides computational forensic signals and statistical estimates. No model guarantees 100% accuracy. Verification outputs do not constitute legal proof, medical certifications, or automated disciplinary determinations. All consequential decisions require authorized human review.
          </p>
          <div className="text-center md:text-right whitespace-nowrap">
            © 2026 TruthLens Project Primus. Open Public Good.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
