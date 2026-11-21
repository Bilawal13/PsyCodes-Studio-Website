import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Copy, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useSprintCalculator, CalculatorDiscipline, CalculatorTier } from '../../hooks/useSprintCalculator';

const DISCIPLINES: { id: CalculatorDiscipline; title: string; sub: string; badge?: string }[] = [
  { id: 'video', title: 'AI Videos & Ads', sub: 'TikTok, Reels & 4K', badge: 'Fast Delivery' },
  { id: 'mobile', title: 'Mobile App', sub: 'iOS & Android' },
  { id: 'web', title: 'Website / Web App', sub: 'Fast & Modern' },
  { id: 'ai', title: 'AI & Automation', sub: 'Smart Assistants' },
  { id: 'game', title: 'Game Development', sub: '2D/3D & Interactive' },
  { id: 'saas', title: 'Cloud / SaaS', sub: 'Online Business' },
  { id: 'design', title: 'UI/UX & Branding', sub: 'Figma & Mockups' },
];

const TIERS: { id: CalculatorTier; title: string; sub: string }[] = [
  { id: 'mvp', title: 'Starter / MVP', sub: 'Fast Proof & Validation' },
  { id: 'prod', title: 'Complete Build', sub: 'Full Production Features' },
  { id: 'enterprise', title: 'Scale & Enterprise', sub: 'Enterprise Architecture' },
];

const TIER_BADGES: Record<CalculatorDiscipline, Record<CalculatorTier, string>> = {
  video: {
    mvp: 'Fast Delivery',
    prod: 'Campaign Suite',
    enterprise: 'Brand Series',
  },
  mobile: {
    mvp: 'Rapid MVP',
    prod: 'Store Ready',
    enterprise: 'Full Ecosystem',
  },
  web: {
    mvp: 'Landing / MVP',
    prod: 'Full Web App',
    enterprise: 'Scale Platform',
  },
  ai: {
    mvp: 'Smart Assistant',
    prod: 'Automation Suite',
    enterprise: 'Autonomous',
  },
  game: {
    mvp: 'Playable Alpha',
    prod: 'Full Indie Game',
    enterprise: 'Commercial Title',
  },
  saas: {
    mvp: 'Core MVP',
    prod: 'Complete SaaS',
    enterprise: 'Enterprise Cloud',
  },
  design: {
    mvp: 'Starter Branding',
    prod: 'Full Design System',
    enterprise: 'Design & Motion',
  },
};

/**
 * SprintCalculator - Interactive project scope and timeline estimator.
 * Single Responsibility: Interactive parameter controls and real-time deliverables calculation with flexible sprint estimations.
 */
