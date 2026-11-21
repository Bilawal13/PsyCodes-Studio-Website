/**
 * Category-specific timeline and scope configurations.
 * Ensures delivery timelines are realistic and context-aware.
 */

export interface PricingOption {
  value: string;
  label: string;
}

export interface TimelineOption {
  value: string;
  label: string;
}

export interface CategoryPricingConfig {
  id: string;
  matchPatterns: string[];
  displayName: string;
  shortName: string;
  budgets: PricingOption[];
  timelines: TimelineOption[];
  defaultBudget: string;
  defaultTimeline: string;
}

export const CATEGORY_PRICING_CONFIGS: CategoryPricingConfig[] = [
  {
    id: 'video',
    matchPatterns: ['video', 'ad', 'commercial', 'reel', 'tiktok', 'motion'],
    displayName: 'AI Commercials & Product Video Ads',
    shortName: 'AI Video Ads',
    budgets: [
      { value: '$49.99 - $150', label: '$49.99 — $150 (Starter Reel / TikTok Ad)' },
      { value: '$150 - $499', label: '$150 — $499 (Multi-Format Video Campaign)' },
      { value: '$500 - $1,200', label: '$500 — $1,200 (Complete Brand Video Suite)' },
      { value: '$1,200 - $2,000+', label: '$1,200 — $2,000+ (Enterprise Commercial Series)' },
    ],
    timelines: [
      { value: '1-3 Days (Quick Turnaround)', label: '1–3 Days (Quick Turnaround)' },
      { value: '1-2 Weeks (Full Campaign)', label: '1–2 Weeks (Full Campaign)' },
      { value: '3+ Weeks (Enterprise Series)', label: '3+ Weeks (Enterprise Series)' },
    ],
    defaultBudget: '$49.99 - $150',
    defaultTimeline: '1-3 Days (Quick Turnaround)',
  },
  {
    id: 'mobile',
    matchPatterns: ['mobile', 'ios', 'android', 'flutter', 'fitlyfe'],
    displayName: 'Mobile App Development (iOS & Android)',
    shortName: 'Mobile App',
    budgets: [
      { value: '$150 - $399', label: '$150 — $399 (Rapid MVP Prototype)' },
      { value: '$400 - $850', label: '$400 — $850 (Standard Mobile App)' },
      { value: '$850 - $1,800', label: '$850 — $1,800 (Full Production App with Backend)' },
      { value: '$2,000+', label: '$2,000+ (Enterprise Mobile Ecosystem)' },
    ],
    timelines: [
      { value: '2-4 Weeks (Fast MVP)', label: '2–4 Weeks (Fast MVP Prototype)' },
      { value: '1-2 Months (Standard Launch)', label: '1–2 Months (Standard Launch)' },
      { value: '3+ Months (Comprehensive Architecture)', label: '3+ Months (Comprehensive Build)' },
    ],
    defaultBudget: '$400 - $850',
    defaultTimeline: '1-2 Months (Standard Launch)',
  },
  {
    id: 'web',
    matchPatterns: ['web', 'cloud', 'saas', 'pulse', 'platform', 'full-stack'],
    displayName: 'Web & Cloud Platforms (SaaS & Web Apps)',
    shortName: 'Web & SaaS',
    budgets: [
      { value: '$99 - $250', label: '$99 — $250 (Landing Page / Web Prototype)' },
      { value: '$250 - $650', label: '$250 — $650 (Standard Business Web App)' },
      { value: '$650 - $1,500', label: '$650 — $1,500 (Full Production SaaS Platform)' },
      { value: '$1,500 - $2,000+', label: '$1,500 — $2,000+ (Enterprise Cloud Infrastructure)' },
    ],
    timelines: [
      { value: '1-2 Weeks (Fast Landing / MVP)', label: '1–2 Weeks (Fast Landing / MVP)' },
      { value: '3-5 Weeks (Full Web App)', label: '3–5 Weeks (Full Web App)' },
      { value: '2+ Months (Enterprise SaaS)', label: '2+ Months (Enterprise SaaS Platform)' },
    ],
    defaultBudget: '$250 - $650',
    defaultTimeline: '3-5 Weeks (Full Web App)',
  },
  {
    id: 'game',
    matchPatterns: ['game', 'arcade', 'cocoa', 'interactive', 'unity', 'webgl'],
    displayName: 'Game Development & Interactive Experiences',
    shortName: 'Game Development',
    budgets: [
      { value: '$199 - $450', label: '$199 — $450 (Playable Game Prototype / WebGL)' },
      { value: '$450 - $950', label: '$450 — $950 (Complete 2D/3D Indie Game)' },
      { value: '$950 - $1,800', label: '$950 — $1,800 (Multi-Level Commercial Game)' },
      { value: '$2,000+', label: '$2,000+ (Enterprise / Full Commercial Title)' },
    ],
    timelines: [
      { value: '2-4 Weeks (Playable Prototype)', label: '2–4 Weeks (Playable Prototype)' },
      { value: '1-2 Months (Complete Indie Game)', label: '1–2 Months (Complete Indie Game)' },
      { value: '3+ Months (Commercial Release)', label: '3+ Months (Commercial Release)' },
    ],
    defaultBudget: '$450 - $950',
    defaultTimeline: '1-2 Months (Complete Indie Game)',
  },
  {
    id: 'ai',
    matchPatterns: ['ai', 'agent', 'automation', 'intelligence', 'llm', 'smart'],
    displayName: 'AI Solutions & Workflow Automation',
    shortName: 'AI & Automation',
    budgets: [
      { value: '$99 - $299', label: '$99 — $299 (Starter AI Assistant / Chatbot)' },
      { value: '$300 - $750', label: '$300 — $750 (Smart Automation & Knowledge Pipeline)' },
      { value: '$750 - $1,600', label: '$750 — $1,600 (Custom Multi-Agent AI System)' },
      { value: '$1,600 - $2,000+', label: '$1,600 — $2,000+ (Enterprise Autonomous AI Infrastructure)' },
    ],
    timelines: [
      { value: '1-2 Weeks (Starter Assistant / Bot)', label: '1–2 Weeks (Starter Assistant / Bot)' },
      { value: '3-4 Weeks (Smart Knowledge Pipeline)', label: '3–4 Weeks (Smart Knowledge Pipeline)' },
      { value: '2+ Months (Enterprise Autonomous System)', label: '2+ Months (Enterprise System)' },
    ],
    defaultBudget: '$300 - $750',
    defaultTimeline: '3-4 Weeks (Smart Knowledge Pipeline)',
  },
  {
    id: 'design',
    matchPatterns: ['design', 'ui', 'ux', 'token', 'prototype', 'branding', 'figma'],
    displayName: 'UI/UX Design Systems & Micro-Interactions',
    shortName: 'UI/UX & Branding',
    budgets: [
      { value: '$79 - $199', label: '$79 — $199 (Starter Branding & UI Mockups)' },
      { value: '$200 - $550', label: '$200 — $550 (Complete App / Web Design System)' },
      { value: '$550 - $1,200', label: '$550 — $1,200 (Interactive Clickable Prototype & Tokens)' },
      { value: '$1,200 - $2,000+', label: '$1,200 — $2,000+ (Enterprise Design System & Motion)' },
    ],
    timelines: [
      { value: '3-5 Days (Starter Mockup / Branding)', label: '3–5 Days (Starter Mockup / Branding)' },
      { value: '1-2 Weeks (Full Design System)', label: '1–2 Weeks (Full Design System)' },
      { value: '3-4 Weeks (Enterprise Interactive System)', label: '3–4 Weeks (Enterprise System)' },
    ],
    defaultBudget: '$200 - $550',
    defaultTimeline: '1-2 Weeks (Full Design System)',
  },
  {
    id: 'architecture',
    matchPatterns: ['architecture', 'engineering', 'audit', 'infrastructure', 'backend'],
    displayName: 'Custom Technical Architecture & Engineering',
    shortName: 'Technical Architecture',
    budgets: [
      { value: '$250 - $750', label: '$250 — $750 (Architecture Audit & Blueprint)' },
      { value: '$750 - $1,500', label: '$750 — $1,500 (Core Infrastructure & API Engine)' },
      { value: '$1,500 - $2,000+', label: '$1,500 — $2,000+ (Full-Scale Enterprise Engineering)' },
    ],
    timelines: [
      { value: '1-2 Weeks (Audit & Technical Blueprint)', label: '1–2 Weeks (Audit & Blueprint)' },
      { value: '3-5 Weeks (Core Infrastructure Deployment)', label: '3–5 Weeks (Infrastructure Deployment)' },
      { value: '2+ Months (Enterprise Architecture)', label: '2+ Months (Enterprise Architecture)' },
    ],
    defaultBudget: '$750 - $1,500',
    defaultTimeline: '3-5 Weeks (Core Infrastructure Deployment)',
  },
];

/**
 * Finds the matching category configuration based on category name, slug, or search term.
 */
export function getCategoryPricing(categoryNameOrId: string): CategoryPricingConfig {
  const normalized = (categoryNameOrId || '').toLowerCase().trim();
  
  const found = CATEGORY_PRICING_CONFIGS.find((cfg) =>
    cfg.id === normalized ||
    cfg.displayName.toLowerCase() === normalized ||
    cfg.matchPatterns.some((pattern) => normalized.includes(pattern))
  );

  return found || CATEGORY_PRICING_CONFIGS[1]; // Fallback to mobile app
}
