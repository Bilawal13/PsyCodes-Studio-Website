import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HomeHero } from '../../components/home/HomeHero';
import { KineticMarquee } from '../../components/home/KineticMarquee';
import { FitLyfeShowcase } from '../../components/home/FitLyfeShowcase';
import { HotCocoaRunShowcase } from '../../components/home/HotCocoaRunShowcase';
import { HomeServicesSection } from '../../components/home/HomeServicesSection';
import { HomeEthosSection } from '../../components/home/HomeEthosSection';
import { HomeProcessSection } from '../../components/home/HomeProcessSection';
import { HomeOrderSection } from '../../components/home/HomeOrderSection';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { ProjectModal } from '../../components/modals/ProjectModal';
import { GameSpecModal } from '../../components/modals/GameSpecModal';
import { PROJECTS, GAMES } from '../../data/mockData';
import { Project, Game } from '../../types';

/**
 * HomePage - High-level orchestrator composing modular home sections.
 * Strictly adheres to:
 * - Single Responsibility Principle (SRP): Only orchestrates view layout and modal visibility state.
 * - Open/Closed Principle (OCP): New sections or showcases can be added without modifying existing section implementations.
 * - Dependency Inversion Principle (DIP): Relies on extracted presentation components and typed domain entities.
 */
export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const handleOpenProjectModal = (slugOrProject: string | Project) => {
    if (typeof slugOrProject === 'string') {
      const proj = PROJECTS.find((p) => p.slug === slugOrProject) || null;
      setSelectedProject(proj);
    } else {
      setSelectedProject(slugOrProject);
    }
    setIsProjectModalOpen(true);
  };

  const handleOpenGameModal = (gameSlug: string) => {
    const game = GAMES.find((g) => g.slug === gameSlug) || null;
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient Backdrop Glows - Contained strictly within an inset wrapper so they never cause document scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-container/20 via-tertiary/15 to-secondary-container/20 blur-[140px] rounded-full" />
        <div className="absolute top-[800px] -left-20 w-96 h-96 bg-glow-cyan blur-[120px]" />
        <div className="absolute top-[1600px] -right-20 w-96 h-96 bg-glow-purple blur-[120px]" />
      </div>

      {/* SECTION A: HERO */}
      <HomeHero />

      {/* INFINITE KINETIC MARQUEE BANNER (FarTechDev inspired) */}
      <KineticMarquee />

      {/* SECTION B: PROPRIETARY IP (FITLYFE & HOT COCOA RUN) */}
      <section className="w-full px-gutter lg:px-margin py-24 relative" id="products">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <ScrollReveal>
            <SectionHeading
              eyebrow="PROPRIETARY IP"
              title="Built By Us. Designed For The World."
              description="We don't just build client visions—we invent and deploy our own software products, testing and polishing real-world solutions directly."
            />
          </ScrollReveal>

          {/* Product 1: FitLyfe */}
          <ScrollReveal delay={0.08}>
            <FitLyfeShowcase onOpenModal={handleOpenProjectModal} />
          </ScrollReveal>

          {/* Product 2: Hot Cocoa Run */}
          <ScrollReveal delay={0.12}>
            <HotCocoaRunShowcase onOpenModal={handleOpenGameModal} />
          </ScrollReveal>

          {/* View All Products Button */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container text-white font-button-text font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all group"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION C: SERVICES (UNIFIED 6-CARD SHOWCASE) */}
      <ScrollReveal>
        <HomeServicesSection />
      </ScrollReveal>

      {/* SECTION E: ETHOS (MANIFESTO & ARCHITECT DOSSIER) */}
      <ScrollReveal>
        <HomeEthosSection />
      </ScrollReveal>

      {/* SECTION F: PROCESS (4 PHASES) */}
      <ScrollReveal>
        <HomeProcessSection />
      </ScrollReveal>

      {/* SECTION G: CALL TO ACTION & DIRECT ORDER FORM */}
      <ScrollReveal>
        <HomeOrderSection />
      </ScrollReveal>

      {/* Interactive Architecture Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      <GameSpecModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />
    </div>
  );
};
