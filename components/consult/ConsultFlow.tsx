'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, Clipboard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn, createAnonymousKey } from '@/lib/utils';
import { ensureAnonSession } from '@/lib/supabase/anon';

const steps = [
  {
    id: 'topic',
    title: 'どんな相談ですか？',
    options: [
      { value: 'symptom', label: '体調・症状のこと' },
      { value: 'care', label: '介護・訪問看護のこと' },
      { value: 'mental', label: '気持ち・メンタルのこと' },
      { value: 'family', label: '家族のサポート' },
      { value: 'other', label: 'その他' }
    ]
  },
  {
    id: 'urgency',
    title: '緊急性はありますか？',
    options: [
      { value: 'critical', label: '今すぐ危険・急変の可能性', emergency: true },
      { value: 'worry', label: '心配だが落ち着いている' },
      { value: 'planning', label: '情報を整理したい' }
    ]
  },
  {
    id: 'person',
    title: '誰の相談ですか？',
    options: [
      { value: 'self', label: '本人' },
      { value: 'family', label: '家族' },
      { value: 'client', label: '利用者さん' }
    ]
  },
  {
    id: 'need',
    title: '今ほしいサポートは？',
    options: [
      { value: 'organize', label: '状況整理' },
      { value: 'nextstep', label: '次の行動の提案' },
      { value: 'connect', label: '窓口の案内' }
    ]
  }
] as const;

const recommendations = [
  { id: 'doctor', label: '主治医・医療機関に相談', match: ['symptom', 'worry'] },
  { id: 'homecare', label: '訪問看護ステーションに確認', match: ['care'] },
  { id: 'center', label: '地域包括支援センターへ', match: ['family', 'care'] },
  { id: 'mental', label: 'メンタル相談窓口へ', match: ['mental'] },
  { id: 'note', label: '状況をメモして整理', match: ['organize'] }
];

export function ConsultFlow() {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [emergency, setEmergency] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const current = steps[index];
  const progress = Math.round(((index + 1) / steps.length) * 100);

  React.useEffect(() => {
    ensureAnonSession().catch(() => undefined);
  }, []);

  const handleSelect = (value: string, isEmergency?: boolean) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (isEmergency) setEmergency(true);
    if (index < steps.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const goBack = () => setIndex((prev) => Math.max(0, prev - 1));

  const matched = recommendations.filter((rec) =>
    rec.match.some((m) => Object.values(answers).includes(m))
  );

  const createRoom = async () => {
    setSubmitting(true);
    try {
      let anonymousKey = localStorage.getItem('anonymousKey');
      if (!anonymousKey) {
        anonymousKey = createAnonymousKey();
        localStorage.setItem('anonymousKey', anonymousKey);
      }
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, anonymousKey })
      });
      const data = await res.json();
      if (res.ok) {
        setRoomId(data.roomId);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-blush-100 bg-white/80 p-5 shadow-card">
        <div className="flex items-center justify-between text-xs font-semibold text-ink/60">
          <span>ステップ {index + 1} / {steps.length}</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="mt-2" />
      </div>

      {emergency && (
        <Card className="border-blush-300 bg-blush-50">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blush-600" />
            <CardTitle>緊急性の可能性があります</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink/70">
            迷ったら119へ連絡してください。身の危険や暴力の恐れがある場合は110・DV相談窓口へ。
          </CardContent>
        </Card>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4"
        >
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl">{current.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, (option as { emergency?: boolean }).emergency)}
                  className={cn(
                    'focus-ring flex items-center justify-between rounded-2xl border border-blush-100 px-4 py-4 text-left text-sm font-semibold transition',
                    'hover:border-blush-200 hover:bg-blush-50'
                  )}
                >
                  {option.label}
                  <ArrowRight className="h-4 w-4 text-blush-400" />
                </button>
              ))}
              {index > 0 && (
                <button
                  onClick={goBack}
                  className="text-xs font-semibold text-ink/50 hover:text-blush-500"
                >
                  戻る
                </button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {index === steps.length - 1 && answers.need && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-blush-500" />
              おすすめの次の行動
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {(matched.length ? matched : recommendations.slice(0, 2)).map((rec) => (
              <div key={rec.id} className="flex items-center gap-3 rounded-2xl border border-blush-100 bg-blush-50 px-4 py-3 text-sm">
                <Clipboard className="h-4 w-4 text-blush-500" />
                {rec.label}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {index === steps.length - 1 && (
        <div className="rounded-2xl border border-blush-100 bg-white p-6 shadow-card">
          <h4 className="text-lg font-semibold">相談ルームを作成しますか？</h4>
          <p className="mt-2 text-sm text-ink/70">
            匿名で利用できます。個人情報は最小限で、同意のうえ送信してください。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={createRoom} disabled={submitting}>
              {submitting ? '作成中...' : '相談ルームを作成'}
            </Button>
            {roomId && (
              <a
                href={`/room/${roomId}`}
                className="inline-flex items-center rounded-2xl border border-blush-200 px-5 py-3 text-sm font-semibold text-blush-700"
              >
                ルームへ移動
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
