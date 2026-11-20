import React from 'react';
import { Users, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const SERVICE_GUARANTEES = [
  {
    title: 'Direct Developer Access',
    description: 'Work directly with lead engineers. No middle managers, miscommunications, or unnecessary agency layers.',
    icon: Users,
    colorClass: 'text-tertiary',
  },
  {
    title: 'Tested & High Quality',
    description: 'Every app, site, and game is tested thoroughly for speed, security, and smooth performance on all devices.',
    icon: ShieldCheck,
    colorClass: 'text-primary',
  },
  {
    title: '100% Code Ownership',
    description: 'You own every line of code, design asset, and commercial right from day one with zero lock-in.',
    icon: CheckCircle2,
    colorClass: 'text-accent-violet',
  },
  {
    title: 'Weekly Demos & Progress',
    description: 'Stay in the loop with weekly progress demos, playable test builds, and transparent delivery milestones.',
    icon: Clock,
    colorClass: 'text-tertiary',
  },
];

/**
 * ServicesHero - Header & core benefits strip for studio capabilities.
 * Single Responsibility: Presenting the services overview and client promises in clear, welcoming language.
 */
export const ServicesHero: React.FC = () => {
  return (
    <section className="relative px-gutter lg:px-margin pt-12 lg:pt-16 pb-margin flex flex-col items-start max-w-7xl mx-auto w-full">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-deep/80 backdrop-blur-md border border-border-glass shadow-sm mb-space-lg">
        <span className="inline-block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_10px_#18d9f6] animate-pulse" />
        <span className="font-label-badge text-label-badge text-tertiary tracking-widest uppercase font-mono">
          OUR SERVICES &amp; EXPERTISE
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display text-headline-lg lg:text-display text-text-primary tracking-tight font-bold max-w-5xl leading-tight text-left">
        High-Quality Software, Mobile Apps &amp;{' '}
        <span className="bg-gradient-to-r from-tertiary via-primary to-accent-violet bg-clip-text text-transparent">
          AI Built to Grow Your Business.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="font-body-lg text-body-lg text-text-muted max-w-3xl mt-space-lg leading-relaxed text-left">
        Whether you are launching a brand-new product from scratch or scaling an existing system, PsyCodes Studio provides the complete engineering, mobile development, and design support you need to turn your vision into reality.
      </p>

      {/* Telemetry Strip (4 Guarantees) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md w-full mt-space-xl">
        {SERVICE_GUARANTEES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-space-lg rounded-xl bg-surface-container/60 border border-border-glass shadow-sm flex flex-col text-left hover:border-tertiary/30 transition-colors"
            >
              <div className="flex items-center gap-space-sm mb-space-sm">
                <Icon className={`w-5 h-5 ${item.colorClass} shrink-0`} />
                <h3 className="font-headline-sm text-[16px] font-bold text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
