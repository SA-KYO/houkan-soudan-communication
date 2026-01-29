import { AdminRoom } from '@/components/admin/AdminRoom';

export default function AdminRoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">ルーム詳細</h2>
      <AdminRoom roomId={params.id} />
    </div>
  );
}
