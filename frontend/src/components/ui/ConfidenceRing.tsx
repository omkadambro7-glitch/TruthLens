import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceRingProps {
  score: number; // 0.0 to 1.0
  verdict: 'LIKELY REAL' | 'LIKELY FAKE' | 'NEEDS HUMAN REVIEW' | string;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const ConfidenceRing: React.FC<ConfidenceRingProps> = ({
  score,
  verdict,
  size = 140,
  strokeWidth = 10,
  showLabel = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round(score * 100);
  const strokeDashoffset = circumference - (score * circumference);

  // Color scheme based on verdict
  let strokeColor = '#116B67'; // Teal for real
  let trackColor = '#E6F3F2';
  let textColor = '#116B67';

  if (verdict === 'LIKELY FAKE') {
    strokeColor = '#DC2626'; // Warm red
    trackColor = '#FEE2E2';
    textColor = '#DC2626';
  } else if (verdict === 'NEEDS HUMAN REVIEW') {
    strokeColor = '#D97706'; // Amber
    trackColor = '#FEF3C7';
    textColor = '#D97706';
  }

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold tracking-tight font-display" style={{ color: textColor }}>
            {percentage}%
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#68717D]">
            Confidence
          </span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceRing;
