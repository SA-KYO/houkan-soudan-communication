import Link from 'next/link';
import { HeartHandshake, MessageCircleHeart, ShieldCheck } from 'lucide-react';

const links = [
  { href: '/checkin', label: '1分チェックイン' },
  { href: '/consult', label: '相談をはじめる' },
  { href: '/resources', label: 'ナレッジ' },
  { href: '/pricing', label: '料金' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blush-100/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-blush-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blush-100 text-blush-600">
            <HeartHandshake className="h-5 w-5" />
          </div>
          相談スタジオ
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-blush-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-ink/70 md:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            匿名・無料
          </div>
          <Link
            href="/consult"
            className="inline-flex items-center gap-2 rounded-2xl bg-blush-500 px-4 py-2 text-sm font-semibold text-white shadow-soft"
          >
            <MessageCircleHeart className="h-4 w-4" />
            相談する
          </Link>
        </div>
      </div>
    </header>
  );
}
