import { createClient } from "@supabase/supabase-js";

// Admin client — uses service role key, bypasses RLS.
// Never expose this key to the browser.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
