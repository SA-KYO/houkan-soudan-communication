import { ResourcesClient } from '@/components/resources/ResourcesClient';

export default function ResourcesPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold">ナレッジ</h1>
        <p className="mt-2 text-sm text-ink/70">
          訪問看護・介護・メンタル・家族支援の基礎知識を整理しています。
        </p>
      </div>
      <ResourcesClient />
    </div>
  );
}
