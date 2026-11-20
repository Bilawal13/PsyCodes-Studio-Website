import { ReceiptDetails, generateHtmlReceipt } from '../utils/receiptGenerator';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client';

export interface ResendDispatchResult {
  clientSent: boolean;
  studioSent: boolean;
  requiresDomainVerification?: boolean;
  error?: string;
}

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const FROM_EMAIL = import.meta.env.VITE_RESEND_FROM_EMAIL || 'PsyCodes Studio <onboarding@resend.dev>';
const STUDIO_INBOX = import.meta.env.VITE_STUDIO_EMAIL || 'psycodestech@gmail.com';

export const resendService = {
  /**
   * Dispatches synced emails through Resend API (or Supabase Edge Function):
   * 1. Official Receipt to the client with UID
   * 2. Intake notification to the studio lead team with UID
   */
  async dispatchReceiptEmails(receipt: ReceiptDetails): Promise<ResendDispatchResult> {
    let clientSent = false;
    let studioSent = false;
    let requiresDomainVerification = false;

    // A. Check if Supabase Edge Function is configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('send-inquiry-email', {
          body: { receipt },
        });
        if (!error && data?.success) {
          return { clientSent: Boolean(data.clientSent), studioSent: Boolean(data.studioSent) };
        }
      } catch {
        // Fallback to direct client API if Edge Function is not deployed
      }
    }

    // B. Direct Resend REST API if VITE_RESEND_API_KEY is configured
    if (RESEND_API_KEY && !RESEND_API_KEY.includes('...')) {
      // Determine endpoint: use Vite proxy when in dev or direct Resend API
      const endpoints = ['/api/resend/emails', 'https://api.resend.com/emails'];

      const sendEmail = async (payload: { from: string; to: string[]; reply_to?: string; subject: string; html: string }) => {
        for (const url of endpoints) {
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (res.ok) {
              return { success: true };
            }

            const data = await res.json().catch(() => null);
            if (data?.message?.includes('verify a domain at resend.com/domains') || res.status === 403) {
              return { success: false, requiresDomainVerification: true, error: data?.message };
            }
          } catch {
            // Try next endpoint (e.g. if local proxy fails, try direct)
          }
        }
        return { success: false };
      };

      try {
        // 1. Send receipt to Client
        const clientHtml = generateHtmlReceipt(receipt, true);
        const clientRes = await sendEmail({
          from: FROM_EMAIL,
          to: [receipt.email],
          subject: `[PsyCodes Receipt: ${receipt.uid}] Official Project Intake Confirmation`,
          html: clientHtml,
        });

        if (clientRes.success) {
          clientSent = true;
        } else if (clientRes.requiresDomainVerification) {
          requiresDomainVerification = true;
          console.info(
            `[PsyCodes Intake] Resend note: onboarding@resend.dev only sends to verified account (${STUDIO_INBOX}). Client receipt displayed on-screen with synced UID ${receipt.uid}. To enable client auto-email, verify your domain at resend.com/domains.`
          );
        }

        // 2. Send notification to Studio Inbox
        const studioHtml = generateHtmlReceipt(receipt, false);
        const studioRes = await sendEmail({
          from: FROM_EMAIL,
          to: [STUDIO_INBOX],
          reply_to: receipt.email,
          subject: `[PsyCodes Lead: ${receipt.uid}] ${receipt.project_type} — ${receipt.name}`,
          html: studioHtml,
        });

        if (studioRes.success) {
          studioSent = true;
        }

        return { clientSent, studioSent, requiresDomainVerification };
      } catch (err: any) {
        console.warn('Resend direct dispatch notice:', err);
        return { clientSent: false, studioSent: false, error: err?.message };
      }
    }

    return { clientSent: false, studioSent: false };
  },
};
