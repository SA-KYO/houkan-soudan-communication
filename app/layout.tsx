import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: '相談スタジオ | 訪問看護の安心相談',
  description: '現役看護師が状況整理をサポート。匿名・無料で安心して相談できるインタラクティブ相談サイト。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-soft-grad font-body">
        <div className="min-h-screen bg-petal">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
