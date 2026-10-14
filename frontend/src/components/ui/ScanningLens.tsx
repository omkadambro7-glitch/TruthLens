import React from 'react';
import { motion } from 'framer-motion';

interface ScanningLensProps {
  statusText?: string;
  subText?: string;
}

export const ScanningLens: React.FC<ScanningLensProps> = ({
  statusText = 'Conducting multi-signal forensic decomposition...',
  subText = 'Inspecting 2D FFT spectral lattices, DCT compression grids, and sensor noise variances.'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center select-none">
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Outer pulsating ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border-2 border-[#C6A45C]/40"
        />

        {/* Secondary rotating radar perimeter */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dashed border-[#233F8C]/50"
        />

        {/* Inner lens iris */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#101B35] to-[#233F8C] flex items-center justify-center shadow-lg shadow-[#101B35]/20 overflow-hidden">
          {/* Grid lines inside lens */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C6A45C_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Sweeping laser line */}
          <motion.div
            animate={{ y: [-48, 48, -48] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E6D5A2] to-transparent shadow-[0_0_12px_#C6A45C]"
          />

          {/* Center target crosshair */}
          <div className="w-6 h-6 rounded-full border border-[#E6D5A2]/80 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5A2]" />
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 6 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 space-y-1.5 max-w-md"
      >
        <h4 className="text-sm font-bold text-[#101B35] tracking-tight">{statusText}</h4>
        <p className="text-xs text-[#687386] leading-relaxed">{subText}</p>
      </motion.div>
    </div>
  );
};

export default ScanningLens;
