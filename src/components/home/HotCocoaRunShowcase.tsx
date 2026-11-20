import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Gamepad2, CheckCircle2, ArrowRight } from 'lucide-react';

export interface HotCocoaRunShowcaseProps {
  onOpenModal: (gameSlug: string) => void;
}

/**
 * HotCocoaRunShowcase - Flagship Unity 2D game showcase.
 * Single Responsibility: Presenting Hot Cocoa Run graphics, in-game HUD telemetry, and game feel mechanics.
 */
export const HotCocoaRunShowcase: React.FC<HotCocoaRunShowcaseProps> = ({ onOpenModal }) => {
  return (
    <div className="relative bg-surface-deep/80 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden border border-border-glass">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent-violet/15 blur-[120px] pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Game Visual Canvas */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[270px] sm:min-h-[320px] md:min-h-[360px] aspect-[4/3] sm:aspect-[16/10] bg-surface-container-lowest group border border-border-glass">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADfRYVDHw3A2G8IlkrYB7QXGk5Up9GK9jcr4DVoH3vHpB6AGu4NjPOKaCov1qwvLL0umjQrMmlYwcj2O6996pCHhSaJXtRLQc7nD6W7U_qov1F6rbIh9hhY0ZVmeUY2MTbSSwqpesETTxdy4YF-u2n6Yxtr36E3mV3ZD7f40DyqgDiMbwpCYDWJajEL2vsJencql51x8Bj8GvEptlNOR415ZJWxtZhN76QVKyc2EY"
              alt="Hot Cocoa Run gameplay artwork"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/95 via-transparent to-surface-deep/30 pointer-events-none" />
            
            {/* In-Game HUD Simulator */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-deep/80 backdrop-blur-md border border-border-glass">
                <Flame className="w-3.5 h-3.5 text-secondary" />
                <span className="font-label-badge text-[11px] text-text-primary font-mono">Cocoa Heat: 94%</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-deep/80 backdrop-blur-md border border-border-glass">
                <Clock className="w-3.5 h-3.5 text-tertiary" />
                <span className="font-label-badge text-[11px] text-text-primary font-mono">02:45</span>
              </div>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <span className="font-label-code text-[10px] sm:text-[11px] text-secondary font-mono truncate block">EARLY PREVIEW · COZY 2D ADVENTURE</span>
                <p className="font-headline-sm text-sm sm:text-headline-sm font-semibold text-text-primary truncate">Level 03: The Frozen Pine Pass</p>
              </div>
              <div className="p-2 rounded-xl bg-surface-deep/80 backdrop-blur-md text-secondary border border-border-glass shrink-0">
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          {/* Mini Game Mechanics Badges */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-secondary block uppercase font-mono">Protagonist</span>
              <span className="font-body-sm text-[13px] font-semibold text-text-primary">Fox Barista</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-secondary block uppercase font-mono">Hazard</span>
              <span className="font-body-sm text-[13px] font-semibold text-text-primary">Arctic Blizzards</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-secondary block uppercase font-mono">Refuel Hubs</span>
              <span className="font-body-sm text-[13px] font-semibold text-text-primary">Campfire Bonfires</span>
            </div>
          </div>
        </div>

        {/* Game Details & Pitch */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-badge text-label-badge uppercase tracking-wider flex items-center gap-1.5 border border-secondary/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              In Development · Indie Game
            </span>
            <span className="font-label-code text-[12px] text-text-muted font-mono">Unity / C#</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg font-bold text-text-primary">
            Hot Cocoa Run
          </h3>
          <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
            A cozy, high-stakes 2D top-down delivery game. Take control of a courageous fox barista navigating harsh sub-zero wilderness to deliver steaming mugs of hot cocoa to shivering forest dwellers before the warmth dissipates.
          </p>
          <div className="flex flex-col gap-2.5 text-body-sm text-body-sm text-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Custom thermal decay math requiring strategic pathfinding between warmth points</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Procedural wind bursts and slippery ice surfaces created with custom Unity shaders</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Full controller support and dynamic low-fi acoustic audio feedback</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-3 flex-wrap">
            <button
              onClick={() => onOpenModal('hot-cocoa-run')}
              className="px-space-md py-2.5 rounded-lg bg-gradient-to-r from-secondary-container to-surface-container-highest text-text-primary font-button-text text-button-text shadow-md transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-secondary/20"
            >
              <span>View Game Architecture</span>
              <Gamepad2 className="w-4 h-4" />
            </button>
            <Link
              to="/arcade/hot-cocoa-run"
              className="text-on-surface-variant hover:text-secondary font-button-text text-button-text flex items-center gap-1 transition-colors"
            >
              <span>Arcade Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
