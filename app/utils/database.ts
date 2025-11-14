import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_PROJECT_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

if (!url || !key) {
  throw new Error("SupabaseのURLまたはAPIキーが環境変数に設定されていません。");
}
const supabase = createClient(url, key);

export default supabase;