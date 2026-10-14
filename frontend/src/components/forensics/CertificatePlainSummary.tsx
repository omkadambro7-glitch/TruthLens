import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  UserCheck, 
  Calendar, 
  Stamp, 
  Sparkles,
  Copy,
  Check,
  Send,
  HelpCircle
} from 'lucide-react';
import { CertificateVerificationResult } from '../../types';

interface CertificatePlainSummaryProps {
  result: CertificateVerificationResult;
  onSubmitToReview?: () => void;
}

type LangMode = 'hinglish' | 'simple_en' | 'hindi';

export const CertificatePlainSummary: React.FC<CertificatePlainSummaryProps> = ({ 
  result,
  onSubmitToReview
}) => {
  const [lang, setLang] = useState<LangMode>('hinglish');
  const [copied, setCopied] = useState(false);

  const isLowRisk = result.risk_category === 'Low apparent integrity risk';
  const isReview = result.risk_category === 'Review recommended';
  const isHighRisk = !isLowRisk && !isReview;

  const content = {
    title: {
      hinglish: isLowRisk 
        ? 'Medical Certificate Asli aur Valid Lagta Hai' 
        : isReview 
        ? 'Certificate Check Karna Zaroori Hai (Date mein Gap Hai)' 
        : 'Certificate mein Kuch Zaroori Cheezein Missing Hain',
      simple_en: isLowRisk 
        ? 'Certificate Passed Initial Integrity Pre-Checks' 
        : isReview 
        ? 'Chronological Review Recommended (Issue Date Latency)' 
        : 'Integrity Warning: Key Verification Elements Missing',
      hindi: isLowRisk 
        ? 'मेडिकल प्रमाणपत्र वैध एवं सही प्रतीत होता है' 
        : isReview 
        ? 'प्रमाणपत्र की समीक्षा आवश्यक (तारीखों में अंतर)' 
        : 'प्रमाणपत्र में आवश्यक विवरण अनुपस्थित हैं'
    },
    subtitle: {
      hinglish: isLowRisk 
        ? 'Doctor ka naam, council registration number, dates aur stamp sab verify ho chuke hain.' 
        : isReview 
        ? `Chhutti shuru hui ${result.leave_start} ko, par certificate banwaya gaya ${result.issue_date} ko (${result.issue_date !== result.leave_start ? 'thode din baad' : 'same din'}). Student se prescription ya clinic slip maangein.` 
        : 'Doctor ka registration number ya hospital credentials Council directory se match nahi ho rahe.',
      simple_en: isLowRisk 
        ? 'Doctor identity, valid registration number, logical date continuity, and physical stamps have all passed extraction checks.' 
        : isReview 
        ? `The certificate was issued retrospectively after the illness began. Request supporting clinic bills or prescriptions from the student.` 
        : 'Required credentials like the physician council registration number could not be found or verified.',
      hindi: isLowRisk 
        ? 'डॉक्टर का नाम, काउंसिल पंजीकरण संख्या, तिथियाँ और मुहर सभी सत्यापित हैं।' 
        : isReview 
        ? 'अवकाश शुरू होने के बाद प्रमाणपत्र जारी किया गया है। छात्र से संबंधित नुस्खा (प्रिस्क्रिप्शन) मांगें।' 
        : 'चिकित्सक का पंजीकरण क्रमांक या आवश्यक विवरण सत्यापित नहीं हो सके।'
    },
    cards: [
      {
        icon: UserCheck,
        title: {
          hinglish: '1. Doctor aur Hospital ki Jaanch',
          simple_en: '1. Physician & Clinic Credentials',
          hindi: '1. डॉक्टर और अस्पताल का विवरण'
        },
        desc: {
          hinglish: result.doctor_name 
            ? `${result.doctor_name} (${result.registration_number || 'No Reg No'}) - ${result.registry_status || 'Council record checked'}` 
            : 'Doctor ka naam ya registration number clear nahi mila.',
          simple_en: result.doctor_name 
            ? `Issued by ${result.doctor_name}. Registry: ${result.registry_status || 'Verified'}.` 
            : 'Physician credentials were unreadable or absent from the document.',
          hindi: result.doctor_name 
            ? `${result.doctor_name} - ${result.registry_status || 'पंजीकरण रिकॉर्ड सत्यापित'}` 
            : 'डॉक्टर का नाम अथवा पंजीकरण नंबर स्पष्ट नहीं है।'
        },
        status: !!(result.doctor_name && result.registration_number)
      },
      {
        icon: Calendar,
        title: {
          hinglish: '2. Dates aur Chhutti ka Hisaab',
          simple_en: '2. Date Logic & Leave Duration',
          hindi: '2. तिथियाँ और अवकाश की अवधि'
        },
        desc: {
          hinglish: `${result.duration_days} din ki chhutti (${result.leave_start} se ${result.leave_end}). Issue date: ${result.issue_date}.`,
          simple_en: `Leave span: ${result.duration_days} days (${result.leave_start} to ${result.leave_end}). Issued on: ${result.issue_date}.`,
          hindi: `${result.duration_days} दिनों का अवकाश (${result.leave_start} से ${result.leave_end})। जारी तिथि: ${result.issue_date}।`
        },
        status: isLowRisk
      },
      {
        icon: Stamp,
        title: {
          hinglish: '3. Asli Sign aur Hospital ki Stamp',
          simple_en: '3. Physical Ink Signature & Seal',
          hindi: '3. हस्ताक्षर एवं अस्पताल की मुहर'
        },
        desc: {
          hinglish: result.signature_detected && result.stamp_detected 
            ? 'Doctor ka physical signature aur hospital ki round rubber stamp dono maujood hain.' 
            : 'Stamp ya signature mein se koi cheez theek se scan nahi hui.',
          simple_en: result.signature_detected && result.stamp_detected 
            ? 'Both wet-ink physician signature and hospital clinic stamp were identified.' 
            : 'Missing physical seal or handwritten physician signature.',
          hindi: result.signature_detected && result.stamp_detected 
            ? 'डॉक्टर के हस्ताक्षर और अस्पताल की मुहर दोनों पाए गए हैं।' 
            : 'मुहर अथवा हस्ताक्षर स्पष्ट नहीं हैं।'
        },
        status: !!(result.signature_detected && result.stamp_detected)
      }
    ],
    reviewerTip: {
      hinglish: '⚖️ Zaroori Niyam: TruthLens kisi bhi student ki chhutti ko seedha reject nahi karta. Agar dates mein thoda gap hai, toh student ko clinic ki receipt dikhane ka mauka dein.',
      simple_en: '⚖️ University Fairness Policy: TruthLens is an advisory pre-check system. Retrospective certificates should be clarified with the student rather than automatically penalized.',
      hindi: '⚖️ आवश्यक नियम: ट्रूथलेन्स किसी छात्र का अवकाश सीधे निरस्त नहीं करता। यदि तिथियों में अंतर है, तो छात्र से अस्पताल की रसीद माँगने का अवसर दें।'
    }
  };

  const copySummaryText = () => {
    const textToCopy = `TruthLens Certificate Summary:
Assessment: ${content.title[lang]}
Doctor: ${result.doctor_name || 'N/A'} (Reg: ${result.registration_number || 'N/A'})
Dates: ${result.leave_start} to ${result.leave_end} (${result.duration_days} days)
Details: ${content.subtitle[lang]}
Advice: ${content.reviewerTip[lang]}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="royal-card p-6 sm:p-7 bg-white border border-[#E8E5DC] space-y-6 shadow-sm text-left">
      
      {/* Top Header with Language Switching */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1EFE8]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] border border-[#E6D5A2] flex items-center justify-center text-[#A88234]">
            <Sparkles className="w-4 h-4 text-[#C6A45C]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#101B35] font-sans flex items-center gap-1.5">
              <span>Seedha Jawab (Document Analysis)</span>
              <span className="text-[10px] font-bold bg-[#FAF0D7] text-[#A88234] px-2 py-0.5 rounded-full border border-[#E6D5A2]">
                Plain English / Hinglish
              </span>
            </h3>
            <p className="text-[11px] text-[#687386]">Certificate ka seedha matlab aur zaroori jaankari</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E5DC]">
          <button
            type="button"
            onClick={() => setLang('hinglish')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              lang === 'hinglish' 
                ? 'bg-[#101B35] text-white shadow-xs' 
                : 'text-[#687386] hover:text-[#101B35]'
            }`}
          >
            Hinglish
          </button>
          <button
            type="button"
            onClick={() => setLang('simple_en')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              lang === 'simple_en' 
                ? 'bg-[#101B35] text-white shadow-xs' 
                : 'text-[#687386] hover:text-[#101B35]'
            }`}
          >
            Simple English
          </button>
          <button
            type="button"
            onClick={() => setLang('hindi')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              lang === 'hindi' 
                ? 'bg-[#101B35] text-white shadow-xs' 
                : 'text-[#687386] hover:text-[#101B35]'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Big Verdict Pill Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isLowRisk 
          ? 'bg-[#EDF7F1] border-[#A3D9B8]' 
          : isReview 
          ? 'bg-[#FBF8EE] border-[#E6D5A2]' 
          : 'bg-[#FEF2F2] border-red-200'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isLowRisk 
              ? 'bg-green-100 text-[#1E824C]' 
              : isReview 
              ? 'bg-amber-100 text-[#A88234]' 
              : 'bg-red-100 text-[#DC2626]'
          }`}>
            {isLowRisk ? (
              <CheckCircle2 className="w-6 h-6 text-[#1E824C]" />
            ) : isReview ? (
              <AlertTriangle className="w-6 h-6 text-[#A88234]" />
            ) : (
              <XCircle className="w-6 h-6 text-[#DC2626]" />
            )}
          </div>
          <div className="space-y-1">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
              isLowRisk 
                ? 'bg-green-200/60 text-green-800 border-green-300' 
                : isReview 
                ? 'bg-amber-200/60 text-amber-900 border-amber-300' 
                : 'bg-red-200/60 text-red-800 border-red-300'
            }`}>
              {isLowRisk ? 'Clear Certificate' : isReview ? 'Review Chahiye (Date Latency)' : 'Attention Required'}
            </span>
            <h4 className="text-base sm:text-lg font-black text-[#101B35] leading-snug">
              {content.title[lang]}
            </h4>
            <p className="text-xs text-[#505D75] leading-relaxed max-w-xl">
              {content.subtitle[lang]}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={copySummaryText}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#D8D4C7] hover:border-[#101B35] text-[#101B35] transition-all shrink-0 cursor-pointer shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
        </button>
      </div>

      {/* 3 Inspection Points */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold text-[#101B35] uppercase tracking-wider">
          Asaan Shabdon Mein Checklist
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {content.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-[#E8E5DC] bg-[#FAF9F6] flex flex-col gap-2 hover:border-[#C6A45C] transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#101B35]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white border border-[#E8E5DC] flex items-center justify-center text-[#233F8C] shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#233F8C]" />
                    </div>
                    <span className="truncate">{card.title[lang]}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    card.status ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    {card.status ? 'OK' : 'Check'}
                  </span>
                </div>
                <p className="text-[11px] text-[#687386] leading-relaxed">
                  {card.desc[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviewer Guidance / Fair Play Rule */}
      <div className="p-4 rounded-xl bg-[#FAF0D7]/40 border border-[#E6D5A2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-[#5F4B18] leading-relaxed">
          {content.reviewerTip[lang]}
        </p>

        {onSubmitToReview && (
          <button
            type="button"
            onClick={onSubmitToReview}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:border-[#C6A45C] border border-transparent transition-all shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#E6D5A2]" />
            <span>Send to University Queue</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default CertificatePlainSummary;
