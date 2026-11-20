import { Inquiry } from '../types';

/**
 * Generates an official, verifiable Unique Receipt Identifier (UID).
 * Format: PSC-{YEAR}-{6_ALPHANUMERIC_UPPERCASE}
 * e.g., PSC-2026-X8K9M2
 */
export function generateReceiptUID(): string {
  const year = new Date().getFullYear();
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // base32 human-readable characters
  let token = '';
  for (let i = 0; i < 6; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PSC-${year}-${token}`;
}

export interface ReceiptDetails {
  uid: string;
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  project_type: string;
  budget: string;
  timeline: string;
  nda_requested?: boolean;
  description: string;
  created_at: string;
  sla_guarantee?: string;
}

/**
 * Generates plain-text receipt for copying or text download.
 */
export function generateTextReceipt(receipt: ReceiptDetails): string {
  return (
    `========================================================================\n` +
    `                     PSYCODES STUDIO // OFFICIAL RECEIPT                \n` +
    `========================================================================\n` +
    `RECEIPT UID    : ${receipt.uid}\n` +
    `DATE & TIME    : ${new Date(receipt.created_at).toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} PKT\n` +
    `STATUS         : VERIFIED INGESTION · PENDING REVIEW\n` +
    `SLA GUARANTEE  : Response Guaranteed Within 24 Hours\n` +
    `------------------------------------------------------------------------\n` +
    `CLIENT PROFILE\n` +
    `------------------------------------------------------------------------\n` +
    `Name           : ${receipt.name}\n` +
    `Email          : ${receipt.email}\n` +
    `WhatsApp       : ${receipt.whatsapp || 'Not Specified'}\n` +
    `Company        : ${receipt.company || 'Not Specified'}\n` +
    `------------------------------------------------------------------------\n` +
    `PROJECT SPECIFICATIONS\n` +
    `------------------------------------------------------------------------\n` +
    `Discipline     : ${receipt.project_type}\n` +
    `Budget Tier    : ${receipt.budget}\n` +
    `Target Timeline: ${receipt.timeline}\n` +
    `Mutual NDA     : ${receipt.nda_requested ? 'REQUIRED (Will be executed prior to sprint)' : 'Standard Studio Privacy'}\n` +
    `------------------------------------------------------------------------\n` +
    `PROJECT SCOPE & BRIEF\n` +
    `------------------------------------------------------------------------\n` +
    `${receipt.description}\n\n` +
    `------------------------------------------------------------------------\n` +
    `STUDIO VERIFICATION & CONTACT\n` +
    `------------------------------------------------------------------------\n` +
    `Studio Inbox   : psycodestech@gmail.com\n` +
    `Official Site  : https://www.psycodestudio.tech\n` +
    `HQ Location    : Karachi, Pakistan · Serving Global Clients\n` +
    `========================================================================\n` +
    `Thank you for trusting PsyCodes Studio with your digital product.\n`
  );
}

/**
 * Generates responsive, high-fidelity cyber-luxe HTML receipt for Resend email dispatch.
 */
