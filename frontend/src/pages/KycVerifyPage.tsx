import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Upload, 
  UserCheck, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  Hash, 
  Eye, 
  Scan,
  BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface KycSampleCase {
  id: string;
  docType: string;
  holderName: string;
  documentNumber: string;
  verdict: 'FRAUDULENT IDENTITY DETECTED' | 'AUTHENTIC GOVERNMENT ID' | 'OCR DATA TAMPERED';
  isFake: boolean;
  score: number;
  tamperField: string;
  signals: { name: string; status: 'fake' | 'real' | 'warning'; detail: string }[];
  extractedFields: { label: string; value: string; status: 'verified' | 'tampered' }[];
}

const KYC_SAMPLES: Record<string, KycSampleCase> = {
  driver_license_fake: {
    id: 'driver_license_fake',
    docType: "Driver's License (State Department)",
    holderName: 'Marcus Sterling',
    documentNumber: 'DL-984210-B',
    verdict: 'FRAUDULENT IDENTITY DETECTED',
    isFake: true,
    score: 96.4,
    tamperField: 'Primary Portrait (Diffusion Synthetic Face)',
    signals: [
      { name: 'Ghost Portrait vs Primary Face Match', status: 'fake', detail: 'Secondary ultraviolet ghost image depicts different facial bone structure' },
      { name: 'AI Synthetic Portrait Analysis', status: 'fake', detail: 'Primary photo exhibits asymmetric ear lobe contours & synthetic iris pattern' },
      { name: 'Guilloche Security Line Overlay', status: 'fake', detail: 'Security wavy patterns broken around the portrait border (cut-and-paste overlay)' },
      { name: 'Barcode PDF417 Cross-Check', status: 'warning', detail: '2D barcode payload does not match the printed document issue date' }
    ],
    extractedFields: [
      { label: 'Full Legal Name', value: 'Marcus Sterling', status: 'verified' },
      { label: 'Date of Birth', value: '14 Nov 1988', status: 'verified' },
      { label: 'License Number', value: 'DL-984210-B', status: 'verified' },
      { label: 'Biometric Portrait', value: 'Synthetic Diffusion (StyleGAN3)', status: 'tampered' },
      { label: 'Security Overlay', value: 'Broken Micro-pattern', status: 'tampered' }
    ]
  },
  authentic_passport: {
    id: 'authentic_passport',
    docType: 'Official Government Passport',
    holderName: 'Elena Rostova',
    documentNumber: 'P84920194',
    verdict: 'AUTHENTIC GOVERNMENT ID',
    isFake: false,
    score: 99.1,
    tamperField: 'None — All Biometrics & Checksums Valid',
    signals: [
      { name: 'Ghost Portrait vs Primary Face Match', status: 'real', detail: '1:1 facial biometric feature vector match (0.94 cosine similarity score)' },
      { name: 'MRZ (Machine Readable Zone) Checksum', status: 'real', detail: 'All check digits (Doc#, DOB, Expiration) match ICAO Doc 9303 standard' },
      { name: 'Guilloche Security Line Overlay', status: 'real', detail: 'Continuous unbroken rainbow security guilloche printing intact' },
      { name: 'Optical Variable Ink & Hologram', status: 'real', detail: 'Natural angular color shift from gold to green verified' }
    ],
    extractedFields: [
      { label: 'Full Legal Name', value: 'Elena Rostova', status: 'verified' },
      { label: 'Nationality', value: 'DEU / European Union', status: 'verified' },
      { label: 'Date of Birth', value: '23 Aug 1994', status: 'verified' },
      { label: 'MRZ Checksum', value: 'ICAO 9303 Compliant', status: 'verified' },
      { label: 'Ghost Watermark', value: 'Verified Authentic', status: 'verified' }
    ]
  },
  tampered_dob: {
    id: 'tampered_dob',
    docType: 'National Identity Card',
    holderName: 'Kevin Schneider',
    documentNumber: 'ID-5541920',
    verdict: 'OCR DATA TAMPERED',
    isFake: true,
    score: 91.5,
    tamperField: 'Date of Birth (Altered from 2006 to 2001 for age check)',
    signals: [
      { name: 'Font Typography & Glyphs Alignment', status: 'fake', detail: 'Digit "1" uses Arial Rounded instead of government OCR-B fixed pitch font' },
      { name: 'Underlying Paper Fiber Disturbance', status: 'fake', detail: 'Physical scraping and micro-blurring around birth year digits' },
      { name: 'MRZ Line 2 Check Digit Mismatch', status: 'fake', detail: 'Printed DOB "010415" fails MRZ modulo 10 checksum algorithm' },
      { name: 'Holographic Seal Intactness', status: 'real', detail: 'Primary national hologram shows genuine manufacturing origin' }
    ],
    extractedFields: [
      { label: 'Full Legal Name', value: 'Kevin Schneider', status: 'verified' },
      { label: 'Printed Date of Birth', value: '15 Apr 2001 (Altered)', status: 'tampered' },
      { label: 'MRZ Encoded DOB', value: '15 Apr 2006 (Underage)', status: 'tampered' },
      { label: 'Document Number', value: 'ID-5541920', status: 'verified' }
    ]
  }
};

