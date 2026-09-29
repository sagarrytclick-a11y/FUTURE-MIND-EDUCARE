import { SITE_IDENTITY } from '@/app/config/site_identity';
import { SITE_URL } from '@/app/config/seo';

const BRAND_NAVY = '#1e1b4b';
const BRAND_NAVY_SOFT = '#342e78';
const BRAND_BLUE = '#5048b4';
const ACCENT = '#eab308';
const ACCENT_DEEP = '#d97706';
const LIGHT_BG = '#f8fafc';
const DARK_BG = '#1e1b4b';
const LIGHT_CARD = '#ffffff';
const DARK_CARD = '#262257';
const LIGHT_ROW = '#f8fafc';
const DARK_ROW = '#1e1b4b';
const LIGHT_TEXT = '#0f172a';
const DARK_TEXT = '#f1f5f9';
const LIGHT_MUTED = '#64748b';
const DARK_MUTED = '#c3c7ef';
const BORDER_LIGHT = '#e2e8f0';
const BORDER_DARK = '#342e78';


const PHONE_DIGITS = SITE_IDENTITY.contact.phone.replace(/\D/g, '');
const PHONE_DISPLAY = `+91 ${SITE_IDENTITY.contact.phone}`;

/** Hostname without protocol, e.g. "futuremindedu.in". */
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const DARK_MODE_CSS = `
    :root { color-scheme: light dark; supported-color-scripts: dark; }
    @media (prefers-color-scheme: dark) {
      .em-bg      { background-color: ${DARK_BG} !important; }
      .em-card    { background-color: ${DARK_CARD} !important; border-color: ${BORDER_DARK} !important; }
      .em-row     { background-color: ${DARK_ROW} !important; border-color: ${BORDER_DARK} !important; }
      .em-text    { color: ${DARK_TEXT} !important; }
      .em-muted   { color: ${DARK_MUTED} !important; }
      .em-title   { color: #ffffff !important; }
      .em-accent  { color: ${ACCENT} !important; }
      .em-btn     { background-color: ${ACCENT} !important; color: ${BRAND_NAVY} !important; border-color: ${ACCENT} !important; }
      .em-btn-sec { background-color: ${DARK_ROW} !important; color: ${DARK_TEXT} !important; border-color: ${BORDER_DARK} !important; }
      .em-chip    { background-color: rgba(234, 179, 8, 0.14) !important; border-color: rgba(234, 179, 8, 0.35) !important; }
      .em-quote   { background-color: ${DARK_ROW} !important; border-color: ${BORDER_DARK} !important; }
      .em-divider { border-color: ${BORDER_DARK} !important; }
      .em-step    { background-color: ${BRAND_NAVY_SOFT} !important; color: ${ACCENT} !important; }
      .em-header  { background-color: ${DARK_BG} !important; }
    }
`;

function header(eyebrow: string, title: string, subtitle: string): string {
  return `
        <tr>
          <td class="em-header" bgcolor="${BRAND_NAVY}" style="background-color:${BRAND_NAVY};padding:28px 32px;border-bottom:4px solid ${ACCENT};">
            <p style="margin:0 0 10px;font-size:11px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};font-weight:700;">
              ${escapeHtml(eyebrow)}
            </p>
            <h1 class="em-title" style="margin:0;font-size:24px;line-height:32px;font-weight:800;color:#ffffff;letter-spacing:-0.4px;">
              ${escapeHtml(title)}
            </h1>
            <p class="em-muted" style="margin:8px 0 0;font-size:14px;line-height:20px;color:#c7d2fe;">
              ${escapeHtml(subtitle)}
            </p>
          </td>
        </tr>`;
}

