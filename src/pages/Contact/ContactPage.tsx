import React from 'react';
import { ContactHero } from '../../components/contact/ContactHero';
import { ContactHubCards } from '../../components/contact/ContactHubCards';
import { TransmissionProtocol } from '../../components/contact/TransmissionProtocol';
import { ProjectInquiryForm } from '../../components/contact/ProjectInquiryForm';
import { ScrollReveal } from '../../components/common/ScrollReveal';

/**
 * ContactPage - Direct architectural intake terminal.
 * Strictly adheres to SOLID principles:
 * - Single Responsibility Principle (SRP): Coordinates intake layout and sections.
 * - Open/Closed Principle (OCP): New protocols, communication nodes, or form fields plug in modularly.
 * - Dependency Inversion Principle (DIP): Offloads form state and validation to ProjectInquiryForm and useLiveClock.
 */
export const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-400/10 blur-[150px] rounded-full" />
        <div className="absolute top-[800px] right-10 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" />
      </div>

      {/* 1. HERO SECTION & LIVE PKT CLOCK */}
      <ContactHero />

      {/* 2. MAIN FORM & DIRECT HUB GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Studio Hub & Protocols (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={0.05} amount={0.1}>
              <ContactHubCards />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1} amount={0.1}>
              <TransmissionProtocol />
            </ScrollReveal>
          </div>

          {/* Right Column: Project Specification Dossier Terminal (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.15} amount={0.1}>
              <ProjectInquiryForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
