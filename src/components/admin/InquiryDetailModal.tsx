import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Copy, Check, Mail, Building2, ShieldCheck, X, ExternalLink, MessageCircle } from 'lucide-react';
import { Inquiry } from '../../types';
import { formatInquiryDate } from '../../utils/dateFormatter';

export interface InquiryDetailModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
}

/**
 * InquiryDetailModal - Modal displaying client project transmission specifications.
 * Single Responsibility: Inspecting a single client inquiry dossier in detail with complete date/time metadata.
 */
export const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({
  inquiry,
  onClose,
}) => {
  const [copiedUid, setCopiedUid] = useState(false);

  const dateInfo = formatInquiryDate(inquiry?.created_at);

  const handleCopyUid = () => {
    if (!inquiry?.id) return;
    navigator.clipboard.writeText(inquiry.id);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  return (
    <AnimatePresence>
      {inquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-surface-container border border-cyan-400/30 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-glass">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                  TRANSMISSION SPECIFICATION DOSSIER
                </span>
                {inquiry.id && (
                  <span className="px-2 py-0.5 rounded bg-surface-deep text-cyan-300 font-mono text-[11px] font-bold border border-border-glass">
                    {inquiry.id}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-surface-deep border border-border-glass text-text-muted hover:text-white cursor-pointer transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Submission Date & Status Strip */}
              <div className="p-3.5 rounded-2xl bg-surface-deep border border-border-glass flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-text-muted uppercase block">SUBMISSION DATE &amp; TIME</span>
                    <span className="text-white font-medium">{dateInfo.full}</span>
                    {dateInfo.relative && (
                      <span className="text-cyan-400 ml-1.5 font-bold">({dateInfo.relative})</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {inquiry.id && (
                    <button
                      type="button"
                      onClick={handleCopyUid}
                      className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-glass text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedUid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUid ? 'Copied UID' : 'Copy UID'}</span>
                    </button>
                  )}

                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono uppercase font-bold border ${
                      inquiry.status === 'new'
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400'
                        : inquiry.status === 'completed'
                        ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400'
                        : 'bg-surface-deep border-border-glass text-text-muted'
                    }`}
                  >
                    STATUS: {inquiry.status || 'new'}
                  </span>
                </div>
              </div>

              {/* Client Profile */}
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase block mb-1">CLIENT IDENTITY</span>
                <div className="text-lg font-bold text-white tracking-tight">{inquiry.name}</div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <a href={`mailto:${inquiry.email}`} className="text-xs font-mono text-cyan-400 hover:underline">
                    {inquiry.email}
                  </a>
                  {inquiry.whatsapp && (
                    <a
                      href={`https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono border border-emerald-500/30 transition-colors"
                      title="Open WhatsApp Chat"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WA: {inquiry.whatsapp}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-emerald-400/60" />
                    </a>
                  )}
                  {inquiry.company && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-deep text-text-muted text-xs font-mono border border-border-glass">
                      <Building2 className="w-3 h-3" />
                      <span>{inquiry.company}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-deep border border-border-glass">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">DISCIPLINE</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{inquiry.project_type}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-deep border border-border-glass">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">TIMELINE</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{inquiry.timeline || 'Flexible'}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-deep border border-border-glass">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">INVESTMENT TIER</span>
                  <span className="text-xs font-bold text-emerald-400 block mt-0.5">{inquiry.budget}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-deep border border-border-glass">
                  <span className="text-[10px] font-mono text-text-muted block uppercase">COMMUNICATION</span>
                  <span className="text-xs font-bold text-cyan-400 block mt-0.5">{inquiry.preferred_contact}</span>
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <span className="text-[10px] font-mono text-text-muted block mb-1 uppercase tracking-wider">
                  SUBMITTED PROJECT SCOPE &amp; BRIEF
                </span>
                <div className="p-4 rounded-xl bg-surface-deep border border-border-glass font-mono text-xs text-text-primary whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {inquiry.description}
                </div>
              </div>

              {/* NDA and Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border-glass">
                <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                  {inquiry.nda_requested ? (
                    <span className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Mutual NDA Requested</span>
                    </span>
                  ) : (
                    <span>Standard Studio Confidentiality</span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
                  {inquiry.whatsapp && (
                    <a
                      href={`https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${inquiry.name}, this is PsyCodes Studio regarding your inquiry (${inquiry.id || 'PSC'}) for ${inquiry.project_type}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                      `[PsyCodes Studio: ${inquiry.id || 'PSC'}] Discovery Response: ${inquiry.project_type} — ${inquiry.name}`
                    )}`}
                    className="px-4 py-2.5 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold hover:bg-cyan-300 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email →</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
