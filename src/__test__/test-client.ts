import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseSecretKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function createAnonClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createAdminClient() {
  return createClient(supabaseUrl, supabaseSecretKey);
}

export { supabaseUrl, supabaseAnonKey, supabaseSecretKey };
