import { supabaseBrowser } from '@/lib/supabase/client';

export async function ensureAnonSession() {
  const { data } = await supabaseBrowser.auth.getSession();
  let session = data.session;
  if (!session) {
    const response = await supabaseBrowser.auth.signInAnonymously();
    session = response.data.session ?? undefined;
  }
  if (typeof window !== 'undefined' && session?.user?.id) {
    const existing = localStorage.getItem('anonymousKey');
    if (!existing) {
      localStorage.setItem('anonymousKey', session.user.id);
    }
  }
}
