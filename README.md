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

> If you already ran an earlier version of `supabase-schema.sql`, just re-run the current one — it only adds the new `vocab_progress` table and won't touch your existing data (every statement uses `if not exists`).

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
| `data.js` | Skills list, diagnostic question bank, lesson content, vocabulary flashcard categories, grammar reference — **edit this to add more content** |
| `config.js` | Your Supabase credentials (and optional default API key) |
| `db.js` | All Supabase read/write logic, with an in-memory fallback so the app still works before Supabase is connected |
| `app.js` | UI logic — renders each tab, handles the diagnostic, lessons, vocabulary flashcards, progress charts, and chat |
| `supabase-schema.sql` | Run once in Supabase's SQL editor to create the needed tables |

## Diagnostic versions

There are three check-ins, each covering more ground than the last:

- **Beginning of Year** — foundational topics only (present tense, ser/estar, basic commands, basic vocab, etc.), easiest difficulty. Skips the subjunctive, future, conditional, and the preterite-vs-imperfect distinction.
- **Middle of Year** — adds the preterite-vs-imperfect distinction, the future tense, and harder questions across every foundational topic. Still skips the subjunctive and conditional.
- **End of Year** — everything, at full difficulty, including the subjunctive and conditional.

Each version includes **every** matching question for every included skill area (not a random sample), so there's enough evidence per topic to actually reflect mastery rather than one lucky or unlucky guess. Answer order is shuffled every time, so the correct answer isn't always in the same position.

19 grammar skills are covered in total, including present/preterite/imperfect tenses, ser/estar, reflexive verbs, gustar-type verbs, object pronouns, por/para, adjective agreement, comparatives, question words, commands (imperative), future tense, conditional tense, present/past perfect, and imperfect subjunctive with si clauses.

## Vocabulary flashcards

The **Vocabulary** tab has 10 built-in topic-based flashcard sets (fruits, clothing, family, house & rooms, colors & numbers, daily routine, food & dining, travel, emotions, and idiomatic expressions — 120 words/phrases total), plus a "My Words" set she can add to herself directly from the app (a small form at the top of the tab).

Flashcards now use real spaced repetition: each card has a level (0–5) and a next-review date. Marking a card "I know it" pushes its next review further out (1 day → 3 → 7 → 14 → 30), while "Don't know yet" resets it to due immediately and brings it back later in the same session. "Practice due" only shows cards that are actually due; "Review all" ignores the schedule and drills everything in that category regardless.

If you're upgrading from an earlier version of this app, re-run `supabase-schema.sql` — it adds the new `level`/`next_due` columns and the `custom_vocab` table without touching existing data. Previously-marked "known" words will simply show up for one more review, since a level isn't retroactively assigned to them — after that first review they'll follow the normal schedule.

## Reading comprehension

The **Reading** tab has short passages (Beginner/Intermediate/Advanced) with comprehension questions — practice following extended text instead of isolated sentences, one of the better predictors of real reading fluency. Add more passages by extending the `READINGS` array in `data.js`.

## Mixed Review

At the top of the Lessons tab, "Mixed Review" builds one combined session: 5 practice items from your current weakest grammar skill, plus 5 vocabulary words that are due for review (including "My Words"), shuffled together. A lighter-weight way to touch both grammar and vocab without switching tabs.

## Settings: data export and granular reset

Settings now has a "Download my data" button that exports everything (scores, diagnostic history, completed lessons, vocab progress) as a JSON file, and two separate reset buttons — one for grammar progress, one for vocabulary progress — instead of one all-or-nothing reset.

## Extending it later

- **Add more diagnostic questions / lessons / reference topics / vocabulary**: everything
  lives in plain arrays inside `data.js` — no code changes needed elsewhere.
- **Add new skill categories**: add an entry to `SKILLS`, then add matching
  questions/lessons/reference entries with that same `id`.
- **Multiple learners**: the current schema assumes one learner. To support
  two people on the same Supabase project, you'd add a `user_id` column to
  each table and a simple name-select on load — ask me if you want this
  built out.
- **How comprehensive is this?** Better than before, but still not a complete curriculum. Not yet covered: an AI-guided conversation-practice mode, a timed/exam-style quiz mode, and PDF export. All addable the same way as everything else here: extending `data.js` and `app.js`.
