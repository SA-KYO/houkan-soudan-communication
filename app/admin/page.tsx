import { AdminRoomsClient } from '@/components/admin/AdminRoomsClient';

export default function AdminPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold">相談一覧</h2>
        <p className="mt-2 text-sm text-ink/70">未対応・対応中・完了を管理します。</p>
      </div>
      <AdminRoomsClient />
    </div>
  );
}
