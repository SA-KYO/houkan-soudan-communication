import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/security/rateLimit';
import { sanitizeText } from '@/lib/security/sanitize';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(`rooms:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  const payload = await request.json();
  const { answers, anonymousKey } = payload ?? {};
  const uuidRegex = /^[0-9a-f-]{36}$/i;
  if (!anonymousKey || !uuidRegex.test(anonymousKey)) {
    return NextResponse.json({ error: 'anonymous_key_required' }, { status: 400 });
  }

  const sanitizedAnswers = Object.fromEntries(
    Object.entries(answers ?? {}).map(([key, value]) => [key, sanitizeText(String(value))])
  );

  const flags: string[] = [];
  if (sanitizedAnswers.urgency === 'critical') flags.push('emergency');

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('rooms')
    .insert({
      status: '未対応',
      priority: flags.includes('emergency') ? '高' : '通常',
      flags,
      created_by: anonymousKey,
      summary: sanitizedAnswers
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ roomId: data.id });
}
