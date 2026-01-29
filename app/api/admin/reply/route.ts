import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { sanitizeText } from '@/lib/security/sanitize';

function requireAdmin(request: Request) {
  const token = request.headers.get('x-admin-key');
  const expected = process.env.ADMIN_API_KEY;
  if (expected && token !== expected) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const payload = await request.json();
  const { roomId, body } = payload ?? {};
  if (!roomId || !body) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('messages').insert({
    room_id: roomId,
    sender_role: 'admin',
    body: sanitizeText(body)
  });
  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const payload = await request.json();
  const { roomId, status } = payload ?? {};
  if (!roomId || !status) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('rooms').update({ status }).eq('id', roomId);
  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const payload = await request.json();
  const { title, body, tags } = payload ?? {};
  if (!title) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('resources').insert({
    title: sanitizeText(title),
    body: sanitizeText(body ?? ''),
    tags: tags ?? [],
    published: true
  });
  if (error) {
    return NextResponse.json({ error: 'db_error', details: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
