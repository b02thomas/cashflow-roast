import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

// Placeholder values for SSR/build time when env vars may not be available
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key-for-build";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY;

// Singleton browser client - only created on client side
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    // Return a dummy client during SSR that won't be used
    return createBrowserClient(PLACEHOLDER_URL, PLACEHOLDER_KEY);
  }
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

// Server-side client for server actions (no browser APIs)
export function createSupabaseServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
