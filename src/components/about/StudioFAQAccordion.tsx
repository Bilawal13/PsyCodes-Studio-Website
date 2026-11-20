import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface FAQItem {
  question: string;
  answer: string;
}

export const STUDIO_FAQS: FAQItem[] = [
  {
    question: 'How does engagement with PsyCodes Studio typically operate?',
    answer: 'We operate across two primary modes: Fixed-Scope Milestones (for defined MVP builds, mobile applications, or game ports) and Dedicated Engineering Retainers (where senior architects embed directly into your technical cadence with dedicated weekly commits).',
  },
  {
    question: 'Who owns the intellectual property and code repositories?',
    answer: 'You own 100% of all intellectual property, source code, Figma design tokens, and deployment infrastructure. Repositories are transferred to your organization with unencumbered commercial ownership upon milestone delivery.',
  },
  {
    question: 'Can you work with our existing backend or cloud infrastructure?',
    answer: 'Yes. We frequently integrate with existing AWS, GCP, Supabase, and PostgreSQL architectures, augmenting current teams with specialized mobile (Flutter), game (Unity), or AI vector pipeline development.',
  },
  {
    question: 'What is your typical delivery cadence for an MVP?',
    answer: 'Standard greenfield MVPs (e.g., cross-platform mobile apps, interactive WebGL tools, or deterministic AI copilots) typically move from initial scoping to live staging in 4 to 8 weeks, with playable builds delivered weekly.',
  },
  {
    question: 'Do you provide post-launch maintenance and engineering support?',
    answer: 'Yes. All completed sprint builds include a standard 30-day bug warranty, and we offer ongoing skunkworks retainers for continued feature iteration, scaling, and framework upgrades.',
  },
];

/**
 * StudioFAQAccordion - Interactive operational FAQ questions.
 * Single Responsibility: Handling question toggle state and rendering transparent collaboration answers.
 */
export const StudioFAQAccordion: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
      <SectionHeading
        eyebrow="COLLABORATION PROTOCOLS"
        title="Studio Operational FAQ"
        description="Transparent mechanics on how we quote, engineer, deliver, and support systems worldwide."
        align="center"
        className="mb-12"
      />

      <div className="space-y-4">
        {STUDIO_FAQS.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={faq.question}
              className="rounded-2xl bg-surface-container/70 border border-border-glass backdrop-blur-md overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold font-display text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-text-muted leading-relaxed border-t border-border-glass/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
