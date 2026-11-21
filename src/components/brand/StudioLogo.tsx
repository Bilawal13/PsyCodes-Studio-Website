import React from 'react';

export interface StudioLogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
  glow?: boolean;
}

const SIZE_MAP = {
  xs: { icon: 24, text: 'text-xs', sub: 'text-[7px]' },
  sm: { icon: 32, text: 'text-sm sm:text-base', sub: 'text-[8px] sm:text-[9px]' },
  md: { icon: 42, text: 'text-base sm:text-lg', sub: 'text-[9px] sm:text-[10px]' },
  lg: { icon: 56, text: 'text-xl sm:text-2xl', sub: 'text-[11px] sm:text-xs' },
  xl: { icon: 96, text: 'text-3xl sm:text-4xl', sub: 'text-sm sm:text-base' },
};

/**
 * StudioLogoMark - The official 2D geometric wireframe Psi (Ψ) line-art mark.
 * Supports both dark (default) and light (white BG) colorways.
 */
export const StudioLogoMark: React.FC<{
  size?: number;
  glow?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
}> = ({
  size = 36,
  glow = true,
  theme = 'dark',
  className = '',
}) => {
  const isLight = theme === 'light';
  const strokeColor = isLight ? '#090D16' : '#FFFFFF';
  const innerCrossColor = isLight ? 'rgba(9,13,22,0.4)' : 'rgba(255,255,255,0.5)';
  const starFill = isLight ? '#0284C7' : '#00F2FE';
  const starCenterFill = isLight ? '#090D16' : '#FFFFFF';

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Glow (Dark Mode only) */}
      {glow && !isLight && (
        <div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md pointer-events-none transform scale-110"
          aria-hidden="true"
        />
      )}

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <filter id={`star-glow-${theme}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isLight ? 1.5 : 3} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 2D Geometric Wireframe Psi Line-Art */}
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Top Cap */}
          <polygon points="46,24 74,24 68,30 52,30" fill={isLight ? 'rgba(9,13,22,0.04)' : 'rgba(255,255,255,0.06)'} />
          <line x1="60" y1="24" x2="60" y2="30" />

          {/* Upper Stem Column */}
          <polygon points="52,30 68,30 64,44 56,44" fill={isLight ? 'rgba(9,13,22,0.02)' : 'rgba(255,255,255,0.04)'} />
          <line x1="60" y1="30" x2="60" y2="44" />

          {/* Central Diamond Nexus Cell */}
          <polygon
            points="60,44 74,58 60,72 46,58"
            fill={isLight ? 'transparent' : 'rgba(0,242,254,0.06)'}
            stroke={strokeColor}
            strokeWidth="2"
          />
          <line x1="46" y1="58" x2="74" y2="58" strokeWidth="1" stroke={innerCrossColor} />
          <line x1="60" y1="44" x2="60" y2="72" strokeWidth="1" stroke={innerCrossColor} />

          {/* Lower Stem Column */}
          <polygon points="56,72 64,72 68,88 52,88" fill={isLight ? 'rgba(9,13,22,0.02)' : 'rgba(255,255,255,0.04)'} />
          <line x1="60" y1="72" x2="60" y2="88" />

          {/* Base Pedestal / Foot */}
          <polygon points="52,88 68,88 74,94 46,94" fill={isLight ? 'rgba(9,13,22,0.04)' : 'rgba(255,255,255,0.06)'} />
          <line x1="60" y1="88" x2="60" y2="94" />

          {/* Left Wing Outer Contour */}
          <path
            d="M46,94 C34,88 22,74 20,56 C18,40 22,28 24,24 C24,23 20,23 18,25 C14,35 14,58 24,78 C30,88 42,92 46,94 Z"
            fill={isLight ? 'rgba(9,13,22,0.02)' : 'rgba(255,255,255,0.03)'}
          />
          <line x1="24" y1="24" x2="46" y2="58" />
          <line x1="20" y1="56" x2="46" y2="58" />
          <line x1="24" y1="78" x2="46" y2="58" />
          <line x1="46" y1="58" x2="46" y2="94" />

          {/* Right Wing Outer Contour */}
          <path
            d="M74,94 C86,88 98,74 100,56 C102,40 98,28 96,24 C96,23 100,23 102,25 C106,35 106,58 96,78 C90,88 78,92 74,94 Z"
            fill={isLight ? 'rgba(9,13,22,0.02)' : 'rgba(255,255,255,0.03)'}
          />
          <line x1="96" y1="24" x2="74" y2="58" />
          <line x1="100" y1="56" x2="74" y2="58" />
          <line x1="96" y1="78" x2="74" y2="58" />
          <line x1="74" y1="58" x2="74" y2="94" />
        </g>

        {/* Central 4-Point Star Node */}
        <polygon
          points="60,49 63,58 72,58 64.5,61.5 60,67 55.5,61.5 48,58 57,58"
          fill={starFill}
          filter={isLight ? undefined : `url(#star-glow-${theme})`}
        />
        <circle cx="60" cy="58" r="1.8" fill={starCenterFill} />
      </svg>
    </div>
  );
};

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'horizontal',
  size = 'sm',
  theme = 'dark',
  className = '',
  glow = true,
}) => {
  const cfg = SIZE_MAP[size] || SIZE_MAP.sm;
  const isLight = theme === 'light';

  if (variant === 'icon') {
    return <StudioLogoMark size={cfg.icon} glow={glow} theme={theme} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
        <StudioLogoMark size={cfg.icon * 1.4} glow={glow} theme={theme} />
        <div className="flex flex-col items-center">
          <span className={`font-headline-sm font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'} ${cfg.text}`}>
            PsyCodes
          </span>
          <span className={`font-mono font-medium tracking-[0.25em] ${isLight ? 'text-slate-600' : 'text-text-muted/80'} uppercase ${cfg.sub}`}>
            STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Lockup
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0 ${className}`}>
      <StudioLogoMark size={cfg.icon} glow={glow} theme={theme} />
      <div className="flex flex-col min-w-0 text-left">
        <span className={`font-headline-sm font-bold tracking-tight ${isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-text-primary group-hover:text-cyan-300'} transition-colors truncate ${cfg.text}`}>
          PsyCodes
        </span>
        <span className={`font-mono font-medium tracking-[0.25em] ${isLight ? 'text-slate-500' : 'text-text-muted/80'} uppercase truncate ${cfg.sub}`}>
          STUDIO
        </span>
      </div>
    </div>
  );
};
