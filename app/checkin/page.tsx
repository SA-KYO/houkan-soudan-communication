import { CheckinForm } from '@/components/checkin/CheckinForm';

export default function CheckinPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">1分チェックイン</h1>
        <p className="mt-2 text-sm text-ink/70">
          今日の状態を短時間で整理します。緊急性が高い場合はすぐに119/110へ連絡してください。
        </p>
      </div>
      <CheckinForm />
    </div>
  );
}
