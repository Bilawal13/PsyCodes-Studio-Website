import React from 'react';
import { Plus, ExternalLink, Trash2 } from 'lucide-react';
import { Game } from '../../types';

export interface AdminGamesTabProps {
  games: Game[];
  onCreateGame: () => void;
  onDeleteGame: (id: string, title: string) => void;
}

/**
 * AdminGamesTab - Arcade game titles & cabinets management.
 * Single Responsibility: Listing Unity 6/WebGL arcade games, handling new game prompts and cabinet deletion.
 */
export const AdminGamesTab: React.FC<AdminGamesTabProps> = ({
  games,
  onCreateGame,
  onDeleteGame,
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-white">
          Arcade Cabinets ({games.length})
        </h2>
        <button
          type="button"
          onClick={onCreateGame}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-electric-blue to-purple-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer hover:shadow-cyan-400/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW CABINET</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {games.map((g) => (
          <div
            key={g.slug}
            className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{g.title}</span>
                <span className="text-xs font-mono text-cyan-400">/{g.slug}</span>
                <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px] font-mono border border-yellow-500/20">
                  {g.status_label}
                </span>
              </div>
              <span className="text-xs font-mono text-text-muted block mt-0.5">
                {g.category_label} · {g.engine_spec || 'Unity 6'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/arcade/${g.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-surface-deep text-text-muted hover:text-white border border-border-glass transition-colors"
                title="Launch cabinet"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onDeleteGame(g.id, g.title)}
                className="p-2 rounded-lg bg-surface-deep text-red-400 hover:bg-red-500/20 border border-border-glass cursor-pointer transition-colors"
                title="Delete cabinet"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
