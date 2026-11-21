import React from 'react';
import { ArrowDown, Bolt, Terminal, Cpu, Sparkles, Gamepad2, Layers } from 'lucide-react';
import { StudioPillarsStrip } from './StudioPillarsStrip';
import { StudioLogoMark } from '../brand/StudioLogo';

/**
 * HomeHero - Primary Landing Hero Section.
 * Single Responsibility: Brand introduction, core value proposition, key CTAs, and telemetry overview.
 */
export const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full px-gutter lg:px-margin pt-12 lg:pt-16 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Mission, Value Proposition, Action Triggers */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          {/* Eyebrow Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low/90 border border-border-glass shadow-sm w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-badge text-label-badge text-tertiary tracking-wider uppercase font-mono">
              INDEPENDENT SOFTWARE &amp; GAME LAB
            </span>
          </div>

          {/* Primary High-Impact Headline */}
          <h1 className="font-display text-headline-lg lg:text-display text-text-primary tracking-tight font-bold leading-tight">
            We Build Software, Games &amp; AI Systems That{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-primary to-cyan-200 dark:from-cyan-300 dark:via-cyan-400 dark:to-white bg-clip-text text-transparent">
              Move You Forward.
            </span>
          </h1>

          {/* Supporting Value Copy */}
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
            From intelligent AI solutions and scalable software to engaging mobile applications and immersive games, we turn ambitious ideas into products people love.
          </p>

          {/* CTAs Strip */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 font-button-text text-button-text text-slate-950 font-bold shadow-[0_0_24px_rgba(0,242,254,0.35)] hover:shadow-[0_0_32px_rgba(0,242,254,0.5)] hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container-high/80 text-on-surface font-button-text text-button-text border border-border-glass shadow-sm hover:bg-surface-container-highest hover:text-tertiary transition-all"
            >
              <span>Start a Project</span>
              <Bolt className="w-4 h-4 text-tertiary" />
            </a>
          </div>

          {/* Operational Code Marker & Metadata */}
          <div className="flex items-center gap-space-md pt-space-sm text-text-muted flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded border border-border-glass">
              <Terminal className="w-4 h-4 text-tertiary" />
              <span className="font-label-code text-label-code text-on-surface-variant font-mono">
                CODE. CREATE. AUTOMATE.
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-outline-variant">•</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              Karachi, Pakistan · Est. 2026
            </span>
          </div>
        </div>

        {/* Right Column: Layered Hardware & Product Visual Showcase */}
        <div className="lg:col-span-6 relative flex flex-col items-center w-full max-w-2xl mx-auto">
          {/* Backlit Ambient Canvas */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-tertiary/20 via-primary/30 to-secondary-container/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-surface-deep/90 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl border border-border-glass w-full">
              {/* Studio Showcase Graphic Canvas */}
              <div className="relative rounded-2xl overflow-hidden shadow-inner min-h-[300px] sm:min-h-[350px] md:min-h-[380px] w-full bg-surface-container-low border border-border-glass flex items-center justify-center">
                {/* Background Ambient Glow Orbs */}
                <div className="absolute w-72 h-72 rounded-full bg-cyan-400/15 blur-[65px] -top-12 -left-12 pointer-events-none" />
                <div className="absolute w-72 h-72 rounded-full bg-cyan-400/10 blur-[75px] -bottom-12 -right-12 pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-tertiary/20 blur-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                {/* Cybernetic Architectural Tech Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.14] pointer-events-none" 
                  style={{
                    backgroundImage: `linear-gradient(rgba(var(--border-glass-rgb), 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--border-glass-rgb), 0.3) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                  }}
                />

                {/* Floating Corner Crosshair Accents */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-20">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-deep/80 backdrop-blur-md border border-border-glass text-[10px] font-mono text-cyan-400 font-semibold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>PSYCODES CORE</span>
                  </div>
                </div>

                {/* Central Emblem & Brand Identity Logo */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-20 sm:pt-10 sm:pb-24 px-4 text-center">
                  <div className="relative group/logo cursor-pointer">
                    {/* Glowing back-layer */}
                    <div className="absolute -inset-6 rounded-3xl bg-cyan-400/20 blur-2xl opacity-75 group-hover/logo:opacity-100 transition-opacity duration-500 animate-pulse" />
                    <StudioLogoMark
                      size={110}
                      className="transform group-hover/logo:scale-105 transition-transform duration-500 drop-shadow-[0_0_35px_rgba(0,242,254,0.4)]"
                    />
                  </div>
                </div>

                {/* Bottom Status Telemetry Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-t from-surface-deep/95 via-surface-deep/85 to-transparent flex items-center justify-between border-t border-border-glass/40">
                  <div className="min-w-0 pr-2">
                    <p className="font-headline-sm text-sm sm:text-base font-bold text-text-primary tracking-tight flex items-center gap-2 truncate">
                      <span>PsyCodes Engine</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-normal shrink-0">
                        ONLINE
                      </span>
                    </p>
                    <p className="font-label-badge text-[10px] sm:text-[11px] text-text-muted font-mono mt-0.5 truncate">
                      Code. Create. Automate. · Multi-Disciplinary Digital Systems
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-high/80 border border-border-glass text-cyan-400 shrink-0">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              {/* Floating Micro-Telemetry Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-3.5 w-full">
                <div className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-lg bg-surface-container-low shadow-sm border border-border-glass min-w-0">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-label-badge text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold font-mono truncate">Apps</span>
                  </div>
                  <span className="font-body-sm text-xs sm:text-body-sm text-text-primary font-medium truncate w-full">Mobile</span>
                  <span className="text-[10px] sm:text-[11px] text-text-muted truncate w-full">iOS &amp; Android</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-lg bg-surface-container-low shadow-sm border border-border-glass min-w-0">
                  <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-label-badge text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold font-mono truncate">Platforms</span>
                  </div>
                  <span className="font-body-sm text-xs sm:text-body-sm text-text-primary font-medium truncate w-full">Cloud &amp; AI</span>
                  <span className="text-[10px] sm:text-[11px] text-text-muted truncate w-full">SaaS &amp; Agents</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-lg bg-surface-container-low shadow-sm border border-border-glass min-w-0">
                  <div className="flex items-center justify-center gap-1 text-tertiary mb-1">
                    <Gamepad2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-label-badge text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold font-mono truncate">Games</span>
                  </div>
                  <span className="font-body-sm text-xs sm:text-body-sm text-text-primary font-medium truncate w-full">Interactive</span>
                  <span className="text-[10px] sm:text-[11px] text-text-muted truncate w-full">2D &amp; 3D Builds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Statistics 4 Pillars Strip */}
          <StudioPillarsStrip className="w-full mt-4" />
        </div>
      </div>
    </section>
  );
};
