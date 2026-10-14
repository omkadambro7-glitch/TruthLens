import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  theme?: 'light' | 'white-on-color' | 'dark';
  className?: string;
  size?: number;
}

export const TruthLensIcon: React.FC<{ size?: number; className?: string; white?: boolean }> = ({ 
  size = 42, 
  className = '',
  white = false 
}) => {
  const gradientId = React.useId();
  const goldGradId = React.useId();
  const glowId = React.useId();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TruthLens Verification Symbol"
    >
      <defs>
        {/* Luxury Deep Sapphire to Velvet Garnet Gradient */}
        <linearGradient id={gradientId} x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor={white ? '#FFFFFF' : '#004D98'} />
          <stop offset="0.5" stopColor={white ? '#F1F5F9' : '#0A1128'} />
          <stop offset="1" stopColor={white ? '#CBD5E1' : '#A50044'} />
        </linearGradient>

        {/* Champion Gold Star Highlight */}
        <linearGradient id={goldGradId} x1="16" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#EDBB00" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>

        {/* Soft Radial Ambient Glow */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A50044" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#004D98" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient background glow circle */}
      <circle cx="24" cy="24" r="23" fill={`url(#${glowId})`} />

      {/* Outer Geometric Frame */}
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        stroke={white ? 'rgba(255,255,255,0.25)' : 'rgba(165,0,68,0.25)'} 
        strokeWidth="1.2" 
        strokeDasharray="4 3"
      />

      {/* Forensic pixel-array sensor bars on left */}
      <rect x="5.5" y="22" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.5)' : '#EDBB00'} opacity="0.9" />
      <rect x="9.5" y="16.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.7)' : '#A50044'} opacity="0.85" />
      <rect x="9.5" y="27.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.7)' : '#A50044'} opacity="0.85" />
      <rect x="14" y="12" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.9)' : '#004D98'} opacity="0.95" />
      <rect x="14" y="32" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.9)' : '#004D98'} opacity="0.95" />

      {/* Continuous Iris Lens Arc */}
      <path 
        d="M17 10C25 5.5 37.5 7.5 44 24C37.5 40.5 25 42.5 17 38" 
        stroke={white ? '#FFFFFF' : `url(#${gradientId})`} 
        strokeWidth="3.6" 
        strokeLinecap="round" 
      />
      
      {/* Central Aperture Iris */}
      <circle 
        cx="27" 
        cy="24" 
        r="11" 
        stroke={`url(#${goldGradId})`} 
        strokeWidth="2.4" 
      />
      
      {/* Precision Authenticity Checkmark */}
      <path 
        d="M21.5 24L25.5 28.5L34 18.5" 
        stroke={white ? '#FFFFFF' : '#EDBB00'} 
        strokeWidth="3.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Top-Right Optical Star Focus Spark */}
      <circle cx="36.5" cy="15" r="3" fill={`url(#${goldGradId})`} />
      <circle cx="36.5" cy="15" r="4.5" stroke="#EDBB00" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
};

export const TruthLensLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 42
}) => {
  const isWhite = theme === 'white-on-color';

  if (variant === 'icon') {
    return <TruthLensIcon size={size} className={className} white={isWhite} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1.5 ${className}`}>
        <TruthLensIcon size={size * 1.2} white={isWhite} />
        <div className="text-center">
          <span className="text-2xl font-black tracking-tight font-display text-white">
            Truth<span className="bg-gradient-to-r from-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">Lens</span>
          </span>
          <span className="block text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
            Digital Authenticity Engine
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Wordmark - Big, bold, clean and sharp
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <TruthLensIcon size={size} white={isWhite} />
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tight font-display leading-none text-white">
          Truth<span className="bg-gradient-to-r from-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">Lens</span>
        </span>
        <span className="text-[10px] uppercase font-mono font-bold tracking-widest mt-1 leading-none text-slate-400">
          AI Forensic Integrity Platform
        </span>
      </div>
    </div>
  );
};

export default TruthLensLogo;
