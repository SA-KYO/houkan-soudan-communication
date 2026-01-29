import { AdminResourcesClient } from '@/components/admin/AdminResourcesClient';

export default function AdminResourcesPage() {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">ナレッジ管理</h2>
      <AdminResourcesClient />
    </div>
  );
}
