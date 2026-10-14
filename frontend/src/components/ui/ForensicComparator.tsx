import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scan, Eye, Layers } from 'lucide-react';

interface ForensicComparatorProps {
  realImage?: string;
  forensicImage?: string;
  label?: string;
}

export const ForensicComparator: React.FC<ForensicComparatorProps> = ({
  realImage = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  forensicImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  label = 'Interactive Forensic Morph Lens (Drag to Inspect Spectral Anomaly)'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full space-y-3 select-none">
      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-[#EDBB00]" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-cyan-400 font-extrabold font-mono">◀ Optical Camera Ingestion</span>
          <span className="text-slate-600">•</span>
          <span className="text-[#FF4D6D] font-extrabold font-mono">Spectral ELA Heatmap ▶</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 cursor-ew-resize bg-[#060B18]"
      >
        {/* Layer 2: Forensic ELA Heatmap Layer (Underneath right) */}
        <div className="absolute inset-0">
          <img
            src={forensicImage}
            alt="Forensic Spectral Decomposition"
            className="w-full h-full object-cover filter contrast-125 saturate-150"
          />
          {/* Simulated ELA Thermal Overlay Grid */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#A50044]/50 via-[#EDBB00]/30 to-[#004D98]/50 mix-blend-color" />
          <div className="absolute inset-0 bg-[radial-gradient(#EDBB00_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          
          <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md border border-[#A50044]/50 text-red-200 text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-md shadow-lg">
            ELA Spectral Grid (High Variance)
          </div>
        </div>

        {/* Layer 1: Authentic Ingested Image (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={realImage}
            alt="Original Ingested Media"
            className="w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
          />
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-cyan-500/40 text-cyan-200 text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-md shadow-lg">
            Optical Sensor Capture
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EDBB00] via-[#FFFFFF] to-[#A50044] shadow-[0_0_16px_#A50044]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#060B18] border-2 border-white shadow-xl flex items-center justify-center text-[#EDBB00] text-xs font-bold">
            ↔
          </div>
        </div>

        {/* Bottom Status Tooltip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 pointer-events-none">
          Drag slider left or right to reveal algorithmic compression inconsistencies
        </div>
      </div>
    </div>
  );
};

export default ForensicComparator;
