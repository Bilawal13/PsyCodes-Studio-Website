import React, { useState } from 'react';
import { Copy, CheckCircle2, MapPin, Clock, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { SITE_SETTINGS } from '../../data/mockData';
import { useLiveClock } from '../../hooks/useLiveClock';
import { DirectDispatchModal } from '../modals/DirectDispatchModal';

/**
 * ContactHubCards - Direct contact information and studio channels.
 * Single Responsibility: Presenting email address, office location, live time, and verified links in clean, friendly cards.
 */
export const ContactHubCards: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const karachiTime = useLiveClock('Asia/Karachi');

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_SETTINGS.contact_email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface-container/80 border border-border-glass backdrop-blur-xl relative overflow-hidden text-left shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold text-tertiary">DIRECT CONTACT</span>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACCEPTING NEW PROJECTS
        </span>
      </div>

      <h2 className="text-2xl font-bold font-display text-white mb-2">
        Ways to Reach Us
      </h2>
      <p className="text-xs text-text-muted leading-relaxed mb-6">
        Prefer to write an email directly or connect on professional channels? We are always happy to chat.
      </p>

      {/* Email Box */}
      <div className="p-4 rounded-2xl bg-surface-deep border border-border-glass mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-tertiary" />
            <span>DIRECT EMAIL ADDRESS</span>
          </span>
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-1 text-[11px] font-mono text-tertiary hover:text-white transition-colors cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsDispatchModalOpen(true)}
          className="font-mono text-base font-bold text-white hover:text-tertiary transition-colors tracking-tight block truncate text-left w-full cursor-pointer"
          title="Open Mail Dispatch Options"
        >
          {SITE_SETTINGS.contact_email}
        </button>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-surface-deep border border-border-glass">
          <div className="flex items-center gap-1.5 text-text-muted text-[11px] mb-1">
            <MapPin className="w-3.5 h-3.5 text-tertiary" />
            <span>Headquarters</span>
          </div>
          <span className="text-xs font-bold text-white block">Karachi, Pakistan</span>
          <span className="text-[10px] text-text-muted block">Serving Global Clients</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-deep border border-border-glass">
          <div className="flex items-center gap-1.5 text-text-muted text-[11px] mb-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Local Time</span>
          </div>
          <span className="text-xs font-bold text-white font-mono block">
            {karachiTime ? `${karachiTime} PKT` : 'PKT (UTC+5)'}
          </span>
          <span className="text-[10px] text-text-muted block">Guaranteed 24h SLA</span>
        </div>
      </div>

      {/* Social / Verified Links */}
      <div>
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2.5">
          CONNECT &amp; EXPLORE
        </span>
        <div className="flex flex-wrap gap-2">
          {SITE_SETTINGS.linkedin_url && (
            <a
              href={SITE_SETTINGS.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface-deep hover:bg-surface-container-high border border-border-glass text-text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Linkedin className="w-3.5 h-3.5 text-tertiary" />
              <span>LinkedIn</span>
            </a>
          )}
          {SITE_SETTINGS.instagram_url && (
            <a
              href={SITE_SETTINGS.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface-deep hover:bg-surface-container-high border border-border-glass text-text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Instagram className="w-3.5 h-3.5 text-secondary" />
              <span>Instagram</span>
            </a>
          )}
          {SITE_SETTINGS.x_url && (
            <a
              href={SITE_SETTINGS.x_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface-deep hover:bg-surface-container-high border border-border-glass text-text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <span>𝕏 Twitter</span>
            </a>
          )}
        </div>
      </div>

      {/* Universal Direct Mailer Modal */}
      <DirectDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        subject="Project Transmission | PsyCodes Studio"
      />
    </div>
  );
};
