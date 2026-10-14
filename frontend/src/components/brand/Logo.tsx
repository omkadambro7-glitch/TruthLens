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
        {/* Core Royal Blue to Deep Obsidian */}
        <linearGradient id={gradientId} x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor={white ? '#FFFFFF' : '#3B82F6'} />
          <stop offset="0.6" stopColor={white ? '#E2E8F0' : '#1D4ED8'} />
          <stop offset="1" stopColor={white ? '#94A3B8' : '#0B132B'} />
        </linearGradient>

        {/* Championship Gold Highlight */}
        <linearGradient id={goldGradId} x1="16" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>

        {/* Soft Radial Ambient Glow */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient background glow circle */}
      <circle cx="24" cy="24" r="23" fill={`url(#${glowId})`} />

      {/* Outer Geometric Frame */}
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        stroke={white ? 'rgba(255,255,255,0.2)' : 'rgba(37,99,235,0.2)'} 
        strokeWidth="1.2" 
        strokeDasharray="4 3"
      />

      {/* Forensic pixel-array sensor bars on left */}
      <rect x="5.5" y="22" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.5)' : '#F59E0B'} opacity="0.9" />
      <rect x="9.5" y="16.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.7)' : '#3B82F6'} opacity="0.8" />
      <rect x="9.5" y="27.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.7)' : '#3B82F6'} opacity="0.8" />
      <rect x="14" y="12" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.9)' : '#1D4ED8'} opacity="0.95" />
      <rect x="14" y="32" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.9)' : '#1D4ED8'} opacity="0.95" />

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
        stroke={white ? '#FFFFFF' : '#0B132B'} 
        strokeWidth="3.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Top-Right Optical Laser Focus Spark */}
      <circle cx="36.5" cy="15" r="3" fill={`url(#${goldGradId})`} />
      <circle cx="36.5" cy="15" r="4.5" stroke="#FDE68A" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
};

export const TruthLensLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 44
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
          <span className={`text-2xl font-black tracking-tight font-display ${isWhite ? 'text-white' : 'text-[#0B132B]'}`}>
            Truth<span className="text-[#2563EB]">Lens</span>
          </span>
          <span className={`block text-[10px] uppercase font-extrabold tracking-widest ${isWhite ? 'text-[#93C5FD]' : 'text-[#64748B]'}`}>
            See what's real
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
        <span className={`text-2xl sm:text-2xl font-black tracking-tight font-display leading-none ${isWhite ? 'text-white' : 'text-[#0B132B]'}`}>
          Truth<span className="text-[#2563EB]">Lens</span>
        </span>
        <span className={`text-[10px] uppercase font-bold tracking-widest mt-1 leading-none ${isWhite ? 'text-[#93C5FD]' : 'text-[#64748B]'}`}>
          See what's real
        </span>
      </div>
    </div>
  );
};

export default TruthLensLogo;
