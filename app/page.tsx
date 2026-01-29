import Link from 'next/link';
import { HeartPulse, ShieldCheck, Sparkles, Stethoscope, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="grid gap-12">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-2 text-xs font-semibold text-blush-700">
            <Sparkles className="h-4 w-4" />
            現役看護師が見守る安心の相談スタジオ
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            不安をほどき、
            <span className="text-blush-600">次の一歩</span>をやさしく導く
          </h1>
          <p className="text-sm text-ink/70 md:text-base">
            訪問看護の現役看護師が、体調・介護・メンタル・家族の悩みを整理します。
            匿名・無料で、必要な窓口へ安全に案内します。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/checkin"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-blush-500 px-6 text-sm font-semibold text-white shadow-soft"
            >
              1分チェックイン
            </Link>
            <Link
              href="/consult"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-blush-200 px-6 text-sm font-semibold text-blush-700"
            >
              相談をはじめる
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-ink/60">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              匿名・守秘
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-blush-500" />
              医療行為なし
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          <Card className="animate-float">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blush-500" />
                相談カードUI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink/70">
              選択肢で状況を整理すると、背景・進行バー・次の質問が変化。
              やさしい反応で安心感を届けます。
            </CardContent>
          </Card>
          <Card className="animate-float">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blush-500" />
                つながる相談導線
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink/70">
              必要に応じて主治医・地域包括・緊急窓口などへ安全に誘導。
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: '安心・清潔な看護師デザイン',
            body: 'ピンク×白のやさしいトーンで、触れるたびに静かに反応します。'
          },
          {
            title: '匿名相談 + 同意表示',
            body: '個人情報は最小限。相談開始前に免責と同意を明示します。'
          },
          {
            title: '緊急フラグ即時案内',
            body: '自傷他害・急変・DV等が疑われる場合は緊急導線を即表示。'
          }
        ].map((item) => (
          <Card key={item.title} className="bg-white">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink/70">{item.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-blush-100 bg-white/80 p-8">
        <h2 className="text-xl font-semibold">免責と緊急時のご案内</h2>
        <p className="mt-3 text-sm text-ink/70">
          本サービスは診断・治療を目的としたものではありません。危険が疑われる場合は119/110へ連絡してください。
          相談を続ける場合も、症状の変化に応じて医療機関に相談することをおすすめします。
        </p>
      </section>
    </div>
  );
}
