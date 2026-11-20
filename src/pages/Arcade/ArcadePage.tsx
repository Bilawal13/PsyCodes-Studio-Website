import React, { useState } from 'react';
import { GAMES } from '../../data/mockData';
import { Game } from '../../types';
import { GameSpecModal } from '../../components/modals/GameSpecModal';
import { EarlyAccessModal } from '../../components/modals/EarlyAccessModal';
import { ArcadeHero } from '../../components/arcade/ArcadeHero';
import { FlagshipCabinet } from '../../components/arcade/FlagshipCabinet';
import { UpcomingCabinets } from '../../components/arcade/UpcomingCabinets';
import { CallToActionStrip } from '../../components/common/CallToActionStrip';
import { ScrollReveal } from '../../components/common/ScrollReveal';

/**
 * ArcadePage - High-level orchestrator for the browser gaming portal.
 * Strictly adheres to SOLID principles:
 * - Single Responsibility Principle (SRP): Coordinates arcade view layout and active game modal state.
 * - Open/Closed Principle (OCP): New WebGL titles and simulation viewports integrate modularly.
 * - Dependency Inversion Principle (DIP): Relies on extracted presentation components and typed game models.
 */
export const ArcadePage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  const flagshipGame = GAMES[0]; // Hot Cocoa Run

  const handleOpenSpec = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleOpenEarlyAccess = (game: Game) => {
    setSelectedGame(game);
    setIsEarlyAccessOpen(true);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient Prismatic Backdrop Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-r from-primary-container/20 via-tertiary/15 to-secondary-container/20 blur-[130px] rounded-full" />
        <div className="absolute -top-12 right-10 w-96 h-96 bg-glow-cyan blur-[110px]" />
      </div>

      {/* Section A: Arcade Portal Hero */}
      <ArcadeHero />

      {/* Section B: Flagship Title in Development — "Hot Cocoa Run" */}
      {flagshipGame && (
        <ScrollReveal>
          <FlagshipCabinet
            game={flagshipGame}
            onOpenSpec={handleOpenSpec}
            onPlayClick={handleOpenEarlyAccess}
          />
        </ScrollReveal>
      )}

      {/* Section C: More Cabinets in Development (Balloon Popper & Coming Soon Portal) */}
      <ScrollReveal>
        <UpcomingCabinets onOpenSpec={handleOpenSpec} />
      </ScrollReveal>

      {/* Section D: Game Commission CTA */}
      <ScrollReveal>
        <CallToActionStrip
          eyebrow="COMMISSION A GAME"
          title="Want To Build A Custom 2D Or 3D Game?"
          description="We engineer bespoke games in Unity 6, WebGL, and mobile frameworks with responsive tactile game feel, custom shaders, and cross-platform deployment."
          primaryButtonText="Commission Game Project"
          primaryButtonLink="/contact?service=Game+Development&ref=Custom+Game+Build"
          secondaryButtonText="Explore Studio Services"
          secondaryButtonLink="/services"
        />
      </ScrollReveal>

      {/* Game Spec Modal */}
      <GameSpecModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Early Access Status & Playtest Modal */}
      <EarlyAccessModal
        game={selectedGame}
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        onOpenSpec={handleOpenSpec}
      />
    </div>
  );
};
