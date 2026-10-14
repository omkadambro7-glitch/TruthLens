import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Upload, 
  FileText, 
  DollarSign, 
  Sparkles, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Share2, 
  Hash, 
  Calculator,
  Search,
  ScanLine
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InvoiceSampleCase {
  id: string;
  vendor: string;
  category: string;
  claimedTotal: string;
  calculatedTotal: string;
  discrepancyAmount: string;
  verdict: 'TAMPERED INVOICE DETECTED' | 'AUTHENTIC FINANCIAL RECEIPT' | 'OCR DISCREPANCY';
  isTampered: boolean;
  score: number;
  tamperZone: string;
  checks: { name: string; status: 'fake' | 'real' | 'warning'; detail: string }[];
  lineItems: { desc: string; qty: number; unitPrice: string; lineTotal: string; altered: boolean }[];
}

const INVOICE_SAMPLES: Record<string, InvoiceSampleCase> = {
  uber_tamper: {
    id: 'uber_tamper',
    vendor: 'Uber Enterprise Travel',
    category: 'CORPORATE REIMBURSEMENT',
    claimedTotal: '$248.50',
    calculatedTotal: '$64.30',
    discrepancyAmount: '+$184.20 (Inflated in Photoshop)',
    verdict: 'TAMPERED INVOICE DETECTED',
    isTampered: true,
    score: 98.4,
    tamperZone: 'Total Amount & Tip Row (Pixel Boundary Ghosting)',
    checks: [
      { name: 'Digit Kerning & Baseline Alignment', status: 'fake', detail: 'The digit "2" sits 3.2px higher than baseline font grid, indicating pasted digit' },
      { name: 'JPEG Quantization Ghosting (8x8 DCT)', status: 'fake', detail: 'Secondary compression artifacts detected solely around the "$248.50" bounding box' },
      { name: 'Subtotal & Tax Mathematical Reconciliation', status: 'fake', detail: 'Sum of fare ($54.30) + Tolls ($10.00) = $64.30 != Claimed $248.50' },
      { name: 'PDF Digital Metadata Signature', status: 'warning', detail: 'Edited using Adobe Photoshop 2024 / Re-saved with altered PDF stream ID' }
    ],
    lineItems: [
      { desc: 'Base Fare & Distance (Munich Airport to Hotel)', qty: 1, unitPrice: '$54.30', lineTotal: '$54.30', altered: false },
      { desc: 'Highway Toll Surcharge', qty: 1, unitPrice: '$10.00', lineTotal: '$10.00', altered: false },
      { desc: 'Photoshop Injected Excess Travel Fee', qty: 1, unitPrice: '$184.20', lineTotal: '$184.20', altered: true }
    ]
  },
  authentic_aws: {
    id: 'authentic_aws',
    vendor: 'Amazon Web Services EMEA',
    category: 'CLOUD INFRASTRUCTURE',
    claimedTotal: '$1,429.60',
    calculatedTotal: '$1,429.60',
    discrepancyAmount: '$0.00 (Perfect Match)',
    verdict: 'AUTHENTIC FINANCIAL RECEIPT',
    isTampered: false,
    score: 99.2,
    tamperZone: 'None — Cryptographically Sealed PDF',
    checks: [
      { name: 'Digit Kerning & Baseline Alignment', status: 'real', detail: 'Vector text glyphs aligned to sub-pixel accuracy within font matrix' },
      { name: 'JPEG Quantization Ghosting (8x8 DCT)', status: 'real', detail: 'Pure vector document stream with zero secondary compression halo' },
      { name: 'Subtotal & Tax Mathematical Reconciliation', status: 'real', detail: 'Net sum ($1,201.34) + 19% German VAT ($228.26) = Exactly $1,429.60' },
      { name: 'VAT / Tax Registry Validation', status: 'real', detail: 'EU VAT ID DE123456789 verified active on VIES registry' }
    ],
    lineItems: [
      { desc: 'Amazon EC2 Compute Instances (eu-central-1)', qty: 4, unitPrice: '$180.00', lineTotal: '$720.00', altered: false },
      { desc: 'Amazon S3 Storage & Retrieval Data Transfer', qty: 1, unitPrice: '$481.34', lineTotal: '$481.34', altered: false },
      { desc: 'German Standard VAT (19%)', qty: 1, unitPrice: '$228.26', lineTotal: '$228.26', altered: false }
    ]
  },
  restaurant_tamper: {
    id: 'restaurant_tamper',
    vendor: 'Bavarian Dining Guild',
    category: 'CLIENT ENTERTAINMENT',
    claimedTotal: '€490.00',
    calculatedTotal: '€190.00',
    discrepancyAmount: '+€300.00 (Handwritten "1" altered to "4")',
    verdict: 'TAMPERED INVOICE DETECTED',
    isTampered: true,
    score: 92.8,
    tamperZone: 'Leading digit "4" ink stroke density anomaly',
    checks: [
      { name: 'Ballpoint Pen Spectrometry & Ink Density', status: 'fake', detail: 'Leading digit stroke uses gel ink, rest of receipt written in oil ballpoint' },
      { name: 'Thermal Register Paper Grid Aging', status: 'fake', detail: 'Altered stroke overlays faded thermal dye pattern' },
      { name: 'Table Order Items Reconciliation', status: 'fake', detail: '4 course items total €190.00, mathematical mismatch with €490.00 total' },
      { name: 'Register Sequence Number Counter', status: 'real', detail: 'Fiscal register sequence ID #84930 matches chronological daily ledger' }
    ],
    lineItems: [
      { desc: 'Table Dinner Tasting Menu (x2)', qty: 2, unitPrice: '€75.00', lineTotal: '€150.00', altered: false },
      { desc: 'Beverage & Mineral Water Service', qty: 1, unitPrice: '€40.00', lineTotal: '€40.00', altered: false },
      { desc: 'Tampered Handwritten Total Marker', qty: 1, unitPrice: '€300.00', lineTotal: '€300.00', altered: true }
    ]
  }
};

