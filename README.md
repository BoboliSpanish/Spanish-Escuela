# Cuaderno — Spanish Progress Journal

A personal Spanish-learning tool: a diagnostic quiz, adaptive lessons ranked
by weak areas, a progress dashboard with mastery "stamps," and an "Ask why"
grammar-explainer panel. Pairs well with audio-based study (like Pimsleur) by
covering the written grammar/rules side.

No build step — plain HTML/CSS/JS. Works on GitHub Pages as-is.

## 1. Set up Supabase (data storage)

1. Go to [supabase.com](https://supabase.com), create a free account and a new project.
2. Once it's ready, open **SQL Editor** in the left sidebar → **New query**.
3. Paste in the entire contents of `supabase-schema.sql` from this folder and click **Run**.
4. Go to **Project Settings → API**. Copy:
   - **Project URL**
   - **anon public** key
5. Open `config.js` in this folder and paste them in:
   ```js
   SUPABASE_URL: "https://your-project.supabase.co",
   SUPABASE_ANON_KEY: "eyJ...",
   ```
6. Save the file.

> Note: the anon key is meant to be public-ish (it's how every Supabase
> client-side app works) — access is controlled by the row-level-security
> policies in the schema file, not by hiding the key. Since this app has no
> login screen, anyone with your project URL + anon key could read/write
> your practice data. That's fine for a private personal tool — just don't
> publish those two values somewhere public beyond this repo, and keep the
> GitHub repo private if you want extra peace of mind.

## 2. Deploy to GitHub Pages

1. Create a new GitHub repository (private or public).
2. Upload all the files in this folder to the repo (or `git push` them).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch,"
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like `https://yourusername.github.io/repo-name/`
   within a minute or two — that's the live app.

That's it — no build tools, no npm install, nothing to compile.

## 3. (Optional) Live AI chat for "Ask why"

Without any setup, the **¿Por qué?** tab searches a built-in grammar
reference — useful, but limited to topics already written into `data.js`.

To get a real live conversation instead (she can ask about any sentence,
in her own words):

1. Go to [console.anthropic.com](https://console.anthropic.com), sign up,
   and add a small amount of credit (e.g. $5 — at normal tutoring-chat
   volume this lasts a long time; each exchange costs a fraction of a cent).
2. Create an API key.
3. Open the app → **Ajustes** (Settings) tab → paste the key into
   "Chat con IA para ¿Por qué?" → Save.

The key is stored only in that browser's local storage and is sent directly
from the browser to Anthropic's API — it never touches Supabase or GitHub.
If she uses the app on more than one device, she'll need to paste the key
into each device once.

## What's in each file

| File | Purpose |
|---|---|
| `index.html` | Page shell and navigation |
| `style.css` | All styling |
| `data.js` | Skills list, diagnostic question bank, lesson content, grammar reference — **edit this to add more content** |
| `config.js` | Your Supabase credentials (and optional default API key) |
| `db.js` | All Supabase read/write logic, with an in-memory fallback so the app still works before Supabase is connected |
| `app.js` | UI logic — renders each tab, handles the quiz flow, lessons, progress charts, and chat |
| `supabase-schema.sql` | Run once in Supabase's SQL editor to create the needed tables |

## Extending it later

- **Add more diagnostic questions / lessons / reference topics**: everything
  lives in plain arrays inside `data.js` — no code changes needed elsewhere.
- **Add new skill categories**: add an entry to `SKILLS`, then add matching
  questions/lessons/reference entries with that same `id`.
- **Multiple learners**: the current schema assumes one learner. To support
  two people on the same Supabase project, you'd add a `user_id` column to
  each table and a simple name-select on load — ask me if you want this
  built out.
