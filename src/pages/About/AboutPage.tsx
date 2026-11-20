import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, ArrowRight } from 'lucide-react';
import { AboutHero } from '../../components/about/AboutHero';
import { FounderDossier } from '../../components/about/FounderDossier';
import { StudioTenets } from '../../components/about/StudioTenets';
import { TechArsenal } from '../../components/about/TechArsenal';
import { StudioFAQAccordion } from '../../components/about/StudioFAQAccordion';
import { SITE_SETTINGS } from '../../data/mockData';
import { DirectDispatchModal } from '../../components/modals/DirectDispatchModal';
import { ScrollReveal } from '../../components/common/ScrollReveal';

/**
 * AboutPage - The Lab, Founder Dossier, and Engineering Ethos.
 * Strictly adheres to SOLID principles:
 * - Single Responsibility Principle (SRP): Coordinates layout for lab ethos, founder manifesto, and FAQs.
 * - Open/Closed Principle (OCP): New tenets, arsenal stacks, and collaboration FAQs plug in cleanly.
 * - Dependency Inversion Principle (DIP): Offloads presentational details to isolated subcomponents.
 */
export const AboutPage: React.FC = () => {
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-r from-cyan-400/10 via-primary-container/15 to-purple-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[900px] left-10 w-96 h-96 bg-cyan-400/5 blur-[120px]" />
      </div>

      {/* 1. HERO SECTION & ORIGIN STATS */}
      <AboutHero />

      {/* 2. FOUNDER & LEAD ARCHITECT DOSSIER */}
      <ScrollReveal direction="up" delay={0.05} amount={0.15}>
        <FounderDossier />
      </ScrollReveal>

      {/* 3. THE STUDIO TENETS */}
      <ScrollReveal direction="up" delay={0.05} amount={0.15}>
        <StudioTenets />
      </ScrollReveal>

      {/* 4. TECH ARSENAL & LAB INFRASTRUCTURE */}
      <ScrollReveal direction="up" delay={0.05} amount={0.15}>
        <TechArsenal />
      </ScrollReveal>

      {/* 5. INTERACTIVE STUDIO FAQ ACCORDION */}
      <ScrollReveal direction="up" delay={0.05} amount={0.15}>
        <StudioFAQAccordion />
      </ScrollReveal>

      {/* 6. DIRECT DISPATCH / TRANSMISSION CTA */}
      <ScrollReveal direction="up" delay={0.05} amount={0.15}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="rounded-3xl bg-gradient-to-b from-surface-container/90 via-surface-deep/90 to-surface-container/90 border border-border-glass p-8 sm:p-14 text-center relative overflow-hidden backdrop-blur-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-400/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-deep border border-cyan-400/40 text-xs font-mono text-cyan-400 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>READY FOR TRANSMISSION · DIRECT LAB INTAKE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white mb-4">
                Ready to Architect Something Extraordinary?
              </h2>

              <p className="text-base sm:text-lg text-text-muted mb-8 leading-relaxed">
                Whether you need a full-scale AI platform, a responsive 60fps mobile application, or a high-velocity WebGL game engine, connect directly with the laboratory.
              </p>

              {/* Direct Email Card */}
              <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-surface-deep border border-border-glass flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-text-muted block">DIRECT DISPATCH</span>
                    <span className="font-mono text-sm font-semibold text-white">{SITE_SETTINGS.contact_email}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDispatchModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Launch Mailer</span>
                  <span className="text-sm">→</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container text-white font-button-text font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
                >
                  <span>Initiate Technical Transmission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Universal Direct Mailer Terminal Modal */}
      <DirectDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        subject="Project Inquiry | PsyCodes Studio"
      />
    </div>
  );
};
