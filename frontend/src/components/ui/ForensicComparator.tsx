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
  label = 'Interactive Forensic Morph Lens (Slide to Inspect Spectral Anomaly)'
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
      <div className="flex items-center justify-between text-xs font-bold text-[#0B132B]">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-[#2563EB]" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-[#2563EB] font-extrabold">◀ Optical Camera Ingestion</span>
          <span className="text-[#94A3B8]">•</span>
          <span className="text-[#F59E0B] font-extrabold">Spectral ELA Heatmap ▶</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2E8F0] cursor-ew-resize bg-[#0B132B]"
      >
        {/* Layer 2: Forensic ELA Heatmap Layer (Underneath right) */}
        <div className="absolute inset-0">
          <img
            src={forensicImage}
            alt="Forensic Spectral Decomposition"
            className="w-full h-full object-cover filter contrast-125 saturate-150"
          />
          {/* Simulated ELA Thermal Overlay Grid */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EF4444]/40 via-[#F59E0B]/30 to-[#3B82F6]/40 mix-blend-color" />
          <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          
          <div className="absolute top-4 right-4 bg-[#0B132B]/80 backdrop-blur-md border border-[#F59E0B]/40 text-[#FDE68A] text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg">
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
          <div className="absolute top-4 left-4 bg-[#0B132B]/80 backdrop-blur-md border border-[#3B82F6]/40 text-[#93C5FD] text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg">
            Optical Sensor Capture
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FDE68A] via-[#FFFFFF] to-[#3B82F6] shadow-[0_0_16px_#3B82F6]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B132B] border-2 border-[#FFFFFF] shadow-xl flex items-center justify-center text-white text-[11px] font-bold">
            ↔
          </div>
        </div>

        {/* Sweeping Laser Scan Line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_12px_#06B6D4] animate-laser pointer-events-none" />
      </div>
    </div>
  );
};

export default ForensicComparator;
