import React from 'react';
import { Layers, Smartphone, Gamepad2, ShieldCheck } from 'lucide-react';

export const TELEMETRY_METRICS = [
  {
    label: 'APP ENGINEERING',
    value: 'iOS & Android',
    subtext: 'Kotlin, Swift, Flutter, React Native',
    colorClass: 'text-tertiary',
    icon: Smartphone,
  },
  {
    label: 'WEB & CLOUD',
    value: 'Sub-Second Edge',
    subtext: 'Next.js, Node.js, Postgres & APIs',
    colorClass: 'text-primary',
    icon: Layers,
  },
  {
    label: 'GAME SYSTEMS',
    value: '2D & 3D Interactive',
    subtext: 'Real-Time Physics & WebGL',
    colorClass: 'text-secondary',
    icon: Gamepad2,
  },
  {
    label: 'CODE STANDARDS',
    value: 'Zero Debt',
    subtext: 'Strict Modular Architecture',
    colorClass: 'text-tertiary',
    icon: ShieldCheck,
  },
];

/**
 * ProjectsHero - Header & telemetry strip for the products/portfolio ecosystem.
 * Single Responsibility: Presenting the studio ecosystem status and hardware/runtime metrics.
 */
export const ProjectsHero: React.FC = () => {
  return (
    <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin pt-12 lg:pt-16 pb-space-xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Studio Pulsing Beacon Badge */}
        <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-low border border-border-glass shadow-sm mb-space-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
          </span>
          <span className="font-label-badge text-label-badge text-tertiary tracking-widest uppercase font-mono">
            STUDIO ECOSYSTEM · ACTIVE PRODUCTS
          </span>
        </div>

        {/* Core Display Headline */}
        <h1 className="font-display text-display max-w-4xl tracking-tight text-text-primary mb-space-md font-bold">
          An Ecosystem Of Ideas, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
            Engineered Into Reality.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto mb-space-xl leading-relaxed">
          We don't just build client products—we invent, iterate, and deploy our own software ecosystems, mobile applications, and interactive gaming worlds from our Karachi lab.
        </p>

        {/* Telemetry Stat Strip (4 Cards) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-sm">
          {TELEMETRY_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex flex-col items-start p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-border-glass shadow-sm text-left"
              >
                <div className="flex items-center justify-between w-full mb-space-xs">
                  <span className={`font-label-code text-label-code ${metric.colorClass} font-mono`}>
                    {metric.label}
                  </span>
                  <Icon className={`w-4 h-4 ${metric.colorClass}`} />
                </div>
                <span className="font-headline-md text-headline-md font-bold text-text-primary">
                  {metric.value}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {metric.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
