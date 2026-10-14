import React, { useState, useEffect } from 'react';
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
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScanCase {
  id: string;
  category: string;
  title: string;
  image: string;
  verdict: 'AI GENERATED / FAKE' | 'AUTHENTIC CAPTURE' | 'TAMPERED DOCUMENT';
  isFake: boolean;
  score: number;
  timeSec: number;
  sourceCheck: string;
  metadataCheck: string;
  indicatorCheck: string;
  link: string;
}

const CASES: ScanCase[] = [
  {
    id: 'receipt',
    category: 'EXPENSE RECEIPT',
    title: 'Uber Enterprise Travel Invoice',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
    verdict: 'TAMPERED DOCUMENT',
    isFake: true,
    score: 96,
    timeSec: 1.1,
    sourceCheck: 'Digital PDF Re-rendered with Altered Font Kern',
    metadataCheck: 'Producer: PyMuPDF / Altered 14 mins post-creation',
    indicatorCheck: 'Invoice total artificially inflated by $184.20',
    link: '/verify/certificate'
  },
  {
    id: 'portrait',
    category: 'DEEPFAKE PORTRAIT',
    title: 'Synthetic Profile Identity (Diffusion v6)',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    verdict: 'AI GENERATED / FAKE',
    isFake: true,
    score: 94,
    timeSec: 1.4,
    sourceCheck: 'Transposed Convolutional Upsampler Artifacts',
    metadataCheck: 'Diffusion Latent Space Signature Detected',
    indicatorCheck: 'Corneal Reflection Asymmetry in Pupil Vectors',
    link: '/verify/image?sample=deepfake'
  },
  {
    id: 'camera',
    category: 'ORIGINAL CAMERA CAPTURE',
    title: 'Automotive Damage Claim Photo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    verdict: 'AUTHENTIC CAPTURE',
    isFake: false,
    score: 98,
    timeSec: 0.9,
    sourceCheck: 'Physical Optical Sensor Shot Noise Coherent',
    metadataCheck: 'Sony IMX Sensor Bayer CFA Pattern Verified',
    indicatorCheck: 'Consistent Ambient Lighting & Natural Vignetting',
    link: '/verify/image?sample=real'
  }
];

export const HeroScannerWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const currentCase = CASES[activeTab];

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setIsScanning(true);
    setActiveTab(index);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-md lg:max-w-none mx-auto">
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Top Media Switcher Tabs */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-2 gap-1.5">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(idx)}
              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center truncate cursor-pointer ${
                activeTab === idx
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <span className="block truncate">{item.category}</span>
            </button>
          ))}
        </div>

        {/* Media Scan Viewport */}
        <div className="p-4 sm:p-5 space-y-4">
          
          <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
            <img 
              src={currentCase.image} 
              alt={currentCase.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isScanning ? 'scale-105 filter blur-xs' : 'scale-100'}`}
            />

            {/* Futuristic Laser Sweep Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-28 animate-laser">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_3px_rgba(6,182,212,0.9)]" />
              </div>
            </div>

            {/* Glowing Corner Target Reticles */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            {/* Live Verdict Pill Overlay */}
            <div className="absolute top-3 inset-x-0 flex justify-center px-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide backdrop-blur-md shadow-md ${
                currentCase.isFake 
                  ? 'bg-red-500/90 text-white border border-red-400' 
                  : 'bg-emerald-600/90 text-white border border-emerald-400'
              }`}>
                {currentCase.isFake ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                <span>{currentCase.verdict} • {currentCase.score}% PROBABILITY</span>
              </span>
            </div>

            {/* Bottom Ingest Metadata Tag */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <span className="truncate">{currentCase.title}</span>
              <span className="text-cyan-400 font-bold ml-2 shrink-0">{currentCase.timeSec}s</span>
            </div>
          </div>

          {/* Three TruthScan-Style Multi-Signal Check Rows */}
          <div className="space-y-2 text-xs">
            
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentCase.isFake ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className="font-bold text-slate-700">Source Physics</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 truncate max-w-[200px] text-right">
                {currentCase.sourceCheck}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentCase.isFake ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className="font-bold text-slate-700">Metadata & Structure</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 truncate max-w-[200px] text-right">
                {currentCase.metadataCheck}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentCase.isFake ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span className="font-bold text-slate-700">Forensic Anomaly</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 truncate max-w-[200px] text-right">
                {currentCase.indicatorCheck}
              </span>
            </div>

          </div>

          {/* Footer Call to Action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Real-time Multi-Signal Radar</span>
            </div>
            
            <Link
              to={currentCase.link}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Test Live Case</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroScannerWidget;
