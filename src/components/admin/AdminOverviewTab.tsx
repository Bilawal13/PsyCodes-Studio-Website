import React from 'react';
import { Inbox, Calendar, ChevronRight, Building2 } from 'lucide-react';
import { Project, Game, Service, Inquiry } from '../../types';
import { formatInquiryDate } from '../../utils/dateFormatter';

export interface AdminOverviewTabProps {
  projects: Project[];
  games: Game[];
  services: Service[];
  inquiries: Inquiry[];
  onInspectInquiry: (inquiry: Inquiry) => void;
}

/**
 * AdminOverviewTab - Dashboard metrics summary and recent client transmissions feed.
 * Single Responsibility: Presenting studio high-level operational counts and recent inquiries with timestamps.
 */
export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  projects,
  games,
  services,
  inquiries,
  onInspectInquiry,
}) => {
  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass">
          <span className="text-[10px] font-mono text-cyan-400 block mb-1">ACTIVE INQUIRIES</span>
          <div className="text-3xl font-black font-display text-white">{inquiries.length}</div>
          <span className="text-xs text-text-muted font-mono mt-1 block">Intake Transmissions</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass">
          <span className="text-[10px] font-mono text-blue-400 block mb-1">PORTFOLIO PROJECTS</span>
          <div className="text-3xl font-black font-display text-white">{projects.length}</div>
          <span className="text-xs text-text-muted font-mono mt-1 block">Live Case Studies</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass">
          <span className="text-[10px] font-mono text-green-400 block mb-1">ARCADE TITLES</span>
          <div className="text-3xl font-black font-display text-white">{games.length}</div>
          <span className="text-xs text-text-muted font-mono mt-1 block">Unity 6 Games</span>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container/70 border border-border-glass">
          <span className="text-[10px] font-mono text-purple-400 block mb-1">ENGINEERING DISCIPLINES</span>
          <div className="text-3xl font-black font-display text-white">{services.length}</div>
          <span className="text-xs text-text-muted font-mono mt-1 block">Active Offerings</span>
        </div>
      </div>

      {/* Recent Inquiries Quickfeed */}
      <div className="p-6 rounded-3xl bg-surface-container/70 border border-border-glass">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-cyan-400" />
            <span>Recent Client Transmissions</span>
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Showing latest {Math.min(inquiries.length, 5)} of {inquiries.length}
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-text-muted font-mono text-xs">
            Zero active inquiries recorded. Transmit a test dossier from the /contact page.
          </div>
        ) : (
          <div className="divide-y divide-border-glass/40">
            {inquiries.slice(0, 5).map((inq) => {
              const dateInfo = formatInquiryDate(inq.created_at);

              return (
                <div
                  key={inq.id || inq.email + inq.created_at}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{inq.name}</span>
                      <span className="text-xs font-mono text-cyan-400">({inq.email})</span>
                      {inq.company && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted">
                          <Building2 className="w-3 h-3" />
                          <span>{inq.company}</span>
                        </span>
                      )}
                      {inq.id && (
                        <span className="px-2 py-0.5 rounded bg-surface-deep text-cyan-400 text-[10px] font-mono border border-border-glass">
                          {inq.id}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                          inq.status === 'new'
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400'
                            : inq.status === 'completed'
                            ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400'
                            : 'bg-surface-deep border-border-glass text-text-muted'
                        }`}
                      >
                        {inq.status || 'new'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-text-muted font-mono flex-wrap">
                      <div className="flex items-center gap-1.5 text-text-primary">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{dateInfo.dateOnly}</span>
                        {dateInfo.timeOnly && (
                          <span className="text-text-muted">({dateInfo.timeOnly})</span>
                        )}
                        {dateInfo.relative && (
                          <span className="text-cyan-300 font-semibold">• {dateInfo.relative}</span>
                        )}
                      </div>
                      <span>•</span>
                      <span>{inq.project_type}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{inq.budget}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInspectInquiry(inq)}
                    className="px-3.5 py-1.5 rounded-xl bg-surface-deep border border-border-glass hover:border-cyan-400 text-xs font-mono text-text-muted hover:text-white transition-all cursor-pointer flex items-center gap-1 self-start sm:self-auto shrink-0"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
