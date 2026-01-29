import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true, autoRefreshToken: true }
});
