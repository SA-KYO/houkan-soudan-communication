import { ConsultFlow } from '@/components/consult/ConsultFlow';

export default function ConsultPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">対話型相談フロー</h1>
        <p className="mt-2 text-sm text-ink/70">
          選択肢で状況を整理し、必要なら適切な窓口へ案内します。医療行為・診断は行いません。
        </p>
      </div>
      <ConsultFlow />
    </div>
  );
}
