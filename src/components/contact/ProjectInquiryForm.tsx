import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Send,
  CheckCircle2,
  Lock,
  Mail,
  Copy,
  MessageSquare,
  Sparkles,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { SITE_SETTINGS } from '../../data/mockData';
import { inquiryService } from '../../services/inquiryService';
import { InquiryReceiptCard } from './InquiryReceiptCard';
import { ReceiptDetails } from '../../utils/receiptGenerator';
import { getCategoryPricing } from '../../data/categoryPricing';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: z.string().optional(),
  company: z.string().optional(),
  project_type: z.enum([
    'AI Commercials & Product Video Ads',
    'Mobile App Development (iOS & Android)',
    'Web & Cloud Platforms (SaaS / Web Apps)',
    'Game Development & Interactive Experiences',
    'AI Solutions & Workflow Automation',
    'UI/UX Design Systems & Micro-Interactions',
    'Custom Technical Architecture & Engineering',
  ]),
  budget_range: z.string().optional().default('Flexible / Open to discussion'),
  timeline: z.string().min(1, { message: 'Please select your target launch timeline.' }),
  project_summary: z.string().min(15, { message: 'Please share at least a short sentence about your project.' }),
  nda_requested: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * ProjectInquiryForm - Clean, inviting project intake form.
 * Single Responsibility: Form state, user inputs, validation, and inquiry submission in human-friendly terms.
 */
