import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Gamepad2, 
  Lock, 
  Cpu, 
  Flame, 
  Snowflake, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { GAMES } from '../../data/mockData';
import { EarlyAccessModal } from '../../components/modals/EarlyAccessModal';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const GameDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const game = GAMES.find((g) => g.slug === slug);

  if (!game) {
    return <Navigate to="/arcade" replace />;
  }

  return (
    <div className="flex flex-col w-full px-gutter lg:px-margin py-space-xl max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-space-lg">
        <Link
          to="/arcade"
          className="inline-flex items-center gap-2 text-text-muted hover:text-tertiary transition-colors font-button-text text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to PsyCodes Arcade</span>
        </Link>
      </div>

      {/* Main Game Header */}
      <div className="flex flex-col gap-space-sm mb-space-xl">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary border border-secondary/30 font-label-badge text-xs uppercase tracking-wider">
            {game.category_label}
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-tertiary border border-border-glass font-label-badge text-xs uppercase">
            STATUS: {game.status_label}
          </span>
        </div>

        <h1 className="font-display text-headline-lg lg:text-display text-text-primary tracking-tight font-bold">
          {game.title}
        </h1>

        <p className="font-body-lg text-body-lg text-text-muted max-w-3xl leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Staging Game Cabinet Player Container */}
      <ScrollReveal direction="up" delay={0.05} amount={0.1}>
        <div className="relative rounded-2xl overflow-hidden aspect-video w-full bg-surface-container-lowest border border-border-glass shadow-2xl mb-space-xl">
          {/* Background art */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-50"
            style={{ backgroundImage: `url('${game.cover_image}')` }}
          />
          {/* CRT Scanline overlay */}
          <div className="absolute inset-0 scanline-grid opacity-60 pointer-events-none" />

          {/* Viewport Top Bar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-surface-deep/90 backdrop-blur-md border border-border-glass text-xs font-label-code text-on-surface">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{game.engine_spec || 'UNITY WEBGL 2.0'}</span>
            </div>

            <div className="px-3 py-1 rounded bg-surface-deep/90 backdrop-blur-md border border-border-glass text-xs font-label-badge text-tertiary">
              BUFFER: FLOAT16 HDR
            </div>
          </div>

          {/* Center Lock / Coming Soon State */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-surface-deep/60 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-2xl bg-surface-deep/90 border border-secondary/40 flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(218,185,255,0.3)] mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Browser WebGL Port In Development
            </h2>
            <p className="font-body-md text-sm text-text-muted max-w-md mb-4 leading-relaxed">
              This title is currently undergoing internal physics benchmarking and WebGL memory tuning. Browser play will be unlocked upon alpha completion.
            </p>
            <div className="px-4 py-2 rounded-full bg-surface-container-high border border-border-glass font-label-code text-xs text-tertiary">
              ESTIMATED LAUNCH: {game.estimated_release || '2026/2027'}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Specifications & Game Mechanics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start mb-space-xl">
        {/* Left Column: Mechanics & Tech Highlights (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          {/* Architecture dossier box */}
          {game.tech_details && (
            <ScrollReveal direction="up" delay={0.05} amount={0.1}>
              <div className="p-space-lg rounded-2xl bg-surface-container-low border border-border-glass shadow-md">
                <div className="flex items-center gap-2 text-secondary mb-space-sm">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-headline-sm text-lg font-bold text-text-primary uppercase tracking-wide">
                    Engine &amp; Gameplay Architecture
                  </h3>
                </div>
                <p className="font-body-md text-text-muted leading-relaxed">
                  {game.tech_details}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Features / Mechanics */}
          {game.features && (
            <ScrollReveal direction="up" delay={0.08} amount={0.1}>
              <div className="flex flex-col gap-space-md">
                <h3 className="font-headline-sm text-xl font-bold text-text-primary flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-secondary" />
                  <span>Core Gameplay Systems</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-container border border-border-glass/60 flex flex-col gap-1.5"
                    >
                      <span className="font-button-text text-sm font-semibold text-text-primary flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                        {feat.title}
                      </span>
                      <p className="font-body-sm text-xs text-text-muted leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Telemetry Hardware Metrics */}
          {game.hud_specs && (
            <ScrollReveal direction="up" delay={0.1} amount={0.1}>
              <div className="p-space-lg rounded-2xl bg-surface-deep border border-border-glass">
                <h4 className="font-label-code text-xs text-tertiary uppercase tracking-wider mb-4">
                  TARGET RUNTIME PERFORMANCE &amp; SPECS
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-surface-container">
                    <span className="font-label-badge text-[10px] text-text-muted block">PERFORMANCE</span>
                    <span className="font-label-code text-sm font-bold text-text-primary">{game.hud_specs.drawcalls}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container">
                    <span className="font-label-badge text-[10px] text-text-muted block">PHYSICS LOOP</span>
                    <span className="font-label-code text-sm font-bold text-tertiary">{game.hud_specs.physics_tick}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container">
                    <span className="font-label-badge text-[10px] text-text-muted block">ASSET MEMORY</span>
                    <span className="font-label-code text-sm font-bold text-primary">{game.hud_specs.texture_vram}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Column: Cabinet Specifications (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <ScrollReveal direction="up" delay={0.12} amount={0.1}>
            <div className="p-space-lg rounded-2xl bg-surface-deep border border-border-glass shadow-xl flex flex-col gap-space-md">
              <span className="font-label-badge text-xs uppercase tracking-wider text-secondary">
                CABINET PROFILE
              </span>

              <div className="flex flex-col gap-space-sm divide-y divide-border-glass/50 text-xs">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">ENGINE:</span>
                  <span className="font-label-code text-text-primary font-semibold">
                    {game.engine_spec || 'Unity 6'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">TARGET:</span>
                  <span className="font-label-code text-tertiary font-semibold">
                    {game.runtime_target || 'WebGL 2.0'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">CONTROLS:</span>
                  <span className="font-label-code text-secondary font-semibold">
                    {game.controller_support || 'Full Gamepad'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">RELEASE:</span>
                  <span className="font-label-code text-primary font-semibold">
                    {game.estimated_release || 'In Development'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">COMMISSION:</span>
                  <span className="font-label-code text-tertiary font-semibold">PsyCodes Lab</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-glass flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsEarlyAccessOpen(true)}
                  className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-secondary/40 text-secondary hover:text-white font-button-text text-button-text text-xs flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>Play Status &amp; Early Access Info</span>
                </button>

                <Link
                  to={`/contact?service=Unity+Game+Development&ref=${encodeURIComponent(game.title)}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-button-text font-button-text font-bold text-center shadow-md shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <span>Commission Game Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Early Access Status & Playtest Modal */}
      <EarlyAccessModal
        game={game}
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
      />
    </div>
  );
};

