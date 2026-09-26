/**
 * Server-side rate limiter for public form endpoints.
 *
 * Deliberately silent: a throttled request is answered with the SAME payload a
 * successful submission returns, so a caller (or bot) cannot detect that the
 * submission was dropped. Nothing is written to the database and no email is
 * sent - the enquiry is simply discarded.
 *
 * Storage: in-process Map (works per server instance). Swap `buckets` for Redis
 * if the app is ever deployed on multiple instances behind a load balancer.
 */

type EmailRecord = {
  /** Timestamp of the most recent accepted submission for this email. */
  lastAt: number;
  /** Accepted submissions for this email inside the current window. */
  count: number;
};

type Bucket = {
  count: number;
  firstAt: number;
  lastAt: number;
  emails: Map<string, EmailRecord>;
};

const WINDOW_MS = 60 * 60 * 1000; // rolling hour
const MAX_PER_WINDOW = 5; // max submissions per IP per hour
const EMAIL_COOLDOWN_MS = 15 * 60 * 1000; // same email re-submit cooldown
const MAX_DUPLICATES = 3; // max submissions for the same email per hour
const MAX_BUCKETS = 5000; // memory guard
const SWEEP_INTERVAL_MS = 5 * 60 * 1000; // how often stale buckets are pruned

const buckets = new Map<string, Bucket>();

let lastSweepAt = 0;

function bucketFor(key: string, now: number): Bucket {
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = {
      count: 0,
      firstAt: now,
      lastAt: now,
      emails: new Map<string, EmailRecord>(),
    };
    buckets.set(key, bucket);
  }
  return bucket;
}

function sweep(now: number) {
  // Pruning is O(buckets), so throttle it instead of running on every request.
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  lastSweepAt = now;

  for (const [key, bucket] of buckets) {
    if (now - bucket.lastAt > WINDOW_MS) buckets.delete(key);
  }

  // Hard cap: drop the least recently active buckets if still oversized
  if (buckets.size > MAX_BUCKETS) {
    const sorted = [...buckets.entries()].sort(
      (a, b) => a[1].lastAt - b[1].lastAt
    );
    for (const [key] of sorted.slice(0, buckets.size - MAX_BUCKETS)) {
      buckets.delete(key);
    }
  }
}

export type RateLimitResult = {
  allowed: boolean;
  reason?: "ip" | "email";
};

export function checkEnquiryRateLimit(
  ip: string,
  email: string
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const key = ip || "unknown";
  const bucket = bucketFor(key, now);
  const normalizedEmail = email.trim().toLowerCase();

  // Start a fresh window for this IP.
  if (now - bucket.firstAt > WINDOW_MS) {
    bucket.firstAt = now;
    bucket.count = 0;
    bucket.emails.clear();
  }

  const record = bucket.emails.get(normalizedEmail);

  if (record && now - record.lastAt < EMAIL_COOLDOWN_MS) {
    return { allowed: false, reason: "email" };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { allowed: false, reason: "ip" };
  }

  if (record && record.count >= MAX_DUPLICATES) {
    return { allowed: false, reason: "email" };
  }

  bucket.count += 1;
  bucket.lastAt = now;
  bucket.emails.set(normalizedEmail, {
    lastAt: now,
    count: record ? record.count + 1 : 1,
  });

  return { allowed: true };
}

/**
 * Best-effort client IP. `x-forwarded-for` is only trustworthy when the
 * platform/proxy strips any client-supplied value before appending its own; on
 * Vercel `x-vercel-forwarded-for` is already sanitised for us.
 */
export function clientIp(request: Request): string {
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
