import { useState, useMemo } from 'react';

export type CalculatorDiscipline = 'video' | 'mobile' | 'web' | 'ai' | 'game' | 'saas' | 'design';
export type CalculatorTier = 'mvp' | 'prod' | 'enterprise';

export interface CalculatorResult {
  timeline: string;
  budgetEstimate: string;
  refId: string;
  disciplineLabel: string;
  tierLabel: string;
  artifacts: string[];
  inquiryUrl: string;
}

/**
 * useSprintCalculator - Encapsulates sprint duration, scope tier, and deliverable artifact estimation.
 * Tailored to match client needs and flexible budgets without rigid pricing locks.
 */
export function useSprintCalculator() {
  const [calcDiscipline, setCalcDiscipline] = useState<CalculatorDiscipline>('video');
  const [calcTier, setCalcTier] = useState<CalculatorTier>('mvp');
  const [addonCi, setAddonCi] = useState(true);
  const [addonTelemetry, setAddonTelemetry] = useState(false);
  const [addonSecurity, setAddonSecurity] = useState(false);

  const calcResults: CalculatorResult = useMemo(() => {
    let timeline = '1–2 Days';
    let budgetEstimate = 'Flexible / Single Reel';
    let refId = 'PSC-VID-099';
    let disciplineLabel = 'AI Video Ads & Commercials';
    let tierLabel = 'Single Viral Ad Reel';
    
    let artifacts: string[] = [];

    // Friendly discipline deliverables
    switch (calcDiscipline) {
      case 'video':
        refId = 'PSC-VID-099';
        disciplineLabel = 'AI Commercials & Product Video Ads';
        if (calcTier === 'mvp') {
          timeline = '1–2 Days';
          budgetEstimate = 'Flexible / Single Reel';
          tierLabel = 'Single Viral Ad Reel';
          artifacts = [
            '1 High-converting AI product video ad (vertical 9:16 for TikTok/Reels/Shorts)',
            'Photorealistic AI product animation, dynamic motion & dramatic lighting',
            'Studio-grade AI voiceover in your choice of accent + background music',
          ];
        } else if (calcTier === 'prod') {
          timeline = '3–5 Days';
          budgetEstimate = 'Flexible / Campaign Suite';
          tierLabel = 'Complete Video Ad Campaign';
          artifacts = [
            '3 to 5 multi-format video ads (9:16 vertical, 16:9 widescreen, 1:1 square)',
            'Hook variations and A/B test variations to maximize ad conversion',
            'Full commercial licensing, sound effects, subtitles & high-res 4K renders',
          ];
        } else {
          timeline = '1–2 Weeks';
          budgetEstimate = 'Flexible / Brand Suite';
          tierLabel = 'Enterprise Commercial Brand Suite';
          artifacts = [
            'Full suite of 10+ cinematic commercial ads and product showcase videos',
            'Custom AI character avatars, realistic product 3D modeling, and branding',
            'Dedicated video producer, unlimited revisions, and multi-language versions',
          ];
        }
        break;

      case 'mobile':
        refId = 'PSC-MOB-108';
        disciplineLabel = 'Mobile App Development (iOS & Android)';
        if (calcTier === 'mvp') {
          timeline = '1–2 Weeks';
          budgetEstimate = 'Flexible / MVP';
          tierLabel = 'Rapid MVP App Prototype';
          artifacts = [
            'Functional mobile prototype with core user flows running on Android / iOS',
            'Clean UI with basic local storage and fast navigation',
            'Direct test build (APK / TestFlight) sent to your phone',
          ];
        } else if (calcTier === 'prod') {
          timeline = '3–5 Weeks';
          budgetEstimate = 'Flexible / Full App';
          tierLabel = 'Full Production Mobile App';
          artifacts = [
            'Complete iOS and Android app ready for Apple App Store & Google Play',
            'Smooth offline mode, user accounts, push notifications, and analytics',
            'In-app purchases, payment integration, and full store approval assistance',
          ];
        } else {
          timeline = '6–8 Weeks';
          budgetEstimate = 'Flexible / Enterprise';
          tierLabel = 'Enterprise Mobile App Ecosystem';
          artifacts = [
            'Multi-platform mobile ecosystem with cloud backend and admin panel',
            'Biometric security, real-time sync, and scalable cloud database',
            'Dedicated post-launch warranty, store compliance, and ongoing iteration',
          ];
        }
        break;

      case 'web':
        refId = 'PSC-WEB-204';
        disciplineLabel = 'Website & Web Application';
        if (calcTier === 'mvp') {
          timeline = '3–5 Days';
          budgetEstimate = 'Flexible / Landing Page';
          tierLabel = 'Starter Landing Page / Portfolio';
          artifacts = [
            'Modern, responsive landing page that looks stunning on mobile and desktop',
            'Contact form, call-to-action buttons, and social media links',
            'Fast page load speeds with basic SEO setup',
          ];
        } else if (calcTier === 'prod') {
          timeline = '2–3 Weeks';
          budgetEstimate = 'Flexible / Full Web App';
          tierLabel = 'Complete Business Website / Web App';
          artifacts = [
            'Full multi-page website or interactive web application (React / Next.js)',
            'Content management setup so you can edit text and images anytime',
            '100/100 Google Lighthouse speed, SEO optimization, and analytics',
          ];
        } else {
          timeline = '4–6 Weeks';
          budgetEstimate = 'Flexible / Cloud Platform';
          tierLabel = 'Enterprise Web Platform & E-Commerce';
          artifacts = [
            'High-concurrency web platform with custom backend and payment gateways',
            'User dashboards, authentication, custom database, and role permissions',
            'Automated backups, global CDN caching, and high-uptime infrastructure',
          ];
        }
        break;

      case 'ai':
        refId = 'PSC-AI-264';
        disciplineLabel = 'AI Solutions & Smart Automation';
        if (calcTier === 'mvp') {
          timeline = '3–5 Days';
          budgetEstimate = 'Flexible / Smart Assistant';
          tierLabel = 'Starter AI Assistant';
          artifacts = [
            'Custom AI assistant integrated into your website or Discord/Slack',
            'Trained on your business FAQs, documents, and product guidelines',
            'Controlled budget settings to prevent unexpected model usage fees',
          ];
        } else if (calcTier === 'prod') {
          timeline = '2–3 Weeks';
          budgetEstimate = 'Flexible / Smart Workflow';
          tierLabel = 'Smart Automation & Knowledge Pipeline';
          artifacts = [
            'Full AI workflow that answers questions and handles user inquiries',
            'Live streaming chat interface with verified, hallucination-free answers',
            'Connected to your live databases, inventory, or CRM tools',
          ];
        } else {
          timeline = '4–6 Weeks';
          budgetEstimate = 'Flexible / Autonomous Suite';
          tierLabel = 'Enterprise Autonomous AI Pipeline';
          artifacts = [
            'Autonomous multi-agent system executing multi-step business actions',
            'Enterprise vector search, private data storage, and strict security',
            'Comprehensive evaluation benchmarking and custom LLM fine-tuning',
          ];
        }
        break;

      case 'game':
        refId = 'PSC-GME-450';
        disciplineLabel = 'Game Development & Interactive Media';
        if (calcTier === 'mvp') {
          timeline = '1–2 Weeks';
          budgetEstimate = 'Flexible / Playable Prototype';
          tierLabel = 'Playable Game Prototype';
          artifacts = [
            'Playable 2D game prototype with core mechanics and controls (Unity / WebGL)',
            'Playable directly in web browsers or downloadable for PC',
            'Custom pixel art or basic 2D assets and sound effects',
          ];
        } else if (calcTier === 'prod') {
          timeline = '3–5 Weeks';
          budgetEstimate = 'Flexible / Complete Game';
          tierLabel = 'Complete Indie Game';
          artifacts = [
            'Full 2D or 3D indie game with multiple levels, audio, and polished visuals',
            'Support for touch screens, keyboard, mouse, and gamepads',
            'Web browser build + standalone PC/Steam or mobile package',
          ];
        } else {
          timeline = '6–10 Weeks';
          budgetEstimate = 'Flexible / Commercial Title';
          tierLabel = 'Commercial Game Title';
          artifacts = [
            'Commercial-grade game with advanced particle effects, shaders, and physics',
            'Save systems, achievement tracking, and custom sound design',
            'Store release assistance for Steam, Google Play, or Web portals',
          ];
        }
        break;

      case 'saas':
        refId = 'PSC-SaaS-312';
        disciplineLabel = 'Cloud Platform & Online Business (SaaS)';
        if (calcTier === 'mvp') {
          timeline = '1–2 Weeks';
          budgetEstimate = 'Flexible / Core MVP';
          tierLabel = 'Core SaaS MVP';
          artifacts = [
            'Secure database setup with user login and sign-up flows',
            'Core dashboard and basic account profile management',
            'Docker deployment ready to host on inexpensive cloud servers',
          ];
        } else if (calcTier === 'prod') {
          timeline = '3–4 Weeks';
          budgetEstimate = 'Flexible / Production SaaS';
          tierLabel = 'Production SaaS Platform';
          artifacts = [
            'Complete SaaS application with automated Stripe subscription billing',
            'Team collaboration, user roles, email notifications, and invoices',
            'Fast database queries, Redis caching, and continuous deployment',
          ];
        } else {
          timeline = '6–8 Weeks';
          budgetEstimate = 'Flexible / Cloud Enterprise';
          tierLabel = 'Enterprise SaaS Suite';
          artifacts = [
            'High-availability cloud architecture designed for thousands of users',
            'Custom API endpoints, webhook integrations, and multi-tenant security',
            'Dedicated deployment monitoring, automated backups, and 99.9% uptime SLA',
          ];
        }
        break;

      case 'design':
        refId = 'PSC-DSN-119';
        disciplineLabel = 'UI/UX Design Systems & Branding';
        if (calcTier === 'mvp') {
          timeline = '2–4 Days';
          budgetEstimate = 'Flexible / Starter Mockup';
          tierLabel = 'Starter Branding & UI Mockup';
          artifacts = [
            'Custom modern logo, visual brand identity, and color palette',
            'Key mobile and desktop screen mockups in Figma',
            'Exported web and mobile graphics ready to use',
          ];
        } else if (calcTier === 'prod') {
          timeline = '1–2 Weeks';
          budgetEstimate = 'Flexible / Full Design Kit';
          tierLabel = 'Full UI/UX Design System';
          artifacts = [
            'Complete clickable Figma prototype with all screen interactions',
            'Comprehensive design system with components, typography, and dark mode',
            'Developer-ready specifications with clean layout guidelines',
          ];
        } else {
          timeline = '3–4 Weeks';
          budgetEstimate = 'Flexible / Design Ecosystem';
          tierLabel = 'Enterprise Design & Motion System';
          artifacts = [
            'Multi-platform design language for Web, iOS, Android, and marketing',
            'Interactive micro-interactions, custom animations, and motion specs',
            'Complete design token pipeline synced directly to frontend code',
          ];
        }
        break;
    }

    // Friendly add-ons
    if (addonCi) {
      artifacts.push('Automated testing and smooth one-click updates setup');
    }
    if (addonTelemetry) {
      artifacts.push('Live error monitoring to catch any bugs instantly');
    }
    if (addonSecurity) {
      artifacts.push('Enhanced data security and protection against vulnerabilities');
    }

    // Generate pre-populated inquiry URL
    const queryParams = new URLSearchParams({
      discipline: calcDiscipline,
      tier: calcTier,
      timeline,
      budget: budgetEstimate,
      ref: refId,
    });

    const inquiryUrl = `/contact?${queryParams.toString()}`;

    return {
      timeline,
      budgetEstimate,
      refId,
      disciplineLabel,
      tierLabel,
      artifacts,
      inquiryUrl,
    };
  }, [calcDiscipline, calcTier, addonCi, addonTelemetry, addonSecurity]);

  return {
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
  };
}
