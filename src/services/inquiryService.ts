import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { Inquiry } from '../types';
import { generateReceiptUID, ReceiptDetails } from '../utils/receiptGenerator';
import { resendService } from './resendService';

export interface SubmitResult {
  success: boolean;
  id: string;
  receipt: ReceiptDetails;
  emailDispatched?: boolean;
  clientReceiptSent?: boolean;
  requiresDomainVerification?: boolean;
  error?: string;
}

export const inquiryService = {
  /**
   * Submits a client project inquiry through the synchronized multi-layer pipeline:
   * 1. Generates or receives a verified single Receipt UID (synced across screen, client email & studio).
   * 2. Resend API dispatch: sends client receipt + studio notification with identical UID.
   * 3. FormSubmit backup dispatch.
   * 4. Persistent cloud database record in Supabase (if configured).
   * 5. Local storage persistence for instant studio management in /psycodespc313adminarea.
   */
  async submit(
    inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'> & { receiptUid?: string }
  ): Promise<SubmitResult> {
    const uid = inquiry.receiptUid || generateReceiptUID();
    const createdAt = new Date().toISOString();

    const receipt: ReceiptDetails = {
      uid,
      name: inquiry.name,
      email: inquiry.email,
      whatsapp: inquiry.whatsapp,
      company: inquiry.company,
      project_type: inquiry.project_type,
      budget: inquiry.budget,
      timeline: inquiry.timeline || 'Standard',
      nda_requested: inquiry.nda_requested,
      description: inquiry.description,
      created_at: createdAt,
    };

    let clientReceiptSent = false;
    let studioEmailSent = false;
    let requiresDomainVerification = false;

    // A. Direct Resend / Supabase Edge dispatch
    try {
      const resendRes = await resendService.dispatchReceiptEmails(receipt);
      if (resendRes.clientSent) clientReceiptSent = true;
      if (resendRes.studioSent) studioEmailSent = true;
      if (resendRes.requiresDomainVerification) requiresDomainVerification = true;
    } catch (resendErr) {
      console.warn('Resend pipeline notice:', resendErr);
    }

    // B. FormSubmit backup dispatch
    try {
      const formSubmitRes = await fetch('https://formsubmit.co/ajax/psycodestech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Receipt UID': uid,
          name: inquiry.name,
          email: inquiry.email,
          whatsapp: inquiry.whatsapp || 'Not specified',
          company: inquiry.company || 'Not specified',
          project_type: inquiry.project_type,
          budget_range: inquiry.budget,
          timeline: inquiry.timeline || 'Standard',
          nda_requested: inquiry.nda_requested ? 'YES — Mutual NDA Required' : 'No',
          project_summary: inquiry.description,
          _subject: `[PsyCodes Lead: ${uid}] ${inquiry.project_type} — ${inquiry.name}`,
          _replyto: inquiry.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (formSubmitRes.ok) {
        studioEmailSent = true;
      }
    } catch (err) {
      console.warn('FormSubmit fallback notice:', err);
    }

    // C. Local Storage Persistence (guarantees studio admin can inspect receipt)
    try {
      const stored = JSON.parse(localStorage.getItem('psy_inquiries') || '[]');
      const newRecord: Inquiry = {
        ...inquiry,
        id: uid,
        status: 'new',
        created_at: createdAt,
      };
      stored.unshift(newRecord);
      localStorage.setItem('psy_inquiries', JSON.stringify(stored.slice(0, 50)));
    } catch (storageErr) {
      console.warn('Local storage error:', storageErr);
    }

    // D. Supabase Cloud Persistence (if configured)
    if (isSupabaseConfigured()) {
      try {
        const payload: Record<string, any> = {
          full_name: inquiry.name,
          email: inquiry.email,
          discipline: inquiry.project_type,
          timeline: inquiry.timeline || 'Standard',
          budget_tier: inquiry.budget,
          comm_channel: inquiry.whatsapp ? `WhatsApp (${inquiry.whatsapp})` : (inquiry.preferred_contact || 'email'),
          scope: `[Receipt UID: ${uid}]${inquiry.whatsapp ? `\nWhatsApp: ${inquiry.whatsapp}` : ''}\n${inquiry.description}`,
          nda_requested: inquiry.nda_requested ?? false,
          status: 'new',
          notes: `Receipt UID: ${uid}${inquiry.whatsapp ? ` | WhatsApp: ${inquiry.whatsapp}` : ''}`,
        };

        if (inquiry.whatsapp) {
          payload.whatsapp = inquiry.whatsapp;
        }

        const { error: dbErr } = await supabase.from('inquiries').insert(payload);
        if (dbErr) {
          console.warn('Supabase ingestion notice:', dbErr);
          // If notes or whatsapp column doesn't exist, retry without them
          if (dbErr.message && (dbErr.message.includes('notes') || dbErr.message.includes('whatsapp'))) {
            delete payload.notes;
            delete payload.whatsapp;
            await supabase.from('inquiries').insert(payload);
          }
        }
      } catch (dbErr) {
        console.warn('Supabase ingestion exception:', dbErr);
      }
    }

    return {
      success: true,
      id: uid,
      receipt,
      emailDispatched: studioEmailSent,
      clientReceiptSent,
      requiresDomainVerification,
    };
  },

  async getAll(): Promise<Inquiry[]> {
    if (!isSupabaseConfigured()) {
      try {
        const stored = JSON.parse(localStorage.getItem('psy_inquiries') || '[]');
        return stored;
      } catch {
        return [];
      }
    }

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        const stored = JSON.parse(localStorage.getItem('psy_inquiries') || '[]');
        return stored;
      }

      return data.map((item: any) => {
        const uidMatch = (item.notes || '').match(/PSC-\d{4}-[A-Z0-9]+/i) ||
                         (item.scope || '').match(/PSC-\d{4}-[A-Z0-9]+/i);
        const displayId = uidMatch ? uidMatch[0] : item.id;

        return {
          id: displayId,
          name: item.full_name || item.name,
          email: item.email,
          company: item.company || '',
          project_type: item.discipline || item.project_type,
          timeline: item.timeline,
          budget: item.budget_tier || item.budget,
          preferred_contact: item.comm_channel || item.preferred_contact || 'email',
          description: item.scope || item.description,
          nda_requested: item.nda_requested,
          status: item.status as any,
          created_at: item.created_at,
        };
      });
    } catch {
      try {
        return JSON.parse(localStorage.getItem('psy_inquiries') || '[]');
      } catch {
        return [];
      }
    }
  },

  async updateStatus(id: string, status: NonNullable<Inquiry['status']>): Promise<boolean> {
    try {
      const stored = JSON.parse(localStorage.getItem('psy_inquiries') || '[]');
      const updated = stored.map((item: any) =>
        item.id === id ? { ...item, status } : item
      );
      localStorage.setItem('psy_inquiries', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: status as any })
        .eq('id', id);

      return !error;
    }

    return true;
  },
};

export default inquiryService;
