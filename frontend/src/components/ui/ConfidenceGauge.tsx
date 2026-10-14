import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceGaugeProps {
  score: number; // 0 to 1
  verdict: 'LIKELY REAL' | 'LIKELY FAKE' | 'NEEDS HUMAN REVIEW';
  size?: number;
  label?: string;
  showText?: boolean;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  score,
  verdict,
  size = 140,
  label = 'Calibrated Confidence',
  showText = true,
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round(score * 100);
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // Real Madrid Royal Theme Colors
  const getColor = () => {
    if (verdict === 'LIKELY REAL') {
      return { stroke: '#1E824C', bg: '#EDF7F1', badge: 'text-[#1E824C] bg-[#EDF7F1] border-[#A3D9B8]' };
    }
    if (verdict === 'LIKELY FAKE') {
      return { stroke: '#DC2626', bg: '#FEF2F2', badge: 'text-[#DC2626] bg-[#FEF2F2] border-[#FCA5A5]' };
    }
    return { stroke: '#C6A45C', bg: '#FBF8EE', badge: 'text-[#A88234] bg-[#FBF8EE] border-[#E6D5A2]' };
  };

  const theme = getColor();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E8E5DC"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated active stroke */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-black font-sans tracking-tight text-[#101B35]"
          >
            {percentage}%
          </motion.span>
          <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#737D90]">
            Score
          </span>
        </div>
      </div>

      {showText && (
        <div className="mt-2.5">
          <span className="text-xs font-bold text-[#101B35] block">{label}</span>
          <span className={`inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
            {verdict}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceGauge;
