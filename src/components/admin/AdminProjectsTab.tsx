import React from 'react';
import { Plus, ExternalLink, Trash2 } from 'lucide-react';
import { Project } from '../../types';

export interface AdminProjectsTabProps {
  projects: Project[];
  onCreateProject: () => void;
  onDeleteProject: (id: string, title: string) => void;
}

/**
 * AdminProjectsTab - Projects registry management.
 * Single Responsibility: Displaying project items, triggering new project creation, and deleting projects.
 */
export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onCreateProject,
  onDeleteProject,
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-white">
          Studio Projects ({projects.length})
        </h2>
        <button
          type="button"
          onClick={onCreateProject}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer hover:shadow-cyan-400/30 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW PROJECT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{p.title}</span>
                <span className="text-xs font-mono text-cyan-400">/{p.slug}</span>
                {p.featured && (
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                    FEATURED
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-text-muted block mt-0.5">
                {p.category_label} · {p.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/projects/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-surface-deep text-text-muted hover:text-white border border-border-glass transition-colors"
                title="View project preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onDeleteProject(p.id, p.title)}
                className="p-2 rounded-lg bg-surface-deep text-red-400 hover:bg-red-500/20 border border-border-glass cursor-pointer transition-colors"
                title="Delete project"
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
