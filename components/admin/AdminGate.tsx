'use client';

import * as React from 'react';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<any>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchRole = React.useCallback(async (session: any) => {
    const supabase = getSupabaseBrowser();
    if (!supabase || !session?.user?.id) return;
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    if (error) {
      setError('管理者権限の確認に失敗しました。');
      setRole(null);
      return;
    }
    setRole(profile?.role ?? null);
  }, []);

  React.useEffect(() => {
    const init = async () => {
      const supabase = getSupabaseBrowser();
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        await fetchRole(data.session);
      }
    };
    init();
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setRole(null);
      setError(null);
      if (session) {
        await fetchRole(session);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setError(null);
    setLoading(true);
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError('Supabaseの環境変数が未設定です。');
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  if (!session || role !== 'admin') {
    return (
      <div className="rounded-2xl border border-blush-100 bg-white p-6">
        <h2 className="text-xl font-semibold">管理者ログイン</h2>
        <p className="mt-2 text-sm text-ink/70">管理者アカウントでログインしてください。</p>
        {!getSupabaseBrowser() && (
          <p className="mt-2 text-xs text-blush-600">Supabaseの環境変数が未設定です。</p>
        )}
        <div className="mt-4 grid gap-3 max-w-sm">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          {error && <p className="text-xs text-blush-600">{error}</p>}
          <Button onClick={signIn} disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
          <p className="text-xs text-ink/50">
            初回はSupabaseのAuthで管理者ユーザーを作成し、profiles.roleをadminに設定してください。
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
