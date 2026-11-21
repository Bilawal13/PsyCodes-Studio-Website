import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface StudioLogoProps {
  variant?: 'icon' | 'minimal' | 'monochrome' | 'horizontal' | 'stacked';
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
 * StudioLogoMark - The official emblem for PsyCodes Studio.
 * Strictly and exactly matches public/assets/logo/psycodes_emblem_minimal_dark.svg.
 */
export const StudioLogoMark: React.FC<{
  size?: number;
  glow?: boolean;
  theme?: 'dark' | 'light';
  minimal?: boolean;
  monochrome?: boolean;
  className?: string;
}> = ({
  size = 36,
  glow = true,
  theme,
  monochrome = false,
  className = '',
}) => {
  const contextTheme = useTheme()?.theme ?? 'dark';
  const effectiveTheme = theme ?? contextTheme;
  const isLight = effectiveTheme === 'light';

  const strokeColor = monochrome 
    ? (isLight ? '#000000' : '#FFFFFF') 
    : (isLight ? '#080C18' : '#FFFFFF');

  const diamondFill = monochrome
    ? (isLight ? '#000000' : '#FFFFFF')
    : (isLight ? '#FFFFFF' : '#080C18');

  const starFill = monochrome
    ? (isLight ? '#FFFFFF' : '#000000')
    : '#00DDEB';

  const pipFill = monochrome
    ? (isLight ? '#000000' : '#FFFFFF')
    : '#FFFFFF';

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Neon Bloom (Dark Mode Only) */}
      {glow && !isLight && !monochrome && (
        <div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md pointer-events-none transform scale-110"
          aria-hidden="true"
        />
      )}

      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <g stroke={strokeColor} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
          {/* Top Central Spire */}
          <path d="M 430 160 L 570 160 L 570 240 L 500 320 L 430 240 Z" fill={isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"} />

          {/* Central Rhombus Diamond */}
          <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" fill={diamondFill} strokeWidth="36" />

          {/* Left Wing Sweep */}
          <path d="M 320 500 C 230 550 170 480 155 390 L 135 160 L 220 160 C 250 260 295 365 375 445" />

          {/* Right Wing Sweep */}
          <path d="M 680 500 C 770 550 830 480 845 390 L 865 160 L 780 160 C 750 260 705 365 625 445" />

          {/* Lower Pediment Base */}
          <path d="M 460 680 L 460 760 L 360 840 L 640 840 L 540 760 L 540 680" />
          <line x1="360" y1="840" x2="640" y2="840" strokeWidth="38" />
        </g>

        {/* Refined High-Contrast Core Star */}
        <polygon points="500,385 516,484 615,500 516,516 500,615 484,516 385,500 484,484" fill={starFill} />
        <circle cx="500" cy="500" r="6" fill={pipFill} />
      </svg>
    </div>
  );
};

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'horizontal',
  size = 'sm',
  theme,
  className = '',
  glow = true,
}) => {
  const contextTheme = useTheme()?.theme ?? 'dark';
  const effectiveTheme = theme ?? contextTheme;
  const cfg = SIZE_MAP[size] || SIZE_MAP.sm;
  const isLight = effectiveTheme === 'light';

  if (variant === 'icon' || variant === 'minimal') {
    return <StudioLogoMark size={cfg.icon} glow={glow} theme={effectiveTheme} className={className} />;
  }

  if (variant === 'monochrome') {
    return <StudioLogoMark size={cfg.icon} glow={false} theme={effectiveTheme} monochrome={true} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
        <StudioLogoMark size={cfg.icon * 1.4} glow={glow} theme={effectiveTheme} />
        <div className="flex flex-col items-center">
          <span className={`font-headline-sm font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'} ${cfg.text}`}>
            PsyCodes
          </span>
          <span className={`font-mono font-medium tracking-[0.28em] ${isLight ? 'text-slate-600' : 'text-text-muted/80'} uppercase ${cfg.sub}`}>
            STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Lockup (Default)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0 ${className}`}>
      <StudioLogoMark size={cfg.icon} glow={glow} theme={effectiveTheme} />
      <div className="flex flex-col min-w-0 text-left">
        <span className={`font-headline-sm font-bold tracking-tight ${isLight ? 'text-slate-900 group-hover:text-cyan-700' : 'text-text-primary group-hover:text-cyan-300'} transition-colors truncate ${cfg.text}`}>
          PsyCodes
        </span>
        <span className={`font-mono font-medium tracking-[0.28em] ${isLight ? 'text-slate-500' : 'text-text-muted/80'} uppercase truncate ${cfg.sub}`}>
          STUDIO
        </span>
      </div>
    </div>
  );
};
