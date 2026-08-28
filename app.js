import { DB } from "./db.js";

const app = document.getElementById("app");
const tabs = document.getElementById("tabs");
let currentView = "diagnostic";
let skillScores = {}; // loaded once, refreshed after writes

// ---------- helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const skillLabel = id => SKILLS.find(s => s.id === id)?.label || id;
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

function scoreColor(score) {
  if (score >= 80) return "var(--sage)";
  if (score >= 50) return "var(--gold)";
  if (score > 0) return "var(--clay)";
  return "var(--ink-faint)";
}

// ---------- voice: speaking (text-to-speech) ----------
// Supported in essentially every modern browser (Chrome, Firefox, Safari, Edge).
let cachedSpanishVoice = null;
function pickSpanishVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find(v => v.lang === "es-ES") ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith("es")) ||
    null
  );
}
if ("speechSynthesis" in window) {
  // voice list loads async in some browsers
  window.speechSynthesis.onvoiceschanged = () => { cachedSpanishVoice = pickSpanishVoice(); };
  cachedSpanishVoice = pickSpanishVoice();
}
function speak(text) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel(); // stop anything currently playing
  const utter = new SpeechSynthesisUtterance(text);
  const voice = cachedSpanishVoice || pickSpanishVoice();
  if (voice) { utter.voice = voice; utter.lang = voice.lang; }
  else { utter.lang = "es-ES"; }
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}
function speakBtnHtml(extraClass = "") {
  return `<button class="icon-btn speak-btn ${extraClass}" title="Listen / Escuchar" aria-label="Listen">🔊</button>`;
}

// ---------- voice: listening (speech-to-text) ----------
// Only supported in Chrome, Edge, and (partially) Safari — NOT Firefox.
function supportsSTT() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
function listenOnce(lang, onResult, onError) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { onError && onError("unsupported"); return null; }
  const rec = new SR();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = e => onResult(e.results[0][0].transcript);
  rec.onerror = e => onError && onError(e.error);
  try { rec.start(); } catch (e) { onError && onError(e.message); }
  return rec;
}
function micBtnHtml(extraClass = "") {
  return `<button class="icon-btn mic-btn ${extraClass}" title="Speak your answer / Habla tu respuesta" aria-label="Speak">🎤</button>`;
}
function wireMicButton(btn, lang, onTranscript) {
  btn.addEventListener("click", () => {
    if (!supportsSTT()) {
      alert("Voice input isn't supported in this browser. Try Chrome, Edge, or Safari — it won't work in Firefox.");
      return;
    }
    btn.classList.add("listening");
    btn.textContent = "🎙️";
    listenOnce(lang,
      transcript => { btn.classList.remove("listening"); btn.textContent = "🎤"; onTranscript(transcript); },
      err => {
        btn.classList.remove("listening");
        btn.textContent = "🎤";
        if (err !== "no-speech" && err !== "aborted") alert("Couldn't hear that — try again, or just type your answer.");
      }
    );
  });
}

async function refreshHeader() {
  const streak = await DB.getStreak();
  $("#streakNum").textContent = streak;
}

// ---------- tab switching ----------
tabs.addEventListener("click", e => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  $$(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentView = btn.dataset.view;
  render();
});

async function render() {
  skillScores = await DB.getAllSkillScores();
  if (currentView === "diagnostic") renderDiagnostic();
  else if (currentView === "lessons") renderLessons();
  else if (currentView === "progress") renderProgress();
  else if (currentView === "reference") renderReference();
  else if (currentView === "settings") renderSettings();
  refreshHeader();
}

// ============================================================
// DIAGNOSTIC
// ============================================================
let diagQueue = [];
let diagIndex = 0;
let diagResults = [];

function buildDiagnosticQueue() {
  // one pass through every question, shuffled, capped at 24 per run
  // so an initial diagnostic and later re-checks stay a similar length
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(24, shuffled.length));
}

function renderDiagnostic() {
  const attemptedSkills = Object.keys(skillScores).length;
  app.innerHTML = `
    <section class="view">
      <div class="card intro-card">
        <h2>${attemptedSkills ? "Retake the diagnostic / Repetir el diagnóstico" : "Initial diagnostic / Diagnóstico inicial"}</h2>
        <p>${attemptedSkills
          ? "Retake the diagnostic anytime — it measures your current level in each area and updates your progress."
          : "A quick, honest look at where you stand today. About 24 questions mixing Spanish 1–2 topics and a bit beyond. No pressure — it's just a starting point."}</p>
        <button class="btn-primary" id="startDiag">Start diagnostic / Empezar diagnóstico</button>
      </div>
    </section>
  `;
  $("#startDiag").addEventListener("click", () => {
    diagQueue = buildDiagnosticQueue();
    diagIndex = 0;
    diagResults = [];
    renderDiagQuestion();
  });
}

