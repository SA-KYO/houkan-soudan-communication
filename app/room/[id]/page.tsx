import { Chat } from '@/components/room/Chat';

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">相談ルーム</h1>
        <p className="mt-2 text-sm text-ink/70">
          看護師と双方向でやり取りできます。個人情報は入力しないでください。
        </p>
      </div>
      <Chat roomId={params.id} />
    </div>
  );
}
