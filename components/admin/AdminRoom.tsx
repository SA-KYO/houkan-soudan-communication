'use client';

import * as React from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { SAFE_TEMPLATES } from '@/lib/data/templates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function AdminRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [value, setValue] = React.useState('');
  const [status, setStatus] = React.useState('対応中');

  React.useEffect(() => {
    const load = async () => {
      const { data } = await supabaseBrowser
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      setMessages(data ?? []);
    };
    load();
  }, [roomId]);

  const send = async (body: string) => {
    if (!body.trim()) return;
    await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, body })
    });
    setValue('');
  };

  const updateStatus = async (value: string) => {
    setStatus(value);
    await fetch('/api/admin/reply', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, status: value })
    });
  };

  return (
    <div className="grid gap-6">
      <Card className="bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">相談ルーム管理</h3>
            <p className="text-xs text-ink/60">ステータスを更新して対応状況を管理します。</p>
          </div>
          <select
            value={status}
            onChange={(event) => updateStatus(event.target.value)}
            className="rounded-2xl border border-blush-100 px-4 py-2 text-sm"
          >
            <option value="未対応">未対応</option>
            <option value="対応中">対応中</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </Card>

      <Card className="bg-white p-5">
        <div className="grid gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.sender_role === 'admin'
                  ? 'ml-auto bg-blush-500 text-white'
                  : 'bg-blush-50 text-ink'
              }`}
            >
              {msg.body}
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-white p-5">
        <p className="text-xs font-semibold text-ink/60">安全なテンプレ文言</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(SAFE_TEMPLATES).flat().map((item) => (
            <button
              key={item}
              onClick={() => setValue(item)}
              className="rounded-full border border-blush-100 bg-blush-50 px-3 py-2 text-xs text-blush-700"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3">
          <Textarea value={value} onChange={(event) => setValue(event.target.value)} rows={4} />
          <Button onClick={() => send(value)}>返信を送信</Button>
        </div>
      </Card>
    </div>
  );
}