function renderDiagQuestion() {
  if (diagIndex >= diagQueue.length) return renderDiagSummary();
  const q = diagQueue[diagIndex];
  app.innerHTML = `
    <section class="view">
      <div class="progress-bar"><div class="progress-fill" style="width:${(diagIndex / diagQueue.length) * 100}%"></div></div>
      <p class="q-counter">Question ${diagIndex + 1} of ${diagQueue.length} <span class="es-note">/ Pregunta ${diagIndex + 1} de ${diagQueue.length}</span> · <span class="skill-pill">${skillLabel(q.skill)}</span></p>
      <div class="card question-card">
        <h3>${q.prompt} ${speakBtnHtml("speak-prompt")}</h3>
        <div class="options" id="options">
          ${q.options.map((opt, i) => `<button class="option-btn" data-i="${i}">${opt}</button>`).join("")}
        </div>
        <div class="explain-box" id="explainBox" style="display:none;"></div>
        <button class="btn-primary" id="nextBtn" style="display:none;">Next / Siguiente</button>
      </div>
    </section>
  `;
  $(".speak-prompt").addEventListener("click", () => speak(q.prompt));
  let answered = false;
  $$(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const i = Number(btn.dataset.i);
      const correct = i === q.answer;
      diagResults.push({ skill: q.skill, correct });
      $$(".option-btn").forEach((b, bi) => {
        b.disabled = true;
        if (bi === q.answer) b.classList.add("correct");
        else if (bi === i) b.classList.add("incorrect");
      });
      const box = $("#explainBox");
      box.style.display = "block";
      box.innerHTML = `<strong>${correct ? "Correct! / ¡Correcto!" : "Not quite / No exactamente."}</strong> ${q.explain}`;
      $("#nextBtn").style.display = "inline-block";
    });
  });
  $("#nextBtn").addEventListener("click", () => {
    diagIndex += 1;
    renderDiagQuestion();
  });
}

async function renderDiagSummary() {
  app.innerHTML = `<section class="view"><div class="card"><h2>Calculating results… / Calculando resultados…</h2></div></section>`;
  for (const r of diagResults) {
    await DB.recordAttempt(r.skill, r.correct, "diagnostic");
  }
  skillScores = await DB.getAllSkillScores();

  const bySkill = {};
  diagResults.forEach(r => {
    bySkill[r.skill] = bySkill[r.skill] || { correct: 0, total: 0 };
    bySkill[r.skill].total += 1;
    bySkill[r.skill].correct += r.correct ? 1 : 0;
  });
  const totalCorrect = diagResults.filter(r => r.correct).length;

  const rows = Object.entries(bySkill)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([skill, s]) => {
      const pct = Math.round((s.correct / s.total) * 100);
      return `<div class="skill-row">
        <span class="skill-row-label">${skillLabel(skill)}</span>
        <div class="skill-row-bar"><div class="skill-row-fill" style="width:${pct}%; background:${scoreColor(pct)}"></div></div>
        <span class="skill-row-pct">${pct}%</span>
      </div>`;
    }).join("");

  app.innerHTML = `
    <section class="view">
      <div class="card">
        <h2>Diagnostic results / Resultados del diagnóstico</h2>
        <p class="big-stat">${totalCorrect} / ${diagResults.length} correct</p>
        <div class="skill-rows">${rows}</div>
        <p class="muted">Your recommended lessons now reflect these areas — start with the lowest ones.</p>
        <button class="btn-primary" id="goLessons">See recommended lessons / Ver lecciones recomendadas</button>
      </div>
    </section>
  `;
  $("#goLessons").addEventListener("click", () => {
    $$(".tab-btn").forEach(b => b.classList.remove("active"));
    $(`.tab-btn[data-view="lessons"]`).classList.add("active");
    currentView = "lessons";
    render();
  });
}

