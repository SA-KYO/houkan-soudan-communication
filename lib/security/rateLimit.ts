type RateRecord = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateRecord>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (current.count >= limit) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }
  current.count += 1;
  store.set(key, current);
  return { ok: true, remaining: limit - current.count, resetAt: current.resetAt };
}
