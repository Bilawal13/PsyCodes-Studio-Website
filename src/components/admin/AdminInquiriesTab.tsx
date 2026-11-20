import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  Mail, 
  Search, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Inquiry } from '../../types';
import { formatInquiryDate } from '../../utils/dateFormatter';

export interface AdminInquiriesTabProps {
  inquiries: Inquiry[];
  onStatusChange: (id: string, status: NonNullable<Inquiry['status']>) => void;
  onInspectInquiry: (inquiry: Inquiry) => void;
}

/**
 * AdminInquiriesTab - Inbound client transmissions manager with date sorting, search, and dossier inspection.
 * Single Responsibility: Handling client inquiry lifecycle updates, timestamps, and dossier listing.
 */
export const AdminInquiriesTab: React.FC<AdminInquiriesTabProps> = ({
  inquiries,
  onStatusChange,
  onInspectInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | NonNullable<Inquiry['status']>>('all');
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  const handleCopyUid = (uid?: string) => {
    if (!uid) return;
    navigator.clipboard.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesStatus;

      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.whatsapp && inq.whatsapp.toLowerCase().includes(q)) ||
        (inq.id && inq.id.toLowerCase().includes(q)) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        inq.project_type.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, searchQuery, statusFilter]);

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <span>Client Inquiries &amp; Orders</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs border border-cyan-400/30">
              {inquiries.length} Total
            </span>
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Review incoming project briefs, client specifications, and synchronized receipt dossiers.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search UID, name, email..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-surface-container-high border border-border-glass text-xs font-mono text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-400 transition-colors w-48 sm:w-60"
            />
          </div>

          {/* Status Dropdown Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-border-glass text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
          >
            <option value="all">All Statuses ({inquiries.length})</option>
            <option value="new">New ({inquiries.filter((i) => i.status === 'new').length})</option>
            <option value="reviewing">Reviewing ({inquiries.filter((i) => i.status === 'reviewing').length})</option>
            <option value="in_progress">In Progress ({inquiries.filter((i) => i.status === 'in_progress').length})</option>
            <option value="completed">Completed ({inquiries.filter((i) => i.status === 'completed').length})</option>
            <option value="archived">Archived ({inquiries.filter((i) => i.status === 'archived').length})</option>
          </select>
        </div>
      </div>

      {/* Inquiry List */}
      {filteredInquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-surface-container/70 border border-border-glass text-text-muted font-mono text-sm space-y-2">
          <Calendar className="w-8 h-8 mx-auto text-text-muted/40 mb-2" />
          <p>No matching inquiries found.</p>
          <span className="text-xs text-text-muted/60 block">
            {searchQuery || statusFilter !== 'all'
              ? 'Try resetting your search query or status filter.'
              : 'Submit a project request from the /contact or home page to see it logged here.'}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInquiries.map((inq) => {
            const dateInfo = formatInquiryDate(inq.created_at);

            return (
              <div
                key={inq.id || inq.email + inq.created_at}
                className="p-5 sm:p-6 rounded-2xl bg-surface-container/80 border border-border-glass hover:border-cyan-400/40 transition-all flex flex-col gap-4 shadow-sm backdrop-blur-sm"
              >
                {/* Row 1: Identification & Receipt UID & Date Stamp */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-border-glass/60">
                  {/* Left: Client name, email, company */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-base font-bold text-white tracking-tight">
                      {inq.name}
                    </span>
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      {inq.email}
                    </a>
                    {inq.whatsapp && (
                      <a
                        href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-mono border border-emerald-500/30 transition-colors"
                        title="Open WhatsApp chat"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WA: {inq.whatsapp}</span>
                      </a>
                    )}
                    {inq.company && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-deep text-text-muted text-[11px] font-mono border border-border-glass">
                        <Building2 className="w-3 h-3 text-text-muted" />
                        <span>{inq.company}</span>
                      </span>
                    )}
                  </div>

                  {/* Right: Receipt UID and Date Stamp */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-deep border border-border-glass text-[11px] font-mono text-text-muted" title={dateInfo.full}>
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-text-primary font-medium">{dateInfo.dateOnly}</span>
                      {dateInfo.timeOnly && (
                        <>
                          <span className="text-text-muted/40">•</span>
                          <span>{dateInfo.timeOnly}</span>
                        </>
                      )}
                      {dateInfo.relative && (
                        <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 text-[9.5px] font-bold">
                          {dateInfo.relative}
                        </span>
                      )}
                    </div>

                    {/* UID Badge with Copy Button */}
                    {inq.id && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-deep border border-border-glass font-mono text-[11px]">
                        <span className="text-text-muted text-[9.5px] uppercase">UID:</span>
                        <span className="font-bold text-cyan-400">{inq.id}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyUid(inq.id)}
                          className="p-1 rounded hover:bg-surface-container text-text-muted hover:text-white transition-colors cursor-pointer"
                          title="Copy Receipt UID"
                        >
                          {copiedUid === inq.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Status Pill */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                        inq.status === 'new'
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400'
                          : inq.status === 'reviewing'
                          ? 'bg-amber-500/15 border-amber-400 text-amber-400'
                          : inq.status === 'in_progress'
                          ? 'bg-blue-500/15 border-blue-400 text-blue-400'
                          : inq.status === 'completed'
                          ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400'
                          : 'bg-surface-deep border-border-glass text-text-muted'
                      }`}
                    >
                      {inq.status || 'new'}
                    </span>
                  </div>
                </div>

                {/* Row 2: Specifications Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-surface-deep/80 border border-border-glass">
                    <span className="text-[10px] text-text-muted block uppercase">SERVICE / DISCIPLINE</span>
                    <span className="text-white font-semibold truncate block mt-0.5">
                      {inq.project_type}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-deep/80 border border-border-glass">
                    <span className="text-[10px] text-text-muted block uppercase">BUDGET RANGE</span>
                    <span className="text-emerald-400 font-bold block mt-0.5">
                      {inq.budget}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-deep/80 border border-border-glass">
                    <span className="text-[10px] text-text-muted block uppercase">TARGET LAUNCH</span>
                    <span className="text-white block mt-0.5">
                      {inq.timeline || 'Standard Sprint'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-deep/80 border border-border-glass">
                    <span className="text-[10px] text-text-muted block uppercase">COMMUNICATION</span>
                    <span className="text-cyan-400 block mt-0.5">
                      {inq.preferred_contact} {inq.nda_requested ? '· NDA' : ''}
                    </span>
                  </div>
                </div>

                {/* Row 3: Description / Brief Snippet */}
                <div className="p-3.5 rounded-xl bg-surface-deep/60 border border-border-glass/70 text-xs text-text-primary/90 font-mono leading-relaxed line-clamp-2">
                  <span className="text-text-muted text-[10px] uppercase block mb-1">PROJECT SCOPE SUMMARY:</span>
                  {inq.description}
                </div>

                {/* Row 4: Action Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-muted uppercase">Status:</span>
                    <select
                      value={inq.status || 'new'}
                      onChange={(e) => {
                        if (inq.id) {
                          onStatusChange(inq.id, e.target.value as NonNullable<Inquiry['status']>);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface-deep border border-border-glass text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="new">new</option>
                      <option value="reviewing">reviewing</option>
                      <option value="in_progress">in_progress</option>
                      <option value="completed">completed</option>
                      <option value="archived">archived</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectInquiry(inq)}
                      className="px-4 py-2 rounded-xl bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400 hover:text-black text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect Full Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`mailto:${inq.email}?subject=${encodeURIComponent(
                        `[PsyCodes Studio: ${inq.id || 'PSC'}] Re: Your ${inq.project_type} Inquiry — ${inq.name}`
                      )}`}
                      className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                      title="Direct email client follow-up"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
