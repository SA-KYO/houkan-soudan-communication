import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/security/rateLimit';
import { sanitizeText } from '@/lib/security/sanitize';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(`checkins:${ip}`, 8, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  const payload = await request.json();
  const { anonymousKey, score, ...answers } = payload ?? {};
  const uuidRegex = /^[0-9a-f-]{36}$/i;
  if (!anonymousKey || !uuidRegex.test(anonymousKey)) {
    return NextResponse.json({ error: 'anonymous_key_required' }, { status: 400 });
  }

  const sanitizedAnswers = Object.fromEntries(
    Object.entries(answers ?? {}).map(([key, value]) => [key, sanitizeText(String(value))])
  );

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('checkins').insert({
    anonymous_key: anonymousKey,
    answers: sanitizedAnswers,
    score: Number(score) || 0
  });

  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
