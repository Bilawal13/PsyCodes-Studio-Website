import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Search,
  Crown,
  Droplets,
  Cpu,
  Eye,
  Smartphone,
  PlusCircle,
  Snowflake,
  Flame,
  Gamepad2,
  ArrowRight,
  Calculator,
  Calendar,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { FITLYFE_TABS, FitLyfeTab } from '../../hooks/useFitLyfeSimulator';

export interface ProjectsFlagshipShowcaseProps {
  onOpenModal: (slug: string) => void;
}

/**
 * ProjectsFlagshipShowcase - In-depth technical architecture showcases for studio flagships.
 * Single Responsibility: Presenting FitLyfe & Hot Cocoa Run engineering telemetry and simulators.
 */
export const ProjectsFlagshipShowcase: React.FC<ProjectsFlagshipShowcaseProps> = ({
  onOpenModal,
}) => {
  const [fitLyfeTab, setFitLyfeTab] = useState<'dashboard' | 'water' | 'calculator' | 'food' | 'history'>('dashboard');

  return (
    <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl flex flex-col gap-space-xl">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* CARD 1: FITLYFE SMART CALORIE PLATFORM */}
        <div className="relative w-full rounded-2xl bg-surface-container-low shadow-xl p-space-lg md:p-space-xl flex flex-col lg:flex-row gap-space-xl items-center border border-border-glass overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" 
            style={{ backgroundImage: `url('/assets/projects/fitlyfe/fitlyfe_wallpaper.jpg')` }} 
          />
          {/* Left: Copy & Specifications */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high border border-border-glass mb-space-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="font-label-badge text-label-badge text-tertiary uppercase font-mono">
                FLAGSHIP MOBILE APP · READY FOR ROLLOUT
              </span>
            </div>
            <div className="flex items-center gap-3.5 sm:gap-4 mb-space-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-surface-container-high border border-border-glass p-1 shrink-0 shadow-lg backdrop-blur-md">
                <img
                  src="/assets/projects/fitlyfe/fitlyfe_logo.jpg"
                  alt="Fit Lyfe Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
                Fit Lyfe: Smart Calorie &amp; Nutrition Tracker
              </h2>
            </div>
            <p className="font-body-md text-body-md text-text-muted mb-space-lg leading-relaxed">
              A feature-rich, privacy-focused mobile application built with Flutter designed to make calorie tracking, macro budgeting, hydration monitoring, and consistency habit building effortless, engaging, and lightning-fast.
            </p>

            {/* 4 Highlight Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md w-full mb-space-lg">
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[15px] leading-[22px] text-text-primary font-semibold">Calorie Ring &amp; Target Window</span>
                  <span className="font-body-sm text-[12px] text-text-muted">±100 kcal streak discipline &amp; macro cards</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Crown className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[15px] leading-[22px] text-text-primary font-semibold">10-Tier Consistency Rank</span>
                  <span className="font-body-sm text-[12px] text-text-muted">Level 0 Rookie 💤 to Level 9 King 👑</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Calculator className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[15px] leading-[22px] text-text-primary font-semibold">Mifflin-St Jeor Engine</span>
                  <span className="font-body-sm text-[12px] text-text-muted">Guided BMR &amp; TDEE deficit pathways</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[15px] leading-[22px] text-text-primary font-semibold">Hydration &amp; Food Database</span>
                  <span className="font-body-sm text-[12px] text-text-muted">Quick-cup water &amp; offline SQLite library</span>
                </div>
              </div>
            </div>

            {/* Stack Badges */}
            <div className="flex flex-wrap items-center gap-space-xs mb-space-lg">
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-primary border border-border-glass/50 font-mono">Flutter &amp; Dart</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-tertiary border border-border-glass/50 font-mono">SQLite Local DB</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-secondary border border-border-glass/50 font-mono">Mifflin-St Jeor</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-amber-400 border border-border-glass/50 font-mono">Android 14+ Alarms</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-text-muted border border-border-glass/50 font-mono">EN / UR / AR RTL</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md">
              <button
                onClick={() => onOpenModal('fitlyfe')}
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text shadow-sm hover:opacity-90 transition-opacity"
              >
                <span>View Architecture Specs</span>
                <Eye className="w-4 h-4" />
              </button>
              <Link
                to="/projects/fitlyfe"
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container font-button-text text-button-text text-text-muted hover:text-text-primary transition-colors border border-border-glass"
              >
                <Smartphone className="w-4 h-4 text-tertiary" />
                <span>Product Deep Dive</span>
              </Link>
            </div>
          </div>

          {/* Right: Interactive Telemetry Simulator Widget */}
          <div className="w-full lg:w-1/2 flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-2xl border border-border-glass">
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-border-glass/40">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-tertiary/70" />
                <span className="font-label-code text-label-code text-text-muted ml-space-xs font-mono">Interactive App Interface</span>
              </div>
              <span className="font-label-badge text-label-badge text-tertiary bg-surface-container px-space-xs py-0.5 rounded border border-border-glass font-mono">
                {FITLYFE_TABS[fitLyfeTab].shortLabel.toUpperCase()}
              </span>
            </div>

            {/* Simulator Tab Switcher */}
            <div className="grid grid-cols-5 gap-1 p-space-xs rounded-lg bg-surface-container mb-space-md border border-border-glass/40">
              {(['dashboard', 'water', 'calculator', 'food', 'history'] as const).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setFitLyfeTab(tabKey)}
                  className={`py-1.5 px-1 rounded font-label-code text-[11px] font-mono transition-all text-center truncate ${
                    fitLyfeTab === tabKey
                      ? 'bg-surface-container-high text-text-primary border border-tertiary/30 shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  title={FITLYFE_TABS[tabKey].name}
                >
                  {FITLYFE_TABS[tabKey].shortLabel}
                </button>
              ))}
            </div>

            {/* Phone Viewport with Real Screen & Telemetry */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-surface-deep/90 p-3 rounded-xl border border-border-glass/60">
              {/* Actual Screenshot Frame */}
              <div className="relative w-44 shrink-0 rounded-lg overflow-hidden border border-border-glass/80 aspect-[9/19] bg-black shadow-lg">
                <img
                  src={FITLYFE_TABS[fitLyfeTab].image}
                  alt={FITLYFE_TABS[fitLyfeTab].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dynamic Live Telemetry Data Corresponding to Real View */}
              <div className="flex-1 w-full flex flex-col gap-2.5 text-left">
                <div className="flex items-center justify-between border-b border-border-glass/40 pb-2">
                  <div>
                    <span className="font-label-badge text-[10px] text-tertiary font-mono uppercase tracking-wider">
                      {FITLYFE_TABS[fitLyfeTab].metricLabel}
                    </span>
                    <h4 className="font-headline-sm text-sm font-bold text-text-primary">
                      {FITLYFE_TABS[fitLyfeTab].metricValue}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary/15 text-tertiary border border-tertiary/30">
                    {FITLYFE_TABS[fitLyfeTab].badgeText}
                  </span>
                </div>

                <p className="font-body-sm text-[12px] text-text-muted leading-relaxed">
                  {FITLYFE_TABS[fitLyfeTab].subheading}
                </p>

                <div className="flex flex-col gap-1.5 pt-1">
                  {FITLYFE_TABS[fitLyfeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-text-primary font-body-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tertiary shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 2: HOT COCOA RUN INDIE GAME */}
        <div className="w-full rounded-2xl bg-surface-container-low shadow-xl p-space-lg md:p-space-xl flex flex-col lg:flex-row-reverse gap-space-xl items-center border border-border-glass">
          {/* Right: Copy & Game Narrative */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high border border-border-glass mb-space-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-badge text-label-badge text-secondary uppercase font-mono">
                INDEPENDENT GAME STUDIO · IN ACTIVE DEVELOPMENT
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight mb-space-sm font-bold">
              Hot Cocoa Run: Sub-Zero Trail Delivery &amp; Thermal Physics
            </h2>
            <p className="font-body-md text-body-md text-text-muted mb-space-lg leading-relaxed">
              Step into the boots of a courageous fox barista navigating harsh sub-zero forest trails to deliver steaming mugs of hot cocoa to shivering woodland creatures. Balance wind drag, thermal decay, and bonfire pit stops before the beverage goes cold.
            </p>

            {/* 4 Highlight Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md w-full mb-space-lg">
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Flame className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] leading-[22px] text-text-primary font-semibold">Thermal Decay Engine</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Dissipation influenced by speed &amp; chills</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Snowflake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] leading-[22px] text-text-primary font-semibold">Arctic Hazard Routing</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Tactical blizzard shelter timing</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Flame className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] leading-[22px] text-text-primary font-semibold">Campfire Checkpoints</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Reheat cocoa vessels &amp; earn winter perks</span>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest border border-border-glass/40">
                <Activity className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] leading-[22px] text-text-primary font-semibold">Lo-Fi Acoustic Ambiance</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Adaptive audio reacting to cold front</span>
                </div>
              </div>
            </div>

            {/* Stack Badges */}
            <div className="flex flex-wrap items-center gap-space-xs mb-space-lg">
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-secondary border border-border-glass/50 font-mono">Unity 6 Engine</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-secondary border border-border-glass/50 font-mono">C# Architecture</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-primary border border-border-glass/50 font-mono">URP 2D Pipeline</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-tertiary border border-border-glass/50 font-mono">Custom Shader Graph</span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container font-label-code text-label-code text-on-surface-variant border border-border-glass/50 font-mono">WebGL 2.0 Staging</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md">
              <button
                onClick={() => onOpenModal('hot-cocoa-run')}
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-button-text text-button-text shadow-sm hover:opacity-90 transition-opacity"
              >
                <span>Game Mechanics Dossier</span>
                <Eye className="w-4 h-4" />
              </button>
              <Link
                to="/arcade"
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-text-primary font-button-text text-button-text hover:bg-surface-container-high transition-colors border border-border-glass"
              >
                <span>Arcade Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Left: Game Frame Staging Visual */}
          <div className="w-full lg:w-1/2 flex flex-col rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl relative border border-border-glass">
            {/* Virtual Viewport Header */}
            <div className="flex items-center justify-between p-space-sm bg-surface-container-low border-b border-border-glass/40">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="font-label-code text-label-code text-text-muted font-mono">Interactive WebGL Preview · 60 FPS</span>
              </div>
              <span className="font-label-badge text-label-badge text-on-surface-variant font-mono">ACTIVE DEV BUILD</span>
            </div>

            {/* Game Canvas Mockup */}
            <div
              className="relative w-full h-80 bg-cover bg-center flex flex-col justify-between p-space-md overflow-hidden"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfBVoDI4IhMWSMJmMTbKjKjKyYXUYJ1OawDDjvLlDrS1dWweimbhTTb86WUZlac_5MkFLRdoWEbrGL7mWnW3LAj_r0JvkuTQBOjL_zslhapV1SJkGZQ87vK8W0GtwIg5NimWcmouM7RaFwKVIUW6IFGTrRBW9CDZjy1m-DPW-N8sqKeCMEK35RDd3ckkrSLla5a8tI1ULvOhzzP_b17CjSNUNSVxUpR4dZREmn51k')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-transparent to-surface-deep/40 pointer-events-none" />

              {/* In-Game HUD Elements */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-border-glass">
                  <Flame className="w-4 h-4 text-error" />
                  <span className="font-label-code text-label-code text-text-primary font-mono">COCOA TEMP: 78°C</span>
                </div>
                <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-border-glass">
                  <Snowflake className="w-4 h-4 text-tertiary" />
                  <span className="font-label-code text-label-code text-tertiary font-mono">BLIZZARD: -24°C</span>
                </div>
              </div>

              {/* In-Game Target Prompt */}
              <div className="relative z-10 flex items-end justify-between w-full">
                <div className="flex flex-col gap-1 p-space-sm rounded bg-surface-container-lowest/85 backdrop-blur-md max-w-xs text-left border border-border-glass">
                  <span className="font-label-badge text-label-badge text-secondary font-mono">DELIVERY MISSION #04</span>
                  <span className="font-headline-sm text-[15px] font-semibold text-text-primary">Cabin 09: Hibernating Bear Den</span>
                  <span className="font-body-sm text-[12px] text-text-muted">Distance remaining: 180m · Wind Gust: 42 km/h</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Staging Frame Metrics */}
            <div className="grid grid-cols-3 p-space-sm bg-surface-container-low text-center border-t border-border-glass/40 font-mono">
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-text-muted">PERFORMANCE</span>
                <span className="font-label-code text-label-code text-text-primary font-bold">Smooth 60 FPS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-text-muted">PHYSICS TICK</span>
                <span className="font-label-code text-label-code text-tertiary font-bold">50.0 Hz</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-text-muted">GRAPHICS</span>
                <span className="font-label-code text-label-code text-primary font-bold">Optimized 2D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