export const SprintCalculator: React.FC = () => {
  const {
    calcDiscipline,
    setCalcDiscipline,
    calcTier,
    setCalcTier,
    addonCi,
    setAddonCi,
    addonTelemetry,
    setAddonTelemetry,
    addonSecurity,
    setAddonSecurity,
    calcResults,
  } = useSprintCalculator();

  const [copied, setCopied] = useState(false);

  // Height animation for the Scope Estimate card:
  // Calculated strictly on tag selection change, with zero feedback loop.
  const contentRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  // Measure content natural height ONLY when user selects a different tag or option
  useEffect(() => {
    if (contentRef.current) {
      const measured = contentRef.current.offsetHeight + 2; // +2px for border
      setCardHeight(measured);
    }
  }, [calcDiscipline, calcTier, addonCi, addonTelemetry, addonSecurity]);

  // Handle responsive window resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setCardHeight(contentRef.current.offsetHeight + 2);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopySpec = () => {
    const text = 
      `PsyCodes Studio — Project Estimate Summary\n` +
      `------------------------------------------\n` +
      `Project Service: ${calcResults.disciplineLabel} (${calcResults.refId})\n` +
      `Package Tier: ${calcResults.tierLabel}\n` +
      `Estimated Timeline: ${calcResults.timeline}\n` +
      `Estimated Investment: ${calcResults.budgetEstimate}\n` +
      `Included Deliverables:\n` +
      calcResults.artifacts.map((a) => ` • ${a}`).join('\n') + `\n` +
      `------------------------------------------\n` +
      `Inquire directly at https://psycodes.studio/services`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="max-w-6xl mx-auto px-gutter lg:px-margin my-20 w-full">
      {/* Outer Calculator Box: Stable min-height prevents the main card from bouncing or resizing */}
      <div className="rounded-3xl bg-surface-container-low p-6 sm:p-10 border border-border-glass shadow-xl relative overflow-hidden min-h-[660px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>FLEXIBLE SPRINT ESTIMATION · TAILORED TO YOUR BUDGET</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Estimate Your Project in Seconds
            </h2>
            <p className="text-sm text-text-muted mt-1 max-w-xl">
              From high-impact AI video ads and rapid prototypes to full mobile apps and scalable enterprise platforms — estimated to fit your goals.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-deep px-3.5 py-1.5 rounded-full border border-border-glass text-xs text-text-primary self-start md:self-auto font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold font-mono">CUSTOM SPRINT ESTIMATES</span>
          </div>
        </div>

        {/* 2-Column Layout: items-start keeps left controls rock-solid while right card animates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          
          {/* Controls (7 cols): Completely stable height & non-overlapping tags */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Step 1: Discipline */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2.5 uppercase tracking-wide">
                1. What would you like to build?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {DISCIPLINES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setCalcDiscipline(d.id)}
                    className={`relative flex flex-col justify-between p-3 rounded-xl text-left transition-all duration-200 border min-h-[92px] w-full group cursor-pointer ${
                      calcDiscipline === d.id
                        ? 'bg-surface-deep border-tertiary shadow-[0_0_16px_rgba(24,217,246,0.18)] ring-1 ring-tertiary/40 z-10'
                        : 'bg-surface-container/80 border-border-glass hover:bg-surface-deep/90 hover:border-border-glass/80'
                    }`}
                  >
                    {/* Dedicated Top Micro-Row: Never overlaps title or borders */}
                    <div className="w-full flex items-center justify-between min-h-[20px] mb-1">
                      {d.badge ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9.5px] font-mono font-bold border border-emerald-500/30 whitespace-nowrap leading-none shadow-sm">
                          {d.badge}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high/50 text-text-muted/60 text-[9px] font-mono leading-none">
                          STANDARD
                        </span>
                      )}
                    </div>

                    {/* Clean Title and Subtitle Block */}
                    <div className="w-full flex flex-col justify-end">
                      <span className={`block font-bold text-[12.5px] leading-snug transition-colors ${
                        calcDiscipline === d.id ? 'text-text-primary' : 'text-text-primary/90 group-hover:text-text-primary'
                      }`}>
                        {d.title}
                      </span>
                      <span className={`block text-[10.5px] leading-tight mt-1 transition-colors ${
                        calcDiscipline === d.id ? 'text-tertiary font-medium' : 'text-text-muted'
                      }`}>
                        {d.sub}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2.5 uppercase tracking-wide">
                2. What scale do you need?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCalcTier(t.id)}
                    className={`relative flex flex-col justify-between p-3.5 rounded-xl text-left transition-all duration-200 border min-h-[92px] w-full group cursor-pointer ${
                      calcTier === t.id
                        ? 'bg-surface-deep border-tertiary shadow-[0_0_16px_rgba(24,217,246,0.18)] ring-1 ring-tertiary/40 z-10'
                        : 'bg-surface-container/80 border-border-glass hover:bg-surface-deep/90 hover:border-border-glass/80'
                    }`}
                  >
                    {/* Dedicated Top Micro-Row */}
                    <div className="w-full flex items-center justify-between min-h-[20px] mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[9.5px] font-mono font-bold border border-emerald-500/30 whitespace-nowrap leading-none shadow-sm">
                        {TIER_BADGES[calcDiscipline]?.[t.id]}
                      </span>
                    </div>

                    <div className="w-full flex flex-col justify-end">
                      <span className={`block font-bold text-[13px] leading-snug transition-colors ${
                        calcTier === t.id ? 'text-text-primary' : 'text-text-primary/90 group-hover:text-text-primary'
                      }`}>
                        {t.title}
                      </span>
                      <span className={`block text-[11px] leading-tight mt-1 transition-colors ${
                        calcTier === t.id ? 'text-tertiary font-medium' : 'text-text-muted'
                      }`}>
                        {t.sub}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Helpful Add-ons */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2.5 uppercase tracking-wide">
                3. Helpful Extras:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-deep border border-border-glass cursor-pointer text-xs hover:border-tertiary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={addonCi}
                    onChange={(e) => setAddonCi(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container border-border-glass text-primary focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-text-primary block">Automated Testing</span>
                    <span className="text-[10px] text-text-muted">Prevents errors</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-deep border border-border-glass cursor-pointer text-xs hover:border-tertiary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={addonTelemetry}
                    onChange={(e) => setAddonTelemetry(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container border-border-glass text-primary focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-text-primary block">Live Monitoring</span>
                    <span className="text-[10px] text-text-muted">Bug alerts</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-deep border border-border-glass cursor-pointer text-xs hover:border-tertiary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={addonSecurity}
                    onChange={(e) => setAddonSecurity(e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-container border-border-glass text-primary focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-text-primary block">Extra Security</span>
                    <span className="text-[10px] text-text-muted">Data protection</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Scope Estimate Card (5 cols): Resizes smoothly and snappily when different tags are clicked */}
          <div
            className="lg:col-span-5 rounded-2xl bg-surface-deep border border-border-glass shadow-xl relative overflow-hidden transition-[height] duration-300 ease-out"
            style={{
              height: cardHeight ? `${cardHeight}px` : 'auto',
            }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Inner Content Wrapper: Holds natural content height without h-full constraints */}
            <div ref={contentRef} className="p-6 sm:p-7 flex flex-col justify-between relative z-10">
              
              <div>
                <div className="flex items-center justify-between border-b border-border-glass pb-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    PROJECT SCOPE ESTIMATE
                  </span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold font-mono">
                    {calcResults.refId}
                  </span>
                </div>

                {/* Dual-Metrics Display */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-border-glass">
                    <span className="text-[11px] text-text-muted block uppercase font-medium">Estimated Time</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-2xl font-extrabold text-text-primary">{calcResults.timeline}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-border-glass">
                    <span className="text-[11px] text-emerald-400 block uppercase font-semibold font-mono">Budget Model</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-base sm:text-lg font-bold text-text-primary">{calcResults.budgetEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Package Type Tag */}
                <div className="p-2.5 rounded-lg bg-surface-container/70 border border-border-glass/40 mb-4">
                  <span className="text-[11px] font-semibold text-tertiary block">{calcResults.disciplineLabel}</span>
                  <span className="text-[11px] text-text-muted block mt-0.5">{calcResults.tierLabel}</span>
                </div>

                {/* Included Deliverables & Benefits: Dynamically expands with snappy entrance */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wide">
                      What is included in this package:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-semibold border border-emerald-500/20">
                      {calcResults.artifacts.length} Benefits Included
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-text-primary">
                    {calcResults.artifacts.map((art, idx) => (
                      <li
                        key={`${calcResults.refId}-${idx}`}
                        className="flex items-start gap-2 animate-in fade-in duration-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-border-glass flex flex-col gap-2.5 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-muted">Intellectual Property:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Client Owned</span>
                  </span>
                </div>

                <Link
                  to={calcResults.inquiryUrl}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 text-xs font-bold text-center shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_28px_rgba(0,242,254,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Discuss This Package With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleCopySpec}
                  className="w-full py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-glass text-xs text-text-muted hover:text-text-primary transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Estimate Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Package Summary</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
