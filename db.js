// ============================================================
// DB — thin wrapper around Supabase. If CONFIG isn't filled in
// yet, everything degrades gracefully to an in-memory store so
// the app still works before Supabase is connected.
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const isConfigured =
  typeof CONFIG !== "undefined" &&
  CONFIG.SUPABASE_URL &&
  !CONFIG.SUPABASE_URL.startsWith("PASTE_") &&
  CONFIG.SUPABASE_ANON_KEY &&
  !CONFIG.SUPABASE_ANON_KEY.startsWith("PASTE_");

let client = null;
if (isConfigured) {
  client = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
}

// In-memory fallback (used until Supabase is connected, or if a
// call fails — so a flaky connection never blocks practice).
const memory = {
  skill_scores: {},     // skill_id -> {score, attempts, correct, last_practiced}
  attempts_log: [],     // {skill_id, correct, source, created_at}
  lessons_completed: {},// lesson_key -> completed_at
  daily_activity: {},   // date -> true
  vocab_progress: {},   // word_id -> {status, last_reviewed}
};

export const DB = {
  isConfigured,

  async getAllSkillScores() {
    if (!client) return { ...memory.skill_scores };
    try {
      const { data, error } = await client.from("skill_scores").select("*");
      if (error) throw error;
      const out = {};
      data.forEach(row => (out[row.skill_id] = row));
      return out;
    } catch (e) {
      console.warn("Supabase read failed, using memory:", e.message);
      return { ...memory.skill_scores };
    }
  },

  async recordAttempt(skillId, correct, source = "diagnostic") {
    const now = new Date().toISOString();
    const today = now.slice(0, 10);

    // update in-memory always, as a safety net
    const existing = memory.skill_scores[skillId] || { score: 0, attempts: 0, correct: 0 };
    existing.attempts += 1;
    existing.correct += correct ? 1 : 0;
    existing.score = Math.round((existing.correct / existing.attempts) * 100);
    existing.last_practiced = now;
    memory.skill_scores[skillId] = existing;
    memory.attempts_log.push({ skill_id: skillId, correct, source, created_at: now });
    memory.daily_activity[today] = true;

    if (!client) return;
    try {
      await client.from("attempts_log").insert({ skill_id: skillId, correct, source });

      const { data: rows } = await client.from("skill_scores").select("*").eq("skill_id", skillId);
      const row = rows && rows[0];
      const attempts = (row?.attempts || 0) + 1;
      const correctCount = (row?.correct || 0) + (correct ? 1 : 0);
      const score = Math.round((correctCount / attempts) * 100);
      await client.from("skill_scores").upsert({
        skill_id: skillId,
        score,
        attempts,
        correct: correctCount,
        last_practiced: now,
      });
      await client.from("daily_activity").upsert({ activity_date: today, practiced: true });
    } catch (e) {
      console.warn("Supabase write failed, kept in memory only:", e.message);
    }
  },

  async markLessonComplete(lessonKey) {
    const now = new Date().toISOString();
    memory.lessons_completed[lessonKey] = now;
    if (!client) return;
    try {
      await client.from("lessons_completed").upsert({ lesson_key: lessonKey, completed_at: now });
    } catch (e) {
      console.warn("Supabase write failed:", e.message);
    }
  },

  async getCompletedLessons() {
    if (!client) return { ...memory.lessons_completed };
    try {
      const { data, error } = await client.from("lessons_completed").select("*");
      if (error) throw error;
      const out = {};
      data.forEach(row => (out[row.lesson_key] = row.completed_at));
      return out;
    } catch (e) {
      console.warn("Supabase read failed, using memory:", e.message);
      return { ...memory.lessons_completed };
    }
  },

  async getRecentAttempts(days = 30) {
    if (!client) return memory.attempts_log;
    try {
      const since = new Date(Date.now() - days * 86400000).toISOString();
      const { data, error } = await client
        .from("attempts_log")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn("Supabase read failed, using memory:", e.message);
      return memory.attempts_log;
    }
  },

  async getStreak() {
    let activity;
    if (!client) {
      activity = memory.daily_activity;
    } else {
      try {
        const { data, error } = await client.from("daily_activity").select("*");
        if (error) throw error;
        activity = {};
        data.forEach(row => (activity[row.activity_date] = row.practiced));
      } catch (e) {
        activity = memory.daily_activity;
      }
    }
    let streak = 0;
    let cursor = new Date();
    // if today has no activity yet, still allow the streak to count
    // through yesterday (don't zero it out just for not having
    // practiced yet today).
    const todayKey = cursor.toISOString().slice(0, 10);
    if (!activity[todayKey]) cursor.setDate(cursor.getDate() - 1);
    while (true) {
      const key = cursor.toISOString().slice(0, 10);
      if (activity[key]) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }
    return streak;
  },

  async getVocabProgress() {
    if (!client) return { ...memory.vocab_progress };
    try {
      const { data, error } = await client.from("vocab_progress").select("*");
      if (error) throw error;
      const out = {};
      data.forEach(row => (out[row.word_id] = { status: row.status, last_reviewed: row.last_reviewed }));
      return out;
    } catch (e) {
      console.warn("Supabase read failed, using memory:", e.message);
      return { ...memory.vocab_progress };
    }
  },

  async setVocabStatus(wordId, status) {
    const now = new Date().toISOString();
    memory.vocab_progress[wordId] = { status, last_reviewed: now };
    if (!client) return;
    try {
      await client.from("vocab_progress").upsert({ word_id: wordId, status, last_reviewed: now });
    } catch (e) {
      console.warn("Supabase write failed, kept in memory only:", e.message);
    }
  },

  async clearGrammarProgress() {
    memory.skill_scores = {};
    memory.attempts_log = [];
    memory.lessons_completed = {};
    if (!client) return;
    try {
      await client.from("skill_scores").delete().neq("skill_id", "__never__");
      await client.from("attempts_log").delete().neq("id", -1);
      await client.from("lessons_completed").delete().neq("lesson_key", "__never__");
    } catch (e) {
      console.warn("Supabase clear failed:", e.message);
    }
  },

  async clearVocabProgress() {
    memory.vocab_progress = {};
    if (!client) return;
    try {
      await client.from("vocab_progress").delete().neq("word_id", "__never__");
    } catch (e) {
      console.warn("Supabase clear failed:", e.message);
    }
  },
};
