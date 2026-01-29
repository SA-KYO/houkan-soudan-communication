import Link from 'next/link';
import { AdminGate } from '@/components/admin/AdminGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl border border-blush-100 bg-white/80 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">管理ダッシュボード</h1>
            <p className="text-xs text-ink/60">Supabase Authで保護してください。</p>
          </div>
          <nav className="flex flex-wrap gap-2 text-xs font-semibold text-blush-700">
            <Link href="/admin">相談一覧</Link>
            <Link href="/admin/resources">ナレッジ管理</Link>
          </nav>
        </div>
      </div>
      <AdminGate>{children}</AdminGate>
    </section>
  );
}
