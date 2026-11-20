import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Lock,
  Cpu,
  Sparkles,
  ArrowRight,
  X,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Game } from '../../types';

export interface EarlyAccessModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSpec?: (game: Game) => void;
}

/**
 * EarlyAccessModal - Interactive early access & playtest status modal.
 * Solves the issue where clicking "Play In Browser (Coming Soon)" did nothing because the button was disabled.
 * Instead, it guides the player with status telemetry, playtest invitations, and commission paths.
 */
export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  game,
  isOpen,
  onClose,
  onOpenSpec,
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !game) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-surface-container/95 border border-border-glass p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/15 blur-[90px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-glass">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono text-secondary uppercase tracking-wider font-semibold">
              WEBGL ARCADE PORTAL · DEV STATUS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-deep hover:bg-surface-container-high text-text-muted hover:text-white transition-colors cursor-pointer border border-border-glass"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Game Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-deep border border-secondary/40 flex items-center justify-center text-secondary shrink-0 shadow-lg">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-mono uppercase font-semibold">
                {game.status_label || 'In Active Development'}
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                {game.engine_spec || 'Unity 6 · WebGL 2.0'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              {game.title}
            </h3>
          </div>
        </div>

        {/* Informative Description */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
          {game.title} is currently in closed alpha testing. We are fine-tuning thermal physics shaders, controller input response, and WebGL memory allocations to ensure a silky 60fps browser experience.
        </p>

        {/* Milestone Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-surface-deep border border-border-glass">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] mb-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>Target Launch</span>
            </div>
            <span className="text-xs font-bold text-white block">
              {game.estimated_release || 'Q2 2026 Release'}
            </span>
            <span className="text-[10px] text-text-muted block">Playable in Browser</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-deep border border-border-glass">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] mb-1 font-mono">
              <Cpu className="w-3.5 h-3.5 text-tertiary" />
              <span>Controller I/O</span>
            </div>
            <span className="text-xs font-bold text-white block">
              {game.controller_support || 'Full Gamepad & Keys'}
            </span>
            <span className="text-[10px] text-text-muted block">Dual-Stick Support</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Action 1: Join Early Alpha / Commission similar game */}
          <Link
            to={`/contact?service=Game+Development&ref=${encodeURIComponent(game.title)}+Early+Playtest`}
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Early Playtest / Commission Custom Game</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Action 2: Inspect Architecture Specs */}
          {onOpenSpec && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSpec(game);
              }}
              className="w-full py-3 px-4 rounded-xl bg-surface-deep hover:bg-surface-container-high border border-border-glass text-xs text-text-primary hover:text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Inspect Full Architecture Specifications</span>
            </button>
          )}

          {/* Action 3: View Full Cabinet Page */}
          <Link
            to={`/arcade/${game.slug}`}
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-xs text-text-muted hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Visit Dedicated Cabinet Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
