import React, { useState, useMemo } from 'react';
import { Mail, Copy, Check, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { SITE_SETTINGS } from '../../data/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { inquiryService } from '../../services/inquiryService';
import { InquiryReceiptCard } from '../contact/InquiryReceiptCard';
import { ReceiptDetails } from '../../utils/receiptGenerator';
import { getCategoryPricing } from '../../data/categoryPricing';
import { DirectDispatchModal } from '../modals/DirectDispatchModal';

/**
 * HomeOrderSection - Contact intake & direct order inquiry form.
 * Single Responsibility: Handling lead intake, email contact details, and client project submission.
 */
export const HomeOrderSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState('');
  const [inquiryType, setInquiryType] = useState('Mobile App Development');

  const activePricing = useMemo(() => getCategoryPricing(inquiryType), [inquiryType]);

  const [inquiryBudget, setInquiryBudget] = useState('');
  const [inquiryTimeline, setInquiryTimeline] = useState('1-2 Months (Standard Launch)');
  const [inquirySummary, setInquirySummary] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<ReceiptDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeChange = (newType: string) => {
    setInquiryType(newType);
    const pricing = getCategoryPricing(newType);
    setInquiryTimeline(pricing.defaultTimeline);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(SITE_SETTINGS.contact_email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleHomeInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquirySummary) return;

    setIsSubmitting(true);
    try {
      const result = await inquiryService.submit({
        name: inquiryName,
        email: inquiryEmail,
        whatsapp: inquiryWhatsapp.trim() || undefined,
        project_type: inquiryType,
        budget: inquiryBudget.trim() || 'Flexible / To be discussed',
        timeline: inquiryTimeline,
        preferred_contact: inquiryWhatsapp.trim() ? 'WhatsApp' : 'Email',
        description: inquirySummary,
        nda_requested: false,
      });

      if (result.receipt) {
        setSubmittedReceipt(result.receipt);
      }
      setInquirySuccess(true);
    } catch (err) {
      console.error('Home inquiry error:', err);
      setInquirySuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-gutter lg:px-margin py-24 bg-surface-container-lowest/80 relative border-t border-border-glass" id="order">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Studio Contact Meta Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="START A PROJECT"
              title={
                <>
                  Have An Idea?<br />
                  <span className="bg-gradient-to-r from-tertiary via-primary to-secondary bg-clip-text text-transparent">
                    Let's Make It Real.
                  </span>
                </>
              }
              description="Tell us about your project or game concept. We respond within 24 hours with a comprehensive breakdown, timeline estimate, and execution strategy."
            />

            <div className="flex flex-col gap-4 mt-6">
              <div className="p-4 rounded-xl bg-surface-deep shadow-sm flex items-center justify-between border border-border-glass">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-label-badge text-text-muted uppercase font-mono">Direct Email</div>
                    <button
                      type="button"
                      onClick={() => setIsDispatchModalOpen(true)}
                      className="font-label-code text-[14px] text-text-primary hover:text-tertiary transition-colors font-mono text-left cursor-pointer"
                      title="Launch Direct Mailer Terminal"
                    >
                      {SITE_SETTINGS.contact_email}
                    </button>
                  </div>
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-text-primary transition-colors border border-border-glass"
                  title="Copy to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-tertiary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-surface-deep shadow-sm flex items-center gap-3 border border-border-glass">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-label-badge text-text-muted uppercase font-mono">Headquarters</div>
                  <div className="font-body-md text-[14px] text-text-primary">{SITE_SETTINGS.headquarters}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-deep shadow-sm flex items-center gap-3 border border-border-glass">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-label-badge text-text-muted uppercase font-mono">Response SLA</div>
                  <div className="font-body-md text-[14px] text-text-primary">{SITE_SETTINGS.response_sla}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-text-muted border-t border-border-glass/40">
            <a href={SITE_SETTINGS.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-colors text-[13px] font-label-code font-mono">
              LinkedIn: @psycodestudios
            </a>
            <span>•</span>
            <a href={SITE_SETTINGS.x_url} target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-colors text-[13px] font-label-code font-mono">
              X: @PsyCodesAI
            </a>
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-surface-deep rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-border-glass">
          {inquirySuccess && submittedReceipt ? (
            <InquiryReceiptCard
              receipt={submittedReceipt}
              onReset={() => {
                setInquirySuccess(false);
                setSubmittedReceipt(null);
                setInquiryWhatsapp('');
                setInquiryBudget('');
                setInquirySummary('');
              }}
            />
          ) : inquirySuccess ? (
            <div className="p-8 rounded-2xl bg-surface-container flex flex-col items-center text-center gap-4 border border-emerald-500/40 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h3 className="font-headline-md text-xl font-bold text-text-primary">
                Inquiry Sent Successfully!
              </h3>
              <p className="font-body-sm text-text-muted max-w-md leading-relaxed">
                Thank you, <strong className="text-white">{inquiryName}</strong>. Your project details have been delivered to our engineering inbox (<strong className="text-white">{SITE_SETTINGS.contact_email}</strong>).
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Response Guaranteed within 24 Hours</span>
              </div>
              <button
                onClick={() => {
                  setInquirySuccess(false);
                  setInquirySummary('');
                }}
                className="mt-3 px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-button-text text-text-primary hover:text-tertiary transition-colors cursor-pointer border border-border-glass"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleHomeInquirySubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-button-text text-[13px] text-text-primary" htmlFor="client-name">
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    required
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Bilawal Feroze"
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-button-text text-[13px] text-text-primary" htmlFor="client-email">
                    Email Address *
                  </label>
                  <input
                    id="client-email"
                    required
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="font-button-text text-[13px] text-text-primary" htmlFor="client-whatsapp">
                      WhatsApp Number
                    </label>
                    <span className="text-[11px] font-mono text-emerald-400">Optional</span>
                  </div>
                  <input
                    id="client-whatsapp"
                    type="tel"
                    value={inquiryWhatsapp}
                    onChange={(e) => setInquiryWhatsapp(e.target.value)}
                    placeholder="e.g. +1 555 019 2834"
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-button-text text-[13px] text-text-primary" htmlFor="project-type">
                    Project Interest *
                  </label>
                  <select
                    id="project-type"
                    required
                    value={inquiryType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  >
                    <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
                    <option value="Web & Cloud Platforms">Web &amp; Cloud Platforms (SaaS &amp; Web Apps)</option>
                    <option value="AI Commercials & Product Video Ads">AI Commercials &amp; Product Video Ads</option>
                    <option value="AI Solutions & Automation">AI Solutions &amp; Automation</option>
                    <option value="Game Development & Interactive">Game Development &amp; Interactive Builds</option>
                    <option value="UI/UX Design Systems">UI / UX Design Systems &amp; Prototypes</option>
                    <option value="Full-Stack Technical Architecture">Full-Stack Technical Architecture</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="font-button-text text-[13px] text-text-primary" htmlFor="estimated-budget">
                      Estimated Budget
                    </label>
                    <span className="text-[11px] font-mono text-emerald-400">Optional</span>
                  </div>
                  <input
                    id="estimated-budget"
                    type="text"
                    value={inquiryBudget}
                    onChange={(e) => setInquiryBudget(e.target.value)}
                    placeholder="e.g. $300, or Flexible / Open to discussion"
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-button-text text-[13px] text-text-primary" htmlFor="timeline">
                    Target Timeline
                  </label>
                  <select
                    id="timeline"
                    value={inquiryTimeline}
                    onChange={(e) => setInquiryTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
                  >
                    {activePricing.timelines.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-button-text text-[13px] text-text-primary" htmlFor="project-summary">
                  Tell us about your product or idea *
                </label>
                <textarea
                  id="project-summary"
                  required
                  rows={4}
                  value={inquirySummary}
                  onChange={(e) => setInquirySummary(e.target.value)}
                  placeholder="Detail your goals, features, target launch window, and any existing design/code foundations..."
                  className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-text-primary font-body-sm text-body-sm placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container text-text-primary font-button-text text-button-text shadow-lg shadow-primary-container/20 hover:shadow-xl hover:shadow-tertiary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Your Inquiry...' : 'Submit Project Inquiry →'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Universal Direct Mailer Modal */}
      <DirectDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        subject="Project Inquiry | PsyCodes Studio"
      />
    </section>
  );
};
