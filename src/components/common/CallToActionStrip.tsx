import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface CallToActionStripProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

/**
 * CallToActionStrip - Reusable high-impact bottom CTA banner.
 * Adheres to SRP (conversion trigger presentation) and OCP (custom labels, links, and content).
 */
export const CallToActionStrip: React.FC<CallToActionStripProps> = ({
  eyebrow = 'START A BUILD',
  title,
  description,
  primaryButtonText = 'Start A Project',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Explore Services',
  secondaryButtonLink = '/services',
  className = '',
}) => {
  return (
    <section className={`w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl ${className}`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-xl text-left border border-border-glass">
          <div className="flex flex-col max-w-2xl">
            <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-widest mb-space-xs font-mono">
              {eyebrow}
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight mb-space-xs">
              {title}
            </h2>
            <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-md w-full md:w-auto shrink-0">
            {primaryButtonLink && (
              <Link
                to={primaryButtonLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text shadow-sm hover:opacity-90 transition-opacity"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {secondaryButtonLink && (
              <Link
                to={secondaryButtonLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-surface-container-high text-text-primary font-button-text text-button-text hover:bg-surface-bright transition-colors border border-border-glass"
              >
                <span>{secondaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
