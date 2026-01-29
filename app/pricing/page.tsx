import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">料金</h1>
        <p className="mt-2 text-sm text-ink/70">
          まずは無料相談から。必要に応じて有料プランを検討できます。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>無料プラン</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ink/70">
            <p>・匿名相談 (チャット)</p>
            <p>・ナレッジ閲覧</p>
            <p>・緊急導線案内</p>
            <Link
              href="/consult"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-blush-500 px-6 text-sm font-semibold text-white shadow-soft"
            >
              無料で相談する
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>単発/定額プラン (準備中)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ink/70">
            <p>・オンライン面談</p>
            <p>・相談履歴の継続管理</p>
            <p>・優先対応</p>
            <Link
              href="/consult"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-blush-200 px-6 text-sm font-semibold text-blush-700"
            >
              無料相談から開始
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
