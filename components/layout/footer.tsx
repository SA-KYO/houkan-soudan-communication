import Link from 'next/link';
import { PhoneCall } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-blush-100 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-ink">相談スタジオ</p>
          <p className="mt-2 text-xs text-ink/60">
            医療/介護の悩みを整理し、必要な窓口へ安全に案内するための無料相談プラットフォームです。
          </p>
        </div>
        <div className="text-xs text-ink/70">
          <p className="font-semibold text-ink">免責・安全</p>
          <p className="mt-2">
            本サービスは医療行為・診断・治療の断定を行いません。緊急時は119/110へ連絡してください。
          </p>
        </div>
        <div className="rounded-2xl border border-blush-100 bg-blush-50 p-4 text-xs">
          <div className="flex items-center gap-2 font-semibold text-blush-700">
            <PhoneCall className="h-4 w-4" />
            緊急時のご案内
          </div>
          <p className="mt-2 text-ink/70">
            命に関わる急変・自傷他害・DV/虐待の恐れがある場合は、迷わず119/110や地域の緊急窓口へ。
          </p>
          <Link href="/consult" className="mt-3 inline-flex text-blush-600 underline">
            相談をはじめる
          </Link>
        </div>
      </div>
    </footer>
  );
}