// ============================================================
// LESSONS
// ============================================================
async function renderLessons() {
  const completed = await DB.getCompletedLessons();
  const ranked = [...SKILLS].sort((a, b) => (skillScores[a.id]?.score ?? -1) - (skillScores[b.id]?.score ?? -1));

  const cards = ranked.map(skill => {
    const lessons = LESSONS[skill.id] || [];
    const score = skillScores[skill.id]?.score;
    return lessons.map((lesson, i) => {
      const key = `${skill.id}-${i}`;
      const done = !!completed[key];
      return `
        <div class="lesson-card ${done ? "done" : ""}" data-skill="${skill.id}" data-index="${i}">
          <div class="lesson-card-top">
            <span class="skill-pill">${skill.label}</span>
            ${score !== undefined ? `<span class="mini-score" style="color:${scoreColor(score)}">${score}%</span>` : `<span class="mini-score muted">no data / sin datos</span>`}
          </div>
          <h3>${lesson.title}</h3>
          ${done ? `<span class="done-tag">✓ completed / completada</span>` : `<button class="btn-secondary open-lesson">Open lesson / Abrir lección</button>`}
        </div>`;
    }).join("");
  }).join("");

  app.innerHTML = `
    <section class="view">
      <h2 class="section-title">Recommended lessons / Lecciones recomendadas</h2>
      <p class="muted">Ordered from your weakest area to your strongest. Complete the diagnostic first for a more accurate recommendation.</p>
      <div class="lesson-grid">${cards}</div>
    </section>
  `;
  $$(".open-lesson").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".lesson-card");
      renderLessonDetail(card.dataset.skill, Number(card.dataset.index));
    });
  });
}

function renderLessonDetail(skillId, index) {
  const lesson = LESSONS[skillId][index];
  const key = `${skillId}-${index}`;
  app.innerHTML = `
    <section class="view">
      <button class="btn-link" id="backToLessons">← Back to lessons / Volver a lecciones</button>
      <div class="card">
        <span class="skill-pill">${skillLabel(skillId)}</span>
        <h2>${lesson.title}</h2>
        <p>${lesson.explain}</p>
        <h4>Examples / Ejemplos</h4>
        <ul class="example-list">${lesson.examples.map((e, i) => `<li>${e} <button class="icon-btn speak-btn speak-example" data-ex="${i}" title="Listen / Escuchar">🔊</button></li>`).join("")}</ul>
        <h4>Practice / Practica</h4>
        <div id="practiceArea">
          ${lesson.practice.map((p, i) => `
            <div class="practice-item" data-i="${i}">
              <label>${p.prompt}</label>
              <div class="practice-input-row">
                <input type="text" class="practice-input" autocomplete="off" spellcheck="false" />
                ${micBtnHtml("practice-mic")}
              </div>
              <button class="btn-secondary check-btn">Check / Revisar</button>
              <span class="practice-feedback"></span>
            </div>
          `).join("")}
        </div>
        <button class="btn-primary" id="completeLesson">Mark lesson complete / Marcar lección como completada</button>
      </div>
    </section>
  `;
  $("#backToLessons").addEventListener("click", renderLessons);

  $$(".speak-example").forEach(btn => {
    btn.addEventListener("click", () => speak(lesson.examples[Number(btn.dataset.ex)]));
  });

  $$(".practice-mic").forEach(btn => {
    const item = btn.closest(".practice-item");
    const input = item.querySelector(".practice-input");
    wireMicButton(btn, "es-ES", transcript => { input.value = transcript; });
  });

  $$(".check-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".practice-item");
      const i = Number(item.dataset.i);
      const input = item.querySelector(".practice-input").value;
      const expected = lesson.practice[i].answer;
      const ok = norm(input) === norm(expected) || norm(expected).includes(norm(input)) && norm(input).length > 2;
      const fb = item.querySelector(".practice-feedback");
      fb.textContent = ok ? "✓ correct / bien" : `✗ expected / respuesta esperada: ${expected}`;
      fb.className = "practice-feedback " + (ok ? "ok" : "bad");
    });
  });

  $("#completeLesson").addEventListener("click", async () => {
    await DB.markLessonComplete(key);
    // small score nudge from lesson completion, not a full diagnostic weight
    await DB.recordAttempt(skillId, true, "lesson");
    renderLessons();
  });
}

