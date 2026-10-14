import React from 'react';
import { Shield, Lock, FileText, CheckCircle, Eye } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl font-extrabold text-[#20252B] font-display">About TruthLens</h1>
    <p className="text-sm text-[#4B5563] leading-relaxed">
      TruthLens (Internal Project Codename: PRIMUS) was founded with a singular, unambiguous mission: <em>Make trustworthy digital media verification accessible to everyone, for free.</em>
    </p>

    <div className="card-elevation p-6 bg-white border border-[#E8E6DF] space-y-3">
      <h3 className="font-bold text-base text-[#20252B]">Core Methodology</h3>
      <p className="text-xs text-[#68717D] leading-relaxed">
        Modern generative AI has democratized synthetic generation, but commercial detection tools often charge exorbitant fees and make exaggerated claims of certainty. TruthLens relies on peer-reviewed mathematical forensics—Error Level Analysis (ELA), 2D Fast Fourier Transform frequency analysis, localized noise dispersion, and container metadata inspection.
      </p>
    </div>

    <div className="card-elevation p-6 bg-white border border-[#E8E6DF] space-y-3">
      <h3 className="font-bold text-base text-[#20252B]">The Principle of Honest Uncertainty</h3>
      <p className="text-xs text-[#68717D] leading-relaxed">
        We do not invent confidence. When an image has undergone multiple rounds of social media compression or when forensic models disagree, our engine explicitly outputs <strong>NEEDS HUMAN REVIEW</strong>. We believe an honest question mark is infinitely more trustworthy than a false exclamation point.
      </p>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl font-extrabold text-[#20252B] font-display">Privacy Policy & Safeguards</h1>
    <p className="text-sm text-[#4B5563] leading-relaxed">
      TruthLens treats uploaded images, medical certificates, student submissions, and victim evidence as sensitive, personal data.
    </p>

    <div className="card-elevation p-6 bg-white border border-[#E8E6DF] space-y-4 text-xs text-[#4B5563] leading-relaxed">
      <div>
        <strong className="text-sm text-[#20252B] block mb-1">1. Private Isolated Storage</strong>
        <p>All uploaded files are stored outside the public web server root using randomized internal file hashes. Files cannot be discovered or enumerated by third parties.</p>
      </div>

      <div>
        <strong className="text-sm text-[#20252B] block mb-1">2. Zero Unauthorized Model Retraining</strong>
        <p>We do not use your private images or medical records to train public commercial models without explicit informed consent.</p>
      </div>

      <div>
        <strong className="text-sm text-[#20252B] block mb-1">3. Victim SOS Heightened Protection</strong>
        <p>Our SOS workflow does not require victims to upload sensitive media. Incident notes and timeline checklists are preserved exclusively in the user’s local browser memory.</p>
      </div>

      <div>
        <strong className="text-sm text-[#20252B] block mb-1">4. Institutional Tenant Isolation</strong>
        <p>Student records and reviewer queues belonging to one university are never exposed to another organization.</p>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl font-extrabold text-[#20252B] font-display">Terms of Use & Acceptable Use</h1>
    <div className="card-elevation p-6 bg-white border border-[#E8E6DF] space-y-4 text-xs text-[#4B5563] leading-relaxed">
      <div>
        <strong className="text-sm text-[#20252B] block mb-1">Permitted Use</strong>
        <p>TruthLens is provided as a free public utility for personal authenticity verification, academic research, student pre-checks, journalistic investigation, and victim support.</p>
      </div>

      <div>
        <strong className="text-sm text-[#20252B] block mb-1">Prohibited Use</strong>
        <p>You may not use TruthLens to execute automated punitive or disciplinary actions against individuals without authorized human review. You may not conduct denial-of-service attacks or attempt SSRF server probing.</p>
      </div>

      <div>
        <strong className="text-sm text-[#20252B] block mb-1">Disclaimer of Legal Proof</strong>
        <p>TruthLens outputs communicate computational forensic signals. They do not constitute official medical determinations or binding legal evidence.</p>
      </div>
    </div>
  </div>
);

export const AccessibilityPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl font-extrabold text-[#20252B] font-display">Accessibility (WCAG 2.1 AA)</h1>
    <div className="card-elevation p-6 bg-white border border-[#E8E6DF] space-y-4 text-xs text-[#4B5563] leading-relaxed">
      <p>
        TruthLens is committed to digital accessibility for all users, including individuals with visual, cognitive, or motor disabilities.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Color Contrast:</strong> Text tokens maintain strict WCAG AA contrast against warm ivory and white surfaces.</li>
        <li><strong>Keyboard Navigation:</strong> All interactive elements, upload pickers, and modals are fully operable via Tab, Enter, and Escape.</li>
        <li><strong>Reduced Motion:</strong> CSS keyframes and Framer Motion transitions respect the system <code>prefers-reduced-motion</code> setting.</li>
        <li><strong>Screen Reader Friendly:</strong> Dynamic state updates and SVG icons provide descriptive ARIA labels.</li>
      </ul>
    </div>
  </div>
);
