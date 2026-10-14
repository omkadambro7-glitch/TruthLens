import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  theme?: 'light' | 'white-on-color' | 'royal-dark';
  className?: string;
  size?: number;
}

export const TruthLensIcon: React.FC<{ size?: number; className?: string; white?: boolean }> = ({ 
  size = 38, 
  className = '',
  white = false 
}) => {
  const gradientId = React.useId();
  const goldGradId = React.useId();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TruthLens Royal Verification Emblem"
    >
      <defs>
        {/* Royal Blue to Midnight Navy Gradient */}
        <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor={white ? '#FFFFFF' : '#233F8C'} />
          <stop offset="0.7" stopColor={white ? '#FAF9F6' : '#101B35'} />
          <stop offset="1" stopColor={white ? '#E6D5A2' : '#0A1124'} />
        </linearGradient>

        {/* Championship Gold Crown Gradient */}
        <linearGradient id={goldGradId} x1="16" y1="12" x2="36" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6D5A2" />
          <stop offset="0.5" stopColor="#C6A45C" />
          <stop offset="1" stopColor="#A88234" />
        </linearGradient>
      </defs>

      {/* Subtle outer geometric framing ring */}
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        stroke={white ? 'rgba(255,255,255,0.18)' : 'rgba(198,164,92,0.22)'} 
        strokeWidth="1.2" 
        strokeDasharray="3 3"
      />

      {/* Forensic digital artifact decomposition bars on left */}
      <rect x="6" y="22.5" width="2.5" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.45)' : '#C6A45C'} opacity="0.6" />
      <rect x="9.5" y="17.5" width="2.5" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.6)' : '#233F8C'} opacity="0.75" />
      <rect x="9.5" y="27.5" width="2.5" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.6)' : '#233F8C'} opacity="0.75" />
      <rect x="13.5" y="13.5" width="2.5" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.8)' : '#101B35'} opacity="0.9" />
      <rect x="13.5" y="31.5" width="2.5" height="3" rx="0.75" fill={white ? 'rgba(255,255,255,0.8)' : '#101B35'} opacity="0.9" />

      {/* Continuous Royal Eye / Verification Outer Arc */}
      <path 
        d="M17 10.5C24.5 6.5 36.5 8.5 43.5 24C36.5 39.5 24.5 41.5 17 37.5" 
        stroke={white ? '#FFFFFF' : `url(#${gradientId})`} 
        strokeWidth="3.2" 
        strokeLinecap="round" 
      />
      
      {/* Inner Verification Circle with Championship Gold Stroke */}
      <circle 
        cx="27" 
        cy="24" 
        r="10.5" 
        stroke={`url(#${goldGradId})`} 
        strokeWidth="2.2" 
      />
      
      {/* Precision Authenticity Checkmark */}
      <path 
        d="M21.5 24.5L25.5 28.5L33.5 19" 
        stroke={white ? '#FFFFFF' : '#101B35'} 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Championship Gold Spark / Star Accent */}
      <circle cx="36" cy="15.5" r="2.75" fill={`url(#${goldGradId})`} />
      <circle cx="36" cy="15.5" r="4" stroke="#E6D5A2" strokeWidth="0.8" opacity="0.6" />
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
          <span className={`text-xl font-extrabold tracking-tight font-display ${isWhite ? 'text-white' : 'text-[#101B35]'}`}>
            Truth<span className="text-[#C6A45C]">Lens</span>
          </span>
          <span className={`block text-[10px] uppercase font-bold tracking-widest ${isWhite ? 'text-[#E6D5A2]' : 'text-[#233F8C]'}`}>
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
        <span className={`text-xl font-bold tracking-tight font-sans leading-none ${isWhite ? 'text-white' : 'text-[#101B35]'}`}>
          Truth<span className="text-[#C6A45C] font-extrabold">Lens</span>
        </span>
        <span className={`text-[9.5px] uppercase font-bold tracking-wider mt-0.5 leading-none ${isWhite ? 'text-[#E6D5A2]' : 'text-[#687386]'}`}>
          See what's real
        </span>
      </div>
    </div>
  );
};

export default TruthLensLogo;
