'use client';

import * as React from 'react';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';

export type Room = {
  id: string;
  status: string;
  priority: string;
  flags: string[] | null;
  created_at: string;
};

export function AdminRoomsClient() {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const { data } = await supabaseBrowser
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });
      setRooms((data ?? []) as Room[]);
    };
    load();
  }, []);

  return (
    <div className="grid gap-4">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/admin/room/${room.id}`}
          className="rounded-2xl border border-blush-100 bg-white p-4 shadow-sm transition hover:border-blush-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">ルームID: {room.id}</p>
              <p className="text-xs text-ink/60">
                作成: {new Date(room.created_at).toLocaleString('ja-JP')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge>{room.status ?? '未対応'}</Badge>
              <Badge className="bg-lavender text-indigo-700">{room.priority ?? '通常'}</Badge>
              {room.flags?.includes('emergency') && <Badge className="bg-blush-200">緊急</Badge>}
            </div>
          </div>
        </Link>
      ))}
      {rooms.length === 0 && (
        <p className="text-sm text-ink/60">相談ルームがまだありません。</p>
      )}
    </div>
  );
}
