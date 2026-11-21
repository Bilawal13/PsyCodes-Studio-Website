import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ReceiptDetails, generateTextReceipt, printReceipt } from '../../utils/receiptGenerator';
import { SITE_SETTINGS } from '../../data/mockData';
import { DirectDispatchModal } from '../modals/DirectDispatchModal';
import { StudioLogoMark } from '../brand/StudioLogo';

export interface InquiryReceiptCardProps {
  receipt: ReceiptDetails;
  onReset?: () => void;
  showResetButton?: boolean;
}

/**
 * InquiryReceiptCard - Official, verifiable on-screen order receipt.
 * Synchronized with the client email receipt, studio lead dispatch, and admin database via identical UID.
 * Includes @media print formatting for 1-click PDF/Paper generation.
 */
export const InquiryReceiptCard: React.FC<InquiryReceiptCardProps> = ({
  receipt,
  onReset,
  showResetButton = true,
}) => {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  const formattedDate = new Date(receipt.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopyUid = () => {
    navigator.clipboard.writeText(receipt.uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleCopyFull = () => {
    navigator.clipboard.writeText(generateTextReceipt(receipt));
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleDownloadTxt = () => {
    const text = generateTextReceipt(receipt);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PsyCodes-Receipt-${receipt.uid}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    printReceipt(receipt);
  };

  const mailtoSubject = encodeURIComponent(`[Receipt: ${receipt.uid}] Project Follow-Up — ${receipt.name}`);
  const mailtoBody = encodeURIComponent(
    `Hi PsyCodes Team,\n\nI am referencing my official project intake receipt (${receipt.uid}) submitted for "${receipt.project_type}".\n\nLooking forward to speaking with the team!\n`
  );

  return (
    <div className="w-full flex flex-col gap-6 text-left animate-in fade-in duration-300">
      
      {/* Top Banner Message */}
      <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-4 shadow-sm">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold font-display text-white">
              Inquiry Dispatched &amp; Official Receipt Generated
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/40">
              Synced UID Active
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Your project brief has been routed to our founding architects at <strong className="text-white">{SITE_SETTINGS.contact_email}</strong>. Below is your official, verifiable digital order receipt.
          </p>
        </div>
      </div>

      {/* The Printable Digital Voucher Card */}
      <div className="printable-receipt relative bg-surface-deep/95 rounded-3xl p-6 sm:p-8 border border-border-glass shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Ambient Glow Corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Voucher Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-glass/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container-high border border-border-glass p-1 flex items-center justify-center shrink-0">
              <StudioLogoMark size={28} />
            </div>
            <div>
              <span className="font-label-badge text-[10px] text-tertiary font-mono uppercase tracking-widest block">
                PSYCODES STUDIO // OFFICIAL INGESTION
              </span>
              <span className="font-headline-sm text-base font-bold text-white tracking-tight">
                Digital Order &amp; Project Receipt
              </span>
            </div>
          </div>

          {/* UID Box */}
          <div className="flex flex-col items-start sm:items-end bg-surface-container/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-border-glass/60">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
              RECEIPT UID
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-lg font-bold text-cyan-400 tracking-wider">
                {receipt.uid}
              </span>
              <button
                type="button"
                onClick={handleCopyUid}
                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border-glass text-text-muted hover:text-white transition-colors cursor-pointer"
                title="Copy Receipt UID"
              >
                {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Status Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 border-b border-border-glass/50 text-xs font-mono">
          <div>
            <span className="text-[10px] text-text-muted block uppercase">TIMESTAMP</span>
            <span className="text-white font-medium">{formattedDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted block uppercase">INGESTION STATUS</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              VERIFIED &amp; LOGGED
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-text-muted block uppercase">RESPONSE SLA</span>
            <span className="text-cyan-400 font-semibold">&lt; 24 Hours Guaranteed</span>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-border-glass/50">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">Client Name</span>
              <span className="text-white font-semibold text-sm">{receipt.name}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">Client Email</span>
              <span className="text-cyan-400 font-mono text-xs">{receipt.email}</span>
            </div>
            {receipt.whatsapp && (
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase block">WhatsApp Number</span>
                <a
                  href={`https://wa.me/${receipt.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-mono text-xs hover:underline inline-flex items-center gap-1.5 mt-0.5"
                >
                  <span>{receipt.whatsapp}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400/70" />
                </a>
              </div>
            )}
            {receipt.company && (
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase block">Company / Brand</span>
                <span className="text-white">{receipt.company}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">Project Discipline</span>
              <span className="text-white font-semibold text-sm">{receipt.project_type}</span>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase block">Target Budget</span>
                <span className="text-emerald-400 font-bold font-mono">{receipt.budget}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase block">Target Timeline</span>
                <span className="text-white font-mono">{receipt.timeline}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">Mutual NDA Status</span>
              <span className="text-text-muted">
                {receipt.nda_requested ? (
                  <span className="text-cyan-400 font-semibold">Mutual NDA Requested (Will execute prior to sprint)</span>
                ) : (
                  <span>Standard Studio Confidentiality &amp; IP Protection</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Scope Brief Box */}
        <div className="pt-5 pb-3">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
            SUBMITTED PROJECT SCOPE &amp; BRIEF
          </span>
          <div className="p-4 rounded-xl bg-surface-container-low/70 border border-border-glass text-xs text-text-primary/90 leading-relaxed font-body-sm whitespace-pre-wrap max-h-48 overflow-y-auto shadow-inner">
            {receipt.description}
          </div>
        </div>

        {/* Studio Security Sign-Off */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-text-muted border-t border-border-glass/40 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Client Intellectual Property Guarantee</span>
          </div>
          <span className="font-mono text-[10.5px]">Karachi, Pakistan · Global Deliveries</span>
        </div>
      </div>

      {/* Action Bar (Print, Download, Copy, Direct Mail) */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        
        {/* 1. Print / Save PDF Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-400/25 hover:shadow-cyan-400/40 transition-all cursor-pointer"
          title="Print or Save Official Receipt as PDF"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Receipt</span>
        </button>

        {/* 2. Download .txt File */}
        <button
          type="button"
          onClick={handleDownloadTxt}
          className="px-4 py-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-tertiary text-text-muted hover:text-white text-xs flex items-center gap-2 transition-all cursor-pointer"
          title="Download text file receipt"
        >
          <Download className="w-4 h-4" />
          <span>Download .txt</span>
        </button>

        {/* 3. Copy Full Receipt */}
        <button
          type="button"
          onClick={handleCopyFull}
          className="px-4 py-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-tertiary text-text-muted hover:text-white text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          {copiedFull ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied Full Receipt!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Full Receipt</span>
            </>
          )}
        </button>

        {/* 4. Direct Mail Link */}
        <button
          type="button"
          onClick={() => setIsDispatchModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-tertiary text-text-muted hover:text-white text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Email Studio with UID</span>
        </button>

        {/* 5. Reset Button */}
        {showResetButton && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl text-text-muted hover:text-white text-xs transition-colors ml-auto cursor-pointer"
          >
            Submit Another Project
          </button>
        )}
      </div>

      {/* Direct Dispatch Options Modal */}
      <DirectDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        subject={`Project Receipt Reference [${receipt.uid}] — ${receipt.name}`}
        body={
          `Hello PsyCodes Studio Engineering,\n\n` +
          `I am following up regarding my project inquiry.\n` +
          `Receipt Tracking UID: ${receipt.uid}\n` +
          `Project: ${receipt.project_type}\n` +
          `Estimated Investment: ${receipt.budget}\n` +
          `Target Timeline: ${receipt.timeline}\n\n` +
          `Looking forward to collaborating,\n` +
          `${receipt.name}`
        }
      />
    </div>
  );
};
