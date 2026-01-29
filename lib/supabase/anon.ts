import { getSupabaseBrowser } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';

export async function ensureAnonSession() {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  let session: Session | null = data.session;
  if (!session) {
    const response = await supabase.auth.signInAnonymously();
    session = response.data.session ?? null;
  }
  if (typeof window !== 'undefined' && session?.user?.id) {
    const existing = localStorage.getItem('anonymousKey');
    if (!existing) {
      localStorage.setItem('anonymousKey', session.user.id);
    }
  }
}
