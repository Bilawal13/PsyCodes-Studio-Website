import React from 'react';
import { Layers, Cpu, Gamepad2, Terminal } from 'lucide-react';

export const ARCADE_HARDWARE_SPECS = [
  {
    label: 'ENGINE SPEC',
    value: 'Unity URP',
    subtext: '2D / 3D Hybrid Pipelines',
    icon: Layers,
    colorClass: 'text-primary',
  },
  {
    label: 'RUNTIME TARGET',
    value: 'WebGL 2.0',
    subtext: 'WebAssembly High FPS',
    icon: Cpu,
    colorClass: 'text-tertiary',
  },
  {
    label: 'CONTROLLER I/O',
    value: 'Full Gamepad',
    subtext: 'Hardware Dual-Stick & Keys',
    icon: Gamepad2,
    colorClass: 'text-secondary',
  },
  {
    label: 'CURRENT STATE',
    value: 'Pre-Launch',
    subtext: 'Internal Studio Testing',
    icon: Terminal,
    colorClass: 'text-tertiary',
    isPulsing: true,
  },
];

/**
 * ArcadeHero - Header & telemetry strip for the browser gaming arcade portal.
 * Single Responsibility: Presenting the arcade portal status and WebGL hardware specs.
 */
export const ArcadeHero: React.FC = () => {
  return (
    <section className="relative w-full px-gutter lg:px-margin pt-12 lg:pt-16 pb-margin overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry Status Badge */}
        <div className="inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-deep/80 backdrop-blur-md border border-border-glass shadow-[0_0_16px_rgba(24,217,246,0.15)] mb-space-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary shadow-[0_0_8px_#18d9f6]" />
          </span>
          <span className="font-label-badge text-label-badge text-tertiary tracking-widest uppercase font-mono">
            ARCADE ENGINE · INITIALIZING
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display text-display max-w-4xl tracking-tight text-text-primary mb-space-md font-bold">
          Enter The{' '}
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(24,217,246,0.3)]">
            PsyCodes Arcade.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-space-xl">
          Our dedicated browser gaming portal. Built in Unity, optimized for instant web play—no downloads required. Original studio titles and arcade experiments are currently in active production.
        </p>

        {/* Telemetry Spec Strip (4 Cards) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md text-left">
          {ARCADE_HARDWARE_SPECS.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className="p-space-lg rounded-xl bg-surface-deep/70 backdrop-blur-xl border border-border-glass relative group hover:border-tertiary/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-badge text-label-badge text-outline tracking-wider uppercase font-mono">
                    {spec.label}
                  </span>
                  <Icon className={`w-4 h-4 ${spec.colorClass} ${spec.isPulsing ? 'animate-pulse' : ''}`} />
                </div>
                <div className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                  {spec.value}
                </div>
                <div className="font-body-sm text-body-sm text-text-muted mt-0.5">
                  {spec.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