export function generateHtmlReceipt(receipt: ReceiptDetails, isForClient = true): string {
  const formattedDate = new Date(receipt.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Karachi',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PsyCodes Studio Official Receipt - ${receipt.uid}</title>
  <style>
    body { margin:0; padding:0; background-color:#070b19; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#dde1fc; }
    .container { max-width:600px; margin:24px auto; background-color:#0d1428; border:1px solid #1f2b4d; border-radius:16px; overflow:hidden; }
    .header { padding:32px 32px 24px; background:linear-gradient(135deg, #0e1733 0%, #17234a 100%); border-bottom:1px solid #1f2b4d; }
    .badge { display:inline-block; padding:4px 10px; border-radius:20px; font-size:11px; font-family:monospace; background:rgba(24,217,246,0.12); color:#18d9f6; border:1px solid rgba(24,217,246,0.3); }
    .title { margin:12px 0 4px; font-size:22px; font-weight:700; color:#ffffff; }
    .subtitle { margin:0; font-size:13px; color:#8c95b8; }
    .body { padding:28px 32px; }
    .uid-card { background:#070b19; border:1px solid #1f2b4d; border-radius:12px; padding:16px 20px; margin-bottom:24px; }
    .uid-label { font-size:10px; font-family:monospace; color:#8c95b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
    .uid-value { font-size:20px; font-weight:700; font-family:monospace; color:#18d9f6; letter-spacing:1px; }
    .table-spec { width:100%; border-collapse:collapse; margin-bottom:24px; font-size:13px; }
    .table-spec td { padding:10px 0; border-bottom:1px solid #17213e; }
    .table-spec td.label { color:#8c95b8; width:38%; }
    .table-spec td.val { color:#ffffff; font-weight:600; text-align:right; }
    .brief-card { background:#090f22; border-left:3px solid #18d9f6; padding:14px 18px; border-radius:6px; margin-bottom:24px; font-size:13px; line-height:1.6; color:#c0c8eb; }
    .footer { padding:24px 32px; background:#070b19; border-top:1px solid #1f2b4d; font-size:12px; color:#687299; text-align:center; }
    .btn { display:inline-block; padding:12px 24px; border-radius:8px; background:linear-gradient(90deg, #258bff, #873bda); color:#ffffff; text-decoration:none; font-weight:700; font-size:13px; margin-top:8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">OFFICIAL INTAKE RECEIPT · VERIFIED</span>
      <h1 class="title">${isForClient ? 'Thank You for Your Order Inquiry' : 'New Client Commission Inquiry'}</h1>
      <p class="subtitle">${isForClient ? 'Your project specifications have been officially received by PsyCodes Studio.' : 'A new client has submitted their project brief through the website.'}</p>
    </div>
    <div class="body">
      <div class="uid-card">
        <div class="uid-label">OFFICIAL RECEIPT UID</div>
        <div class="uid-value">${receipt.uid}</div>
        <div style="font-size:11px; color:#8c95b8; margin-top:4px;">Date: ${formattedDate} PKT · Response SLA: &lt; 24 Hours</div>
      </div>

      <table class="table-spec">
        <tr>
          <td class="label">Client Name</td>
          <td class="val">${receipt.name}</td>
        </tr>
        <tr>
          <td class="label">Client Email</td>
          <td class="val">${receipt.email}</td>
        </tr>
        ${receipt.whatsapp ? `<tr><td class="label">WhatsApp Number</td><td class="val" style="color:#2ecc71;">${receipt.whatsapp}</td></tr>` : ''}
        ${receipt.company ? `<tr><td class="label">Company / Brand</td><td class="val">${receipt.company}</td></tr>` : ''}
        <tr>
          <td class="label">Project Discipline</td>
          <td class="val" style="color:#18d9f6;">${receipt.project_type}</td>
        </tr>
        <tr>
          <td class="label">Target Budget</td>
          <td class="val" style="color:#2ecc71;">${receipt.budget}</td>
        </tr>
        <tr>
          <td class="label">Estimated Timeline</td>
          <td class="val">${receipt.timeline}</td>
        </tr>
        <tr>
          <td class="label">Mutual NDA Status</td>
          <td class="val">${receipt.nda_requested ? 'Required (Pre-Sprint Signature)' : 'Standard Studio Privacy'}</td>
        </tr>
      </table>

      <div style="font-size:11px; font-weight:700; color:#8c95b8; margin-bottom:8px; text-transform:uppercase; font-family:monospace;">Project Brief &amp; Vision</div>
      <div class="brief-card">${receipt.description.replace(/\n/g, '<br/>')}</div>

      ${isForClient ? `
      <div style="text-align:center; padding:12px 0 4px;">
        <p style="font-size:13px; color:#c0c8eb; margin:0 0 12px;">Need to share additional assets, Figma files, or wireframes?</p>
        <a href="mailto:psycodestech@gmail.com?subject=Additional%20Files%20for%20${receipt.uid}" class="btn">Reply with Attachments</a>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <strong>PsyCodes Studio</strong> · Code. Create. Automate.<br/>
      Karachi, Pakistan · Global Client Engagements<br/>
      <a href="https://www.psycodestudio.tech" style="color:#18d9f6; text-decoration:none;">psycodestudio.tech</a> · <a href="mailto:psycodestech@gmail.com" style="color:#18d9f6; text-decoration:none;">psycodestech@gmail.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Isolated print dispatcher:
 * Opens a clean, dedicated 1-page document in a hidden iframe containing ONLY the official receipt.
 * Prevents the browser print dialog from rendering the surrounding website layout, heroes, or footers.
 */
export function printReceipt(receipt: ReceiptDetails): void {
  // 1. Remove any previous print frame
  const existingFrame = document.getElementById('psy-isolated-print-frame');
  if (existingFrame) {
    existingFrame.remove();
  }

  // 2. Create invisible printing iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'psy-isolated-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';

  document.body.appendChild(iframe);

  const formattedDate = new Date(receipt.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const printDocumentHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PsyCodes-Receipt-${receipt.uid}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
    }
    .receipt-card {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      border: 1.5px solid #0f172a;
      border-radius: 12px;
      padding: 24px 28px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0f172a;
      margin: 0 0 2px 0;
    }
    .brand-subtitle {
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0284c7;
      font-weight: 700;
      margin: 0;
    }
    .uid-block {
      text-align: right;
    }
    .uid-label {
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      font-weight: 700;
    }
    .uid-value {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 17px;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: 1px;
      margin-top: 2px;
    }
    .status-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 16px;
      font-size: 11.5px;
    }
    .meta-title {
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      font-weight: 700;
      margin-bottom: 2px;
    }
    .meta-val {
      font-weight: 700;
      color: #0f172a;
    }
    .meta-val.status {
      color: #16a34a;
    }
    .meta-val.sla {
      color: #0284c7;
    }
    .section-heading {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 800;
      color: #0f172a;
      margin: 14px 0 6px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
    }
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 12.5px;
    }
    .spec-table td {
      padding: 6px 8px;
      border-bottom: 1px solid #f1f5f9;
    }
    .spec-table td.label {
      width: 32%;
      color: #64748b;
      font-weight: 600;
    }
    .spec-table td.val {
      color: #0f172a;
      font-weight: 600;
    }
    .spec-table td.val-highlight {
      color: #0284c7;
      font-weight: 700;
    }
    .spec-table td.val-price {
      color: #16a34a;
      font-weight: 700;
    }
    .brief-container {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #0284c7;
      border-radius: 6px;
      padding: 12px 14px;
      font-size: 12px;
      line-height: 1.55;
      color: #1e293b;
      white-space: pre-wrap;
      margin-bottom: 16px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 12px;
      margin-top: 16px;
      font-size: 10.5px;
      color: #64748b;
    }
    .footer strong {
      color: #0f172a;
    }
  </style>
</head>
<body>
  <div class="receipt-card">
    <div class="header">
      <div>
        <h1 class="brand-title">PSYCODES STUDIO</h1>
        <p class="brand-subtitle">Official Digital Order Receipt · Ingestion Dossier</p>
      </div>
      <div class="uid-block">
        <div class="uid-label">RECEIPT UID</div>
        <div class="uid-value">${receipt.uid}</div>
      </div>
    </div>

    <div class="status-strip">
      <div>
        <div class="meta-title">Timestamp</div>
        <div class="meta-val">${formattedDate} PKT</div>
      </div>
      <div>
        <div class="meta-title">Ingestion Status</div>
        <div class="meta-val status">VERIFIED &amp; LOGGED</div>
      </div>
      <div>
        <div class="meta-title">Response SLA</div>
        <div class="meta-val sla">&lt; 24 Hours Guaranteed</div>
      </div>
    </div>

    <div class="section-heading">Client Profile</div>
    <table class="spec-table">
      <tr>
        <td class="label">Client Name:</td>
        <td class="val">${receipt.name}</td>
      </tr>
      <tr>
        <td class="label">Client Email:</td>
        <td class="val">${receipt.email}</td>
      </tr>
      ${receipt.whatsapp ? `<tr><td class="label">WhatsApp:</td><td class="val val-highlight">${receipt.whatsapp}</td></tr>` : ''}
      ${receipt.company ? `<tr><td class="label">Company / Brand:</td><td class="val">${receipt.company}</td></tr>` : ''}
    </table>

    <div class="section-heading">Project Specifications</div>
    <table class="spec-table">
      <tr>
        <td class="label">Discipline / Service:</td>
        <td class="val-highlight">${receipt.project_type}</td>
      </tr>
      <tr>
        <td class="label">Target Budget:</td>
        <td class="val-price">${receipt.budget}</td>
      </tr>
      <tr>
        <td class="label">Target Timeline:</td>
        <td class="val">${receipt.timeline}</td>
      </tr>
      <tr>
        <td class="label">Mutual NDA Status:</td>
        <td class="val">${receipt.nda_requested ? 'Mutual NDA Requested (Will execute prior to sprint)' : 'Standard Studio Confidentiality & IP Protection'}</td>
      </tr>
    </table>

    <div class="section-heading">Submitted Project Scope &amp; Brief</div>
    <div class="brief-container">${receipt.description}</div>

    <div class="footer">
      <div>
        <strong>PsyCodes Studio</strong> · Karachi, PK · <a href="https://psycodes.dev" style="color:#0284c7; text-decoration:none;">psycodes.dev</a>
      </div>
      <div>
        Direct Inquiries: <a href="mailto:psycodestech@gmail.com" style="color:#0284c7; text-decoration:none;">psycodestech@gmail.com</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!frameDoc) return;

  frameDoc.open();
  frameDoc.write(printDocumentHtml);
  frameDoc.close();

  // Trigger print after iframe renders
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.warn('Iframe print error, falling back to window.print():', e);
      window.print();
    }

    // Cleanup iframe after print dialog completes
    setTimeout(() => {
      iframe.remove();
    }, 2000);
  }, 250);
}
