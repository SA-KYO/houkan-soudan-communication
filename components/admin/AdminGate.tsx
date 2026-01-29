'use client';

import * as React from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<any>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const init = async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      setSession(data.session);
      if (data.session) {
        const { data: profile } = await supabaseBrowser
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        setRole(profile?.role ?? null);
      }
    };
    init();
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setRole(null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setError(null);
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  if (!session || role !== 'admin') {
    return (
      <div className="rounded-2xl border border-blush-100 bg-white p-6">
        <h2 className="text-xl font-semibold">管理者ログイン</h2>
        <p className="mt-2 text-sm text-ink/70">管理者アカウントでログインしてください。</p>
        <div className="mt-4 grid gap-3 max-w-sm">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          {error && <p className="text-xs text-blush-600">{error}</p>}
          <Button onClick={signIn}>ログイン</Button>
          <p className="text-xs text-ink/50">
            初回はSupabaseのAuthで管理者ユーザーを作成し、profiles.roleをadminに設定してください。
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
