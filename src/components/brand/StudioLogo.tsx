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

// Geometric Mathematical Coordinates (1000 x 1000 Grid, Center 500, 500)
const STAR_POINTS = "500,385 516,484 615,500 516,516 500,615 484,516 385,500 484,484";

/**
 * StudioLogoMark - The professionally refined Swiss Minimalist + Modern Architectural Psi emblem.
 * Supports Primary (engineered facets), Minimal (clean high-contrast icon), and Monochrome knockout.
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
  minimal = false,
  monochrome = false,
  className = '',
}) => {
  const contextTheme = useTheme()?.theme ?? 'dark';
  const effectiveTheme = theme ?? contextTheme;
  const isLight = effectiveTheme === 'light';

  const strokeColor = isLight ? '#0A0E1A' : '#FFFFFF';
  const facetColor = isLight ? 'rgba(10, 14, 26, 0.4)' : 'rgba(255, 255, 255, 0.45)';
  const cyanColor = '#00DDEB';
  const bgHousing = isLight ? '#FFFFFF' : '#080C18';

  // Automatically use minimal reductive hierarchy for very small rendered sizes (< 28px)
  const isMicro = minimal || size <= 28;

  if (monochrome) {
    const monoFill = isLight ? '#000000' : '#FFFFFF';
    const monoKnockout = isLight ? '#FFFFFF' : '#000000';

    return (
      <div
        className={`relative flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <g stroke={monoFill} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 430 160 L 570 160 L 570 230 L 500 320 L 430 230 Z" />
            <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" fill={monoFill} />
            <path d="M 320 500 C 235 550 175 480 160 400 L 140 160 L 210 160 C 240 250 285 360 375 445" />
            <path d="M 680 500 C 765 550 825 480 840 400 L 860 160 L 790 160 C 760 250 715 360 625 445" />
            <path d="M 460 680 L 460 765 L 360 840 L 640 840 L 540 765 L 540 680" />
            <line x1="360" y1="840" x2="640" y2="840" strokeWidth="32" />
          </g>
          <polygon points={STAR_POINTS} fill={monoKnockout} />
          <circle cx="500" cy="500" r="6" fill={monoFill} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Cyan Bloom (Dark Mode Only) */}
      {glow && !isLight && (
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
        <defs>
          <filter id={`star-glow-svg-${effectiveTheme}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isLight ? 6 : 12} result="blur" />
            <feFlood floodColor={cyanColor} floodOpacity={isLight ? '0.5' : '0.85'} result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Level 1 Hierarchy: Master Silhouette */}
        <g stroke={strokeColor} strokeWidth={isMicro ? "34" : "18"} strokeLinecap="round" strokeLinejoin="round">
          {/* Top Central Spire */}
          <path d="M 430 160 L 570 160 L 570 230 L 500 320 L 430 230 Z" />
          {!isMicro && <line x1="500" y1="160" x2="500" y2="320" strokeWidth="10" strokeOpacity="0.6" />}

          {/* Central Rhombus Diamond */}
          <path d="M 500 320 L 680 500 L 500 680 L 320 500 Z" strokeWidth={isMicro ? "38" : "22"} fill={isMicro ? bgHousing : 'none'} />

          {/* Left Lateral Wing */}
          <path d="M 320 500 C 235 550 175 480 160 400 L 140 160 L 210 160 C 240 250 285 360 375 445" />

          {/* Right Lateral Wing */}
          <path d="M 680 500 C 765 550 825 480 840 400 L 860 160 L 790 160 C 760 250 715 360 625 445" />

          {/* Lower Pediment & Base */}
          <path d="M 460 680 L 460 765 L 360 840 L 640 840 L 540 765 L 540 680" />
          <line x1="360" y1="840" x2="640" y2="840" strokeWidth={isMicro ? "38" : "24"} />
          {!isMicro && <line x1="500" y1="680" x2="500" y2="840" strokeWidth="10" strokeOpacity="0.6" />}
        </g>

        {/* Level 2 Hierarchy: Precision Internal Facets (Omitted at micro-scale to keep silhouette razor-sharp) */}
        {!isMicro && (
          <g stroke={facetColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Wing Facets */}
            <line x1="140" y1="160" x2="250" y2="280" />
            <line x1="160" y1="400" x2="250" y2="280" />
            <line x1="160" y1="400" x2="320" y2="500" />
            <line x1="210" y1="160" x2="160" y2="400" />

            {/* Right Wing Facets */}
            <line x1="860" y1="160" x2="750" y2="280" />
            <line x1="840" y1="400" x2="750" y2="280" />
            <line x1="840" y1="400" x2="680" y2="500" />
            <line x1="790" y1="160" x2="840" y2="400" />

            {/* Pediment Cross-Braces */}
            <line x1="460" y1="765" x2="540" y2="765" />
            <line x1="500" y1="680" x2="360" y2="840" />
            <line x1="500" y1="680" x2="640" y2="840" />
          </g>
        )}

        {/* Central Aperture Housing */}
        {!isMicro && (
          <path d="M 500 355 L 645 500 L 500 645 L 355 500 Z" fill={bgHousing} stroke={cyanColor} strokeOpacity="0.25" strokeWidth="4" />
        )}

        {/* Radiant 4-Pointed Cyan Star Node */}
        <polygon
          points={STAR_POINTS}
          fill={cyanColor}
          filter={`url(#star-glow-svg-${effectiveTheme})`}
        />
        <circle cx="500" cy="500" r={isMicro ? "7" : "4.5"} fill="#FFFFFF" />
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

  if (variant === 'icon') {
    return <StudioLogoMark size={cfg.icon} glow={glow} theme={effectiveTheme} className={className} />;
  }

  if (variant === 'minimal') {
    return <StudioLogoMark size={cfg.icon} glow={glow} theme={effectiveTheme} minimal={true} className={className} />;
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
