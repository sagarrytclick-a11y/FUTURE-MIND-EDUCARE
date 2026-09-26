import assert from 'node:assert';
import Module from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT = '/home/sagar-bisht/Documents/Office Projects/future mind edu';
const OUT = path.join(PROJECT, '.tmp-live');

type ResolveFilename = (
  request: string,
  parent: NodeModule | undefined,
  isMain: boolean,
  options?: { paths?: string[] }
) => string;

const moduleInternals = Module as unknown as { _resolveFilename: ResolveFilename };
const originalResolve = moduleInternals._resolveFilename;
moduleInternals._resolveFilename = function (request: string, ...rest: unknown[]) {
  if (request.startsWith('@/')) request = path.join(OUT, request.slice(2));
  return originalResolve.call(this, request, ...(rest as [NodeModule | undefined, boolean]));
};

function loadEnv() {
  for (const line of fs.readFileSync(path.join(PROJECT, '.env'), 'utf8').split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1);
    if (value && !process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnv();

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error('ADMIN_EMAIL is not set in .env');
  console.log('enquiry notifications ->', adminEmail);

  const { getMailConfigStatus } = await import(path.join(OUT, 'lib/mailer.js'));
  console.log('smtp config:', JSON.stringify(getMailConfigStatus()));

  const { POST } = await import(path.join(OUT, 'app/api/send-email/route.js'));
  const connectDB = (await import(path.join(OUT, 'lib/mongodb.js'))).default;
  const Enquiry = (await import(path.join(OUT, 'models/Enquiry.js'))).default;

  try {
    await connectDB();
  } catch (error) {
    console.log('mongo unavailable, testing email path only:', (error as Error).message.slice(0, 80));
  }

  const started = Date.now();
  const response = await (POST as (req: unknown) => Promise<Response>)({
    json: async () => ({
      name: 'Live SMTP Test',
      email: adminEmail,
      mobile: '9876543210',
      courseInterest: 'mbbs-abroad',
      neetScore: '542',
      message: 'Automated live delivery check — safe to ignore.',
    }),
  });
  const payload = (await response.json()) as Record<string, unknown>;

  console.log('\nHTTP status :', response.status);
  console.log('response    :', JSON.stringify(payload));
  console.log('elapsed     :', Date.now() - started, 'ms');

  try {
    await Enquiry.deleteMany({ name: 'Live SMTP Test' });
  } catch {
    /* db not available */
  }

  fs.rmSync(OUT, { recursive: true, force: true });

  assert.equal(response.status, 200, 'expected HTTP 200');
  assert.equal(payload.success, true, 'expected success:true');
  assert.equal(payload.emailSent, true, 'expected emailSent:true — check SMTP_PASS');
  console.log('\nLIVE DELIVERY OK — 2 emails sent to', adminEmail);
  process.exit(0);
}

main().catch((error) => {
  console.error('LIVE TEST FAILED:', error);
  process.exit(1);
});
