import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/security/rateLimit';
import { sanitizeText } from '@/lib/security/sanitize';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(`messages:${ip}`, 12, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  const payload = await request.json();
  const { roomId, body } = payload ?? {};
  if (!roomId || !body) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('messages').insert({
    room_id: roomId,
    sender_role: 'user',
    body: sanitizeText(body)
  });

  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
