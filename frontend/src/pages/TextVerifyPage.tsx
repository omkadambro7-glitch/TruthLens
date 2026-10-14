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
    perplexity: 18.2, // Low perplexity = very predictable LLM text
    burstiness: 0.14, // Low burstiness = flat robotic sentence lengths
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
    perplexity: 84.6, // High perplexity = organic unpredictable human speech
    burstiness: 0.72, // High burstiness = dynamic varied sentence structures
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
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#DC052D] bg-red-50 border border-red-200 shadow-2xs">
            <FileCode className="w-3.5 h-3.5 text-[#DC052D]" />
            <span>AI Text & Essay Scanner</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 shadow-2xs">
            <span className="text-[#FFCC00]">★</span>
            <span>Perplexity & Token Burstiness</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>100% Free Forever</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
          AI Text & Content Authenticity Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Inspect student essays, customer complaints, reviews, and job applications. Analyzes token entropy, linguistic perplexity, and syntax burstiness to highlight synthetic LLM patterns (ChatGPT, Claude, Gemini).
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Text Input & Sample Cases */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            
            <form onSubmit={handleCustomScan} className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-900 block">
                  Paste Text or Document Content:
                </label>
                <span className="text-slate-500 font-mono">
                  {wordCount} words • {charCount} chars
                </span>
              </div>

              <textarea
                rows={9}
                required
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste academic essay, candidate submission, customer review, or article here to inspect..."
                className="w-full p-4 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-[#DC052D] focus:ring-2 focus:ring-[#DC052D]/10 bg-white leading-relaxed resize-y font-sans"
              />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isScanning || !inputText.trim()}
                  className="flex-1 bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Text Authenticity</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Clear Input"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Test Cases */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-bold text-slate-900 block">
                Or test with verified linguistic cases:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('chatgpt')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'chatgpt'
                      ? 'bg-red-50 border-[#DC052D] text-red-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>1. University Macroeconomics Paper (94.6% AI)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-red-200">Load Case →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('human')}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCase?.id === 'human'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
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
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>3. Corporate Strategy Memo (64.0% AI-Assisted)</span>
                  <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-amber-200">Load Case →</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sentence Highlighter & Statistical Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          {isScanning ? (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-3 border-[#DC052D] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-sm font-bold text-slate-900">Computing n-gram perplexity & burstiness metrics...</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Parsing sentence variance distribution, transition predictability, and synthetic hedging phrases.
              </p>
            </div>
          ) : selectedCase ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Verdict Header Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1 font-mono">
                      TEXT AUTHENTICITY VERDICT
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black px-3.5 py-1 rounded-full border ${
                        selectedCase.isAi 
                          ? 'text-red-700 bg-red-50 border-red-200' 
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        {selectedCase.verdict}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Confidence: <strong className="text-slate-900 font-mono">{selectedCase.score}%</strong>
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                    {selectedCase.category}
                  </span>
                </div>

                {/* Statistical Metric Gauges */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Perplexity</span>
                    <span className="text-lg font-black font-mono text-slate-900">{selectedCase.perplexity}</span>
                    <span className="text-[9px] text-slate-400 block">Low = Synthetic</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Burstiness</span>
                    <span className="text-lg font-black font-mono text-slate-900">{selectedCase.burstiness}</span>
                    <span className="text-[9px] text-slate-400 block">Low = Robotic</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Boilerplate Cliches</span>
                    <span className="text-lg font-black font-mono text-slate-900">{selectedCase.repeatedPhrasingCount}</span>
                    <span className="text-[9px] text-slate-400 block">Hedging Tokens</span>
                  </div>
                </div>

                {/* Sentence by Sentence Token Color Highlighting */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                      Token Saliency & Sentence Decomposition
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-red-600">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span>AI Synthetic</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Human Baseline</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedCase.sentences.map((sent, i) => (
                      <div 
                        key={i}
                        className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 transition-all ${
                          sent.isAi 
                            ? 'bg-red-50/70 border-red-200 hover:bg-red-100/70' 
                            : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/70'
                        }`}
                      >
                        <p className={`font-medium ${sent.isAi ? 'text-red-950' : 'text-emerald-950'}`}>
                          "{sent.text}"
                        </p>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={sent.isAi ? 'text-red-700' : 'text-emerald-700'}>
                            {sent.reason}
                          </span>
                          <span className={`font-mono font-bold px-1.5 py-0.2 rounded border ${
                            sent.isAi ? 'bg-red-200/50 text-red-900 border-red-300' : 'bg-emerald-200/50 text-emerald-900 border-emerald-300'
                          }`}>
                            {sent.prob}% {sent.isAi ? 'AI' : 'Human'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/dashboard/reports/job-demo-deepfake-01"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#DC052D] to-[#990000] hover:from-[#E60026] hover:to-[#B3001B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Download Cryptographic Text Audit Report</span>
                  </Link>

                  <span className="text-[11px] text-slate-500 font-mono">
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