function detailRow(label: string, valueHtml: string, last = false): string {
  return `
            <tr>
              <td class="em-row" bgcolor="${LIGHT_ROW}" style="background-color:${LIGHT_ROW};padding:12px 16px;border:1px solid ${BORDER_LIGHT};${last ? '' : 'border-bottom:0;'}${last ? '' : ''}font-size:13px;line-height:20px;color:${LIGHT_MUTED};font-weight:600;width:38%;vertical-align:top;">
                ${escapeHtml(label)}
              </td>
              <td class="em-row em-text" bgcolor="${LIGHT_ROW}" style="background-color:${LIGHT_ROW};padding:12px 16px;border:1px solid ${BORDER_LIGHT};border-left:none;font-size:14px;line-height:20px;color:${LIGHT_TEXT};font-weight:600;vertical-align:top;">
                ${valueHtml}
              </td>
            </tr>`;
}

function button(href: string, label: string, secondary = false): string {
  const bg = secondary ? LIGHT_ROW : ACCENT;
  const fg = secondary ? LIGHT_TEXT : BRAND_NAVY;
  const cls = secondary ? 'em-btn-sec' : 'em-btn';
  const bd = secondary ? BORDER_LIGHT : ACCENT;
  return `<a href="${href}" class="${cls}" style="display:inline-block;background-color:${bg};color:${fg};border:1px solid ${bd};border-radius:9999px;padding:12px 24px;font-size:14px;line-height:16px;font-weight:700;text-decoration:none;">${escapeHtml(label)}</a>`;
}

