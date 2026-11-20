import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface EngagementTier {
  modelTag: string;
  tagColor: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
  isRecommended?: boolean;
}

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    modelTag: 'OPTION 01',
    tagColor: 'text-tertiary',
    title: 'Fixed-Price Project',
    description: 'Best for new products, MVPs, or specific features with clearly defined goals, a set deadline, and a fixed budget.',
    highlights: [
      'Guaranteed fixed price with no hidden costs',
      'Clear roadmap with milestone delivery dates',
      '30 days of post-launch support & bug fixing',
    ],
    ctaText: 'Choose Fixed-Price',
    ctaLink: '/contact?model=Fixed-Price+Project',
  },
  {
    modelTag: 'OPTION 02',
    tagColor: 'text-tertiary',
    title: 'Dedicated Development Team',
    description: 'Work with dedicated engineers integrated directly with you, delivering regular updates, weekly builds, and fast iterations.',
    highlights: [
      'Direct chat via Slack, Discord, or WhatsApp',
      'Flexible roadmap adjusted as your needs evolve',
      'Weekly interactive demos and live test builds',
    ],
    ctaText: 'Hire Dedicated Team',
    ctaLink: '/contact?model=Dedicated+Development+Team',
    isRecommended: true,
  },
  {
    modelTag: 'OPTION 03',
    tagColor: 'text-secondary',
    title: 'Ongoing Support & Growth',
    description: 'Ongoing technical guidance, proactive optimizations, emergency bug fixes, and feature updates as your user base expands.',
    highlights: [
      'Guaranteed monthly engineering availability',
      'Priority fast response for urgent requests',
      'Regular security, speed, and package checks',
    ],
    ctaText: 'Get Ongoing Support',
    ctaLink: '/contact?model=Ongoing+Support',
  },
];

/**
 * EngagementModels - Transparent engagement models & partnership frameworks.
 * Single Responsibility: Presenting the 3 commercial engagement tracks in clear, accessible language.
 */
export const EngagementModels: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-gutter lg:px-margin mb-20 w-full">
      <SectionHeading
        eyebrow="TRANSPARENT PRICING &amp; PARTNERSHIP"
        title="Simple, Flexible Ways to Work Together"
        description="Choose the model that fits your stage—whether you want a fixed-scope build from idea to launch, or dedicated developers on ongoing retainer."
        align="center"
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {ENGAGEMENT_TIERS.map((tier) => (
          <div
            key={tier.modelTag}
            className={`flex flex-col justify-between rounded-xl p-6 border shadow-md ${
              tier.isRecommended
                ? 'bg-gradient-to-b from-surface-deep via-surface-container to-surface-deep border-tertiary/40 shadow-xl relative'
                : 'bg-surface-container border-border-glass'
            }`}
          >
            {tier.isRecommended && (
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-tertiary text-surface-deep text-[10px] font-label-badge font-bold uppercase font-mono">
                MOST POPULAR
              </span>
            )}
            <div>
              <span className={`font-label-badge text-[10px] uppercase font-mono ${tier.tagColor}`}>
                {tier.modelTag}
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-text-primary mt-1 mb-2">
                {tier.title}
              </h3>
              <p className="text-xs text-text-muted mb-4 leading-relaxed">
                {tier.description}
              </p>
              <ul className="flex flex-col gap-2 text-xs text-text-muted">
                {tier.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 ${tier.tagColor} shrink-0 mt-0.5`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={tier.ctaLink}
              className={`mt-6 w-full py-2.5 rounded-lg text-xs text-center font-semibold transition-all ${
                tier.isRecommended
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-md hover:opacity-90'
                  : 'bg-surface-deep hover:bg-surface-container-high border border-border-glass text-text-primary'
              }`}
            >
              {tier.ctaText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
