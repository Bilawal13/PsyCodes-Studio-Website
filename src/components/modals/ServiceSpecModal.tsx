import React from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Service } from '../../types';
import { Link } from 'react-router-dom';

interface ServiceSpecModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceSpecModal: React.FC<ServiceSpecModalProps> = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative bg-surface-deep border border-border-glass rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-glass pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-tertiary/20 text-tertiary font-label-badge text-[11px] uppercase tracking-wider">
              {service.discipline_tag}
            </span>
            <span className="font-label-code text-[12px] text-text-muted">
              {service.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-text-primary transition-colors border border-border-glass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
            {service.title}
          </h3>
          <p className="font-body-md text-body-md text-text-muted mt-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Reliability Metric Card */}
        {service.reliability_metric && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-glass flex items-center justify-between">
            <div>
              <span className="font-label-code text-[11px] text-tertiary uppercase block">
                {service.reliability_metric.label}
              </span>
              <span className="font-headline-md text-2xl font-bold text-text-primary">
                {service.reliability_metric.value}
              </span>
              <span className="text-xs text-text-muted block mt-0.5">
                {service.reliability_metric.subtext}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-deep border border-border-glass flex items-center justify-center text-tertiary">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div>
          <span className="font-label-code text-xs text-text-muted uppercase tracking-wider block mb-2">
            TECHNOLOGIES WE USE
          </span>
          <div className="flex flex-wrap gap-1.5">
            {service.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-surface-container-high border border-border-glass text-xs font-label-code text-text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Concrete Deliverables */}
        <div>
          <span className="font-label-code text-xs text-primary uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            WHAT YOU RECEIVE
          </span>
          <ul className="flex flex-col gap-2">
            {service.deliverables.map((deliv, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-body-sm text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>{deliv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border-glass">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant font-button-text text-button-text hover:text-text-primary text-xs cursor-pointer"
          >
            Close
          </button>
          <Link
            to={`/contact?service=${encodeURIComponent(service.title)}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text text-xs font-bold shadow-md hover:opacity-90 transition-all"
          >
            <span>Start This Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