// ============================================================
// PROGRESS
// ============================================================
async function renderProgress() {
  const attempts = await DB.getRecentAttempts(30);
  const stamps = SKILLS.map(skill => {
    const s = skillScores[skill.id];
    const score = s?.score ?? 0;
    const has = s !== undefined;
    return `
      <div class="stamp ${has ? "" : "stamp-empty"}" style="--stamp-color:${scoreColor(score)}; --rot:${(skill.id.length * 13) % 10 - 5}deg" title="${skill.label}: ${has ? score + "%" : "not practiced yet"}">
        <span class="stamp-score">${has ? score + "%" : "—"}</span>
        <span class="stamp-label">${skill.label}</span>
      </div>`;
  }).join("");

  // simple day-bucketed bar chart from attempts_log
  const byDay = {};
  attempts.forEach(a => {
    const day = (a.created_at || "").slice(0, 10);
    byDay[day] = byDay[day] || { correct: 0, total: 0 };
    byDay[day].total += 1;
    byDay[day].correct += a.correct ? 1 : 0;
  });
  const days = Object.keys(byDay).sort().slice(-14);
  const maxTotal = Math.max(1, ...days.map(d => byDay[d].total));
  const bars = days.map(d => {
    const h = Math.round((byDay[d].total / maxTotal) * 100);
    const pct = Math.round((byDay[d].correct / byDay[d].total) * 100);
    const label = d.slice(5); // MM-DD
    return `<div class="bar-col">
      <div class="bar" style="height:${h}%; background:${scoreColor(pct)}" title="${d}: ${byDay[d].correct}/${byDay[d].total}"></div>
      <span class="bar-label">${label}</span>
    </div>`;
  }).join("");

  const overall = Object.values(skillScores);
  const overallAvg = overall.length ? Math.round(overall.reduce((s, r) => s + r.score, 0) / overall.length) : 0;

  app.innerHTML = `
    <section class="view">
      <h2 class="section-title">Progress / Progreso</h2>
      <div class="stats-row">
        <div class="stat-box"><span class="stat-num">${overallAvg}%</span><span class="stat-label">overall mastery / dominio general</span></div>
        <div class="stat-box"><span class="stat-num">${overall.reduce((s, r) => s + r.attempts, 0)}</span><span class="stat-label">questions practiced / preguntas practicadas</span></div>
        <div class="stat-box"><span class="stat-num">${Object.values(skillScores).filter(r => r.score >= 80).length}/${SKILLS.length}</span><span class="stat-label">areas mastered / áreas dominadas</span></div>
      </div>

      <h3 class="section-subtitle">Mastery stamps / Sellos de dominio</h3>
      <div class="stamp-grid">${stamps}</div>

      <h3 class="section-subtitle">Recent activity / Actividad reciente</h3>
      ${days.length ? `<div class="bar-chart">${bars}</div>` : `<p class="muted">No activity recorded yet — complete the diagnostic to get started.</p>`}
    </section>
  `;
}

// ============================================================
// REFERENCE / "ASK WHY" CHAT
// ============================================================
function getApiKey() {
  return localStorage.getItem("anthropic_api_key") || (CONFIG.ANTHROPIC_API_KEY_DEFAULT || "");
}

