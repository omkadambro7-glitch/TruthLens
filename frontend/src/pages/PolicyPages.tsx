import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <div className="inline-flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
      <Sparkles className="w-3.5 h-3.5 text-[#C6A45C]" />
      <span>Project PRIMUS • TruthLens Foundation</span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display">
      About TruthLens
    </h1>
    <p className="text-sm text-[#687386] leading-relaxed">
      TruthLens was founded with a singular, unambiguous mission: <em>Make trustworthy digital media verification accessible to everyone, for free.</em>
    </p>

    <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-3">
      <h3 className="font-bold text-base text-[#101B35]">Core Methodology</h3>
      <p className="text-xs text-[#687386] leading-relaxed">
        Modern generative AI has democratized synthetic generation, but commercial detection tools often charge exorbitant fees and make exaggerated claims of certainty. TruthLens relies on peer-reviewed mathematical forensics—Error Level Analysis (ELA), 2D Fast Fourier Transform frequency analysis, localized noise dispersion, and container metadata inspection.
      </p>
    </div>

    <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-3">
      <h3 className="font-bold text-base text-[#101B35]">The Principle of Honest Uncertainty</h3>
      <p className="text-xs text-[#687386] leading-relaxed">
        We do not invent confidence. When an image has undergone multiple rounds of social media compression or when forensic models disagree, our engine explicitly outputs <strong>NEEDS HUMAN REVIEW</strong>. We believe an honest question mark is infinitely more trustworthy than a false exclamation point.
      </p>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <div className="inline-flex items-center gap-2 bg-[#FBF8EE] border border-[#E6D5A2] text-[#101B35] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
      <Lock className="w-3.5 h-3.5 text-[#C6A45C]" />
      <span>Privacy by Design Guarantees</span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display">
      Privacy Policy & Safeguards
    </h1>
    <p className="text-sm text-[#687386] leading-relaxed">
      TruthLens treats uploaded images, medical certificates, student submissions, and victim evidence as sensitive, personal data.
    </p>

    <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-4 text-xs text-[#687386] leading-relaxed">
      <div>
        <strong className="text-sm text-[#101B35] block mb-1">1. Private Isolated Storage</strong>
        <p>All uploaded files are stored outside the public web server root using randomized internal file hashes. Files cannot be discovered or enumerated by third parties.</p>
      </div>

      <div>
        <strong className="text-sm text-[#101B35] block mb-1">2. Zero Unauthorized Model Retraining</strong>
        <p>We do not use your private images or medical records to train public commercial models without explicit informed consent.</p>
      </div>

      <div>
        <strong className="text-sm text-[#101B35] block mb-1">3. Victim SOS Heightened Protection</strong>
        <p>Our SOS workflow does not require victims to upload sensitive media. Incident notes and timeline checklists are preserved exclusively in the user’s local browser memory.</p>
      </div>

      <div>
        <strong className="text-sm text-[#101B35] block mb-1">4. Institutional Tenant Isolation</strong>
        <p>Student records and reviewer queues belonging to one university are never exposed to another organization.</p>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display">
      Terms of Use & Acceptable Use
    </h1>
    <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-4 text-xs text-[#687386] leading-relaxed">
      <div>
        <strong className="text-sm text-[#101B35] block mb-1">1. Non-Disciplinary Determination Guarantee</strong>
        <p>TruthLens is an integrity pre-check and human assistance tool. Outputs may never be used as the sole automated basis for employment termination, academic expulsion, or legal sanctions without authorized human review and opportunity to contest.</p>
      </div>

      <div>
        <strong className="text-sm text-[#101B35] block mb-1">2. Free-First Commitment</strong>
        <p>Core public verification services remain free for researchers, students, victims of synthetic abuse, and public interest inquiries.</p>
      </div>
    </div>
  </div>
);

export const AccessibilityPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101B35] font-serif-display">
      Accessibility Statement (WCAG 2.1 AA)
    </h1>
    <div className="royal-card p-6 bg-white border border-[#E8E5DC] space-y-4 text-xs text-[#687386] leading-relaxed">
      <p>
        TruthLens is committed to digital accessibility. We target WCAG 2.1 Level AA conformance across our application.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#687386]">
        <li><strong>Color Contrast:</strong> Minimum 4.5:1 ratio for standard text and 3:1 for large display headers and interactive elements.</li>
        <li><strong>Keyboard Navigation:</strong> Complete keyboard accessibility for tab navigation, upload areas, modals, and dropdowns.</li>
        <li><strong>Screen Readers:</strong> Semantic HTML5 landmarks, descriptive ARIA attributes, and clear verdict badges.</li>
        <li><strong>Reduced Motion:</strong> Full support for <code>prefers-reduced-motion</code> across all animations.</li>
      </ul>
    </div>
  </div>
);
