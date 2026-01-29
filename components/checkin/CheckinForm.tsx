'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ensureAnonSession } from '@/lib/supabase/anon';
import { createAnonymousKey } from '@/lib/utils';

const schema = z.object({
  mood: z.string(),
  sleep: z.string(),
  appetite: z.string(),
  stress: z.string(),
  category: z.string(),
  note: z.string().optional(),
  captcha: z.string()
});

type FormValues = z.infer<typeof schema>;

const choices = ['とても良い', '良い', '普通', 'つらい', 'かなりつらい'];

export function CheckinForm() {
  const [result, setResult] = React.useState<string | null>(null);
  const [pair] = React.useState(() => {
    const a = Math.floor(Math.random() * 6) + 2;
    const b = Math.floor(Math.random() * 5) + 1;
    return { a, b };
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      mood: '普通',
      sleep: '普通',
      appetite: '普通',
      stress: '普通',
      category: '体調',
      note: '',
      captcha: ''
    }
  });

  React.useEffect(() => {
    ensureAnonSession().catch(() => undefined);
  }, []);

  const onSubmit = async (values: FormValues) => {
    if (Number(values.captcha) !== pair.a + pair.b) {
      form.setError('captcha', { message: '計算が違います' });
      return;
    }
    const score = [values.mood, values.sleep, values.appetite, values.stress].reduce(
      (acc, v) => acc + choices.indexOf(v),
      0
    );
    const next = score >= 10 ? '相談がおすすめです' : 'ナレッジで様子を見るのも良いかもしれません';
    setResult(next);

    let anonymousKey = localStorage.getItem('anonymousKey');
    if (!anonymousKey) {
      anonymousKey = createAnonymousKey();
      localStorage.setItem('anonymousKey', anonymousKey);
    }
    await fetch('/api/checkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, score, anonymousKey })
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日のこころ体温計</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            {['mood', 'sleep', 'appetite', 'stress'].map((field) => (
              <label key={field} className="space-y-2 text-sm font-semibold">
                <span>
                  {field === 'mood' && '気分'}
                  {field === 'sleep' && '睡眠'}
                  {field === 'appetite' && '食欲'}
                  {field === 'stress' && 'ストレス'}
                </span>
                <select
                  className="focus-ring w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm"
                  {...form.register(field as keyof FormValues)}
                >
                  {choices.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <Slider
            label="今日のエネルギー(0-100)"
            min={0}
            max={100}
            defaultValue={50}
            onChange={(event) => form.setValue('note', `energy:${event.target.value}`)}
          />

          <label className="space-y-2 text-sm font-semibold">
            <span>困りごとカテゴリ</span>
            <select
              className="focus-ring w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm"
              {...form.register('category')}
            >
              <option value="体調">体調</option>
              <option value="介護">介護</option>
              <option value="メンタル">メンタル</option>
              <option value="家族">家族</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold">
            <span>ひとことメモ（任意）</span>
            <Input placeholder="例：眠れない日が続いている" {...form.register('note')} />
          </label>

          <label className="space-y-2 text-sm font-semibold">
            <span>
              簡易CAPTCHA：{pair.a} + {pair.b} = ?
            </span>
            <Input placeholder="数字を入力" {...form.register('captcha')} />
            {form.formState.errors.captcha && (
              <p className="text-xs text-blush-600">
                {form.formState.errors.captcha.message}
              </p>
            )}
          </label>

          <Button type="submit">チェックインを送信</Button>
        </form>

        {result && (
          <div className="rounded-2xl border border-blush-100 bg-blush-50 p-4 text-sm">
            <p className="font-semibold text-blush-700">結果</p>
            <p className="mt-1 text-ink/70">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
