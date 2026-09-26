import assert from 'node:assert';
import net from 'node:net';

type Captured = {
  commands: string[];
  mailFrom: string;
  rcptTo: string[];
  data: string;
  auth: string;
};

const captured: Captured = { commands: [], mailFrom: '', rcptTo: [], data: '', auth: '' };

function startFakeSmtpServer(port: number): Promise<net.Server> {
  const server = net.createServer((socket) => {
    let buffer = '';
    let inData = false;
    let dataBuffer = '';

    socket.write('220 fake.local ESMTP TestSMTP\r\n');

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');

      while (true) {
        if (inData) {
          const end = buffer.indexOf('\r\n.\r\n');
          if (end === -1) return;
          dataBuffer += buffer.slice(0, end);
          buffer = buffer.slice(end + 5);
          inData = false;
          captured.data = dataBuffer;
          socket.write('250 2.0.0 Ok: queued as TEST123\r\n');
          continue;
        }

        const newline = buffer.indexOf('\r\n');
        if (newline === -1) return;
        const line = buffer.slice(0, newline);
        buffer = buffer.slice(newline + 2);

        const command = line.split(' ')[0].toUpperCase();
        captured.commands.push(command);

        switch (command) {
          case 'EHLO':
            socket.write('250-fake.local\r\n250-AUTH PLAIN LOGIN\r\n250-8BITMIME\r\n250 SIZE 10485760\r\n');
            break;
          case 'HELO':
            socket.write('250 fake.local\r\n');
            break;
          case 'AUTH': {
            const method = (line.split(' ')[1] || '').toUpperCase();
            captured.auth = method;
            if (method === 'PLAIN') {
              captured.commands.push('AUTH-PLAIN-TOKEN');
              socket.write('235 2.7.0 Authentication successful\r\n');
            } else {
              socket.write('334 VXNlcm5hbWU6\r\n');
            }
            break;
          }
          case 'MAIL':
            captured.mailFrom = (line.match(/<([^>]*)>/) || [])[1] || '';
            socket.write('250 2.1.0 Ok\r\n');
            break;
          case 'RCPT':
            captured.rcptTo.push((line.match(/<([^>]*)>/) || [])[1] || '');
            socket.write('250 2.1.5 Ok\r\n');
            break;
          case 'DATA':
            inData = true;
            dataBuffer = '';
            socket.write('354 End data with <CR><LF>.<CR><LF>\r\n');
            break;
          case 'RSET':
          case 'NOOP':
            socket.write('250 2.0.0 Ok\r\n');
            break;
          case 'QUIT':
            socket.write('221 2.0.0 Bye\r\n');
            socket.end();
            break;
          default:
            socket.write('250 2.0.0 Ok\r\n');
        }
      }
    });

    socket.on('error', () => {});
  });

  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
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
  const PORT = 2525;

  console.log('\n--- config status without credentials ---');
  const { getMailConfigStatus, isMailConfigured, sendMail, verifyMailConnection, getTransporter } =
    await import('../lib/mailer');

  await check('reports missing SMTP vars instead of crashing', () => {
    const saved = { ...process.env };
    for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL']) {
      delete process.env[key];
    }
    const status = getMailConfigStatus();
    assert.equal(status.configured, false);
    assert.equal(isMailConfigured(), false);
    assert.ok(status.missing.includes('SMTP_HOST'));
    assert.ok(status.missing.includes('FROM_EMAIL'));
    assert.throws(() => getTransporter(), /SMTP is not configured/);
    process.env = saved;
  });

  await check('verifyMailConnection fails gracefully when unconfigured', async () => {
    const saved = { ...process.env };
    for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL']) {
      delete process.env[key];
    }
    const result = await verifyMailConnection();
    assert.equal(result.ok, false);
    assert.match(result.message, /SMTP is not configured/);
    process.env = saved;
  });

  console.log('\n--- live SMTP delivery through nodemailer ---');

  const server = await startFakeSmtpServer(PORT);

  process.env.SMTP_HOST = '127.0.0.1';
  process.env.SMTP_PORT = String(PORT);
  process.env.SMTP_USER = 'edufuturemind@gmail.com';
  process.env.SMTP_PASS = 'test-app-password';
  process.env.FROM_EMAIL = 'edufuturemind@gmail.com';

  await check('isMailConfigured is true once vars are set', () => {
    assert.equal(isMailConfigured(), true);
    const status = getMailConfigStatus();
    assert.equal(status.missing.length, 0);
    assert.equal(status.secure, false);
    assert.equal(status.from, 'edufuturemind@gmail.com');
  });

  await check('verifyMailConnection succeeds against live SMTP', async () => {
    const result = await verifyMailConnection();
    assert.equal(result.ok, true, result.message);
  });

  await check('sendMail authenticates and delivers the message', async () => {
    const result = await sendMail({
      to: 'sagarbishtz589@gmail.com',
      subject: 'New Admission Inquiry: Aarav Sharma - mbbs-abroad',
      html: '<h2>New Admission Inquiry</h2><p>Aarav Sharma 542</p>',
      replyTo: 'aarav@example.com',
    });
    assert.ok(result.messageId, 'expected a messageId');
    assert.ok(captured.auth === 'PLAIN' || captured.auth === 'LOGIN', 'expected SMTP AUTH');
    assert.equal(captured.mailFrom, 'edufuturemind@gmail.com');
    assert.deepEqual(captured.rcptTo, ['sagarbishtz589@gmail.com']);
    assert.match(captured.data, /Subject: New Admission Inquiry: Aarav Sharma/);
    assert.match(captured.data, /Aarav Sharma 542/);
    assert.match(captured.data, /Reply-To: aarav@example\.com/);
    assert.ok(captured.commands.includes('DATA'), 'expected DATA command');
  });

  await check('sendMail supports multiple recipients', async () => {
    captured.rcptTo = [];
    await sendMail({
      to: ['admin@example.com', 'student@example.com'],
      subject: 'Multi recipient',
      html: '<p>hello</p>',
    });
    assert.deepEqual(captured.rcptTo, ['admin@example.com', 'student@example.com']);
  });

  await check('sendMail auto-generates a plain-text alternative', async () => {
    captured.data = '';
    await sendMail({
      to: 'student@example.com',
      subject: 'Plain text fallback',
      html: '<p>Hello <strong>Aditya</strong></p>',
    });
    assert.match(captured.data, /Content-Type: text\/plain/, 'expected text/plain part');
  });

  server.close();

  console.log(`\n${pass} passed, ${fail} failed\n`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
