import assert from 'node:assert';
import Module from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';

const PROJECT = '/home/sagar-bisht/Documents/Office Projects/future mind edu';
const OUT = path.join(PROJECT, '.tmp-route');

type ApiResponse = {
  success?: boolean;
  emailSent?: boolean;
  error?: string;
  message?: string;
  errors?: Record<string, string>;
};

type ResolveFilename = (  request: string,
  parent: NodeModule | undefined,
  isMain: boolean,
  options?: { paths?: string[] }
) => string;

const moduleInternals = Module as unknown as {
  _resolveFilename: ResolveFilename;
};

// resolve "@/..." to the compiled output dir
const originalResolve = moduleInternals._resolveFilename;
moduleInternals._resolveFilename = function (
  request: string,
  ...args: Parameters<ResolveFilename> extends [string, ...infer Rest] ? Rest : never[]
) {
  if (request.startsWith('@/')) {
    request = path.join(OUT, request.slice(2));
  }
  return originalResolve.call(this, request, ...args);
};

// env: point SMTP at a local fake server
const captured: { messages: string[]; current: string; inData: boolean } = {
  messages: [],
  current: '',
  inData: false,
};

const server = net.createServer((socket) => {
  let buffer = '';
  socket.write('220 fake.local ESMTP\r\n');
  socket.on('data', (chunk) => {
    buffer += chunk.toString('utf8');
    while (true) {
      if (captured.inData) {
        const end = buffer.indexOf('\r\n.\r\n');
        if (end === -1) return;
        captured.current += buffer.slice(0, end);
        buffer = buffer.slice(end + 5);
        captured.inData = false;
        captured.messages.push(captured.current);
        captured.current = '';
        socket.write('250 2.0.0 Ok\r\n');
        continue;
      }
      const nl = buffer.indexOf('\r\n');
      if (nl === -1) return;
      const line = buffer.slice(0, nl);
      buffer = buffer.slice(nl + 2);
      const cmd = line.split(' ')[0].toUpperCase();
      if (cmd === 'EHLO') socket.write('250-fake\r\n250-AUTH PLAIN LOGIN\r\n250 OK\r\n');
      else if (cmd === 'AUTH') socket.write('235 2.7.0 Ok\r\n');
      else if (cmd === 'DATA') {
        captured.inData = true;
        captured.current = '';
        socket.write('354 End data\r\n');
      } else if (cmd === 'QUIT') {
        socket.write('221 Bye\r\n');
        socket.end();
      } else socket.write('250 2.0.0 Ok\r\n');
    }
  });
  socket.on('error', () => {});
});

function decodeQuotedPrintable(input: string): string {
  return input
    .replace(/=\r?\n/g, '')
    .replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function getBody(raw: string): string {
  const parts = normalizeEol(raw).split(/--[\w-]+--/);
  const htmlPart = parts.find((part) => /Content-Type:\s*text\/html/i.test(part));
  const chosen = htmlPart ?? parts[0] ?? '';
  const bodySeparator = chosen.indexOf('\n\n');
  return decodeQuotedPrintable(bodySeparator === -1 ? chosen : chosen.slice(bodySeparator + 2));
}

function normalizeEol(raw: string): string {
  return raw.replace(/\r\n/g, '\n');
}

function parseHeaders(raw: string) {
  const headerBlock = normalizeEol(raw).split('\n\n')[0];
  const headers: Record<string, string> = {};
  let currentKey = '';
  for (const line of headerBlock.split('\n')) {
    if (/^\s/.test(line) && currentKey) {
      headers[currentKey] += ' ' + line.trim();
    } else {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      currentKey = line.slice(0, idx).trim();
      headers[currentKey] = line.slice(idx + 1).trim();
    }
  }
  return headers;
}

let pass = 0;
let fail = 0;
function check(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      pass++;
      console.log(`  ok  ${name}`);
    })
    .catch((error) => {
      fail++;
      console.log(`FAIL  ${name}: ${error.message}`);
    });
}

