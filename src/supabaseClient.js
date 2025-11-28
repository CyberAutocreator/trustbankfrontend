import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR-PROJECT-URL.supabase.co";   // from Supabase project settings
const supabaseKey = "YOUR-ANON-KEY";                          // from Supabase API keys
export const supabase = createClient(supabaseUrl, supabaseKey);