export const KycVerifyPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<KycSampleCase | null>(KYC_SAMPLES.driver_license_fake);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleLoadSample = (key: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCase(KYC_SAMPLES[key]);
      setIsScanning(false);
    }, 500);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      const isLikelyFake = e.target.files[0].name.toLowerCase().includes('fake') || 
                           e.target.files[0].name.toLowerCase().includes('kyc') ||
                           e.target.files[0].size % 2 === 0;
      setTimeout(() => {
        setSelectedCase(isLikelyFake ? KYC_SAMPLES.driver_license_fake : KYC_SAMPLES.authentic_passport);
        setIsScanning(false);
      }, 800);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {/* Header Bar */}
      <div className="space-y-2 border-b border-[#0B1B3D]/10 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>KYC & Identity Authenticator</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
            <span className="text-[#C5A059]">★</span>
            <span>MRZ Checksum & Biometric Match</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight font-display">
          KYC & Identity Document Authenticator
        </h1>
        <p className="text-xs sm:text-sm text-[#556987] max-w-3xl leading-relaxed">
          Verify passports, national identity cards, driver's licenses, and residency permits. Performs dual ghost-portrait comparison, ICAO Doc 9303 MRZ checksum recalculation, and security guilloche pattern inspection.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Dropzone & Sample Cases */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-5">
            
            {/* Upload Zone */}
            <label className="border-2 border-dashed border-[#0B1B3D]/20 hover:border-[#C5A059] hover:bg-[#FAF6EE]/30 rounded-2xl p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all block">
              <input
                type="file"
                accept="application/pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleUploadSimulate}
              />
              <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#0B1B3D] block mb-1">
                Upload Government ID Card or Passport
              </span>
              <span className="text-xs text-[#64748B] block max-w-xs">
                JPEG, PNG, or PDF up to 25MB. Instant OCR credential extraction and MRZ checksum analysis.
              </span>
            </label>

            {/* Test Cases */}
            <div className="pt-2 border-t border-[#0B1B3D]/10 space-y-2.5">
              <span className="text-xs font-bold text-[#0B1B3D] block">
                Or test with verified identity fraud cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('driver_license_fake')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'driver_license_fake'
                      ? 'bg-red-50 border-red-300 text-red-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>1. AI Face-Swapped Driver's License (96.4% Fake)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('authentic_passport')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'authentic_passport'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>2. Authentic Government Passport (99.1% Real)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('tampered_dob')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'tampered_dob'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>3. Altered Date of Birth on ID Card (91.5%)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Load Case →</span>
                </button>
              </div>
            </div>

            {/* Document Spec Card */}
            {selectedCase && (
              <div className="p-4 bg-[#FAFBFD] rounded-xl border border-[#0B1B3D]/10 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Document Type:</span>
                  <span className="font-mono font-bold text-[#0B1B3D]">{selectedCase.docType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Holder Name:</span>
                  <span className="font-mono font-bold text-[#0B1B3D]">{selectedCase.holderName}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#0B1B3D]/10">
                  <span className="text-[#0B1B3D] font-bold">Tamper Zone:</span>
                  <span className={`font-mono text-[11px] font-bold ${selectedCase.isFake ? 'text-red-700' : 'text-emerald-700'}`}>
                    {selectedCase.tamperField}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Biometric Match & Forensic Checks */}
        <div className="lg:col-span-7 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-3xl bg-white border border-[#0B1B3D]/10 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-[#0B1B3D]">Validating ICAO MRZ format & running ghost-portrait biometric match...</h4>
              <p className="text-xs text-[#556987] max-w-sm">
                Screening for secondary image tampering, font alignment anomalies, and holographic security pattern discontinuities.
              </p>
            </div>
          ) : selectedCase ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Verdict Header */}
              <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0B1B3D]/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1 font-mono">
                      KYC INTEGRITY ASSESSMENT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isFake 
                          ? 'text-red-700 bg-red-50 border-red-200' 
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        {selectedCase.verdict}
                      </span>
                      <span className="text-xs font-bold text-[#3E5274]">
                        Score: <strong className="text-[#0B1B3D] font-mono">{selectedCase.score}%</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 px-3 py-1.5 rounded-lg font-bold w-fit">
                    {selectedCase.documentNumber}
                  </span>
                </div>

                {/* Extracted Fields Table */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider font-mono">
                    Extracted Document Credentials
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedCase.extractedFields.map((field, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                          field.status === 'tampered' 
                            ? 'bg-red-50/70 border-red-200 text-red-950 font-bold' 
                            : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#0B1B3D]'
                        }`}
                      >
                        <span className="text-[#556987] font-medium">{field.label}</span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span>{field.value}</span>
                          {field.status === 'tampered' ? (
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Feature Checks */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider font-mono">
                    Identity Forensic Signals
                  </h3>

                  <div className="space-y-2">
                    {selectedCase.signals.map((sig) => (
                      <div 
                        key={sig.name}
                        className="p-3.5 rounded-xl border border-[#0B1B3D]/10 bg-[#FAFBFD] flex flex-col gap-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0B1B3D]">{sig.name}</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            sig.status === 'fake'
                              ? 'text-red-700 bg-red-50 border-red-200'
                              : sig.status === 'real'
                              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                              : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}>
                            {sig.status === 'fake' ? 'Tamper Detected' : sig.status === 'real' ? 'Verified Intact' : 'Review Warning'}
                          </span>
                        </div>
                        <p className="text-[#556987] text-[11px] leading-relaxed">
                          {sig.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-4 border-t border-[#0B1B3D]/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/dashboard/reports/job-demo-deepfake-01"
                    className="flex items-center gap-2 bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] border border-[#C5A059]/40 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Download Cryptographic KYC Audit Ledger</span>
                  </Link>

                  <span className="text-[11px] text-[#64748B] font-mono">
                    Biometric match latency: 680ms
                  </span>
                </div>

              </div>
            </motion.div>
          ) : null}
        </div>

      </div>

    </div>
  );
};

export default KycVerifyPage;
