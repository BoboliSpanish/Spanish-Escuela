-- ============================================================
-- Run this once in your Supabase project's SQL Editor
-- (left sidebar → SQL Editor → New query → paste → Run)
-- ============================================================

create table if not exists skill_scores (
  skill_id text primary key,
  score numeric not null default 0,       -- 0-100 mastery estimate
  attempts int not null default 0,
  correct int not null default 0,
  last_practiced timestamptz default now()
);

create table if not exists attempts_log (
  id bigint generated always as identity primary key,
  skill_id text not null,
  correct boolean not null,
  source text not null default 'diagnostic',  -- 'diagnostic' | 'lesson'
  created_at timestamptz default now()
);

create table if not exists lessons_completed (
  lesson_key text primary key,   -- e.g. "present-0"
  completed_at timestamptz default now()
);

create table if not exists daily_activity (
  activity_date date primary key,
  practiced boolean default true
);

create table if not exists vocab_progress (
  word_id text primary key,              -- e.g. "fruits:0" or "custom:14"
  status text not null default 'learning', -- legacy column, kept for compatibility; scheduling now uses level/next_due
  level int not null default 0,           -- spaced-repetition level, 0-5
  next_due timestamptz not null default now(), -- when this card is next due for review
  last_reviewed timestamptz default now()
);

-- If vocab_progress already existed from an earlier version of this app,
-- CREATE TABLE IF NOT EXISTS above is a no-op — these add the new columns.
alter table vocab_progress add column if not exists level int not null default 0;
alter table vocab_progress add column if not exists next_due timestamptz not null default now();

create table if not exists custom_vocab (
  id bigint generated always as identity primary key,
  es text not null,
  en text not null,
  created_at timestamptz default now()
);

-- Row Level Security: this is a private single-user app (no login
-- screen), so we allow the anon key full read/write. Anyone with
-- your Supabase URL + anon key could read/write this data, so
-- treat those two values as private even though they're not
-- "secret" in the Supabase sense — don't post them publicly.

alter table skill_scores enable row level security;
alter table attempts_log enable row level security;
alter table lessons_completed enable row level security;
alter table daily_activity enable row level security;
alter table vocab_progress enable row level security;
alter table custom_vocab enable row level security;

drop policy if exists "allow all - skill_scores" on skill_scores;
drop policy if exists "allow all - attempts_log" on attempts_log;
drop policy if exists "allow all - lessons_completed" on lessons_completed;
drop policy if exists "allow all - daily_activity" on daily_activity;
drop policy if exists "allow all - vocab_progress" on vocab_progress;
drop policy if exists "allow all - custom_vocab" on custom_vocab;

create policy "allow all - skill_scores" on skill_scores for all using (true) with check (true);
create policy "allow all - attempts_log" on attempts_log for all using (true) with check (true);
create policy "allow all - lessons_completed" on lessons_completed for all using (true) with check (true);
create policy "allow all - daily_activity" on daily_activity for all using (true) with check (true);
create policy "allow all - vocab_progress" on vocab_progress for all using (true) with check (true);
create policy "allow all - custom_vocab" on custom_vocab for all using (true) with check (true);