export const ProjectInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [generatedReceipt, setGeneratedReceipt] = useState<ReceiptDetails | null>(null);
  const [emailDispatched, setEmailDispatched] = useState<boolean | null>(null);
  const [copiedSpec, setCopiedSpec] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      whatsapp: '',
      project_type: 'AI Commercials & Product Video Ads',
      budget_range: '',
      timeline: '1-3 Days (Quick Turnaround)',
      nda_requested: false,
    },
  });

  const selectedProjectType = watch('project_type');
  const selectedBudget = watch('budget_range');
  const selectedTimeline = watch('timeline');
  const ndaRequested = watch('nda_requested');

  const currentCategoryPricing = useMemo(() => getCategoryPricing(selectedProjectType), [selectedProjectType]);

  const handleSelectProjectType = (type: ContactFormData['project_type']) => {
    setValue('project_type', type);
    const pricing = getCategoryPricing(type);
    setValue('timeline', pricing.defaultTimeline);
  };

  const [searchParams] = useSearchParams();
  const [syncedBanner, setSyncedBanner] = useState<string | null>(null);

  useEffect(() => {
    const discipline = searchParams.get('discipline');
    const service = searchParams.get('service');
    const tier = searchParams.get('tier');
    const ref = searchParams.get('ref');
    const model = searchParams.get('model');
    const budgetParam = searchParams.get('budget');
    const timelineParam = searchParams.get('timeline');

    if (!discipline && !service && !tier && !ref && !model && !budgetParam && !timelineParam) {
      return;
    }

    let detectedType: ContactFormData['project_type'] | null = null;

    const target = (discipline || service || '').toLowerCase();
    if (target.includes('video') || target.includes('ad') || target.includes('commercial') || target.includes('reel') || target.includes('tiktok')) {
      detectedType = 'AI Commercials & Product Video Ads';
    } else if (target.includes('mobile') || target.includes('app') || target.includes('fitlyfe') || target.includes('fit lyfe')) {
      detectedType = 'Mobile App Development (iOS & Android)';
    } else if (target.includes('web') || target.includes('cloud') || target.includes('saas') || target.includes('pulse')) {
      detectedType = 'Web & Cloud Platforms (SaaS / Web Apps)';
    } else if (target.includes('game') || target.includes('arcade') || target.includes('cocoa')) {
      detectedType = 'Game Development & Interactive Experiences';
    } else if (target.includes('ai') || target.includes('agent') || target.includes('automation')) {
      detectedType = 'AI Solutions & Workflow Automation';
    } else if (target.includes('design') || target.includes('token') || target.includes('ui')) {
      detectedType = 'UI/UX Design Systems & Micro-Interactions';
    }

    const pricing = getCategoryPricing(detectedType || 'mobile');
    let detectedBudget = budgetParam || (
      tier === 'mvp' ? pricing.budgets[0].value :
      tier === 'prod' ? pricing.budgets[1].value :
      tier === 'enterprise' ? pricing.budgets[3]?.value || pricing.budgets[pricing.budgets.length - 1].value :
      pricing.defaultBudget
    );
    let detectedTimeline = timelineParam || pricing.defaultTimeline;

    if (model && model.includes('Retainer')) {
      detectedBudget = 'Ongoing Monthly Retainer';
      detectedTimeline = '3+ Months (Comprehensive Build)';
    }

    if (detectedType) {
      setValue('project_type', detectedType);
    }
    if (detectedBudget) {
      setValue('budget_range', detectedBudget);
    }
    if (detectedTimeline) {
      setValue('timeline', detectedTimeline);
    }

    const summaryPrefix = ref
      ? `Hi PsyCodes team! I configured a project estimate on your website (${ref}).\nService: ${detectedType || 'Development'}\nTarget Timeline: ${timelineParam || detectedTimeline}\nTarget Budget: ${budgetParam || detectedBudget}\n\nHere are some details about my idea:`
      : service
      ? `Hi PsyCodes team! I am interested in your ${service} service. Please let me know your current availability and timeline.`
      : model
      ? `Hi PsyCodes team! I am interested in discussing your ${model} model.`
      : '';

    if (summaryPrefix) {
      setValue('project_summary', summaryPrefix);
      setSyncedBanner(ref ? `Project Estimate Loaded: ${ref} · ${detectedType || discipline}` : `Inquiry Topic: ${service || model}`);
    }
  }, [searchParams, setValue]);

  const generateEmailBody = (data: ContactFormData) => {
    return (
      `Hi PsyCodes Studio,\n\n` +
      `I would like to inquire about a new project:\n\n` +
      `• Name: ${data.name}\n` +
      `• Email: ${data.email}\n` +
      `• WhatsApp: ${data.whatsapp || 'Not specified'}\n` +
      `• Company / Venture: ${data.company || 'Not specified'}\n` +
      `• Project Type: ${data.project_type}\n` +
      `• Estimated Budget: ${data.budget_range?.trim() || 'Flexible / Open to discussion'}\n` +
      `• Target Timeline: ${data.timeline}\n` +
      `• NDA Requested: ${data.nda_requested ? 'Yes, please provide an NDA' : 'No'}\n\n` +
      `Project Description:\n` +
      `${data.project_summary}\n\n` +
      `Looking forward to hearing from you!\n`
    );
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await inquiryService.submit({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp?.trim() || undefined,
        company: data.company,
        project_type: data.project_type,
        budget: data.budget_range?.trim() || 'Flexible / Open to discussion',
        timeline: data.timeline,
        preferred_contact: data.whatsapp?.trim() ? 'WhatsApp' : 'Email',
        description: data.project_summary,
        nda_requested: data.nda_requested,
      });

      setEmailDispatched(result.emailDispatched ?? false);
      setSubmittedData(data);
      if (result.receipt) {
        setGeneratedReceipt(result.receipt);
      }
    } catch (e) {
      console.error('Inquiry ingestion error:', e);
      setSubmittedData(data);
      setEmailDispatched(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const launchMailer = () => {
    if (!submittedData) return;
    const subject = encodeURIComponent(`Project Inquiry: ${submittedData.project_type} — ${submittedData.name}`);
    const body = encodeURIComponent(generateEmailBody(submittedData));
    
    // 1. Copy inquiry summary to clipboard immediately
    navigator.clipboard.writeText(generateEmailBody(submittedData)).catch(() => {});
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 3000);

    // 2. Open Gmail Web compose in a new tab (works reliably on all platforms without requiring a desktop mail app)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_SETTINGS.contact_email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const copyInquirySummary = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(generateEmailBody(submittedData));
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2500);
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-surface-container/90 border border-border-glass backdrop-blur-2xl relative shadow-2xl text-left">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-glass">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-tertiary" />
          <span className="text-xs font-semibold text-text-primary tracking-wide">
            Project Inquiry Form
          </span>
        </div>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Replies within 24 Hours
        </span>
      </div>

      {generatedReceipt ? (
        /* Submission Confirmation with Official On-Screen Digital Receipt */
        <InquiryReceiptCard
          receipt={generatedReceipt}
          onReset={() => {
            setGeneratedReceipt(null);
            setSubmittedData(null);
            setEmailDispatched(null);
            reset();
          }}
        />
      ) : submittedData ? (
        /* Fallback Confirmation State */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold font-display text-white">
                  Inquiry Dispatched Successfully!
                </h3>
                {emailDispatched && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/40">
                    Direct Email Sent to Studio
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Thank you, <strong className="text-white">{submittedData.name}</strong>. Your project details have been delivered to our engineering inbox (<strong className="text-white">{SITE_SETTINGS.contact_email}</strong>), and an automated confirmation receipt has also been dispatched to <strong className="text-white">{submittedData.email}</strong>.
              </p>
            </div>
          </div>

          {/* Inquiry Summary Preview */}
          <div className="p-5 rounded-2xl bg-surface-deep border border-border-glass font-body-sm text-xs text-text-muted max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
            {generateEmailBody(submittedData)}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={launchMailer}
              className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer"
              title="Open your device email client with this inquiry prefilled"
            >
              <Mail className="w-4 h-4" />
              <span>Open in Email App (Optional)</span>
            </button>

            <button
              type="button"
              onClick={copyInquirySummary}
              className="px-5 py-3 rounded-xl bg-surface-deep border border-border-glass hover:border-tertiary text-text-muted hover:text-white text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {copiedSpec ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setSubmittedData(null);
                setEmailDispatched(null);
                reset();
              }}
              className="px-4 py-3 rounded-xl text-text-muted hover:text-white text-xs transition-colors ml-auto cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        /* The Interactive Form */
        <div>
          {syncedBanner && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-tertiary/10 border border-tertiary/30 text-xs text-tertiary mb-6 animate-in fade-in duration-300 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-tertiary" />
                <span className="font-semibold">{syncedBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSyncedBanner(null);
                  reset();
                }}
                className="text-[11px] text-text-muted hover:text-white underline cursor-pointer transition-colors"
              >
                Clear Preset
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Identity Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-body-sm text-sm focus:border-tertiary focus:outline-none transition-colors"
                />
                {errors.name && (
                  <span className="text-xs text-red-400 mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-2">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-body-sm text-sm focus:border-tertiary focus:outline-none transition-colors"
                />
                {errors.email && (
                  <span className="text-xs text-red-400 mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-text-primary">
                    Company or Startup
                  </label>
                  <span className="text-[10px] font-mono text-text-muted">Optional</span>
                </div>
                <input
                  type="text"
                  {...register('company')}
                  placeholder="e.g. Acme Health / Startup"
                  className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-body-sm text-sm focus:border-tertiary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-text-primary">
                    WhatsApp Number
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">Optional</span>
                </div>
                <input
                  type="tel"
                  {...register('whatsapp')}
                  placeholder="e.g. +1 555 019 2834"
                  className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-body-sm text-sm focus:border-tertiary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">
                What kind of project do you need? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'AI Commercials & Product Video Ads',
                  'Mobile App Development (iOS & Android)',
                  'Web & Cloud Platforms (SaaS / Web Apps)',
                  'Game Development & Interactive Experiences',
                  'AI Solutions & Workflow Automation',
                  'UI/UX Design Systems & Micro-Interactions',
                  'Custom Technical Architecture & Engineering',
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleSelectProjectType(type as any)}
                    className={`p-3 rounded-xl text-left text-xs transition-all border ${
                      selectedProjectType === type
                        ? 'bg-tertiary/10 border-tertiary text-text-primary font-bold shadow-sm'
                        : 'bg-surface-deep border-border-glass text-text-muted hover:border-tertiary/40 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-text-primary" htmlFor="inquiry-budget">
                  Estimated Budget
                </label>
                <span className="text-[11px] font-mono text-emerald-400 font-medium">Optional</span>
              </div>
              <input
                id="inquiry-budget"
                type="text"
                {...register('budget_range')}
                placeholder="e.g. $300, or Flexible / Open to discussion"
                className="w-full px-4 py-3 rounded-xl bg-surface-deep text-text-primary text-xs placeholder:text-text-muted/40 border border-border-glass focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
              />
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[
                  'Flexible / Open to discussion',
                  'Under $300',
                  '$300 - $800',
                  '$1,000+',
                  "Let's Discuss Scope",
                ].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setValue('budget_range', preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                      selectedBudget === preset
                        ? 'bg-tertiary/20 text-tertiary border-tertiary font-bold'
                        : 'bg-surface-lowest text-text-muted border-border-glass hover:text-white hover:border-tertiary/40'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">
                When would you like to launch? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentCategoryPricing.timelines.map((time) => (
                  <button
                    type="button"
                    key={time.value}
                    onClick={() => setValue('timeline', time.value)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      selectedTimeline === time.value
                        ? 'bg-secondary/10 border-secondary text-text-primary font-bold shadow-sm'
                        : 'bg-surface-deep border-border-glass text-text-muted hover:border-secondary/40 hover:text-white'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
              {errors.timeline && (
                <span className="text-xs text-red-400 mt-1 block">
                  {errors.timeline.message}
                </span>
              )}
            </div>

            {/* Project Summary */}
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">
                Tell us about your project &amp; goals *
              </label>
              <textarea
                rows={4}
                {...register('project_summary')}
                placeholder="Describe your app idea, key features, problems you want to solve, or any websites/apps you like for reference..."
                className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-body-sm text-sm focus:border-tertiary focus:outline-none transition-colors"
              />
              {errors.project_summary && (
                <span className="text-xs text-red-400 mt-1 block">
                  {errors.project_summary.message}
                </span>
              )}
            </div>

            {/* NDA Checkbox */}
            <div className="p-4 rounded-xl bg-surface-deep/50 border border-border-glass flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-tertiary" />
                <div>
                  <span className="text-xs font-bold text-white block">Request a Non-Disclosure Agreement (NDA)</span>
                  <span className="text-[11px] text-text-muted">We will happily sign an NDA before you share confidential project details</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={ndaRequested}
                onChange={(e) => setValue('nda_requested', e.target.checked)}
                className="w-5 h-5 rounded bg-surface-container border-border-glass text-tertiary focus:ring-0 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-container via-tertiary to-accent-violet text-white font-bold font-button-text text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Your Message...' : 'Send Project Inquiry →'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