async function main() {
  await new Promise<void>((resolve) => server.listen(2526, '127.0.0.1', () => resolve()));

  process.env.SMTP_HOST = '127.0.0.1';
  process.env.SMTP_PORT = '2526';
  process.env.SMTP_USER = 'edufuturemind@gmail.com';
  process.env.SMTP_PASS = 'fake-pass';
  process.env.FROM_EMAIL = 'Future Mind Educare <edufuturemind@gmail.com>';
  process.env.ADMIN_EMAIL = 'admissions@futuremindedu.in';
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mbbs-enquiries';

  const { POST } = await import(path.join(OUT, 'app/api/send-email/route.js'));
  const Enquiry = (await import(path.join(OUT, 'models/Enquiry.js'))).default;
  const connectDB = (await import(path.join(OUT, 'lib/mongodb.js'))).default;

  await connectDB();

  const call = async (body: unknown) => {
    const request = {
      json: async () => {
        if (body === '__BAD_JSON__') throw new Error('bad json');
        return body;
      },
    };
    const res = await POST(request as unknown as Parameters<typeof POST>[0]);
    const json = await res.json();
    return { status: res.status, json: json as ApiResponse };
  };

  console.log('\n--- route rejects invalid payloads before touching DB/email ---');
  await check('empty body -> 400 with field errors', async () => {
    const { status, json } = await call({});
    assert.equal(status, 400);
    assert.ok(json.errors?.name);
    assert.ok(json.errors?.email);
    assert.ok(json.errors?.mobile);
    assert.ok(json.errors?.courseInterest);
  });

  await check('invalid email + mobile -> 400', async () => {
    const { status, json } = await call({
      name: 'Aarav Sharma',
      email: 'not-an-email',
      mobile: '1234',
      courseInterest: 'mbbs-india',
      neetScore: '500',
    });
    assert.equal(status, 400);
    assert.ok(json.errors?.email);
    assert.ok(json.errors?.mobile);
  });

  await check('out-of-range NEET score -> 400', async () => {
    const { status } = await call({
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      mobile: '9876543210',
      courseInterest: 'mbbs-india',
      neetScore: '900',
    });
    assert.equal(status, 400);
  });

  await check('malformed JSON -> 400', async () => {
    const { status, json } = await call('__BAD_JSON__');
    assert.equal(status, 400);
    assert.match(json.error ?? '', /Invalid request body/);
  });

  console.log('\n--- route happy path: DB save + both emails ---');
  const before = await Enquiry.countDocuments({ email: 'aarav@example.com' });

  await check('valid payload -> 200 success, emailSent true', async () => {
    const { status, json } = await call({
      name: '  Aarav Sharma  ',
      email: 'Aarav@Example.com',
      mobile: '+91 98765 43210',
      courseInterest: 'mbbs-abroad',
      neetScore: '542',
      message: 'Please guide me',
    });
    if (status !== 200 || !json.emailSent) {
      console.log('    DEBUG response:', JSON.stringify(json), '| messages captured:', captured.messages.length);
      for (const [i, m] of captured.messages.entries()) {
        console.log(`    DEBUG msg[${i}] first line:`, m.split('\r\n')[0]);
      }
    }
    assert.equal(status, 200);
    assert.equal(json.success, true);
    assert.equal(json.emailSent, true);
  });

  await check('enquiry persisted with trimmed/normalised values', async () => {
    const doc = await Enquiry.findOne({ email: 'aarav@example.com' }).sort({ createdAt: -1 });
    assert.ok(doc, 'expected a saved enquiry');
    assert.equal(doc.name, 'Aarav Sharma');
    assert.equal(doc.mobile, '9876543210');
    assert.equal(doc.neetScore, '542');
    assert.equal(doc.notes, 'Please guide me');
    assert.equal(doc.emailSent, true);
  });

  await check('admin notification email sent to ADMIN_EMAIL', async () => {
    const admin = captured.messages.find((m) => m.includes('New Admission Inquiry:'));
    assert.ok(admin, 'expected an admin email');
    const headers = parseHeaders(admin);
    assert.match(headers.To, /admissions@futuremindeducare\.com/);
    assert.match(headers.From, /edufuturemind@gmail\.com/);
    assert.match(headers.Subject, /New Admission Inquiry: Aarav Sharma - mbbs-abroad/);
    assert.match(headers['Reply-To'], /aarav@example\.com/);
    const body = getBody(admin);
    assert.match(body, /9876543210/);
    assert.match(body, /542/);
    assert.match(body, /Please guide me/);
  });

  await check('comma separated ADMIN_EMAIL reaches every admin address', async () => {
    const { getAdminRecipients } = await import(path.join(OUT, 'lib/mailer.js'));

    process.env.ADMIN_EMAIL = 'admissions@futuremindedu.in, Second.Admin@Example.com ,admissions@futuremindedu.in,broken-address';
    assert.deepEqual(
      getAdminRecipients(),
      ['admissions@futuremindedu.in', 'second.admin@example.com'],
      'invalid + duplicate admin addresses must be dropped'
    );

    await call({
      name: 'Multi Admin Test',
      email: 'multiadmin@example.com',
      mobile: '9876543216',
      courseInterest: 'mbbs-india',
      neetScore: '430',
    });
    const admin = captured.messages.find((m) => m.includes('New Admission Inquiry: Multi Admin Test')) ?? '';
    const headers = parseHeaders(admin);
    assert.match(headers.To, /admissions@futuremindeducare\.com/);
    assert.match(headers.To, /second\.admin@example\.com/);
    assert.ok(!headers.To.includes('broken-address'), 'invalid address must be dropped');
    await Enquiry.deleteMany({ email: 'multiadmin@example.com' });

    process.env.ADMIN_EMAIL = '   ,broken-only-address   ';
    assert.deepEqual(
      getAdminRecipients(),
      ['sagarbishtz589@gmail.com'],
      'all-invalid ADMIN_EMAIL must fall back to the default address'
    );
    process.env.ADMIN_EMAIL = '';
    assert.deepEqual(getAdminRecipients(), ['sagarbishtz589@gmail.com'], 'empty ADMIN_EMAIL falls back');

    process.env.ADMIN_EMAIL = 'admissions@futuremindedu.in';
  });

  await check('student confirmation email sent to the student', async () => {
    const student = captured.messages.find((m) => m.includes('Thank you for your enquiry'));
    assert.ok(student, 'expected a student confirmation email');
    const headers = parseHeaders(student);
    assert.match(headers.To, /aarav@example\.com/);
    assert.match(headers.Subject, /Thank you for your enquiry - Future Mind Educare/);
    assert.match(getBody(student), /Dear Aarav Sharma/);
  });

  await check('email address is lowercased before use', async () => {
    await call({
      name: 'Case Test',
      email: '  MiXeD.CaSe@Example.COM ',
      mobile: '9876543211',
      courseInterest: 'mbbs-india',
      neetScore: '300',
    });
    const last = captured.messages[captured.messages.length - 1];
    const headers = parseHeaders(last);
    assert.equal(headers.To, 'mixed.case@example.com');
    assert.ok(!headers.To.includes('MiXeD'));
    await Enquiry.deleteMany({ email: 'mixed.case@example.com' });
  });

  await check('user input cannot inject raw HTML into headers or body', async () => {
    await call({
      name: '<script>alert(1)</script>Bob',
      email: 'xss@example.com',
      mobile: '9123456789',
      courseInterest: 'mbbs-india',
      neetScore: '400',
      message: '<img src=x onerror=alert(2)>',
    });

    const admin = captured.messages[captured.messages.length - 2];
    const headers = parseHeaders(admin);

    assert.ok(
      !headers.Subject.includes('<script>'),
      `raw script tag in Subject: ${headers.Subject}`
    );
    assert.ok(!admin.includes('<script>'), 'raw script tag anywhere in the message');
    assert.ok(!admin.includes('<img src=x'), 'raw img tag anywhere in the message');

    const body = getBody(admin);
    assert.match(body, /&lt;script&gt;/);
    assert.match(body, /&lt;img src=x/);

    await Enquiry.deleteMany({ email: 'xss@example.com' });
  });

  await check('subject strips control characters and newlines', async () => {
    await call({
      name: 'Line Break\r\nBcc: attacker@evil.com',
      email: 'crlf@example.com',
      mobile: '9876543212',
      courseInterest: 'mbbs-india',
      neetScore: '350',
    });
    const admin = captured.messages[captured.messages.length - 2];
    const headers = parseHeaders(admin);
    assert.ok(!/[\r\n]/.test(headers.Subject), 'newline leaked into Subject');
    assert.ok(
      headers.Subject.startsWith('New Admission Inquiry: Line Break Bcc: attacker@evil.com'),
      `unexpected subject: ${headers.Subject}`
    );
    assert.ok(!admin.includes('attacker@evil.com\n'), 'injected Bcc recipient present');
    const parsed = parseHeaders(admin);
    assert.ok(!('Bcc' in parsed), `Bcc header injected: ${Object.keys(parsed).join(', ')}`);
    assert.ok(!('Cc' in parsed), 'Cc header injected');
    assert.equal(parsed.To, 'admissions@futuremindedu.in');
    assert.match(parsed.Subject, /Line Break Bcc: attacker@evil\.com/);
    await Enquiry.deleteMany({ email: 'crlf@example.com' });
  });

  await check('message uses CRLF line endings (RFC 5321 compliance)', async () => {
    await call({
      name: 'CRLF Test',
      email: 'crlf2@example.com',
      mobile: '9876543213',
      courseInterest: 'mbbs-india',
      neetScore: '360',
    });
    const admin = captured.messages[captured.messages.length - 2];
    const bareLf = admin.replace(/\r\n/g, '').includes('\n');
    assert.ok(!bareLf, 'message contains bare LF line endings');
    assert.ok(admin.includes('\r\n'), 'message has no CRLF at all');
    await Enquiry.deleteMany({ email: 'crlf2@example.com' });
  });

  await check('CC recipients land in the Cc header when EMAIL_CC is set', async () => {
    process.env.EMAIL_CC = 'cc.one@example.com, CC.Two@Example.com ,bad-address,cc.one@example.com';
    const { getCcRecipients } = await import(path.join(OUT, 'lib/mailer.js'));
    const list = getCcRecipients();
    assert.deepEqual(list, ['cc.one@example.com', 'cc.two@example.com'], `got ${JSON.stringify(list)}`);

    await call({
      name: 'CC Test',
      email: 'cc@example.com',
      mobile: '9876543214',
      courseInterest: 'mbbs-india',
      neetScore: '410',
    });
    const admin = captured.messages[captured.messages.length - 2];
    const headers = parseHeaders(admin);
    assert.ok(headers.Cc, 'expected a Cc header');
    assert.match(headers.Cc, /cc\.one@example\.com/);
    assert.match(headers.Cc, /cc\.two@example\.com/);
    assert.ok(!headers.Cc.includes('bad-address'), 'invalid address must be dropped');
    await Enquiry.deleteMany({ email: 'cc@example.com' });
  });

  await check('no Cc header when EMAIL_CC is empty', async () => {
    process.env.EMAIL_CC = '';
    const { getCcRecipients } = await import(path.join(OUT, 'lib/mailer.js'));
    assert.deepEqual(getCcRecipients(), []);

    await call({
      name: 'No CC Test',
      email: 'nocc@example.com',
      mobile: '9876543215',
      courseInterest: 'mbbs-india',
      neetScore: '420',
    });
    const admin = captured.messages[captured.messages.length - 2];
    assert.ok(!parseHeaders(admin).Cc, 'Cc header should be absent');
    await Enquiry.deleteMany({ email: 'nocc@example.com' });
  });

  await check('emails are branded with light/dark mode support', async () => {
    const admin = captured.messages.find((m) => m.includes('New Admission Inquiry:')) ?? '';
    const body = getBody(admin);

    assert.match(body, /<!DOCTYPE html>/i, 'expected full HTML document');
    assert.match(body, /name="color-scheme" content="light dark"/, 'missing color-scheme meta');
    assert.match(body, /supported-color-scripts/, 'missing supported-color-scripts');
    assert.match(body, /@media \(prefers-color-scheme: dark\)/, 'missing dark mode media query');
    assert.match(body, /#172554/i, 'missing brand navy in header');
    assert.match(body, /#facc15/i, 'missing accent yellow');

    const student = captured.messages.find((m) => m.includes('Thank you for your enquiry')) ?? '';
    const studentBody = getBody(student);
    assert.match(studentBody, /prefers-color-scheme: dark/);
    assert.match(studentBody, /What happens next/);
    assert.match(studentBody, /9920798988/, 'missing counsellor phone');
    assert.match(studentBody, /edufuturemind@gmail\.com/, 'missing contact email');
  });

  await check('styled templates still escape user input', async () => {
    await call({
      name: '<b>Bold</b> Attempt',
      email: 'esc@example.com',
      mobile: '9123456789',
      courseInterest: 'mbbs-india',
      neetScore: '400',
      message: '<script>alert(1)</script>',
    });
    const admin = captured.messages[captured.messages.length - 2];
    const body = getBody(admin);
    assert.ok(!body.includes('<b>Bold</b>'), 'raw bold tag leaked');
    assert.ok(!body.includes('<script>'), 'raw script tag leaked');
    assert.match(body, /&lt;b&gt;Bold/);
    assert.match(body, /&lt;script&gt;/);
    await Enquiry.deleteMany({ email: 'esc@example.com' });
  });

  const after = await Enquiry.countDocuments({ email: 'aarav@example.com' });
  await check('no duplicate saves on repeat validation failures', () => {
    assert.equal(after - before, 1);
  });

  await check('cleanup', async () => {
    await Enquiry.deleteMany({ email: 'aarav@example.com' });
    const left = await Enquiry.countDocuments({ email: 'aarav@example.com' });
    assert.equal(left, 0);
  });

  server.close();
  fs.rmSync(OUT, { recursive: true, force: true });

  console.log(`\n${pass} passed, ${fail} failed\n`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
