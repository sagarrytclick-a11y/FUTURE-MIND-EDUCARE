import assert from 'node:assert';
import {
  getFirstError,
  normalizeMobile,
  validateEnquiry,
} from '../lib/validation';

let pass = 0;
let fail = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    pass++;
    console.log(`  ok  ${name}`);
  } catch (error) {
    fail++;
    console.log(`FAIL  ${name}: ${(error as Error).message}`);
  }
}

const base = {
  name: 'Aarav Sharma',
  email: 'aarav@example.com',
  mobile: '9876543210',
  courseInterest: 'mbbs-abroad',
  neetScore: '542',
  message: 'Please guide me.',
};

console.log('\n--- valid payload ---');
check('accepts a fully valid enquiry', () => {
  const result = validateEnquiry(base);
  assert.equal(result.ok, true);
});

check('trims whitespace on names', () => {
  const result = validateEnquiry({ ...base, name: '  Aarav Sharma  ' });
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.data.name, 'Aarav Sharma');
});

check('normalises +91 / 0 prefixed mobile', () => {
  assert.equal(normalizeMobile('+91 98765 43210'), '9876543210');
  assert.equal(normalizeMobile('09876543210'), '9876543210');
  const result = validateEnquiry({ ...base, mobile: '+91 98765 43210' });
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.data.mobile, '9876543210');
});

check('allows empty optional NEET score', () => {
  const result = validateEnquiry({ ...base, neetScore: '' });
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.data.neetScore, '');
});

console.log('\n--- contact form rejections ---');
check('rejects missing name', () => {
  const result = validateEnquiry({ ...base, name: '' });
  assert.equal(result.ok, false);
  assert.match(result.errors.name ?? '', /full name/i);
});

check('rejects 1-character name', () => {
  const result = validateEnquiry({ ...base, name: 'A' });
  assert.equal(result.ok, false);
  assert.ok(result.errors.name);
});

check('rejects malformed email', () => {
  for (const email of ['aarav', 'aarav@', 'aarav@example', '@example.com', 'a b@c.com']) {
    const result = validateEnquiry({ ...base, email });
    assert.equal(result.ok, false, `expected ${email} to fail`);
    assert.ok(result.errors.email, `expected email error for ${email}`);
  }
});

check('rejects invalid mobile numbers', () => {
  for (const mobile of ['12345', '1234567890', '98765', 'abcdefghij', '']) {
    const result = validateEnquiry({ ...base, mobile });
    assert.equal(result.ok, false, `expected ${mobile} to fail`);
    assert.ok(result.errors.mobile);
  }
});

check('rejects missing course interest', () => {
  const result = validateEnquiry({ ...base, courseInterest: '  ' });
  assert.equal(result.ok, false);
  assert.ok(result.errors.courseInterest);
});

check('rejects out-of-range NEET score', () => {
  for (const neetScore of ['721', '1000', '-1', '54.2', 'abc', '9'.repeat(4)]) {
    const result = validateEnquiry({ ...base, neetScore });
    assert.equal(result.ok, false, `expected ${neetScore} to fail`);
    assert.ok(result.errors.neetScore, `expected neet error for ${neetScore}`);
  }
});

check('accepts NEET boundary values 0 and 720', () => {
  for (const neetScore of ['0', '720']) {
    const result = validateEnquiry({ ...base, neetScore });
    assert.equal(result.ok, true, `expected ${neetScore} to pass`);
  }
});

check('rejects over-long message', () => {
  const result = validateEnquiry({ ...base, message: 'x'.repeat(2001) });
  assert.equal(result.ok, false);
  assert.ok(result.errors.message);
});

check('rejects completely empty payload', () => {
  const result = validateEnquiry({});
  assert.equal(result.ok, false);
  assert.ok(result.errors.name && result.errors.email && result.errors.mobile);
  assert.ok(result.errors.courseInterest);
});

console.log('\n--- neetRequired variant ---');
check('requires NEET score when neetRequired is set', () => {
  const result = validateEnquiry({ ...base, neetScore: '' }, { neetRequired: true });
  assert.equal(result.ok, false);
  assert.match(result.errors.neetScore ?? '', /required/i);
});

check('passes neetRequired variant with a score', () => {
  const result = validateEnquiry(base, { neetRequired: true });
  assert.equal(result.ok, true);
});

console.log('\n--- helpers ---');
check('getFirstError returns a message', () => {
  const result = validateEnquiry({ ...base, email: 'bad' });
  assert.equal(!result.ok, true);
  assert.ok(getFirstError(result.errors).length > 0);
});

check('getFirstError handles empty errors', () => {
  assert.ok(getFirstError({}).length > 0);
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
