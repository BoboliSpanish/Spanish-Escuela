// ============================================================
// CONFIG — fill these in after you create your Supabase project
// (Project Settings → API in the Supabase dashboard).
// This file is safe to commit: the Supabase "anon" key is
// meant to be public, access is controlled by the row-level
// security policies set up in supabase-schema.sql.
// ============================================================

const CONFIG = {
  SUPABASE_URL: "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE",
  SUPABASE_ANON_KEY: "PASTE_YOUR_SUPABASE_ANON_KEY_HERE",

  // Optional. If left blank, the "Ask why" tab uses the built-in
  // grammar reference instead of a live AI conversation.
  // The key is stored in the browser (localStorage) on whichever
  // device enters it — see Settings tab in the app. Leaving this
  // blank here is fine; it can be added later from the app itself.
  ANTHROPIC_API_KEY_DEFAULT: "",
};