function shell(options: {
  preheader: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  content: string;
  footerNote: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-scripts" content="dark" />
    <title>${escapeHtml(options.title)}</title>
    <style>${DARK_MODE_CSS}</style>
    <!--[if mso]>
    <style>body,table,td{font-family:Segoe UI,Arial,sans-serif !important;}</style>
    <![endif]-->
  </head>
  <body class="em-bg" bgcolor="${LIGHT_BG}" style="margin:0;padding:0;background-color:${LIGHT_BG};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(options.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="em-bg" bgcolor="${LIGHT_BG}" style="background-color:${LIGHT_BG};">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;">
            <tr>
              <td class="em-card" bgcolor="${LIGHT_CARD}" style="background-color:${LIGHT_CARD};border:1px solid ${BORDER_LIGHT};border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.06);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${header(options.eyebrow, options.title, options.subtitle)}
                  ${options.content}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 8px;text-align:center;">
                <p class="em-muted" style="margin:0 0 6px;font-size:12px;line-height:18px;color:${LIGHT_MUTED};">
                  <strong style="color:${LIGHT_TEXT};">${escapeHtml(SITE_IDENTITY.name)}</strong><br />
                  ${escapeHtml(SITE_IDENTITY.tagline)}
                </p>
                <p class="em-muted" style="margin:0;font-size:11px;line-height:17px;color:${LIGHT_MUTED};">
                  ${escapeHtml(SITE_IDENTITY.address.building)}, ${escapeHtml(SITE_IDENTITY.address.landmark)},<br />
                  ${escapeHtml(SITE_IDENTITY.address.area)}, ${escapeHtml(SITE_IDENTITY.address.city)} - ${escapeHtml(SITE_IDENTITY.address.pincode)}<br />
                  <a href="tel:+${PHONE_DIGITS}" class="em-accent" style="color:${BRAND_BLUE};text-decoration:none;font-weight:700;">${escapeHtml(PHONE_DISPLAY)}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:${SITE_IDENTITY.contact.email}" class="em-accent" style="color:${BRAND_BLUE};text-decoration:none;font-weight:700;">${escapeHtml(SITE_IDENTITY.contact.email)}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 0;text-align:center;">
                <p class="em-muted" style="margin:0;font-size:11px;line-height:17px;color:${LIGHT_MUTED};">
                  ${options.footerNote}
                </p>
                <p class="em-muted" style="margin:10px 0 0;font-size:11px;line-height:17px;color:${LIGHT_MUTED};">
                  <a href="${SITE_URL}" class="em-accent" style="color:${BRAND_BLUE};text-decoration:none;font-weight:700;">${SITE_HOST}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function chip(label: string, value: string): string {
  return `<span class="em-chip" style="display:inline-block;background-color:rgba(250,204,21,0.16);border:1px solid rgba(250,204,21,0.4);border-radius:9999px;padding:6px 14px;margin:0 8px 8px 0;font-size:12px;line-height:16px;font-weight:700;color:${ACCENT_DEEP};">${escapeHtml(label)}: ${escapeHtml(value)}</span>`;
}

export type EnquiryEmailData = {
  name: string;
  email: string;
  mobile: string;
  courseInterest: string;
  neetScore: string;
  message: string;
  submittedAt: string;
};

const COURSE_LABELS: Record<string, string> = {
  'mbbs-abroad': 'MBBS Abroad',
  'mbbs-india': 'MBBS India',
  'neet-ug': 'NEET UG Counselling',
  'neet-pg': 'NEET PG Counselling',
  'md-ms-bds': 'MD / MS / BDS',
  'general-inquiry': 'General Inquiry',
};

export function courseLabel(value: string): string {
  return COURSE_LABELS[value] ?? value;
}

export function adminEnquiryEmail(data: EnquiryEmailData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const mobile = escapeHtml(data.mobile);

  const messageBlock = data.message
    ? `
            <tr>
              <td style="padding:24px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <p class="em-muted" style="margin:0 0 8px;font-size:11px;line-height:16px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:${LIGHT_MUTED};">
                        Student message
                      </p>
                      <div class="em-quote" style="background-color:${LIGHT_ROW};border-left:3px solid ${ACCENT};border-radius:0 12px 12px 0;padding:14px 16px;">
                        <p class="em-text" style="margin:0;font-size:14px;line-height:22px;color:${LIGHT_TEXT};">${escapeHtml(data.message)}</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
    : '';

  const content = `
            <tr>
              <td style="padding:24px 32px 4px;">
                <div>
                  ${chip('Course', courseLabel(data.courseInterest))}
                  ${data.neetScore ? chip('NEET', `${data.neetScore} / 720`) : ''}
                  ${chip('Received', data.submittedAt)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <p class="em-muted" style="margin:0 0 10px;font-size:11px;line-height:16px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:${LIGHT_MUTED};">
                  Student details
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
                  ${detailRow('Full name', `<span class="em-title" style="font-size:15px;color:${LIGHT_TEXT};">${name}</span>`)}
                  ${detailRow(
                    'Email',
                    `<a href="mailto:${email}" class="em-accent" style="color:${BRAND_BLUE};text-decoration:none;font-weight:700;">${email}</a>`
                  )}
                  ${detailRow(
                    'Mobile',
                    `<a href="tel:+${PHONE_DIGITS}" class="em-accent" style="color:${BRAND_BLUE};text-decoration:none;font-weight:700;">+${mobile}</a>`
                  )}
                  ${detailRow('Course interest', escapeHtml(courseLabel(data.courseInterest)))}
                  ${detailRow(
                    'NEET score',
                    data.neetScore
                      ? `<span class="em-title" style="color:${LIGHT_TEXT};">${escapeHtml(data.neetScore)}</span> <span class="em-muted" style="color:${LIGHT_MUTED};font-weight:500;">/ 720</span>`
                      : '<span class="em-muted" style="color:${LIGHT_MUTED};font-weight:500;">Not provided</span>',
                    true
                  )}
                </table>
              </td>
            </tr>
            ${messageBlock}
            <tr>
              <td style="padding:26px 32px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding-bottom:12px;">
                      ${button(`tel:+${data.mobile.replace(/\D/g, '')}`, 'Call student')}
                    </td>
                    <td align="center">
                      ${button(`mailto:${data.email}?subject=Re:%20Your%20MBBS%20Admission%20Inquiry%20-%20Future%20Mind%20Educare`, 'Reply by email', true)}
                    </td>
                  </tr>
                </table>
                <p class="em-muted" style="margin:16px 0 0;text-align:center;font-size:12px;line-height:18px;color:${LIGHT_MUTED};">
                  Reply directly to this email to reach ${name} at ${email}.
                </p>
              </td>
            </tr>`;

  return shell({
    preheader: `New ${courseLabel(data.courseInterest)} inquiry from ${data.name} (${data.mobile})`,
    eyebrow: 'New Admission Inquiry',
    title: `${data.name} just reached out`,
    subtitle: `${courseLabel(data.courseInterest)}${data.neetScore ? ` · NEET ${data.neetScore}/720` : ''} · received ${data.submittedAt}`,
    content,
    footerNote:
      'This is an automated alert from the Future Mind Educare admission system. Please follow up within 24 hours.',
  });
}

export function studentEnquiryEmail(data: EnquiryEmailData): string {
  const name = escapeHtml(data.name);

  const steps = [
    'Our admission counsellor reviews your profile',
    'You get a call or email within 24-48 hours',
    'We shortlist colleges that fit your budget and goals',
    'We help you with documentation and the full admission process',
  ];

  const content = `
            <tr>
              <td style="padding:26px 32px 0;">
                <p class="em-text" style="margin:0 0 16px;font-size:15px;line-height:24px;color:${LIGHT_TEXT};">
                  Dear ${name}, thank you for reaching out to
                  <strong style="color:${BRAND_NAVY};">${escapeHtml(SITE_IDENTITY.name)}</strong>.
                  Your enquiry has been received and a counsellor is already looking into it.
                </p>
                <div>
                  ${chip('Course', courseLabel(data.courseInterest))}
                  ${data.neetScore ? chip('NEET score', `${data.neetScore} / 720`) : ''}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
                  <tr>
                    <td style="padding-bottom:10px;">
                      <p class="em-muted" style="margin:0;font-size:11px;line-height:16px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:${LIGHT_MUTED};">
                        What happens next
                      </p>
                    </td>
                  </tr>
                  ${steps
                    .map(
                      (step, index) => `
                  <tr>
                    <td style="padding:0 0 12px;vertical-align:top;width:34px;">
                      <span class="em-step" style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:9999px;background-color:${BRAND_NAVY_SOFT};color:${ACCENT};font-size:12px;font-weight:800;">${index + 1}</span>
                    </td>
                    <td class="em-text" style="font-size:14px;line-height:24px;color:${LIGHT_TEXT};padding:0 0 12px;vertical-align:top;">${escapeHtml(step)}</td>
                  </tr>`
                    )
                    .join('')}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 32px 0;">
                <div class="em-quote" style="background-color:${LIGHT_ROW};border:1px solid ${BORDER_LIGHT};border-radius:16px;padding:18px 20px;">
                  <p class="em-muted" style="margin:0 0 10px;font-size:11px;line-height:16px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:${LIGHT_MUTED};">
                    Talk to a counsellor
                  </p>
                  <p class="em-title" style="margin:0 0 4px;font-size:18px;line-height:26px;font-weight:800;color:${LIGHT_TEXT};">${escapeHtml(PHONE_DISPLAY)}</p>
                  <p class="em-muted" style="margin:0 0 14px;font-size:12px;line-height:18px;color:${LIGHT_MUTED};">
                    Mon - Sat, ${escapeHtml(SITE_IDENTITY.officeHours.mondayToSaturday)}
                  </p>
                  ${button(`tel:+${PHONE_DIGITS}`, 'Call now')}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:26px 32px 32px;">
                ${button(`${SITE_URL}/contact`, 'Explore admission guidance', true)}
              </td>
            </tr>`;

  return shell({
    preheader: `We have received your ${courseLabel(data.courseInterest)} enquiry. A counsellor will call you within 24-48 hours.`,
    eyebrow: 'Enquiry received',
    title: 'Thank you for your interest',
    subtitle: 'Your admission counsellor is on it',
    content,
    footerNote:
      'You are receiving this because you submitted an enquiry on ${SITE_HOST}. Your details stay private and are never shared or sold.',
  });
}
