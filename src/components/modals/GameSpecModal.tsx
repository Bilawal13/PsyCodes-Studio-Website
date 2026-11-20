import React from 'react';
import { X, Gamepad2, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Game } from '../../types';
import { Link } from 'react-router-dom';

interface GameSpecModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GameSpecModal: React.FC<GameSpecModalProps> = ({ game, isOpen, onClose }) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative bg-surface-deep border border-border-glass rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-glass pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-secondary-container/30 text-secondary border border-secondary/30 font-label-badge text-[11px] uppercase tracking-wider">
              ARCADE SPEC · {game.category_label || 'UNITY TITLE'}
            </span>
            <span className="font-label-code text-[12px] text-text-muted">
              {game.status_label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-text-primary transition-colors border border-border-glass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-text-primary flex items-center gap-2">
            <span>{game.title}</span>
            {game.status === 'in_development' && (
              <span className="text-xs px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/30 font-label-badge">
                STAGING
              </span>
            )}
          </h3>
          <p className="font-body-md text-body-md text-text-muted mt-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Hardware & Runtime Spec Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-surface-container-low border border-border-glass">
            <span className="font-label-badge text-[10px] text-tertiary block uppercase">ENGINE SPEC</span>
            <span className="font-body-sm text-[12px] font-semibold text-text-primary mt-1 block">
              {game.engine_spec || 'Unity 6 URP'}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low border border-border-glass">
            <span className="font-label-badge text-[10px] text-primary block uppercase">RUNTIME TARGET</span>
            <span className="font-body-sm text-[12px] font-semibold text-text-primary mt-1 block">
              {game.runtime_target || 'WebGL 2.0 WebAssembly'}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low border border-border-glass col-span-2 sm:col-span-1">
            <span className="font-label-badge text-[10px] text-secondary block uppercase">CONTROLLER I/O</span>
            <span className="font-body-sm text-[12px] font-semibold text-text-primary mt-1 block">
              {game.controller_support || 'Full Gamepad & Keys'}
            </span>
          </div>
        </div>

        {/* HUD Specs if available */}
        {game.hud_specs && (
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-border-glass grid grid-cols-3 text-center">
            <div>
              <span className="font-label-badge text-[10px] text-text-muted block">PERFORMANCE</span>
              <span className="font-label-code text-xs font-bold text-text-primary">
                {game.hud_specs.drawcalls}
              </span>
            </div>
            <div>
              <span className="font-label-badge text-[10px] text-text-muted block">PHYSICS LOOP</span>
              <span className="font-label-code text-xs font-bold text-tertiary">
                {game.hud_specs.physics_tick}
              </span>
            </div>
            <div>
              <span className="font-label-badge text-[10px] text-text-muted block">ASSET MEMORY</span>
              <span className="font-label-code text-xs font-bold text-primary">
                {game.hud_specs.texture_vram}
              </span>
            </div>
          </div>
        )}

        {/* Technical Architecture breakdown */}
        {game.tech_details && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-glass">
            <span className="font-label-code text-xs text-tertiary uppercase tracking-wider block mb-1">
              ARCHITECTURAL HIGHLIGHTS
            </span>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              {game.tech_details}
            </p>
          </div>
        )}

        {/* Features / Gameplay loops */}
        {game.features && (
          <div className="flex flex-col gap-2">
            <span className="font-label-code text-xs text-secondary uppercase tracking-wider">
              MECHANICS & LOOPS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {game.features.map((feat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-surface-container-high/50 border border-border-glass flex flex-col gap-1">
                  <span className="font-button-text text-xs text-text-primary font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    {feat.title}
                  </span>
                  <span className="text-[11px] text-text-muted leading-relaxed">
                    {feat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-glass">
          <div className="flex items-center gap-2">
            <Link
              to={`/arcade/${game.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-primary font-button-text text-button-text transition-colors border border-border-glass text-xs"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-secondary" />
              <span>Full Cabinet Page</span>
            </Link>
            <Link
              to={`/contact?service=Game+Development&ref=${encodeURIComponent(game.title)}+Early+Playtest`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-glass text-secondary hover:text-white transition-colors text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Playtest Sign-up</span>
            </Link>
          </div>

          <Link
            to={`/contact?service=Unity+Game+Development`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text hover:bg-primary-container/80 transition-colors shadow-sm text-xs font-semibold"
          >
            <span>Commission Custom Game</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

