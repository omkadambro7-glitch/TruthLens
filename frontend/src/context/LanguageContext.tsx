import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.verify_image': 'Check Image',
    'nav.verify_certificate': 'Verify Certificate',
    'nav.sos': 'Victim SOS',
    'nav.accuracy': 'Accuracy & Limits',
    'nav.learn': 'Learn Hub',
    'nav.university': 'University Portal',
    'nav.signin': 'Sign In',
    'nav.signout': 'Sign Out',
    
    // Hero
    'hero.title_part1': "See what's real.",
    'hero.title_part2': "Know what to trust.",
    'hero.subtitle': 'Check images for signs of AI manipulation, review document authenticity, and understand the evidence — free, with privacy and transparency built in.',
    'hero.cta_image': 'Check an Image',
    'hero.cta_certificate': 'Verify a Certificate',
    'hero.trust_badge': 'Free-first Public Good • Privacy-Preserving • Honest Uncertainty',

    // Common
    'common.upload': 'Upload File',
    'common.drag_drop': 'Drag and drop your file here, or browse',
    'common.verdict': 'Verification Verdict',
    'common.confidence': 'Calibrated Confidence',
    'common.uncertainty': 'Uncertainty Level',
    'common.evidence': 'Forensic Evidence Breakdown',
    'common.share_report': 'Share Trust Report',
    'common.download_report': 'Download Report (PDF)',
    'common.free_forever': 'Free Forever Commitment',
    'common.footer_disclaimer': 'TruthLens is a digital media integrity platform. Results communicate statistical signals and do not constitute legal proof or automated disciplinary determinations.'
  },
  hi: {
    // Nav
    'nav.verify_image': 'छवि जांचें',
    'nav.verify_certificate': 'प्रमाणपत्र सत्यापन',
    'nav.sos': 'पीड़ित सहायता (SOS)',
    'nav.accuracy': 'सटीकता और सीमाएं',
    'nav.learn': 'शिक्षा केंद्र',
    'nav.university': 'विश्वविद्यालय पोर्टल',
    'nav.signin': 'साइन इन करें',
    'nav.signout': 'साइन आउट',

    // Hero
    'hero.title_part1': 'सच्चाई पहचानें।',
    'hero.title_part2': 'विश्वास का आधार जानें।',
    'hero.subtitle': 'एआई हेरफेर के संकेतों के लिए छवियों की जांच करें, दस्तावेज़ प्रमाणिकता की समीक्षा करें, और साक्ष्य को समझें — नि:शुल्क, गोपनीयता और पारदर्शिता के साथ।',
    'hero.cta_image': 'छवि की जांच करें',
    'hero.cta_certificate': 'प्रमाणपत्र सत्यापित करें',
    'hero.trust_badge': 'नि:शुल्क जनहित सेवा • गोपनीयता-केंद्रित • पारदर्शी अनिश्चितता',

    // Common
    'common.upload': 'फ़ाइल अपलोड करें',
    'common.drag_drop': 'फ़ाइल यहाँ खींचें और छोड़ें, या चुनें',
    'common.verdict': 'सत्यापन परिणाम',
    'common.confidence': 'मापा गया विश्वास स्तर',
    'common.uncertainty': 'अनिश्चितता का स्तर',
    'common.evidence': 'फॉरेंसिक साक्ष्य विवरण',
    'common.share_report': 'ट्रस्ट रिपोर्ट साझा करें',
    'common.download_report': 'रिपोर्ट डाउनलोड करें (PDF)',
    'common.free_forever': 'सदा के लिए नि:शुल्क प्रतिबद्धता',
    'common.footer_disclaimer': 'ट्रुथ-लेंस डिजिटल मीडिया अखंडता प्लेटफ़ॉर्म है। परिणाम सांख्यिकीय संकेतों को संप्रेषित करते हैं और कानूनी प्रमाण नहीं हैं।'
  },
  mr: {
    // Nav
    'nav.verify_image': 'प्रतिमा तपासा',
    'nav.verify_certificate': 'प्रमाणपत्र पडताळणी',
    'nav.sos': 'मदत केंद्र (SOS)',
    'nav.accuracy': 'अचूकता आणि मर्यादा',
    'nav.learn': 'ज्ञान केंद्र',
    'nav.university': 'विद्यापीठ पोर्टल',
    'nav.signin': 'साइन इन करा',
    'nav.signout': 'साइन आउट',

    // Hero
    'hero.title_part1': 'खरे काय ते पाहा.',
    'hero.title_part2': 'कशावर विश्वास ठेवायचा ते जाणा.',
    'hero.subtitle': 'एआय हस्तक्षेपासाठी प्रतिमा तपासा, दस्तऐवज सत्यता तपासा आणि पुरावे समजून घ्या — विनामूल्य, गोपनीयता आणि पारदर्शकतेसह.',
    'hero.cta_image': 'प्रतिमा तपासा',
    'hero.cta_certificate': 'प्रमाणपत्र पडताळा',
    'hero.trust_badge': 'विनामूल्य जनहित सेवा • गोपनीयता-संरक्षित • प्रामाणिक अनिश्चितता',

    // Common
    'common.upload': 'फाइल अपलोड करा',
    'common.drag_drop': 'येथे फाइल ड्रॅग करा किंवा निवडा',
    'common.verdict': 'पडताळणी निकाल',
    'common.confidence': 'विश्वासार्हता पातळी',
    'common.uncertainty': 'अनिश्चिततेची पातळी',
    'common.evidence': 'फॉरेन्सिक पुरावे विश्लेषण',
    'common.share_report': 'ट्रस्ट अहवाल शेअर करा',
    'common.download_report': 'अहवाल डाउनलोड करा (PDF)',
    'common.free_forever': 'नेहमीसाठी मोफत वचनबद्धता',
    'common.footer_disclaimer': 'ट्रुथलेंस हे डिजिटल मीडिया सत्यता प्लॅटफॉर्म आहे. निष्कर्ष सांख्यिकीय संकेतांवर आधारित आहेत.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