async function askLiveAI(question, history) {
  const key = getApiKey();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: "You are a friendly, precise Spanish tutor helping an adult learner who studied through Spanish 2 in high school and is refreshing/advancing her Spanish. When she asks 'why' a grammar rule or phrasing works the way it does, give a clear, concrete explanation with a short example or two. Keep answers focused — a few short paragraphs at most, not an exhaustive grammar essay. Respond in English unless she writes in Spanish.",
      messages: [...history, { role: "user", content: question }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
}

let chatHistory = [];

function renderReference() {
  const hasKey = !!getApiKey();
  app.innerHTML = `
    <section class="view">
      <h2 class="section-title">¿Por qué? — Ask why</h2>
      <p class="muted">${hasKey
        ? "Ask about any rule, phrasing, or sentence you're unsure of — this is a live conversation."
        : "No AI key connected yet, so this searches a built-in grammar reference. Add a key anytime in Settings / Ajustes for live conversation."}</p>

      <div class="card">
        <div class="ask-row">
          <input type="text" id="askInput" placeholder="e.g. why is it 'por' and not 'para' here?" autocomplete="off" />
          ${micBtnHtml("ask-mic")}
          <button class="btn-primary" id="askBtn">Ask / Preguntar</button>
        </div>
        <div id="chatLog" class="chat-log"></div>
      </div>

      <h3 class="section-subtitle">Explore by topic / Explorar por tema</h3>
      <div class="ref-topics">
        ${REFERENCE.map(r => `<button class="topic-chip" data-q="${encodeURIComponent(r.q)}">${skillLabel(r.skill)}</button>`).join("")}
      </div>
    </section>
  `;

  const log = $("#chatLog");
  function addBubble(text, who) {
    const div = document.createElement("div");
    div.className = `bubble ${who}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  async function handleAsk(question) {
    if (!question.trim()) return;
    addBubble(question, "user");
    $("#askInput").value = "";
    if (hasKey) {
      addBubble("…", "assistant thinking");
      try {
        const answer = await askLiveAI(question, chatHistory);
        chatHistory.push({ role: "user", content: question }, { role: "assistant", content: answer });
        log.lastChild.remove();
        addBubble(answer, "assistant");
      } catch (e) {
        log.lastChild.remove();
        addBubble("Couldn't reach the AI (" + e.message + "). Falling back to the built-in reference below.", "assistant error");
        fallbackSearch(question);
      }
    } else {
      fallbackSearch(question);
    }
  }

  function fallbackSearch(question) {
    const hits = searchReference(question);
    if (hits.length === 0) {
      addBubble("Nothing exact found in the reference — try different keywords, or check the topics below.", "assistant");
    } else {
      hits.slice(0, 2).forEach(h => addBubble(h.body, "assistant"));
    }
  }

  $("#askBtn").addEventListener("click", () => handleAsk($("#askInput").value));
  $("#askInput").addEventListener("keydown", e => { if (e.key === "Enter") handleAsk($("#askInput").value); });
  wireMicButton($(".ask-mic"), navigator.language || "en-US", transcript => handleAsk(transcript));
  $$(".topic-chip").forEach(chip => {
    chip.addEventListener("click", () => handleAsk(decodeURIComponent(chip.dataset.q)));
  });
}

// ============================================================
// SETTINGS
// ============================================================
function renderSettings() {
  const key = localStorage.getItem("anthropic_api_key") || "";
  app.innerHTML = `
    <section class="view">
      <h2 class="section-title">Settings / Ajustes</h2>

      <div class="card">
        <h3>Data connection / Conexión de datos</h3>
        <p>${DB.isConfigured
          ? `<span class="status-ok">✓ Connected to Supabase / Conectado a Supabase</span> — your progress is saved to the cloud.`
          : `<span class="status-warn">⚠ Not connected / No conectado</span> — edit config.js with your Supabase URL and key. In the meantime, progress is saved only in this browser and will be lost if you clear your data.`}</p>
      </div>

      <div class="card">
        <h3>Voice features / Funciones de voz</h3>
        <p>${"speechSynthesis" in window
          ? `<span class="status-ok">✓ Text-to-speech supported</span> — speaker buttons will read Spanish sentences aloud.`
          : `<span class="status-warn">⚠ Text-to-speech not detected in this browser.</span>`}</p>
        <p>${supportsSTT()
          ? `<span class="status-ok">✓ Microphone input supported</span> — mic buttons will work for speaking answers.`
          : `<span class="status-warn">⚠ Microphone input isn't supported in this browser</span> — this works in Chrome, Edge, or Safari, but not Firefox. Typing still works everywhere.`}</p>
      </div>

      <div class="card">
        <h3>AI chat for "Ask why / ¿Por qué?"</h3>
        <p class="muted">Optional. Paste an Anthropic API key for live conversation in the "Ask why" tab. Without a key, that tab uses the built-in reference — still useful on its own.</p>
        <input type="password" id="apiKeyInput" placeholder="sk-ant-..." value="${key}" />
        <div class="settings-actions">
          <button class="btn-primary" id="saveKey">Save key / Guardar clave</button>
          <button class="btn-secondary" id="clearKey">Remove key / Quitar clave</button>
        </div>
        <p class="muted small">The key is stored only in this browser (localStorage) and is never sent anywhere except directly to Anthropic's API.</p>
      </div>

      <div class="card">
        <h3>Reset local progress / Reiniciar progreso local</h3>
        <p class="muted">Only clears data stored in this browser (doesn't affect Supabase if it's already connected).</p>
        <button class="btn-danger" id="resetLocal">Clear local data / Borrar datos locales</button>
      </div>
    </section>
  `;
  $("#saveKey").addEventListener("click", () => {
    const val = $("#apiKeyInput").value.trim();
    if (val) localStorage.setItem("anthropic_api_key", val);
    renderSettings();
  });
  $("#clearKey").addEventListener("click", () => {
    localStorage.removeItem("anthropic_api_key");
    renderSettings();
  });
  $("#resetLocal").addEventListener("click", () => {
    if (confirm("Clear all progress saved in this browser? / ¿Borrar todo el progreso guardado en este navegador?")) {
      localStorage.clear();
      location.reload();
    }
  });
}

// ---------- boot ----------
render();
