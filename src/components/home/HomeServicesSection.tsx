import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface UnifiedServiceCard {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  cta: string;
  color: string;
  bg: string;
}

export const UNIFIED_SERVICES: UnifiedServiceCard[] = [
  {
    title: 'AI Commercials & Product Ads',
    tag: 'Video & Motion',
    description: 'Eye-catching AI video ads and product commercials tailored for TikTok, Instagram Reels, YouTube Shorts, and websites. Photorealistic visuals, lifelike voiceovers, and dynamic motion delivered in 24–48 hours.',
    tech: ['Runway Gen-3 & Sora', 'Midjourney v6', 'AI Voiceovers', '4K Up rendu & Premiere'],
    cta: 'Create Video Ad →',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    title: 'Mobile App Development',
    tag: 'iOS & Android Apps',
    description: 'Fast, beautiful mobile apps for iPhone and Android. From simple MVP concepts to full production releases with offline access, push notifications, and seamless app store rollout.',
    tech: ['Flutter & Dart', 'Kotlin & Swift', 'Offline Sync', 'Firebase & Supabase'],
    cta: 'Build Mobile App →',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
  },
  {
    title: 'Web Platforms & SaaS',
    tag: 'Modern Websites & Portals',
    description: 'High-speed websites, web applications, customer portals, and web stores. Built for lightning-fast loading, great Google SEO visibility, and smooth user logins.',
    tech: ['React & Next.js', 'Node.js & Python', 'PostgreSQL', 'Secure Cloud Hosting'],
    cta: 'Launch Web Platform →',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    title: 'AI Assistants & Automation',
    tag: 'Custom AI & Chatbots',
    description: 'Custom AI chatbots trained on your business guides, smart document search, and automated workflows that handle routine tasks and answer customer questions 24/7.',
    tech: ['OpenAI & Claude', 'Custom Knowledge Bases', 'Smart Workflows', 'Private Data Controls'],
    cta: 'Integrate AI Solutions →',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    title: 'Game Development & Interactive',
    tag: '2D & 3D Interactive Games',
    description: 'Fun, engaging games and interactive 3D simulations playable directly in web browsers or on mobile and desktop. Smooth controls, physics, and custom visual art.',
    tech: ['Unity Engine', 'C# Scripting', 'Web Browser Play', 'Custom Game Audio'],
    cta: 'Build Game Experience →',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    title: 'UI / UX Design & Prototypes',
    tag: 'Design Systems & Wireframes',
    description: 'Polished interactive Figma prototypes, logo design, clean mobile and web user interfaces, and consistent visual branding that makes your product look premium from day one.',
    tech: ['Figma Prototypes', 'Clickable Mockups', 'Modern Dark & Light UI', 'Design Kits'],
    cta: 'Design Your Product →',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

/**
 * HomeServicesSection - Unified 6-card studio service offering showcase.
 * Single Responsibility: Presenting the 6 core capability disciplines with technical tags and commission CTAs.
 */
export const HomeServicesSection: React.FC = () => {
  return (
    <section className="w-full px-gutter lg:px-margin py-24 relative text-left" id="services">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="STUDIO SERVICES"
          title="Everything You Need To Build What's Next."
          description="From high-impact AI video ads to full mobile apps, websites, games, and custom AI tools — explore our services and let's bring your project to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIFIED_SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="bg-surface-deep/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:bg-surface-container-high/90 transition-all border border-border-glass"
            >
              <div className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center border border-border-glass`}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className={`font-label-badge text-[11px] ${service.color} uppercase tracking-wider font-mono`}>
                    {service.tag}
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-text-primary mt-1">
                    {service.title}
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-glass/40">
                  {service.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-surface-container-lowest text-[11px] font-mono text-text-muted border border-border-glass/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className={`inline-flex items-center gap-2 font-button-text text-sm ${service.color} hover:underline font-semibold`}
                >
                  <span>{service.cta}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-button-text font-bold text-sm shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
