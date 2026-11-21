import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SERVICES } from '../../data/mockData';
import { Service } from '../../types';
import { ServiceSpecModal } from '../../components/modals/ServiceSpecModal';
import { ServicesHero } from '../../components/services/ServicesHero';
import { ServiceCard } from '../../components/services/ServiceCard';
import { SprintCalculator } from '../../components/services/SprintCalculator';
import { EngagementModels } from '../../components/services/EngagementModels';
import { ScrollReveal } from '../../components/common/ScrollReveal';

/**
 * ServicesPage - Modular orchestrator for studio engineering disciplines & commission tracks.
 * Adheres strictly to SOLID principles:
 * - Single Responsibility Principle (SRP): Coordinates layout and active service modal state.
 * - Open/Closed Principle (OCP): New capabilities, calculators, and models integrate modularly.
 * - Dependency Inversion Principle (DIP): Offloads estimation math to useSprintCalculator.
 */
export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const displayedServices = isExpanded ? filteredServices : filteredServices.slice(0, 2);
  const hasMore = filteredServices.length > 2;

  const handleOpenSpec = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 blur-[140px]" />
        <div className="absolute top-[35%] right-10 w-[500px] h-[500px] bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-[20%] left-10 w-[600px] h-[600px] bg-cyan-400/10 blur-[160px]" />
      </div>

      {/* HERO SECTION */}
      <ServicesHero />

      {/* FILTER & DISCIPLINES LIST */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-gutter lg:px-margin mb-20 w-full flex flex-col gap-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border-glass/40">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'video', label: 'AI Videos & Ads' },
              { id: 'mobile', label: 'Mobile Apps' },
              { id: 'engineering', label: 'Web & Cloud Platforms' },
              { id: 'ai', label: 'AI & Automation' },
              { id: 'game', label: 'Game Development' },
              { id: 'design', label: 'UI/UX & Design' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-button-text text-button-text transition-all whitespace-nowrap text-xs ${
                  activeCategory === cat.id
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'bg-surface-deep text-on-surface-variant hover:text-text-primary border border-border-glass'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Disciplines Cards List */}
          <div className="flex flex-col gap-12 transition-all duration-500 ease-in-out">
            {displayedServices.map((service, idx) => (
              <div
                key={service.id}
                className={idx >= 2 ? 'animate-in fade-in slide-in-from-top-4 duration-500' : ''}
              >
                <ServiceCard
                  service={service}
                  onOpenSpec={handleOpenSpec}
                />
              </div>
            ))}
          </div>

          {/* View More / Show Less Button */}
          {hasMore && (
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-button-text font-bold text-sm shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>
                  {isExpanded
                    ? 'Show Less Services'
                    : `View More Services (${filteredServices.length - 2} More)`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
                  }`}
                />
              </button>
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* INTERACTIVE SPRINT ESTIMATION CALCULATOR */}
      <ScrollReveal>
        <SprintCalculator />
      </ScrollReveal>

      {/* ENGAGEMENT MODELS */}
      <ScrollReveal>
        <EngagementModels />
      </ScrollReveal>

      {/* Service Spec Modal */}
      <ServiceSpecModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
