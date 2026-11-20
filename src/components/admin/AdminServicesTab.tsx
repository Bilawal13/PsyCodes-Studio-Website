import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Service } from '../../types';

export interface AdminServicesTabProps {
  services: Service[];
  onCreateService: () => void;
  onDeleteService: (id: string, title: string) => void;
}

/**
 * AdminServicesTab - Engineering offerings & disciplines management.
 * Single Responsibility: Displaying active service offerings, creating new disciplines and deleting services.
 */
export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  services,
  onCreateService,
  onDeleteService,
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-white">
          Service Disciplines ({services.length})
        </h2>
        <button
          type="button"
          onClick={onCreateService}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-electric-blue to-purple-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer hover:shadow-cyan-400/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW SERVICE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((s) => (
          <div
            key={s.slug}
            className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{s.title}</span>
                <span className="text-xs font-mono text-purple-400">{s.discipline_tag}</span>
              </div>
              <span className="text-xs font-mono text-text-muted block mt-0.5">
                {s.description}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onDeleteService(s.id, s.title)}
              className="p-2 rounded-lg bg-surface-deep text-red-400 hover:bg-red-500/20 border border-border-glass cursor-pointer transition-colors"
              title="Delete service"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
