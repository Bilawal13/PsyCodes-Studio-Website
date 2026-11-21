import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles, ArrowRight, Cpu, Zap, Layers } from 'lucide-react';
import { GAMES } from '../../data/mockData';
import { Game } from '../../types';
import { SectionHeading } from '../common/SectionHeading';

export interface UpcomingCabinetsProps {
  onOpenSpec: (game: Game) => void;
}

/**
 * UpcomingCabinets - Displays upcoming studio arcade cabinets in development,
 * featuring Balloon Popper and an attractive Cybernetic "More Coming Soon" R&D portal card.
 */
export const UpcomingCabinets: React.FC<UpcomingCabinetsProps> = ({ onOpenSpec }) => {
  // Filter out Hot Cocoa Run since it is featured as the flagship hero above
  const upcomingGames = GAMES.filter((g) => g.slug !== 'hot-cocoa-run');

  return (
    <section className="w-full px-gutter lg:px-margin py-margin relative border-t border-border-glass">
      <div className="max-w-6xl mx-auto flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg text-left">
          <SectionHeading
            eyebrow="MORE EXPERIMENTS IN THE LAB"
            title="Upcoming Arcade Cabinets"
            description="Explore upcoming studio experiments, prototypes, and browser-ready builds currently being authored in Unity."
          />

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-deep/90 border border-border-glass font-mono text-xs text-text-muted self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-semibold">ACTIVE DEV PIPELINE</span>
          </div>
        </div>

        {/* Cabinets Grid (1 Game + 1 Attractively Styled "More Coming Soon" Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg text-left">
          {/* 1. Upcoming Game: Balloon Popper */}
          {upcomingGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col rounded-2xl bg-surface-deep border border-border-glass overflow-hidden shadow-xl hover:border-cyan-400/40 transition-all duration-300 group"
            >
              {/* Cabinet Thumbnail Canvas */}
              <div className="relative aspect-[16/10] bg-surface-container-lowest overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.85] group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full font-label-badge text-[10px] uppercase font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {game.status_label || 'In Development'}
                  </span>
                </div>

                {/* Target Runtime */}
                <div className="absolute top-3 right-3 font-label-code text-[10px] px-2.5 py-0.5 rounded-full bg-surface-deep/90 text-tertiary border border-border-glass font-mono backdrop-blur-md">
                  {(game.engine_spec || 'Unity 2D URP').split('/')[0]}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-text-primary">
                  <span className="font-label-badge text-[11px] text-cyan-300 font-mono font-medium">
                    {game.category_label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-deep/90 backdrop-blur-md flex items-center justify-center text-cyan-400 border border-border-glass shadow-sm">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Cabinet Meta Content */}
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div>
                  <h3 className="font-headline-sm text-xl font-bold text-text-primary group-hover:text-cyan-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="font-body-sm text-xs text-text-muted mt-2 leading-relaxed line-clamp-3">
                    {game.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-glass/60 flex items-center justify-between text-xs">
                  <span className="font-label-code text-[11px] text-text-muted font-mono">
                    Target: <span className="text-white font-medium">{game.estimated_release}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSpec(game)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-cyan-400 hover:text-white font-button-text text-xs border border-border-glass transition-colors cursor-pointer font-semibold"
                    >
                      Specs
                    </button>
                    <Link
                      to={`/arcade/${game.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400 text-cyan-400 hover:text-black font-semibold text-xs transition-all"
                      title="View Cabinet"
                    >
                      <span>Cabinet View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 2. Cybernetic "More Coming Soon" R&D Portal Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-surface-deep via-surface-container/70 to-surface-deep border border-border-glass hover:border-cyan-400/30 p-space-lg sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all group">
            {/* Ambient Background Glows */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-400/10 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-cyan-400/10 blur-[60px] pointer-events-none" />

            {/* Cyber Grid Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(24,217,246,0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px, 20px 20px, 20px 20px',
              }}
            />

            <div className="relative z-10 flex flex-col gap-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-deep/90 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-400 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>STUDIO R&D · PIPELINE STAGING</span>
                </div>
                <span className="font-mono text-[11px] text-text-muted">UNITY 6 / WEBGL</span>
              </div>

              {/* Glowing Icon & Main Title */}
              <div className="flex items-center gap-3.5 mt-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(24,217,246,0.2)] group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-xl font-bold font-display text-white tracking-tight">
                    More Cabinets Coming Soon
                  </h3>
                  <span className="font-mono text-xs text-text-muted block mt-0.5">
                    Prototyping Interactive Experiences
                  </span>
                </div>
              </div>

              {/* Narrative Copy */}
              <p className="font-body-sm text-xs sm:text-[13px] text-text-muted leading-relaxed mt-1">
                Our game engineering laboratory is actively prototyping high-FPS WebGL 2.0 arcade experiences, retro synthwave physics, and tactile mechanics in Unity 6. New browser cabinets roll out as development milestones unlock.
              </p>

              {/* Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-deep/80 border border-border-glass text-[11px] font-mono text-text-muted">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>60 FPS WebGL 2.0 Engine</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-deep/80 border border-border-glass text-[11px] font-mono text-text-muted">
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Gamepad &amp; Touch Input</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-deep/80 border border-border-glass text-[11px] font-mono text-text-muted">
                  <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Universal Render Pipeline</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-deep/80 border border-border-glass text-[11px] font-mono text-text-muted">
                  <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero-Install Instant Play</span>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="relative z-10 pt-6 mt-6 border-t border-border-glass flex items-center justify-between gap-4 flex-wrap">
              <span className="font-mono text-xs text-text-muted">
                Have a unique game concept?
              </span>

              <Link
                to="/contact?service=Game+Development&ref=Custom+Arcade+Title"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-button-text font-bold text-xs shadow-md shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all group/btn"
              >
                <span>Commission A Custom Game</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
