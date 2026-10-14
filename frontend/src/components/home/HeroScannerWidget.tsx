import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  User, 
  Receipt, 
  ArrowRight,
  Sparkles,
  Zap,
  Play,
  Pause,
  Mic,
  Video,
  Eye,
  FileCode,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConsoleCase {
  id: string;
  engineName: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  verdict: 'AI SYNTHETIC / TAMPERED' | 'AUTHENTIC CAPTURE' | 'BIOMETRIC GLITCH';
  isFake: boolean;
  score: number;
  timeSec: number;
  primarySignal: string;
  secondarySignal: string;
  link: string;
  type: 'image' | 'video' | 'voice' | 'invoice';
}

const CONSOLE_CASES: ConsoleCase[] = [
  {
    id: 'image',
    engineName: 'AI Image ELA',
    icon: Eye,
    title: 'Synthetic Profile Portrait (Diffusion v6)',
    badge: 'SPECTRAL ELA',
    verdict: 'AI SYNTHETIC / TAMPERED',
    isFake: true,
    score: 96.8,
    timeSec: 1.1,
    primarySignal: 'Transposed Convolution Latent Artifacts Detected',
    secondarySignal: 'Corneal Pupil Reflection Asymmetry in Vector Grid',
    link: '/verify/image',
    type: 'image'
  },
  {
    id: 'video',
    engineName: 'Deepfake Radar',
    icon: Video,
    title: 'Politician Live Face-Swap (GAN Overlay)',
    badge: 'BIOMETRIC GLITCH',
    verdict: 'BIOMETRIC GLITCH',
    isFake: true,
    score: 95.4,
    timeSec: 1.4,
    primarySignal: 'Unnatural 0 Blink Frequency across 18s window',
    secondarySignal: 'Jawline boundary micro-shear jitter at 30.0 fps',
    link: '/verify/video',
    type: 'video'
  },
  {
    id: 'voice',
    engineName: 'Voice Clone',
    icon: Mic,
    title: 'Executive Wire Transfer Voice Note',
    badge: 'ACOUSTIC SYNTH',
    verdict: 'AI SYNTHETIC / TAMPERED',
    isFake: true,
    score: 97.6,
    timeSec: 0.8,
    primarySignal: 'Sharp Harmonic Truncation above 16,000Hz (TTS)',
    secondarySignal: 'Zero micro-aspiration breath pauses in vocal tract',
    link: '/verify/voice',
    type: 'voice'
  },
  {
    id: 'invoice',
    engineName: 'Invoice Tamper',
    icon: Receipt,
    title: 'Uber Enterprise Expense Receipt',
    badge: 'MATH DISCREPANCY',
    verdict: 'AI SYNTHETIC / TAMPERED',
    isFake: true,
    score: 98.2,
    timeSec: 0.6,
    primarySignal: 'Total artificially inflated by +$184.20 in Photoshop',
    secondarySignal: 'Digit "2" baseline font kerning mismatch of 3.2px',
    link: '/verify/invoice',
    type: 'invoice'
  }
];

