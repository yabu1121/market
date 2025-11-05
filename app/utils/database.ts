import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_PROJECT_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(url, key);

export default supabase