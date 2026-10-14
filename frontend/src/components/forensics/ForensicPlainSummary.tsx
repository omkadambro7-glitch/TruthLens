import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  Sparkles, 
  Camera, 
  ShieldAlert, 
  ShieldCheck, 
  Share2, 
  ArrowRight,
  Info,
  Check,
  Copy
} from 'lucide-react';
import { ImageVerificationResult } from '../../types';

interface ForensicPlainSummaryProps {
  result: ImageVerificationResult;
  onOpenReport?: () => void;
}

type LangMode = 'hinglish' | 'simple_en' | 'hindi';

export const ForensicPlainSummary: React.FC<ForensicPlainSummaryProps> = ({ 
  result, 
  onOpenReport 
}) => {
  const [lang, setLang] = useState<LangMode>('hinglish');
  const [copied, setCopied] = useState(false);

  const isFake = result.verdict === 'LIKELY FAKE';
  const isReal = result.verdict === 'LIKELY REAL';
  const isReview = result.verdict === 'NEEDS HUMAN REVIEW';

  // Dynamic Content based on Verdict and Language
  const content = {
    verdictTitle: {
      hinglish: isFake 
        ? 'Yeh Photo AI / Computer se Banayi Gayi Hai (Deepfake)' 
        : isReal 
        ? 'Yeh ek Asli Camera Photo Hai (Authentic)' 
        : 'Pura Sure Nahi Hai (Human Review Zaroori Hai)',
      simple_en: isFake 
        ? 'AI Generated / Manipulated Photo (Deepfake Detected)' 
        : isReal 
        ? 'Authentic Camera Photo (No AI Manipulation)' 
        : 'Inconclusive Media (Human Review Recommended)',
      hindi: isFake 
        ? 'यह फोटो एआई द्वारा बनाई गई है (डीपफेक)' 
        : isReal 
        ? 'यह एक असली कैमरा फोटो है (सत्यापित)' 
        : 'पूरी तरह स्पष्ट नहीं (मानव समीक्षा आवश्यक)'
    },
    verdictSub: {
      hinglish: isFake 
        ? 'Hamare system ko is photo mein AI tools (jaise Midjourney, DALL-E, Photoshop AI) ke saaf nishaan mile hain.' 
        : isReal 
        ? 'Is photo mein koi bhi AI chhed-chhad nahi mili. Yeh ek asli camera ya phone se li gayi photo hai.' 
        : 'Yeh photo WhatsApp ya social media par baar-baar share hone ki wajah se blur ho chuki hai. Galat aarop lagane se bachne ke liye human inspection zaroori hai.',
      simple_en: isFake 
        ? 'Clear mathematical markers of synthetic image generators (Diffusion / GANs) were detected across lighting and pixel structures.' 
        : isReal 
        ? 'Consistent natural lighting, camera sensor grain, and organic facial proportions confirm this is genuine.' 
        : 'Heavy compression from messaging apps has degraded fine image details. TruthLens abstains from automated accusation to ensure fairness.',
      hindi: isFake 
        ? 'इस फोटो में एआई टूल्स और सिंथेटिक इमेज जनरेटर के स्पष्ट निशान मिले हैं।' 
        : isReal 
        ? 'इस तस्वीर में किसी भी प्रकार की छेड़छाड़ नहीं पाई गई है। यह सामान्य कैमरे की वास्तविक फोटो है।' 
        : 'व्हाट्सएप या सोशल मीडिया कम्प्रेशन के कारण कुछ विवरण अस्पष्ट हैं। उचित निर्णय के लिए विशेषज्ञ समीक्षा आवश्यक है।'
    },
    points: [
      {
        icon: Eye,
        title: {
          hinglish: '1. Aankhon aur Roshni ka Angle (Eyes & Light)',
          simple_en: '1. Eye Reflections & Light Source',
          hindi: '1. आँखों में रोशनी का कोण (Eye Reflections)'
        },
        desc: {
          hinglish: isFake 
            ? 'Dono aankhon ki putliyon (pupils) mein roshni alag-alag disha se aa rahi hai. AI models aksar dono aankhon mein ek jaisi natural light nahi bana pate.' 
            : isReal 
            ? 'Dono aankhon mein ek hi jagah se aane wali natural roshni ka reflection bilkul sahi hai.' 
            : 'Photo low resolution hone ki wajah se aankhon ki reflection saaf dikh nahi rahi hai.',
          simple_en: isFake 
            ? 'Corneal light highlights in the left and right eyes do not align to the same physical light source — a classic hallmark of AI generation.' 
            : isReal 
            ? 'Physically consistent specular reflections across both eyes from a single, natural ambient light source.' 
            : 'Pupil edges are slightly softened by image compression, preventing automated reflection calculation.',
          hindi: isFake 
            ? 'दोनों आँखों में प्रकाश का परावर्तन अलग-अलग दिशाओं से दिखाई दे रहा है, जो एआई जनित तस्वीरों में आम है।' 
            : isReal 
            ? 'दोनों आँखों में रोशनी का परावर्तन स्वाभाविक और एक समान है।' 
            : 'फोटो की गुणवत्ता कम होने के कारण आँखों का प्रकाश स्पष्ट नहीं है।'
        }
      },
      {
        icon: Sparkles,
        title: {
          hinglish: '2. Skin Texture aur Kinare (Skin & Hair Edges)',
          simple_en: '2. Facial Edges & Skin Texture',
          hindi: '2. चेहरे की बनावट और किनारे (Skin & Edges)'
        },
        desc: {
          hinglish: isFake 
            ? 'Chehra unnaturally smooth (plastic jaisa) dikh raha hai aur baalon ke kinaron par computer blur ke nishaan hain.' 
            : isReal 
            ? 'Chehre ke pores, baalon ke kinare aur skin texture bilkul natural hain jaise aam insaan ke hote hain.' 
            : 'Social media compression ki wajah se skin thodi pixelated lag rahi hai, par AI ke pakke saboot nahi hain.',
          simple_en: isFake 
            ? 'Unnatural hyper-smoothing across skin pores paired with artificial blending artifacts around fine hair boundaries.' 
            : isReal 
            ? 'Organic skin micropores, natural hair strands, and continuous color gradations typical of real photography.' 
            : 'JPEG blocking squares make it difficult to separate natural skin pores from compression artifacts.',
          hindi: isFake 
            ? 'चेहरे की त्वचा अस्वाभाविक रूप से बहुत अधिक चिकनी है और बालों के किनारों पर धुंधलापन है।' 
            : isReal 
            ? 'त्वचा की बनावट और चेहरे के किनारे बिल्कुल स्वाभाविक और वास्तविक हैं।' 
            : 'कम्प्रेशन के कारण त्वचा के पिक्सल थोड़े विकृत हैं, किन्तु यह सामान्य हो सकता है।'
        }
      },
      {
        icon: Camera,
        title: {
          hinglish: '3. Camera Sensor ka Grain (Camera Noise)',
          simple_en: '3. Camera Sensor Fingerprint',
          hindi: '3. कैमरा सेंसर ग्रेन (Sensor Noise)'
        },
        desc: {
          hinglish: isFake 
            ? 'Asli camera ya phone se photo lene par jo natural halka grain aata hai, woh yahan gayab hai. Yeh photo computer ne banayi hai.' 
            : isReal 
            ? 'Camera sensor ka natural noise pure photo par barabar faila hua hai, jisse saabit hota hai ki yeh real camera se li gayi hai.' 
            : 'Photo ko WhatsApp par baar-baar save karne ki wajah se camera ka natural grain dab gaya hai.',
          simple_en: isFake 
            ? 'Missing physical camera sensor noise. The pixels were synthesized computationally rather than captured through a glass lens onto a sensor.' 
            : isReal 
            ? 'Uniform optical Poisson-Gaussian sensor noise verified across both the subject and background quadrants.' 
            : 'Heavy re-saving has flattened the camera sensor noise pattern into blocky compression grids.',
          hindi: isFake 
            ? 'वास्तविक कैमरा सेंसर से आने वाला स्वाभाविक ग्रेन अनुपस्थित है। यह कंप्यूटर द्वारा रचित है।' 
            : isReal 
            ? 'कैमरा लेंस और सेंसर का स्वाभाविक नॉइज़ पूरे चित्र में संतुलित रूप से मौजूद है।' 
            : 'बार-बार फ़ाइल सेव करने से सेंसर का विवरण दब गया है।'
        }
      }
    ],
    actionHeading: {
      hinglish: 'Aapko Ab Kya Karna Chahiye? (Next Steps)',
      simple_en: 'Recommended Action for Decision Makers',
      hindi: 'अब आपको क्या करना चाहिए? (सिफारिश)'
    },
    actionText: {
      hinglish: isFake 
        ? '⚠️ Is photo par bharosa na karein. Agar kisi ne yeh photo kisi ghabrahat, fraud, ya scandalous claim ke liye bheji hai, toh ise sach na maanein aur social media par aage share na karein.' 
        : isReal 
        ? '✅ Yeh photo authentic lagti hai. Is photo ko standard camera image ki tarah accept kiya ja sakta hai.' 
        : '🔍 Faisla lene se pehle original high-quality file mangwayein. Kisi bhi vyakti par bina pakke saboot ke ilzaam na lagayein.',
      simple_en: isFake 
        ? '⚠️ Treat this media as untrusted. Do not accept this image as proof of real-world events. Flag or request the original unedited file.' 
        : isReal 
        ? '✅ Safe to proceed. Multi-domain forensic checks did not find indicators of generative AI tampering or synthetic replacement.' 
        : '🔍 Escalate to human review. Request the original camera RAW or high-resolution file before making disciplinary or administrative decisions.',
      hindi: isFake 
        ? '⚠️ इस तस्वीर पर भरोसा न करें। इसे बिना पुष्टि के आगे साझा न करें और मूल फ़ाइल की माँग करें।' 
        : isReal 
        ? '✅ यह तस्वीर वास्तविक प्रतीत होती है। इसे वैध प्रमाण के रूप में आगे बढ़ाया जा सकता है।' 
        : '🔍 अंतिम निर्णय लेने से पहले उच्च गुणवत्ता वाली मूल फ़ाइल प्राप्त करें और विशेषज्ञ से जाँच कराएँ।'
    }
  };

  const copySummaryText = () => {
    const textToCopy = `TruthLens Forensic Summary:
Verdict: ${content.verdictTitle[lang]}
Confidence: ${Math.round(result.confidence_score * 100)}%
Explanation: ${content.verdictSub[lang]}
1. ${content.points[0].title[lang]}: ${content.points[0].desc[lang]}
2. ${content.points[1].title[lang]}: ${content.points[1].desc[lang]}
3. ${content.points[2].title[lang]}: ${content.points[2].desc[lang]}
Advice: ${content.actionText[lang]}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="royal-card p-6 sm:p-7 bg-white border border-[#E8E5DC] space-y-6 shadow-sm text-left">
      
      {/* Top Bar with Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1EFE8]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAF0D7] border border-[#E6D5A2] flex items-center justify-center text-[#A88234]">
            <Sparkles className="w-4 h-4 text-[#C6A45C]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#101B35] font-sans flex items-center gap-1.5">
              <span>Seedha Jawab (Asaan Bhasha)</span>
              <span className="text-[10px] font-bold bg-[#FAF0D7] text-[#A88234] px-2 py-0.5 rounded-full border border-[#E6D5A2]">
                Plain Explanation
              </span>
            </h3>
            <p className="text-[11px] text-[#687386]">Bina technical jhanjhat ke asaan shabdon mein report</p>
          </div>
        </div>

        {/* Language switcher pills */}
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

      {/* Hero Plain Verdict Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isFake 
          ? 'bg-[#FEF2F2] border-red-200' 
          : isReal 
          ? 'bg-[#EDF7F1] border-[#A3D9B8]' 
          : 'bg-[#FBF8EE] border-[#E6D5A2]'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isFake 
              ? 'bg-red-100 text-[#DC2626]' 
              : isReal 
              ? 'bg-green-100 text-[#1E824C]' 
              : 'bg-amber-100 text-[#A88234]'
          }`}>
            {isFake ? (
              <ShieldAlert className="w-6 h-6 text-[#DC2626]" />
            ) : isReal ? (
              <ShieldCheck className="w-6 h-6 text-[#1E824C]" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-[#A88234]" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                isFake 
                  ? 'bg-red-200/60 text-red-800 border-red-300' 
                  : isReal 
                  ? 'bg-green-200/60 text-green-800 border-green-300' 
                  : 'bg-amber-200/60 text-amber-900 border-amber-300'
              }`}>
                {isFake ? 'AI Generated / Fake' : isReal ? 'Real Photo' : 'Check Chahiye'}
              </span>
              <span className="text-xs font-bold text-[#101B35]">
                Certainty: {Math.round(result.confidence_score * 100)}%
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-[#101B35] leading-snug">
              {content.verdictTitle[lang]}
            </h4>
            <p className="text-xs text-[#505D75] leading-relaxed max-w-xl">
              {content.verdictSub[lang]}
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

      {/* 3 Asaan Points (Why our AI thinks so) */}
      <div className="space-y-3">
        <h5 className="text-xs font-bold text-[#101B35] uppercase tracking-wider flex items-center gap-2">
          <span>Kyun aisa lag raha hai? (3 Asaan Saboot)</span>
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {content.points.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-[#E8E5DC] bg-[#FAF9F6] flex flex-col gap-2 hover:border-[#C6A45C] transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#101B35]">
                  <div className="w-6 h-6 rounded-lg bg-white border border-[#E8E5DC] flex items-center justify-center text-[#233F8C] shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#233F8C]" />
                  </div>
                  <span className="truncate">{point.title[lang]}</span>
                </div>
                <p className="text-[11px] text-[#687386] leading-relaxed">
                  {point.desc[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Advice Box */}
      <div className="p-4 rounded-xl bg-[#FAF0D7]/40 border border-[#E6D5A2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <strong className="text-xs font-bold text-[#101B35] block">
            {content.actionHeading[lang]}
          </strong>
          <p className="text-xs text-[#5F4B18] leading-relaxed">
            {content.actionText[lang]}
          </p>
        </div>

        {onOpenReport && (
          <button
            type="button"
            onClick={onOpenReport}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#101B35] to-[#233F8C] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:border-[#C6A45C] border border-transparent transition-all shrink-0 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E6D5A2]" />
            <span>Official Report</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default ForensicPlainSummary;
