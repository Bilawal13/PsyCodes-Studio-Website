import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Flame, Snowflake, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Game } from '../../types';

export interface FlagshipCabinetProps {
  game: Game;
  onOpenSpec: (game: Game) => void;
  onPlayClick?: (game: Game) => void;
}

/**
 * FlagshipCabinet - WebGL arcade cabinet viewport for flagship titles.
 * Single Responsibility: Presenting live viewport simulation, CRT scanlines, and controls mapping.
 */
export const FlagshipCabinet: React.FC<FlagshipCabinetProps> = ({ game, onOpenSpec, onPlayClick }) => {
  return (
    <section className="w-full px-gutter lg:px-margin py-space-xl">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl bg-surface-deep/80 backdrop-blur-2xl border border-border-glass shadow-[0_20px_50px_rgba(8,13,32,0.8)] overflow-hidden">
          {/* Top Tracked Status Ribbon */}
          <div className="px-space-lg py-space-sm bg-surface-container-lowest/80 border-b border-border-glass flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary border border-secondary/30 font-label-badge text-label-badge uppercase tracking-wider font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_#dab9ff]" />
                FLAGSHIP TITLE · IN DEVELOPMENT
              </span>
            </div>
            <div className="font-label-code text-label-code text-text-muted flex items-center gap-2 font-mono">
              <span className="text-tertiary font-bold">Upcoming WebGL Playtest</span>
            </div>
          </div>

          {/* Cabinet Split Grid */}
          <div className="p-space-lg lg:p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left: Simulated Unity WebGL Staging Viewport */}
            <div className="lg:col-span-7 flex flex-col gap-space-xs">
              <div className="relative w-full aspect-video rounded-xl bg-surface-container-lowest overflow-hidden border border-border-glass group">
                {/* Visual Mock Canvas Art */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] saturate-125 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${game.cover_image}')` }}
                />
                {/* CRT Grid Scanlines Overlay */}
                <div className="absolute inset-0 scanline-grid pointer-events-none" />

                {/* Top Left Staging Overlay Beacon */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-border-glass font-mono">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                  <span className="font-label-badge text-label-badge text-on-surface tracking-wider uppercase">
                    UNITY WEBGL 2.0 · 60 FPS PREVIEW
                  </span>
                </div>

                {/* Center Lockout & Alpha Teaser */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-space-md text-center bg-surface-container-lowest/40 backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-2xl bg-surface-deep/90 border border-tertiary/40 flex items-center justify-center text-tertiary shadow-[0_0_24px_rgba(24,217,246,0.3)] mb-space-sm">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary tracking-tight">
                    Browser WebGL Port In Development
                  </h3>
                  <p className="font-label-code text-label-code text-tertiary mt-1 font-mono">
                    ESTIMATED PLAYTEST: Q3 2026
                  </p>
                </div>

                <div className="absolute bottom-2 right-2 text-outline-variant font-label-badge text-[10px] uppercase opacity-75 font-mono">
                  COZY 2D ADVENTURE · READY SOON
                </div>
              </div>

              {/* Viewport Hardware Specs Bar */}
              <div className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/50 border border-border-glass flex items-center justify-between font-label-badge text-[10px] text-text-muted font-mono">
                <span>RESOLUTION: 1080p FULL HD</span>
                <span>ENGINE: UNITY 2D</span>
                <span className="text-tertiary hidden sm:inline">60 FPS OPTIMIZED</span>
              </div>
            </div>

            {/* Right: Dossier & Feature Matrix */}
            <div className="lg:col-span-5 flex flex-col gap-space-md text-left">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-2.5 py-0.5 rounded bg-surface-container-high font-label-badge text-label-badge text-primary border border-border-glass font-mono">
                  2D Top-Down
                </span>
                <span className="px-2.5 py-0.5 rounded bg-surface-container-high font-label-badge text-label-badge text-secondary border border-border-glass font-mono">
                  Cozy Delivery
                </span>
                <span className="px-2.5 py-0.5 rounded bg-surface-container-high font-label-badge text-label-badge text-tertiary border border-border-glass font-mono">
                  Arcade Mechanics
                </span>
              </div>

              <div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight">
                  {game.title}
                </h2>
                <p className="font-body-md text-body-md text-text-muted mt-space-xs leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Feature Matrix */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-start gap-space-sm">
                  <Flame className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-text-primary">Thermal Decay Engine</span>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Dynamic beverage cooling physics influenced by exposed wind vectors and movement speed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <Snowflake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-text-primary">Arctic Hazard Routing</span>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Procedural ice slicks, falling pine branches, and randomized blizzard drifts requiring swift reflex navigation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <Flame className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-text-primary">Campfire Rest Stops</span>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Strategic thermal checkpoints to reheat cocoa kettles and earn seasonal trail perks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <button
                  type="button"
                  onClick={() => onPlayClick ? onPlayClick(game) : onOpenSpec(game)}
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-bright border border-secondary/40 text-secondary hover:text-white font-button-text text-button-text shadow-sm text-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>Play Status &amp; Alpha Info</span>
                </button>
                <button
                  onClick={() => onOpenSpec(game)}
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-deep/80 hover:bg-surface-container-high border border-border-glass text-primary hover:text-tertiary font-button-text text-button-text transition-all duration-200 text-xs"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Architecture Specs</span>
                </button>
                <Link
                  to={`/arcade/${game.slug}`}
                  className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container border border-border-glass text-on-surface-variant hover:text-text-primary text-xs font-semibold transition-colors"
                >
                  <span>Cabinet View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
