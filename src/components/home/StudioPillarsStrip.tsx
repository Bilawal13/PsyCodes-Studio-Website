import React from 'react';

export interface StudioPillar {
  title: string;
  subtitle: string;
  colorClass: string;
}

export const STUDIO_PILLARS: StudioPillar[] = [
  {
    title: 'App Dev',
    subtitle: 'iOS & Android Native & Hybrid',
    colorClass: 'text-tertiary',
  },
  {
    title: 'Web & Cloud',
    subtitle: 'Scalable Full-Stack & SaaS',
    colorClass: 'text-primary',
  },
  {
    title: 'AI & Automation',
    subtitle: 'Smart AI & Workflow Automations',
    colorClass: 'text-secondary',
  },
  {
    title: 'Game Dev',
    subtitle: '2D & 3D Interactive WebGL',
    colorClass: 'text-cyan-400',
  },
];

/**
 * StudioPillarsStrip - Displays the 4 authentic core studio pillars.
 * Single Responsibility: Presenting the 4-quadrant engineering telemetry strip.
 * Aligned with equal margins, full text visibility, and balanced title/subtitle heights.
 */
export const StudioPillarsStrip: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full bg-surface-deep/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-border-glass ${className}`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full items-stretch">
        {STUDIO_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="flex flex-col items-center justify-between text-center p-3 sm:p-3.5 rounded-xl bg-surface-container-low/70 border border-border-glass/50 hover:border-cyan-400/40 hover:bg-surface-container-low transition-all h-full"
          >
            {/* Title Section - Uniform min-height ensures all subtitles align on the exact same baseline */}
            <div className="w-full flex items-center justify-center min-h-[32px] sm:min-h-[36px]">
              <span className={`font-headline-sm text-sm sm:text-[15px] font-bold ${pillar.colorClass} leading-tight text-center`}>
                {pillar.title}
              </span>
            </div>

            {/* Subtle Divider */}
            <div className="w-8 h-[1px] bg-border-glass/60 my-2" />

            {/* Subtitle Section - Fully shown with no truncation */}
            <div className="w-full flex items-center justify-center min-h-[36px] sm:min-h-[40px]">
              <span className="font-label-badge text-[10.5px] sm:text-[11px] text-text-muted font-mono leading-relaxed text-center tracking-normal">
                {pillar.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
