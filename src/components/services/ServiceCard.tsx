import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Service } from '../../types';

export interface ServiceCardProps {
  service: Service;
  onOpenSpec: (service: Service) => void;
}

/**
 * ServiceCard - Detailed engineering discipline showcase card.
 * Single Responsibility: Presenting discipline title, narrative, tech tags, deliverables, and commission actions in friendly, accessible language.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOpenSpec }) => {
  return (
    <article className="group rounded-2xl bg-surface-deep/80 backdrop-blur-2xl p-space-lg lg:p-space-xl border border-border-glass shadow-xl transition-all duration-300 hover:border-tertiary/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: Scope & Overview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <div className="flex items-center gap-space-sm mb-space-sm">
            <span className="font-label-badge text-label-badge text-tertiary font-bold tracking-widest uppercase font-mono">
              {service.discipline_tag}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <span className="font-label-code text-label-code text-text-muted font-mono">
              {service.badge}
            </span>
          </div>
          
          <h2 className="font-headline-md text-headline-md text-text-primary font-bold">
            {service.title}
          </h2>
          
          <p className="font-body-md text-body-md text-text-muted mt-space-md leading-relaxed">
            {service.description}
          </p>

          {/* Case Anchor Pill */}
          {service.case_anchor && (
            <div className="flex items-center gap-space-sm mt-space-lg p-space-sm rounded-lg bg-surface-container/60 border border-border-glass/40">
              <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0" />
              <span className="font-body-sm text-body-sm text-text-muted">{service.case_anchor.label}</span>
              <span className="font-label-code text-label-code text-text-primary font-medium font-mono">
                {service.case_anchor.detail}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Tech Stack & What You Get (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-lowest/80 border border-border-glass shadow-inner text-left">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-label-code uppercase tracking-wider text-text-muted font-mono">
              Technologies We Use
            </span>
            {service.reliability_metric && (
              <span className="font-label-badge text-label-badge text-tertiary uppercase font-mono">
                {service.reliability_metric.value}
              </span>
            )}
          </div>

          {/* Stack Tags */}
          <div className="flex flex-wrap gap-space-xs">
            {service.tech_stack.map((t) => (
              <span
                key={t}
                className="px-space-sm py-space-xs rounded bg-surface-container-high border border-border-glass font-label-code text-label-code text-text-primary font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="h-px bg-outline-variant/30 my-space-xs" />

          {/* What You Get / Deliverables */}
          <span className="font-label-code text-label-code uppercase tracking-wider text-text-muted font-mono">
            What You Get
          </span>
          <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-text-muted">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-space-xs">
                <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onOpenSpec(service)}
              className="flex-1 py-2 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-button-text text-button-text flex items-center justify-center gap-space-xs transition-colors border border-border-glass text-xs"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="py-2 px-space-md rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text flex items-center justify-center text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
