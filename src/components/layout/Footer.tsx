import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Calendar, User, ExternalLink, Hash, AtSign, Copy, Check } from 'lucide-react';
import { SITE_SETTINGS } from '../../data/mockData';
import { DirectDispatchModal } from '../modals/DirectDispatchModal';
import { StudioLogoMark } from '../brand/StudioLogo';

export const Footer: React.FC = () => {
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  return (
    <footer className="w-full max-w-full overflow-hidden bg-surface-container-lowest text-on-surface-variant border-t border-border-glass shadow-[0_-1px_12px_rgba(0,0,0,0.3)] mt-margin">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <StudioLogoMark size={28} />
              <span className="font-headline-sm text-headline-sm font-bold text-text-primary tracking-tight">
                PsyCodes Studio
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Architecting elite AI systems, hyper-performing web platforms, and independent interactive entertainment. Built with mathematical precision from our Karachi laboratory.
            </p>
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#18d9f6]" />
              <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider">
                CODE. CREATE. AUTOMATE.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
              Quick Nav
            </span>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm">
              <li>
                <Link to="/" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  Products & Ecosystem
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/arcade" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  PsyCodes Arcade (Games)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  About Studio & Ethos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-on-surface-variant hover:text-tertiary transition-colors">
                  Connect & Transmission
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Credentials */}
          <div className="flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
              Studio Credentials
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-text-muted">
              <div className="flex items-center gap-space-xs">
                <User className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Founded by <strong className="text-text-primary font-medium">Bilawal Feroze</strong>
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Karachi, Pakistan (UTC+5)</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>Est. 2026 · Skunkworks Lab</span>
              </div>
            </div>
          </div>

          {/* Column 4: Verified Nodes & Connect */}
          <div className="flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm font-semibold text-text-primary">
              Connect
            </span>
            <div className="flex flex-col gap-space-sm font-body-sm text-body-sm">
              <button
                type="button"
                onClick={() => setIsDispatchModalOpen(true)}
                className="flex items-center gap-space-xs text-on-surface-variant hover:text-tertiary transition-colors group text-left cursor-pointer"
                title="Launch Direct Mailer Terminal"
              >
                <Mail className="w-4 h-4 text-tertiary shrink-0" />
                <span className="font-label-code text-label-code group-hover:underline">
                  {SITE_SETTINGS.contact_email}
                </span>
              </button>
              <a
                href={SITE_SETTINGS.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                <span>
                  LinkedIn: <span className="text-text-primary">psycodestudios</span>
                </span>
              </a>
              <a
                href={SITE_SETTINGS.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs text-on-surface-variant hover:text-accent-violet transition-colors"
              >
                <Hash className="w-4 h-4 text-accent-violet shrink-0" />
                <span>
                  Instagram: <span className="text-text-primary">@psycodestudios</span>
                </span>
              </a>
              <a
                href={SITE_SETTINGS.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs text-on-surface-variant hover:text-tertiary transition-colors"
              >
                <AtSign className="w-4 h-4 text-tertiary shrink-0" />
                <span>
                  X: <span className="text-text-primary">@PsyCodesAI</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & engine status */}
        <div className="mt-space-xl pt-space-lg border-t border-border-glass flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-text-muted">
          <p>© 2026 PsyCodes Studio. All computational rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <p className="font-label-badge text-label-badge uppercase text-outline">
              Proprietary Digital Experience Platform
            </p>
          </div>
        </div>
      </div>

      {/* Universal Direct Mailer Modal */}
      <DirectDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        subject="Direct Dispatch | PsyCodes Studio"
      />
    </footer>
  );
};

