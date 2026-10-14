import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  theme?: 'light' | 'white-on-color';
  className?: string;
  size?: number;
}

export const TruthLensIcon: React.FC<{ size?: number; className?: string; white?: boolean }> = ({ 
  size = 36, 
  className = '',
  white = false 
}) => {
  const gradientId = React.useId();
  const coralGradId = React.useId();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TruthLens Symbol"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor={white ? '#FFFFFF' : '#116B67'} />
          <stop offset="0.6" stopColor={white ? '#EDE9FE' : '#4C51BF'} />
          <stop offset="1" stopColor={white ? '#DDD6FE' : '#7663D8'} />
        </linearGradient>
        <linearGradient id={coralGradId} x1="20" y1="18" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF806F" />
          <stop offset="1" stopColor="#FF6B57" />
        </linearGradient>
      </defs>

      {/* Outer Lens: Left side has dissolving pixels transforming into continuous curved lines on right */}
      {/* Dissolving pixel grid elements on the left representing digital artifact detection */}
      <rect x="5" y="22" width="3" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.45)' : '#116B67'} opacity="0.5" />
      <rect x="9" y="17" width="3.5" height="3.5" rx="0.75" fill={white ? 'rgba(255,255,255,0.6)' : '#116B67'} opacity="0.65" />
      <rect x="9" y="27" width="3.5" height="3.5" rx="0.75" fill={white ? 'rgba(255,255,255,0.6)' : '#116B67'} opacity="0.65" />
      <rect x="14" y="12" width="3.5" height="3.5" rx="0.75" fill={white ? 'rgba(255,255,255,0.8)' : '#188681'} opacity="0.8" />
      <rect x="14" y="32" width="3.5" height="3.5" rx="0.75" fill={white ? 'rgba(255,255,255,0.8)' : '#188681'} opacity="0.8" />

      {/* Main Continuous Eye / Lens Outer Contour */}
      <path 
        d="M17 10C24 6 36 8 43 24C36 40 24 42 17 38" 
        stroke={`url(#${gradientId})`} 
        strokeWidth="3.2" 
        strokeLinecap="round" 
      />
      
      {/* Inner Verification Iris: Geometric Checkmark integrated into circular pupil */}
      <circle 
        cx="26" 
        cy="24" 
        r="10" 
        stroke={white ? 'rgba(255,255,255,0.3)' : 'rgba(118, 99, 216, 0.25)'} 
        strokeWidth="2" 
      />
      
      {/* Verification Checkmark Iris */}
      <path 
        d="M21 24.5L24.8 28.5L32 19" 
        stroke={white ? '#FFFFFF' : `url(#${gradientId})`} 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Coral Focal Accent Dot - 'Truth Spark' */}
      <circle cx="34.5" cy="16.5" r="2.5" fill={`url(#${coralGradId})`} />
    </svg>
  );
};

export const TruthLensLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 38
}) => {
  const isWhite = theme === 'white-on-color';

  if (variant === 'icon') {
    return <TruthLensIcon size={size} className={className} white={isWhite} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-1.5 ${className}`}>
        <TruthLensIcon size={size * 1.25} white={isWhite} />
        <div className="text-center">
          <span className={`text-xl font-extrabold tracking-tight font-display ${isWhite ? 'text-white' : 'text-[#20252B]'}`}>
            Truth<span className="text-[#116B67]">Lens</span>
          </span>
          <span className={`block text-[10px] uppercase font-semibold tracking-widest ${isWhite ? 'text-white/80' : 'text-[#68717D]'}`}>
            See what's real
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal wordmark
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <TruthLensIcon size={size} white={isWhite} />
      <div className="flex flex-col">
        <span className={`text-xl font-bold tracking-tight font-display leading-none ${isWhite ? 'text-white' : 'text-[#20252B]'}`}>
          Truth<span className="text-[#116B67]">Lens</span>
        </span>
        <span className={`text-[9.5px] uppercase font-medium tracking-wider mt-0.5 leading-none ${isWhite ? 'text-white/70' : 'text-[#68717D]'}`}>
          See what's real
        </span>
      </div>
    </div>
  );
};

export default TruthLensLogo;
