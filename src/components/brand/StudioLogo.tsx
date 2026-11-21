import React from 'react';

export interface StudioLogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

const SIZE_MAP = {
  xs: { icon: 20, text: 'text-xs', sub: 'text-[7px]' },
  sm: { icon: 28, text: 'text-sm sm:text-base', sub: 'text-[8px] sm:text-[9px]' },
  md: { icon: 36, text: 'text-base sm:text-lg', sub: 'text-[9px] sm:text-[10px]' },
  lg: { icon: 48, text: 'text-xl sm:text-2xl', sub: 'text-[11px] sm:text-xs' },
  xl: { icon: 80, text: 'text-3xl sm:text-4xl', sub: 'text-sm sm:text-base' },
};

export const StudioLogoMark: React.FC<{ size?: number; glow?: boolean; className?: string }> = ({
  size = 32,
  glow = true,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic Laser-Cyan Ambient Bloom */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md pointer-events-none transform scale-110"
          aria-hidden="true"
        />
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(0,242,254,0.25)]"
      >
        <defs>
          <linearGradient id="mark-titanium" x1="50" y1="16" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <radialGradient id="mark-core-glow" cx="50" cy="48" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#00F2FE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Neural Node Core Glow */}
        <circle cx="50" cy="48" r="14" fill="url(#mark-core-glow)" />

        {/* The Minimalist Psi Monolith (Ψ) Structure */}
        <g fill="url(#mark-titanium)">
          {/* Central Stem */}
          <path d="M46 20 C46 17.8 54 17.8 54 20 L54 77 C54 80 46 80 46 77 Z" />

          {/* Left Wing (Syntax Bracket Curve) */}
          <path d="M22 28 C22 24.5 30 24.5 30 28 L30 46 C30 56.5 37 63.5 43 63.5 C45 63.5 45 70.5 42 70.5 C32 70.5 22 60.5 22 46 Z" />

          {/* Right Wing (Syntax Bracket Curve) */}
          <path d="M78 28 C78 24.5 70 24.5 70 28 L70 46 C70 56.5 63 63.5 57 63.5 C55 63.5 55 70.5 58 70.5 C68 70.5 78 60.5 78 46 Z" />

          {/* Base Alignment Plate */}
          <rect x="42" y="78" width="16" height="5" rx="2.5" />
        </g>

        {/* Active Laser-Cyan Neural Core */}
        <circle cx="50" cy="48" r="4.5" fill="#00F2FE" />
        <circle cx="50" cy="48" r="1.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'horizontal',
  size = 'sm',
  className = '',
  glow = true,
}) => {
  const cfg = SIZE_MAP[size] || SIZE_MAP.sm;

  if (variant === 'icon') {
    return <StudioLogoMark size={cfg.icon} glow={glow} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
        <StudioLogoMark size={cfg.icon * 1.5} glow={glow} />
        <div className="flex flex-col items-center">
          <span className={`font-headline-sm font-bold tracking-tight text-white ${cfg.text}`}>
            PsyCodes
          </span>
          <span className={`font-mono font-semibold tracking-[0.25em] text-cyan-400 uppercase ${cfg.sub}`}>
            STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0 ${className}`}>
      <StudioLogoMark size={cfg.icon} glow={glow} />
      <div className="flex flex-col min-w-0 text-left">
        <span className={`font-headline-sm font-bold tracking-tight text-text-primary group-hover:text-cyan-300 transition-colors truncate ${cfg.text}`}>
          PsyCodes Studio
        </span>
        <span className={`font-mono font-medium tracking-[0.22em] text-cyan-400 uppercase truncate ${cfg.sub}`}>
          CODE. CREATE. AUTOMATE.
        </span>
      </div>
    </div>
  );
};