export const HeroScannerWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const currentCase = CONSOLE_CASES[activeTab];

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setIsScanning(true);
    setActiveTab(index);
    setTimeout(() => {
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-xl lg:max-w-none mx-auto select-none">
      {/* Outer Studio Frame with Blaugrana Glass Border */}
      <div className="relative rounded-3xl bg-[#090F22]/90 backdrop-blur-2xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#004D98]/20 via-[#A50044]/25 to-transparent pointer-events-none" />

        {/* Top Studio Header with macOS Window Pips & Live Radar Indicator */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#060A16]/80 px-4 py-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="font-mono text-[10px] text-slate-400 font-bold ml-2 hidden sm:inline">
              TRUTHLENS SENSOR STATION • ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ONLINE
            </span>
          </div>
        </div>

        {/* Engine Switcher Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/3 p-2 gap-1.5 overflow-x-auto custom-sidebar-scroll">
          {CONSOLE_CASES.map((item, idx) => {
            const Icon = item.icon;
            const active = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(idx)}
                className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#A50044] to-[#004D98] text-white shadow-md border border-white/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.engineName}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Ingestion Canvas & Visualizer */}
        <div className="p-5 sm:p-6 space-y-5">
          
          <div className="relative rounded-2xl overflow-hidden bg-[#040813] border border-white/10 aspect-[16/10] flex flex-col justify-between p-4 shadow-inner">
            
            {/* Real-time Forensic Laser Scanner Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF4D6D] to-transparent shadow-[0_0_20px_#FF4D6D] animate-laser z-30 pointer-events-none" />
            )}

            {/* Corner Targeting Reticles */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#EDBB00] pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#EDBB00] pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#EDBB00] pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#EDBB00] pointer-events-none z-20" />

            {/* Top Canvas Tag */}
            <div className="flex items-center justify-between text-xs z-20">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#A50044] animate-ping" />
                <span>{currentCase.badge}</span>
              </span>

              <span className="font-mono text-[10px] text-[#EDBB00] bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                LATENCY: {currentCase.timeSec}s
              </span>
            </div>

            {/* Center Visual Mock Depending on Engine Type */}
            <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 z-10 py-4">
              
              {currentCase.type === 'image' && (
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 max-w-sm">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#A50044] to-[#004D98] flex items-center justify-center text-white shadow-lg">
                      <Eye className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Diffusion Latent Grid</span>
                      <span className="text-[10px] font-mono text-red-300">8x8 DCT Spectral Residual High</span>
                      <span className="text-[10px] font-mono text-slate-400 block">Corneal Specular Glint Vector Error</span>
                    </div>
                  </div>
                </div>
              )}

              {currentCase.type === 'video' && (
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 max-w-sm">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#A50044] flex items-center justify-center relative mx-auto">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 absolute top-5 left-5 shadow-sm" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 absolute top-5 right-5 shadow-sm" />
                    <div className="w-5 h-1.5 rounded-full bg-[#EDBB00] absolute bottom-5" />
                    <span className="text-[9px] font-mono font-bold text-white uppercase">FRAME 180</span>
                  </div>
                  <span className="text-[11px] font-mono text-red-300 font-bold block">
                    Facial Boundary Mask Glitch Detected
                  </span>
                </div>
              )}

              {currentCase.type === 'voice' && (
                <div className="w-full max-w-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Audio Waveform (44.1 kHz)</span>
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="px-2.5 py-1 bg-[#A50044] hover:bg-[#C70039] text-white rounded-lg flex items-center gap-1 font-mono text-[10px]"
                    >
                      {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isPlayingAudio ? 'PAUSE' : 'PLAY'}</span>
                    </button>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-12 px-1">
                    {[35, 60, 80, 40, 95, 75, 40, 85, 100, 70, 35, 90, 60, 40, 80, 50, 90, 30, 70, 85, 40, 60, 85, 30].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          i > 18 ? 'bg-slate-700/60' : 'bg-gradient-to-t from-[#A50044] to-[#004D98]'
                        }`}
                        style={{ height: isPlayingAudio ? `${Math.max(20, (h * (i % 3 + 1)) % 100)}%` : `${h * 0.7}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-red-300 block">
                    ⚠️ Truncation at 16,000Hz indicative of neural TTS vocoder
                  </span>
                </div>
              )}

              {currentCase.type === 'invoice' && (
                <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 max-w-sm text-left">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
                    <span className="text-slate-400">Claimed Reimbursement:</span>
                    <span className="font-mono font-bold text-white">$248.50</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Reconciled Math Sum:</span>
                    <span className="font-mono font-bold text-emerald-400">$64.30</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 text-red-400 font-bold font-mono">
                    <span>Variance:</span>
                    <span>+$184.20 (Photoshop Altered)</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status Banner */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 z-20 pt-2 border-t border-white/10 bg-black/40 -mx-4 -mb-4 px-4 py-2">
              <span className="truncate max-w-[240px] text-slate-400">{currentCase.title}</span>
              <span className="text-emerald-400 font-bold">ACCURACY 97.4%</span>
            </div>

          </div>

          {/* Signals Breakdown & Confidence Bar */}
          <div className="p-4 rounded-2xl bg-white/4 border border-white/10 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">VERDICT CONFIDENCE</span>
                <span className="text-sm font-black text-white font-mono">{currentCase.score}% PROBABILITY</span>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#A50044] to-[#70002E] text-white border border-[#A50044]/50 shadow-sm">
                {currentCase.verdict}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#EDBB00] shrink-0 mt-0.5" />
                <span className="leading-snug">{currentCase.primarySignal}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#004D98] shrink-0 mt-0.5" />
                <span className="leading-snug">{currentCase.secondarySignal}</span>
              </div>
            </div>

            {/* CTA to Dedicated Tool */}
            <div className="pt-2">
              <Link
                to={currentCase.link}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#A50044] via-[#70002E] to-[#004D98] hover:from-[#C70039] hover:to-[#0066B2] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Open Dedicated {currentCase.engineName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroScannerWidget;
