import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY ?? "";

export function createAnonClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createAdminClient() {
  return createClient(supabaseUrl, supabaseSecretKey);
}

export { supabaseUrl, supabaseAnonKey, supabaseSecretKey };
