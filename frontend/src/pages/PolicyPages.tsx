import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <div className="inline-flex items-center gap-2 bg-[#FAF6EE] border border-[#C5A059]/40 text-[#0B1B3D] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
      <span>Zenin • Open Digital Authenticity Standard</span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-display">
      About Zenin
    </h1>
    <p className="text-sm text-[#556987] leading-relaxed">
      Zenin was founded with a singular, unambiguous mission: <em>Make trustworthy digital media verification accessible to everyone, for free.</em>
    </p>

    <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-3">
      <h3 className="font-bold text-base text-[#0B1B3D]">Core Methodology</h3>
      <p className="text-xs text-[#556987] leading-relaxed">
        Modern generative AI has democratized synthetic generation, but commercial detection tools often charge exorbitant fees and make exaggerated claims of certainty. Zenin relies on peer-reviewed mathematical forensics—Error Level Analysis (ELA), 2D Fast Fourier Transform frequency analysis, acoustic vocoder rolloff profiling, and container metadata inspection.
      </p>
    </div>

    <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-3">
      <h3 className="font-bold text-base text-[#0B1B3D]">The Principle of Honest Uncertainty</h3>
      <p className="text-xs text-[#556987] leading-relaxed">
        We do not invent confidence. When media has undergone heavy social media compression or when forensic models disagree, our engine explicitly outputs <strong>NEEDS HUMAN REVIEW</strong>. We believe an honest question mark is infinitely more trustworthy than a false exclamation point.
      </p>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <div className="inline-flex items-center gap-2 bg-[#FAF6EE] border border-[#C5A059]/40 text-[#0B1B3D] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
      <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
      <span>Privacy by Design Guarantees</span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-display">
      Privacy Policy & Safeguards
    </h1>
    <p className="text-sm text-[#556987] leading-relaxed">
      Zenin treats uploaded images, medical certificates, student submissions, and victim evidence as sensitive, personal data.
    </p>

    <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-4 text-xs text-[#556987] leading-relaxed">
      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">1. Private Isolated Memory Processing</strong>
        <p>All uploaded files are processed strictly in volatile memory. Files cannot be discovered, enumerated, or accessed by third parties.</p>
      </div>

      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">2. Zero Unauthorized Model Retraining</strong>
        <p>We do not harvest your private images or documents to train commercial AI models.</p>
      </div>

      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">3. Victim SOS Heightened Protection</strong>
        <p>Our SOS workflow does not require victims to upload sensitive media. Incident notes and timeline checklists are preserved exclusively in the user’s local browser memory.</p>
      </div>

      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">4. Institutional Tenant Isolation</strong>
        <p>Student records and reviewer queues belonging to one university are never exposed to another organization.</p>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-display">
      Terms of Use & Acceptable Use
    </h1>
    <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-4 text-xs text-[#556987] leading-relaxed">
      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">1. Non-Disciplinary Determination Guarantee</strong>
        <p>Zenin is an integrity pre-check and human assistance tool. Outputs may never be used as the sole automated basis for employment termination, academic expulsion, or legal sanctions without authorized human review and opportunity to contest.</p>
      </div>

      <div>
        <strong className="text-sm text-[#0B1B3D] block mb-1">2. Free-First Commitment</strong>
        <p>Core public verification services remain free for researchers, students, victims of synthetic abuse, and public interest inquiries.</p>
      </div>
    </div>
  </div>
);

export const AccessibilityPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-6">
    <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] font-display">
      Accessibility Statement (WCAG 2.1 AA)
    </h1>
    <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-4 text-xs text-[#556987] leading-relaxed">
      <p>
        Zenin is committed to digital accessibility. We target WCAG 2.1 Level AA conformance across our application.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#556987]">
        <li><strong>Color Contrast:</strong> Minimum 4.5:1 ratio for standard text and 3:1 for large display headers and interactive elements.</li>
        <li><strong>Keyboard Navigation:</strong> Complete keyboard accessibility for tab navigation, upload areas, modals, and dropdowns.</li>
        <li><strong>Screen Readers:</strong> Semantic HTML5 landmarks, descriptive ARIA attributes, and clear verdict badges.</li>
        <li><strong>Reduced Motion:</strong> Full support for <code>prefers-reduced-motion</code> across all animations.</li>
      </ul>
    </div>
  </div>
);
