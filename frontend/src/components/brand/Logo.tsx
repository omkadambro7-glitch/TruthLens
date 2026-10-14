import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  theme?: 'light' | 'white-on-color' | 'dark';
  className?: string;
  size?: number;
}

export const MahiraIcon: React.FC<{ size?: number; className?: string; white?: boolean }> = ({ 
  size = 40, 
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
      aria-label="Mahira Verification Symbol"
    >
      <defs>
        {/* Imperial Navy to Royal Gold Gradient */}
        <linearGradient id={gradientId} x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor={white ? '#FFFFFF' : '#0B1B3D'} />
          <stop offset="0.6" stopColor={white ? '#E2E8F0' : '#162B55'} />
          <stop offset="1" stopColor={white ? '#CBD5E1' : '#C5A059'} />
        </linearGradient>

        {/* Royal Gold Focus Shimmer */}
        <linearGradient id={goldGradId} x1="16" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#C5A059" />
          <stop offset="1" stopColor="#8A6720" />
        </linearGradient>

        {/* Soft Radial Ambient Glow */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1B3D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow circle */}
      <circle cx="24" cy="24" r="23" fill={`url(#${glowId})`} />

      {/* Outer Geometric Ring */}
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        stroke={white ? 'rgba(255,255,255,0.3)' : 'rgba(197,160,89,0.35)'} 
        strokeWidth="1.2" 
        strokeDasharray="4 3"
      />

      {/* Editorial Diamond Pips */}
      <rect x="5.5" y="22" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.7)' : '#C5A059'} />
      <rect x="9.5" y="16.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.85)' : '#0B1B3D'} />
      <rect x="9.5" y="27.5" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.85)' : '#0B1B3D'} />
      <rect x="14" y="12" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.95)' : '#C5A059'} />
      <rect x="14" y="32" width="3" height="4" rx="1" fill={white ? 'rgba(255,255,255,0.95)' : '#C5A059'} />

      {/* Continuous Iris Lens Arc */}
      <path 
        d="M17 10C25 5.5 37.5 7.5 44 24C37.5 40.5 25 42.5 17 38" 
        stroke={white ? '#FFFFFF' : `url(#${gradientId})`} 
        strokeWidth="3.4" 
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
      
      {/* Authenticity Checkmark */}
      <path 
        d="M21.5 24L25.5 28.5L34 18.5" 
        stroke={white ? '#FFFFFF' : '#0B1B3D'} 
        strokeWidth="3.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Optical Star Focus Spark */}
      <circle cx="36.5" cy="15" r="3" fill={`url(#${goldGradId})`} />
      <circle cx="36.5" cy="15" r="4.5" stroke="#C5A059" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
};

export const MahiraLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 40
}) => {
  const isWhite = theme === 'white-on-color';

  if (variant === 'icon') {
    return <MahiraIcon size={size} className={className} white={isWhite} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1.5 ${className}`}>
        <MahiraIcon size={size * 1.2} white={isWhite} />
        <div className="text-center">
          <span className={`text-2xl font-black tracking-tight font-display ${isWhite ? 'text-white' : 'text-[#0B1B3D]'}`}>
            Mahira<span className="text-[#C5A059]">.</span>
          </span>
          <span className={`block text-[10px] uppercase font-mono font-bold tracking-widest ${isWhite ? 'text-slate-300' : 'text-[#C5A059]'}`}>
            Digital Authenticity Engine
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Wordmark
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <MahiraIcon size={size} white={isWhite} />
      <div className="flex flex-col">
        <span className={`text-2xl font-black tracking-tight font-display leading-none ${isWhite ? 'text-white' : 'text-[#0B1B3D]'}`}>
          Mahira<span className="text-[#C5A059]">.</span>
        </span>
        <span className="text-[10px] uppercase font-mono font-bold tracking-widest mt-1 leading-none text-[#C5A059]">
          Digital Authenticity Standard
        </span>
      </div>
    </div>
  );
};

// Aliases for backwards compatibility with existing imports
export const TruthLensIcon = MahiraIcon;
export const TruthLensLogo = MahiraLogo;

export default MahiraLogo;
