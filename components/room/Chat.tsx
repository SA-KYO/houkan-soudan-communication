'use client';

import * as React from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { ensureAnonSession } from '@/lib/supabase/anon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Paperclip, Send } from 'lucide-react';

export type Message = {
  id: string;
  room_id: string;
  sender_role: 'user' | 'admin';
  body: string;
  created_at: string;
};

export function Chat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [value, setValue] = React.useState('');
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;
    let channel = supabaseBrowser.channel(`room:${roomId}`);
    const load = async () => {
      await ensureAnonSession();
      const { data } = await supabaseBrowser
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      if (!ignore && data) setMessages(data as Message[]);
      channel = supabaseBrowser
        .channel(`room:${roomId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
          }
        )
        .subscribe();
    };
    load();

    return () => {
      ignore = true;
      supabaseBrowser.removeChannel(channel);
    };
  }, [roomId]);

  const send = async () => {
    if (!value.trim()) return;
    setSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, body: value })
      });
      setValue('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="border-blush-100 bg-white/90 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">相談ルーム</h3>
            <p className="text-xs text-ink/60">匿名でやり取りできます</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-2 text-xs font-semibold text-blush-700">
            <AlertTriangle className="h-4 w-4" />
            緊急時は119/110
          </button>
        </div>
      </Card>

      <Card className="max-h-[420px] overflow-y-auto bg-white/90 p-5">
        <div className="grid gap-3">
          {messages.length === 0 && (
            <p className="text-sm text-ink/60">メッセージはまだありません。状況を教えてください。</p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.sender_role === 'user'
                  ? 'ml-auto bg-blush-500 text-white'
                  : 'bg-blush-50 text-ink'
              }`}
            >
              {msg.body}
              <div className="mt-2 text-[10px] opacity-70">
                {new Date(msg.created_at).toLocaleString('ja-JP')}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-white/90 p-4">
        <label className="text-xs font-semibold text-ink/60">個人情報は入力しないでください</label>
        <div className="mt-2 flex items-end gap-3">
          <Textarea
            rows={3}
            placeholder="例：昨夜から微熱があり心配です"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="flex flex-col gap-2">
            <button className="inline-flex items-center justify-center rounded-2xl border border-blush-100 p-3 text-blush-500">
              <Paperclip className="h-4 w-4" />
            </button>
            <Button onClick={send} disabled={sending}>
              <Send className="mr-2 h-4 w-4" />
              送信
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
