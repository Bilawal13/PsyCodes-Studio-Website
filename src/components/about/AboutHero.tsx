import React from 'react';
import { MapPin, Cpu, UserCheck, ShieldCheck } from 'lucide-react';

export const LAB_TELEMETRY = [
  {
    label: 'LAB ORIGIN',
    val: 'Karachi, PK',
    sub: 'Est. 2026 · Global Ops',
    icon: MapPin,
    colorClass: 'text-tertiary',
  },
  {
    label: 'CORE PARADIGM',
    val: 'Offline-First',
    sub: 'Sub-Second Edge Speeds',
    icon: Cpu,
    colorClass: 'text-primary',
  },
  {
    label: 'LEAD ARCHITECT',
    val: 'Bilawal Feroze',
    sub: 'Founder & Full-Stack Lead',
    icon: UserCheck,
    colorClass: 'text-secondary',
  },
  {
    label: 'DEBT PROFILE',
    val: 'Zero Debt',
    sub: 'Strict TypeScript & CI/CD',
    icon: ShieldCheck,
    colorClass: 'text-tertiary',
  },
];

/**
 * AboutHero - Landing hero & studio origin telemetry for The Lab.
 * Single Responsibility: Presenting the studio background, engineering ethos, and location credentials.
 */
export const AboutHero: React.FC = () => {
  return (
    <section className="relative px-gutter lg:px-margin pt-12 lg:pt-16 pb-margin flex flex-col items-start max-w-7xl mx-auto w-full text-left">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-deep/80 backdrop-blur-md border border-border-glass shadow-sm mb-space-lg">
        <span className="inline-block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_10px_#18d9f6] animate-pulse" />
        <span className="font-label-badge text-label-badge text-tertiary tracking-widest uppercase font-mono">
          THE LAB · ENGINEERING ETHOS
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display text-headline-lg lg:text-display text-text-primary tracking-tight font-bold max-w-5xl leading-tight">
        Crafting High-Performance Software, Mobile Apps &amp; Games With{' '}
        <span className="bg-gradient-to-r from-cyan-400 via-primary to-cyan-200 dark:from-cyan-300 dark:via-cyan-400 dark:to-white bg-clip-text text-transparent">
          Calculated Precision.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="font-body-lg text-body-lg text-text-muted max-w-3xl mt-space-lg leading-relaxed">
        PsyCodes Studio is an independent product engineering laboratory headquartered in Karachi, Pakistan. We eliminate agency bureaucracy, inflated overhead, and account-manager games of telephone to build world-class digital products directly.
      </p>

      {/* Origin Telemetry Strip (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md w-full mt-space-xl">
        {LAB_TELEMETRY.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-space-lg rounded-xl bg-surface-deep/70 backdrop-blur-xl border border-border-glass shadow-md hover:bg-surface-container/70 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-space-xs">
                <span className={`font-label-code text-label-code font-bold uppercase font-mono ${item.colorClass}`}>
                  {item.label}
                </span>
                <Icon className={`w-4 h-4 ${item.colorClass}`} />
              </div>
              <div className="font-headline-sm text-headline-sm font-bold text-text-primary">
                {item.val}
              </div>
              <div className="font-body-sm text-body-sm text-text-muted mt-0.5">
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
