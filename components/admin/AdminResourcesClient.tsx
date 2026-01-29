'use client';

import * as React from 'react';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AdminResourcesClient() {
  const [items, setItems] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [tags, setTags] = React.useState('');

  const load = async () => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
  };

  React.useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!title.trim()) return;
    await fetch('/api/admin/reply', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, tags: tags.split(',').map((t) => t.trim()) })
    });
    setTitle('');
    setBody('');
    setTags('');
    await load();
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-blush-100 bg-white p-5">
        <h3 className="text-lg font-semibold">記事を追加</h3>
        <div className="mt-4 grid gap-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" />
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="本文" />
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="タグ（カンマ区切り）"
          />
          <Button onClick={create}>追加</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-blush-100 bg-white p-4">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-2 text-xs text-ink/60">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
