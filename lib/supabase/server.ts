import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export function getSupabaseServerClient() {
  return createClient(supabaseUrl, serviceRole || supabaseAnon, {
    auth: { persistSession: false }
  });
}
