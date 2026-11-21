import React from 'react';
import { StudioLogoMark } from '../brand/StudioLogo';

const MARQUEE_ITEMS = [
  { label: 'AI SYSTEMS ARCHITECTURE', highlight: 'AI' },
  { label: 'FLUID 60FPS UNITY GAMES', highlight: '60FPS' },
  { label: 'FULL-STACK CLOUD PLATFORMS', highlight: 'CLOUD' },
  { label: 'AUTONOMOUS BUSINESS AUTOMATION', highlight: 'AUTONOMOUS' },
  { label: 'MOBILE APPS (iOS & ANDROID)', highlight: 'MOBILE' },
  { label: 'CYBER LUXE DESIGN SYSTEMS', highlight: 'DESIGN' },
  { label: 'RAPID PROTOTYPE TO PRODUCTION', highlight: 'RAPID' },
  { label: 'CODE. CREATE. AUTOMATE.', highlight: 'PSYCODES' },
];

/**
 * KineticMarquee - Full-width infinite typography ticker inspired by FarTechDev.
 * Continuous 60fps kinetic motion across the viewport separating hero from capabilities.
 */
export const KineticMarquee: React.FC = () => {
  return (
    <div className="w-full relative py-5 sm:py-6 overflow-hidden bg-surface-deep/80 border-y border-border-glass/60 backdrop-blur-xl group select-none">
      {/* Edge gradient mask for smooth fade-in and fade-out */}
      <div
        className="flex w-fit animate-marquee group-hover:[animation-play-state:paused] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        aria-hidden="true"
      >
        {/* Track A */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`a-${idx}`} className="flex items-center gap-6 sm:gap-10 shrink-0">
              <span className="font-headline-sm font-bold text-sm sm:text-lg tracking-wider text-text-primary/90 flex items-center gap-2">
                <span>{item.label}</span>
              </span>
              <div className="flex items-center justify-center shrink-0">
                <StudioLogoMark size={20} glow={false} className="opacity-75" />
              </div>
            </div>
          ))}
        </div>

        {/* Track B (Exact Duplicate for seamless infinite loop) */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`b-${idx}`} className="flex items-center gap-6 sm:gap-10 shrink-0">
              <span className="font-headline-sm font-bold text-sm sm:text-lg tracking-wider text-text-primary/90 flex items-center gap-2">
                <span>{item.label}</span>
              </span>
              <div className="flex items-center justify-center shrink-0">
                <StudioLogoMark size={20} glow={false} className="opacity-75" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
