import nodemailer, { type Transporter } from 'nodemailer';
import { EMAIL_PATTERN } from '@/lib/validation';

const ADMIN_FALLBACK_EMAIL = 'sagarbishtz589@gmail.com';

export type SendMailInput = {
  to: string | string[];
  cc?: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type MailConfigStatus = {
  configured: boolean;
  host: string;
  port: number;
  secure: boolean;
  from: string;
  missing: string[];
};

function readConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = (process.env.SMTP_USER || '').trim();
  const pass = process.env.SMTP_PASS || '';
  const from = (process.env.FROM_EMAIL || '').trim();

  const missing: string[] = [];
  if (!host) missing.push('SMTP_HOST');
  if (!process.env.SMTP_PORT?.trim()) missing.push('SMTP_PORT');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');
  if (!from) missing.push('FROM_EMAIL');

  return { host, port, user, pass, from, missing };
}

export function getMailConfigStatus(): MailConfigStatus {
  const { host, port, from, missing } = readConfig();

  return {
    configured: missing.length === 0,
    host: host || 'not set',
    port: Number.isFinite(port) ? port : 587,
    secure: port === 465,
    from: from || 'not set',
    missing,
  };
}

export function isMailConfigured(): boolean {
  return getMailConfigStatus().configured;
}

function parseAddressList(raw: string, label: string): string[] {
  const valid: string[] = [];

  for (const entry of raw.split(',')) {
    const address = entry.trim().toLowerCase();
    if (!address) continue;
    if (!EMAIL_PATTERN.test(address)) {
      console.warn(`${label}: ignoring invalid address "${entry.trim()}"`);
      continue;
    }
    if (!valid.includes(address)) valid.push(address);
  }

  return valid;
}

export function getAdminRecipients(): string[] {
  const raw = (process.env.ADMIN_EMAIL || '').trim();
  const parsed = raw ? parseAddressList(raw, 'ADMIN_EMAIL') : [];
  return parsed.length > 0 ? parsed : [ADMIN_FALLBACK_EMAIL];
}

export function getCcRecipients(): string[] {
  const raw = (process.env.EMAIL_CC || '').trim();
  if (!raw) return [];
  return parseAddressList(raw, 'EMAIL_CC');
}

let cachedTransporter: Transporter | null = null;

export function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const status = getMailConfigStatus();
  if (!status.configured) {
    throw new Error(
      `SMTP is not configured. Missing: ${status.missing.join(', ')}`
    );
  }

  const { host, port, user, pass } = readConfig();

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return cachedTransporter;
}

export async function verifyMailConnection(): Promise<{ ok: boolean; message: string }> {
  try {
    await getTransporter().verify();
    return { ok: true, message: 'SMTP connection verified' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SMTP error';
    return { ok: false, message };
  }
}

export async function sendMail(input: SendMailInput): Promise<{ messageId: string }> {
  const { from } = readConfig();
  const cc = input.cc?.length ? input.cc : undefined;

  const result = await getTransporter().sendMail({
    from,
    to: input.to,
    ...(cc ? { cc } : {}),
    subject: input.subject,
    html: input.html,
    text: input.text ?? input.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    replyTo: input.replyTo,
    newline: '\r\n',
  });

  return { messageId: result.messageId };
}
