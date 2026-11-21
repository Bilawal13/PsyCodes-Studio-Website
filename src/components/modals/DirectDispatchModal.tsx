import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  Globe,
  Terminal,
} from 'lucide-react';
import { SITE_SETTINGS } from '../../data/mockData';

export interface DirectDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  body?: string;
}

/**
 * DirectDispatchModal - Universal direct email launcher.
 * Solves the common browser issue where <a href="mailto:..."> does nothing when no desktop email client is configured.
 * Provides instant 1-click links to Gmail Web, Outlook Web, Desktop Mail App, and 1-click clipboard copy.
 */
export const DirectDispatchModal: React.FC<DirectDispatchModalProps> = ({
  isOpen,
  onClose,
  subject = 'Project Inquiry | PsyCodes Studio',
  body = '',
}) => {
  const [copied, setCopied] = useState(false);
  const email = SITE_SETTINGS.contact_email;

  // Auto-copy on open for maximum convenience
  useEffect(() => {
    if (isOpen) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
  }, [isOpen, email]);

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

  if (!isOpen) return null;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodedSubject}&body=${encodedBody}`;
  const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 blur-[90px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-glass">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              DIRECT TRANSMISSION TERMINAL
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

        {/* Main Title */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
            How would you like to email us?
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Click your preferred email platform below to compose your inquiry directly, or copy our studio address.
          </p>
        </div>

        {/* Email Address Pill with Copy Button */}
        <div className="p-3.5 rounded-2xl bg-surface-deep border border-border-glass mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-semibold text-white truncate">
              {email}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400 text-cyan-400 hover:text-black font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Launch Options */}
        <div className="space-y-3 mb-6">
          {/* Option 1: Gmail Web (Most reliable across all browsers) */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-4 rounded-xl bg-surface-deep hover:bg-surface-container-high border border-border-glass hover:border-cyan-400/50 flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm shrink-0">
                G
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Open in Gmail (Web)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-400/10 text-cyan-400 font-mono">
                    Recommended
                  </span>
                </div>
                <span className="text-xs text-text-muted">
                  Opens compose window directly in your browser tab
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-cyan-400 transition-colors shrink-0" />
          </a>

          {/* Option 2: Outlook / Hotmail Web */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full p-4 rounded-xl bg-surface-deep hover:bg-surface-container-high border border-border-glass hover:border-blue-400/50 flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                O
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Open in Outlook / Office365
                </div>
                <span className="text-xs text-text-muted">
                  Opens compose in Outlook Web
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-blue-400 transition-colors shrink-0" />
          </a>

          {/* Option 3: Default Desktop Mail Client */}
          <a
            href={mailtoUrl}
            onClick={onClose}
            className="w-full p-4 rounded-xl bg-surface-deep hover:bg-surface-container-high border border-border-glass hover:border-cyan-400/50 flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-text-primary group-hover:text-cyan-400 transition-colors">
                  Open Default Mail App
                </div>
                <span className="text-xs text-text-muted">
                  Apple Mail, Windows Mail, or Outlook Desktop
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-cyan-400 transition-colors shrink-0" />
          </a>
        </div>

        {/* Alternative: Inquire on Website */}
        <div className="pt-4 border-t border-border-glass flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Sparkles className="w-3.5 h-3.5 text-tertiary" />
            <span>Guaranteed reply within 24 hours</span>
          </div>

          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
          >
            <span>Or use our Project Intake Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