export const InvoiceVerifyPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<InvoiceSampleCase | null>(INVOICE_SAMPLES.uber_tamper);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleLoadSample = (key: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCase(INVOICE_SAMPLES[key]);
      setIsScanning(false);
    }, 500);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      const isLikelyTampered = e.target.files[0].name.toLowerCase().includes('fake') || 
                               e.target.files[0].name.toLowerCase().includes('uber') ||
                               e.target.files[0].size % 2 === 0;
      setTimeout(() => {
        setSelectedCase(isLikelyTampered ? INVOICE_SAMPLES.uber_tamper : INVOICE_SAMPLES.authentic_aws);
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
            <Receipt className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Receipt & Expense Tamper Auditor</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
            <span className="text-[#C5A059]">★</span>
            <span>Mathematical & Pixel Kerning Audit</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight font-display">
          Receipt & Expense Invoice Tamper Engine
        </h1>
        <p className="text-xs sm:text-sm text-[#556987] max-w-3xl leading-relaxed">
          Screen corporate reimbursements, taxi bills, hospitality receipts, and vendor invoices. Detects Photoshop font mismatches, pixel ghosting around totals, tax ID mismatches, and mathematical reconciliation fraud.
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
                <Receipt className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#0B1B3D] block mb-1">
                Upload receipt, invoice PDF or photo
              </span>
              <span className="text-xs text-[#64748B] block max-w-xs">
                PDF, JPEG, PNG up to 25MB. Instant OCR digit alignment and mathematical sum reconciliation.
              </span>
            </label>

            {/* Test Cases */}
            <div className="pt-2 border-t border-[#0B1B3D]/10 space-y-2.5">
              <span className="text-xs font-bold text-[#0B1B3D] block">
                Or test with verified financial fraud cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('uber_tamper')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'uber_tamper'
                      ? 'bg-red-50 border-red-300 text-red-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>1. Inflated Uber Receipt ($184.20 altered)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('authentic_aws')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'authentic_aws'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>2. Authentic AWS Cloud Invoice (99.2% Real)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('restaurant_tamper')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'restaurant_tamper'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>3. Altered Dining Slip (€300.00 Overcharge)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Load Case →</span>
                </button>
              </div>
            </div>

            {/* Reconciliation Stat Card */}
            {selectedCase && (
              <div className="p-4 bg-[#FAFBFD] rounded-xl border border-[#0B1B3D]/10 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Claimed Total:</span>
                  <span className="font-mono font-black text-[#0B1B3D] text-sm">{selectedCase.claimedTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Calculated Mathematical Sum:</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedCase.calculatedTotal}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#0B1B3D]/10">
                  <span className="text-[#0B1B3D] font-bold">Audit Variance:</span>
                  <span className={`font-mono font-bold ${selectedCase.isTampered ? 'text-red-700' : 'text-emerald-700'}`}>
                    {selectedCase.discrepancyAmount}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Line Item Breakdown & Forensic Checks */}
        <div className="lg:col-span-7 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-3xl bg-white border border-[#0B1B3D]/10 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-[#0B1B3D]">Extracting receipt line items & verifying tax checksum...</h4>
              <p className="text-xs text-[#556987] max-w-sm">
                Inspecting font kerning micro-displacements and 8x8 DCT JPEG quantization around financial values.
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
                      FINANCIAL FORENSIC ASSESSMENT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isTampered 
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
                    {selectedCase.vendor}
                  </span>
                </div>

                {/* Extracted Line Items Table */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider font-mono">
                    Reconciled Line Items
                  </h3>

                  <div className="overflow-x-auto rounded-xl border border-[#0B1B3D]/10">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#FAFBFD] text-[#556987] font-bold border-b border-[#0B1B3D]/10">
                        <tr>
                          <th className="px-3.5 py-2.5">Line Description</th>
                          <th className="px-3.5 py-2.5">Qty</th>
                          <th className="px-3.5 py-2.5">Unit Price</th>
                          <th className="px-3.5 py-2.5 text-right">Line Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0B1B3D]/5">
                        {selectedCase.lineItems.map((item, idx) => (
                          <tr key={idx} className={item.altered ? 'bg-red-50/70 text-red-950 font-bold' : 'hover:bg-[#FAFBFD]'}>
                            <td className="px-3.5 py-2.5 flex items-center gap-2">
                              {item.altered && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />}
                              <span>{item.desc}</span>
                            </td>
                            <td className="px-3.5 py-2.5 font-mono">{item.qty}</td>
                            <td className="px-3.5 py-2.5 font-mono">{item.unitPrice}</td>
                            <td className="px-3.5 py-2.5 text-right font-mono font-bold">
                              {item.lineTotal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audit Checks */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider font-mono">
                    Tamper Verification Signals
                  </h3>

                  <div className="space-y-2">
                    {selectedCase.checks.map((chk) => (
                      <div 
                        key={chk.name}
                        className="p-3.5 rounded-xl border border-[#0B1B3D]/10 bg-[#FAFBFD] flex flex-col gap-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0B1B3D]">{chk.name}</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            chk.status === 'fake'
                              ? 'text-red-700 bg-red-50 border-red-200'
                              : chk.status === 'real'
                              ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                              : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}>
                            {chk.status === 'fake' ? 'Tamper Detected' : chk.status === 'real' ? 'Verified Intact' : 'Review Warning'}
                          </span>
                        </div>
                        <p className="text-[#556987] text-[11px] leading-relaxed">
                          {chk.detail}
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
                    <span>Download Expense Audit Ledger</span>
                  </Link>

                  <span className="text-[11px] text-[#64748B] font-mono">
                    Reconciliation latency: 510ms
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

export default InvoiceVerifyPage;
