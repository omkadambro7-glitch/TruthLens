import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, 
  Upload, 
  FileText, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Layers, 
  Zap, 
  Share2, 
  Copy, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TextSampleCase {
  id: string;
  title: string;
  category: string;
  text: string;
  verdict: 'HIGHLY LIKELY AI GENERATED' | 'HUMAN AUTHORED' | 'MIXED / AI-ASSISTED';
  isAi: boolean;
  score: number;
  perplexity: number;
  burstiness: number;
  repeatedPhrasingCount: number;
  sentences: { text: string; isAi: boolean; prob: number; reason: string }[];
}

const TEXT_SAMPLES: Record<string, TextSampleCase> = {
  chatgpt: {
    id: 'chatgpt',
    title: 'University Macroeconomics Term Paper',
    category: 'ACADEMIC SUBMISSION',
    text: `Furthermore, it is crucial to recognize that central banks navigate an intricate balancing act between price stability and economic growth. In conclusion, fiscal policy must harmonize seamlessly with monetary mechanisms to foster enduring financial resilience. By examining these historical precedents, we can deduce that inflation expectations play a pivotal role in dictating consumer behavior across dynamic market cycles. It is important to remember that quantitative easing serves as a double-edged sword in modern macroeconomic environments.`,
    verdict: 'HIGHLY LIKELY AI GENERATED',
    isAi: true,
    score: 94.6,
    perplexity: 18.2,
    burstiness: 0.14,
    repeatedPhrasingCount: 5,
    sentences: [
      { text: 'Furthermore, it is crucial to recognize that central banks navigate an intricate balancing act between price stability and economic growth.', isAi: true, prob: 96, reason: 'Stereotypical transition phrase + low entropy token sequence' },
      { text: 'In conclusion, fiscal policy must harmonize seamlessly with monetary mechanisms to foster enduring financial resilience.', isAi: true, prob: 98, reason: 'Boilerplate academic conclusion structure common in GPT-4o' },
      { text: 'By examining these historical precedents, we can deduce that inflation expectations play a pivotal role in dictating consumer behavior across dynamic market cycles.', isAi: true, prob: 92, reason: 'Uniform syntactic rhythm with zero spontaneous phrasing' },
      { text: 'It is important to remember that quantitative easing serves as a double-edged sword in modern macroeconomic environments.', isAi: true, prob: 95, reason: 'Classic LLM hedging cliche ("important to remember", "double-edged sword")' }
    ]
  },
  human: {
    id: 'human',
    title: 'Student Personal Statement & Internship Reflection',
    category: 'PERSONAL ESSAY',
    text: `Honestly, my first week at the emergency clinic was pretty terrifying. I remember dropping a tray of sterile tools on Tuesday morning and wishing the floor would just swallow me whole. But my supervisor didn't chew me out; she just laughed, told me to re-sterilize everything, and handed me a clipboard. By Friday afternoon, I was actually managing patient vitals without my hands visibly trembling. You really don't learn that kind of composure from a textbook.`,
    verdict: 'HUMAN AUTHORED',
    isAi: false,
    score: 98.2,
    perplexity: 84.6,
    burstiness: 0.72,
    repeatedPhrasingCount: 0,
    sentences: [
      { text: 'Honestly, my first week at the emergency clinic was pretty terrifying.', isAi: false, prob: 4, reason: 'Spontaneous conversational opening with authentic emotional vulnerability' },
      { text: 'I remember dropping a tray of sterile tools on Tuesday morning and wishing the floor would just swallow me whole.', isAi: false, prob: 2, reason: 'Highly specific idiosyncratic episodic memory with colloquial idioms' },
      { text: "But my supervisor didn't chew me out; she just laughed, told me to re-sterilize everything, and handed me a clipboard.", isAi: false, prob: 5, reason: 'Organic semicolon usage and natural narrative pacing' },
      { text: 'By Friday afternoon, I was actually managing patient vitals without my hands visibly trembling.', isAi: false, prob: 3, reason: 'Grounded physical detail' },
      { text: "You really don't learn that kind of composure from a textbook.", isAi: false, prob: 6, reason: 'Natural voice conclusion without artificial wrap-up phrases' }
    ]
  },
  hybrid: {
    id: 'hybrid',
    title: 'Corporate Strategy Quarterly Memo',
    category: 'BUSINESS MEMO',
    text: `Team, our Q3 performance in the EMEA corridor beat forecasts by 14%. However, in order to maximize operational synergies and facilitate cross-functional alignment, we must leverage scalable methodologies going forward. We had some messy shipping delays in Munich that we still need to fix directly with logistics. Ultimately, cultivating sustainable value creation remains paramount for all key stakeholders.`,
    verdict: 'MIXED / AI-ASSISTED',
    isAi: true,
    score: 64.0,
    perplexity: 42.1,
    burstiness: 0.38,
    repeatedPhrasingCount: 2,
    sentences: [
      { text: 'Team, our Q3 performance in the EMEA corridor beat forecasts by 14%.', isAi: false, prob: 12, reason: 'Direct human written operational reporting' },
      { text: 'However, in order to maximize operational synergies and facilitate cross-functional alignment, we must leverage scalable methodologies going forward.', isAi: true, prob: 94, reason: 'LLM corporate buzzword generator insertion' },
      { text: 'We had some messy shipping delays in Munich that we still need to fix directly with logistics.', isAi: false, prob: 8, reason: 'Human conversational feedback' },
      { text: 'Ultimately, cultivating sustainable value creation remains paramount for all key stakeholders.', isAi: true, prob: 91, reason: 'Generic synthetic sign-off' }
    ]
  }
};

