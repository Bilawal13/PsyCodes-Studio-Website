import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Search, 
  Crown, 
  Droplets, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export interface FitLyfeShowcaseProps {
  onOpenModal: (projectSlug: string) => void;
}

/**
 * FitLyfeShowcase - Proprietary mobile health & fitness product showcase for the Home page.
 * Single Responsibility: Presenting FitLyfe product vision, core features, and architecture highlights.
 * UI screens are reserved exclusively for the dedicated Products page.
 */
export const FitLyfeShowcase: React.FC<FitLyfeShowcaseProps> = ({ onOpenModal }) => {
  return (
    <div className="relative bg-surface-deep/80 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden border border-border-glass">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
        style={{ backgroundImage: `url('/assets/projects/fitlyfe/fitlyfe_wallpaper.jpg')` }} 
      />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-tertiary/10 blur-[100px] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Product Information & Core Highlights */}
        <div className="lg:col-span-6 flex flex-col gap-5 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-badge text-label-badge uppercase tracking-wider flex items-center gap-1.5 border border-tertiary/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Flagship Mobile App · Android &amp; iOS
            </span>
            <span className="font-label-code text-[12px] text-text-muted font-mono">Flutter · Dart · Local SQLite</span>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-surface-container-high border border-border-glass p-1 shrink-0 shadow-xl backdrop-blur-md">
              <img
                src="/assets/projects/fitlyfe/fitlyfe_logo.jpg"
                alt="Fit Lyfe Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight">
                Fit Lyfe
              </h3>
              <span className="text-tertiary font-normal text-headline-sm block">
                Smart Calorie &amp; Nutrition Tracker
              </span>
            </div>
          </div>

          <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
            A feature-rich, privacy-focused mobile application designed to make calorie tracking, macro budgeting, hydration monitoring, and daily consistency effortless, engaging, and lightning-fast.
          </p>
          
          {/* Feature Highlight Grid (4 pillars) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-high/60 border border-border-glass shadow-sm">
              <Cpu className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div>
                <div className="font-button-text text-button-text text-text-primary">Calorie Ring &amp; Target Window</div>
                <div className="font-body-sm text-[12px] text-text-muted">Dynamic balance &amp; macro breakdown</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-high/60 border border-border-glass shadow-sm">
              <Crown className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="font-button-text text-button-text text-text-primary">10-Tier Consistency Rank</div>
                <div className="font-body-sm text-[12px] text-text-muted">Rookie 💤 to Fit Lyfe King 👑 roadmap</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-high/60 border border-border-glass shadow-sm">
              <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-button-text text-button-text text-text-primary">Hydration &amp; MET Workouts</div>
                <div className="font-body-sm text-[12px] text-text-muted">Quick-cup water &amp; calorie burn energy</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-high/60 border border-border-glass shadow-sm">
              <Search className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div>
                <div className="font-button-text text-button-text text-text-primary">Offline Food Library &amp; History</div>
                <div className="font-body-sm text-[12px] text-text-muted">Sub-second search &amp; 2-hour undo archive</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-3 flex-wrap">
            <button
              onClick={() => onOpenModal('fitlyfe')}
              className="px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-button-text text-button-text shadow-md transition-all flex items-center gap-2"
            >
              <span>View Product Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm px-3 py-2 rounded bg-surface-container-high border border-border-glass">
              <Layers className="w-4 h-4 text-tertiary" />
              <span>English · Urdu · Arabic RTL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Product Showcase Canvas with Central FitLyfe Logo Emblem */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative rounded-2xl min-h-[300px] sm:min-h-[350px] md:min-h-[380px] w-full flex items-center justify-center bg-surface-deep/80 backdrop-blur-2xl border border-border-glass shadow-[0_20px_50px_rgba(8,13,32,0.8)] overflow-hidden">
            {/* Glowing backdrop circle */}
            <div className="absolute w-44 h-44 rounded-full bg-tertiary/20 blur-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Cybernetic Tech Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.14] pointer-events-none" 
              style={{
                backgroundImage: `radial-gradient(circle, rgba(24,217,246,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(37,139,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,139,255,0.08) 1px, transparent 1px)`,
                backgroundSize: '24px 24px, 24px 24px, 24px 24px'
              }}
            />

            {/* Floating Top Left Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-20">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-deep/80 backdrop-blur-md border border-border-glass text-[10px] font-mono text-cyan-400 font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>FITLYFE CORE</span>
              </div>
            </div>

            {/* Central Emblem & Brand Identity Logo */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-20 sm:pt-10 sm:pb-24 px-4 text-center">
              <div className="relative group/logo cursor-pointer" onClick={() => onOpenModal('fitlyfe')}>
                {/* Glowing back-layer */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-400/25 via-primary/20 to-purple-500/25 blur-xl opacity-75 group-hover/logo:opacity-100 transition-opacity duration-500 animate-pulse" />
                <img
                  src="/assets/projects/fitlyfe/fitlyfe_logo.jpg"
                  alt="Fit Lyfe Official Logo"
                  className="h-24 sm:h-28 md:h-32 w-auto object-contain rounded-2xl relative z-10 drop-shadow-[0_0_35px_rgba(24,217,246,0.4)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transform group-hover/logo:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Status Telemetry Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-t from-surface-deep/95 via-surface-deep/85 to-transparent flex items-center justify-between border-t border-border-glass/40 text-left">
              <div className="min-w-0 pr-2">
                <p className="font-headline-sm text-sm sm:text-base font-bold text-text-primary tracking-tight flex items-center gap-2 truncate">
                  <span>Fit Lyfe Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tertiary/10 text-tertiary border border-tertiary/20 font-normal shrink-0">
                    READY FOR ROLLOUT
                  </span>
                </p>
                <p className="font-label-badge text-[10px] sm:text-[11px] text-text-muted font-mono mt-0.5 truncate">
                  Smart Calorie &amp; Nutrition Tracker · Flutter &amp; SQLite
                </p>
              </div>
              <button
                onClick={() => onOpenModal('fitlyfe')}
                className="p-2 rounded-lg bg-surface-container-high/80 border border-border-glass text-cyan-400 hover:text-white transition-colors shrink-0"
                title="View Product Breakdown"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Badges (Matches Hot Cocoa Run on Home Page) */}
          <div className="grid grid-cols-3 gap-3 mt-4 text-left">
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-tertiary block uppercase font-mono">Storage</span>
              <span className="font-body-sm text-[13px] font-semibold text-text-primary">100% Offline SQLite</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-tertiary block uppercase font-mono">Localization</span>
              <span className="font-body-sm text-[13px] font-semibold text-text-primary">English · Urdu · Arabic</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center shadow-sm border border-border-glass">
              <span className="font-label-badge text-[10px] text-tertiary block uppercase font-mono">UI Screens</span>
              <Link 
                to="/projects" 
                className="font-body-sm text-[13px] font-semibold text-tertiary hover:text-cyan-300 flex items-center justify-center gap-1 group/link"
              >
                <span>View on Products</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