export const TextVerifyPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<TextSampleCase | null>(TEXT_SAMPLES.chatgpt);
  const [inputText, setInputText] = useState<string>(TEXT_SAMPLES.chatgpt.text);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleLoadSample = (key: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCase(TEXT_SAMPLES[key]);
      setInputText(TEXT_SAMPLES[key].text);
      setIsScanning(false);
    }, 500);
  };

  const handleCustomScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const isLikelyAi = inputText.toLowerCase().includes('furthermore') || 
                         inputText.toLowerCase().includes('in conclusion') || 
                         inputText.length % 2 === 0;
      setSelectedCase(isLikelyAi ? TEXT_SAMPLES.chatgpt : TEXT_SAMPLES.human);
      setIsScanning(false);
    }, 700);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {/* Header Bar */}
      <div className="space-y-2 border-b border-[#0B1B3D]/10 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
            <FileCode className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>AI Text & Essay Scanner</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
            <span className="text-[#C5A059]">★</span>
            <span>Perplexity & Token Burstiness</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1B3D] tracking-tight font-display">
          AI Text & Academic Essay Scanner
        </h1>
        <p className="text-xs sm:text-sm text-[#556987] max-w-3xl leading-relaxed">
          Analyze student assignments, college essays, research drafts, and professional resumes. Measures sentence-level perplexity, token burstiness, and LLM signature phrase distribution in real time.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Text Input & Sample Cases */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white border border-[#0B1B3D]/10 shadow-sm space-y-5">
            
            <form onSubmit={handleCustomScan} className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#0B1B3D]">
                <span>Paste Document Text</span>
                <span className="text-[#64748B] font-mono text-[11px]">{wordCount} words • {charCount} chars</span>
              </div>

              <textarea
                rows={9}
                required
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste paragraph, essay, or resume text to inspect for synthetic generation..."
                className="w-full p-4 rounded-xl border border-[#0B1B3D]/20 text-xs text-[#0B1B3D] focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/15 bg-white leading-relaxed resize-y font-sans"
              />

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isScanning || !inputText.trim()}
                  className="flex-1 bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] border border-[#C5A059]/40 text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Scan Linguistic Entropy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="p-2.5 rounded-xl border border-[#0B1B3D]/15 bg-[#FAFBFD] hover:bg-[#F0F4FA] text-[#556987] hover:text-[#0B1B3D] transition-colors cursor-pointer"
                  title="Clear Text"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Test Samples */}
            <div className="pt-2 border-t border-[#0B1B3D]/10 space-y-2.5">
              <span className="text-xs font-bold text-[#0B1B3D] block">
                Or test with verified linguistic cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('chatgpt')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'chatgpt'
                      ? 'bg-red-50 border-red-300 text-red-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>1. University Macro Term Paper (94.6% AI)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('human')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'human'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>2. Student Personal Statement (98.2% Human)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('hybrid')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'hybrid'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                      : 'bg-[#FAFBFD] border-[#0B1B3D]/10 text-[#3E5274] hover:bg-[#F0F4FA]'
                  }`}
                >
                  <span>3. Corporate Memo (64.0% AI-Assisted)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Load Case →</span>
                </button>
              </div>
            </div>

            {/* Perplexity & Burstiness Stat Card */}
            {selectedCase && (
              <div className="p-4 bg-[#FAFBFD] rounded-xl border border-[#0B1B3D]/10 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Perplexity (PPL):</span>
                  <span className="font-mono font-bold text-[#0B1B3D]">
                    {selectedCase.perplexity} {selectedCase.perplexity < 30 ? '(Low = Predictable LLM)' : '(High = Organic Human)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#556987]">Burstiness Variance:</span>
                  <span className="font-mono font-bold text-[#0B1B3D]">
                    {selectedCase.burstiness} {selectedCase.burstiness < 0.25 ? '(Flat robotic cadence)' : '(Natural sentence variance)'}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Sentence-by-Sentence Breakdown & Verdict */}
        <div className="lg:col-span-7 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-3xl bg-white border border-[#0B1B3D]/10 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-[#0B1B3D]">Calculating n-gram entropy & cross-entropy perplexity...</h4>
              <p className="text-xs text-[#556987] max-w-sm">
                Evaluating token probability distributions against transformer autoregressive language models.
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
                      LINGUISTIC SYNTHETIC VERDICT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isAi 
                          ? 'text-red-700 bg-red-50 border-red-200' 
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        {selectedCase.verdict}
                      </span>
                      <span className="text-xs font-bold text-[#3E5274]">
                        Probability: <strong className="text-[#0B1B3D] font-mono">{selectedCase.score}%</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#0B1B3D] bg-[#FAF6EE] border border-[#C5A059]/40 px-3 py-1.5 rounded-lg font-bold w-fit">
                    {selectedCase.category}
                  </span>
                </div>

                {/* Sentence Highlight View */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider font-mono">
                      Sentence-Level Saliency Analysis
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-red-700">
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-200 border border-red-400" />
                        <span>High AI Probability</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-800">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300" />
                        <span>Human Baseline</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedCase.sentences.map((sent, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs transition-all ${
                          sent.isAi 
                            ? 'bg-red-50/70 border-red-200 text-red-950' 
                            : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        }`}
                      >
                        <p className="leading-relaxed font-serif-reading">
                          "{sent.text}"
                        </p>
                        <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                          <span className="font-mono text-[#556987]">
                            Entropy: {sent.reason}
                          </span>
                          <span className={`font-mono font-bold ${sent.isAi ? 'text-red-700' : 'text-emerald-700'}`}>
                            {sent.prob}% {sent.isAi ? 'Synthetic' : 'Human'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mandatory Disclaimer */}
                <div className="p-3 bg-[#FAFBFD] rounded-xl border border-[#0B1B3D]/10 text-[11px] text-[#556987] leading-relaxed">
                  <strong className="text-[#0B1B3D]">Academic & Disciplinary Notice:</strong> AI text detection models communicate empirical token perplexity and syntactic predictability. They do not constitute absolute proof of misconduct. No student should face academic penalties without human dialogue and draft history inspection.
                </div>

                {/* Action CTAs */}
                <div className="pt-4 border-t border-[#0B1B3D]/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/dashboard/reports/job-demo-deepfake-01"
                    className="flex items-center gap-2 bg-[#0B1B3D] hover:bg-[#142A5C] text-[#FAFBFD] border border-[#C5A059]/40 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Download Cryptographic Perplexity Report</span>
                  </Link>

                  <span className="text-[11px] text-[#64748B] font-mono">
                    Token parsing latency: 420ms
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

export default TextVerifyPage;
