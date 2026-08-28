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
        <h2>${attemptedSkills ? "Repetir el diagnóstico" : "Diagnóstico inicial"}</h2>
        <p>${attemptedSkills
          ? "Vuelve a tomar el diagnóstico cuando quieras — mide tu nivel actual en cada área y actualiza tu progreso."
          : "Un vistazo rápido y honesto a dónde estás hoy. Unas 24 preguntas mezclando temas de Español 1–2 y un poco más. Sin presión — es solo un punto de partida."}</p>
        <button class="btn-primary" id="startDiag">Empezar diagnóstico</button>
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
      <p class="q-counter">Pregunta ${diagIndex + 1} de ${diagQueue.length} · <span class="skill-pill">${skillLabel(q.skill)}</span></p>
      <div class="card question-card">
        <h3>${q.prompt}</h3>
        <div class="options" id="options">
          ${q.options.map((opt, i) => `<button class="option-btn" data-i="${i}">${opt}</button>`).join("")}
        </div>
        <div class="explain-box" id="explainBox" style="display:none;"></div>
        <button class="btn-primary" id="nextBtn" style="display:none;">Siguiente</button>
      </div>
    </section>
  `;
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
      box.innerHTML = `<strong>${correct ? "¡Correcto!" : "No exactamente."}</strong> ${q.explain}`;
      $("#nextBtn").style.display = "inline-block";
    });
  });
  $("#nextBtn").addEventListener("click", () => {
    diagIndex += 1;
    renderDiagQuestion();
  });
}

async function renderDiagSummary() {
  app.innerHTML = `<section class="view"><div class="card"><h2>Calculando resultados…</h2></div></section>`;
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
        <h2>Resultados del diagnóstico</h2>
        <p class="big-stat">${totalCorrect} / ${diagResults.length} correctas</p>
        <div class="skill-rows">${rows}</div>
        <p class="muted">Tus lecciones recomendadas ahora reflejan estas áreas — empieza por las más bajas.</p>
        <button class="btn-primary" id="goLessons">Ver lecciones recomendadas</button>
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
            ${score !== undefined ? `<span class="mini-score" style="color:${scoreColor(score)}">${score}%</span>` : `<span class="mini-score muted">sin datos</span>`}
          </div>
          <h3>${lesson.title}</h3>
          ${done ? `<span class="done-tag">✓ completada</span>` : `<button class="btn-secondary open-lesson">Abrir lección</button>`}
        </div>`;
    }).join("");
  }).join("");

  app.innerHTML = `
    <section class="view">
      <h2 class="section-title">Lecciones recomendadas</h2>
      <p class="muted">Ordenadas de tu área más débil a la más fuerte. Completa el diagnóstico primero para una recomendación más precisa.</p>
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
      <button class="btn-link" id="backToLessons">← Volver a lecciones</button>
      <div class="card">
        <span class="skill-pill">${skillLabel(skillId)}</span>
        <h2>${lesson.title}</h2>
        <p>${lesson.explain}</p>
        <h4>Ejemplos</h4>
        <ul class="example-list">${lesson.examples.map(e => `<li>${e}</li>`).join("")}</ul>
        <h4>Practica</h4>
        <div id="practiceArea">
          ${lesson.practice.map((p, i) => `
            <div class="practice-item" data-i="${i}">
              <label>${p.prompt}</label>
              <input type="text" class="practice-input" autocomplete="off" spellcheck="false" />
              <button class="btn-secondary check-btn">Revisar</button>
              <span class="practice-feedback"></span>
            </div>
          `).join("")}
        </div>
        <button class="btn-primary" id="completeLesson">Marcar lección como completada</button>
      </div>
    </section>
  `;
  $("#backToLessons").addEventListener("click", renderLessons);

  $$(".check-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".practice-item");
      const i = Number(item.dataset.i);
      const input = item.querySelector(".practice-input").value;
      const expected = lesson.practice[i].answer;
      const ok = norm(input) === norm(expected) || norm(expected).includes(norm(input)) && norm(input).length > 2;
      const fb = item.querySelector(".practice-feedback");
      fb.textContent = ok ? "✓ bien" : `✗ respuesta esperada: ${expected}`;
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
      <div class="stamp ${has ? "" : "stamp-empty"}" style="--stamp-color:${scoreColor(score)}; --rot:${(skill.id.length * 13) % 10 - 5}deg" title="${skill.label}: ${has ? score + "%" : "sin practicar"}">
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
      <h2 class="section-title">Progreso</h2>
      <div class="stats-row">
        <div class="stat-box"><span class="stat-num">${overallAvg}%</span><span class="stat-label">dominio general</span></div>
        <div class="stat-box"><span class="stat-num">${overall.reduce((s, r) => s + r.attempts, 0)}</span><span class="stat-label">preguntas practicadas</span></div>
        <div class="stat-box"><span class="stat-num">${Object.values(skillScores).filter(r => r.score >= 80).length}/${SKILLS.length}</span><span class="stat-label">áreas dominadas</span></div>
      </div>

      <h3 class="section-subtitle">Sellos de dominio</h3>
      <div class="stamp-grid">${stamps}</div>

      <h3 class="section-subtitle">Actividad reciente</h3>
      ${days.length ? `<div class="bar-chart">${bars}</div>` : `<p class="muted">Aún no hay actividad registrada — completa el diagnóstico para empezar.</p>`}
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
        : "No AI key connected yet, so this searches a built-in grammar reference. Add a key anytime in Ajustes for live conversation."}</p>

      <div class="card">
        <div class="ask-row">
          <input type="text" id="askInput" placeholder="e.g. why is it 'por' and not 'para' here?" autocomplete="off" />
          <button class="btn-primary" id="askBtn">Preguntar</button>
        </div>
        <div id="chatLog" class="chat-log"></div>
      </div>

      <h3 class="section-subtitle">Explorar por tema</h3>
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
      addBubble("No encontré nada exacto en la referencia — prueba con otras palabras clave, o revisa los temas abajo.", "assistant");
    } else {
      hits.slice(0, 2).forEach(h => addBubble(h.body, "assistant"));
    }
  }

  $("#askBtn").addEventListener("click", () => handleAsk($("#askInput").value));
  $("#askInput").addEventListener("keydown", e => { if (e.key === "Enter") handleAsk($("#askInput").value); });
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
      <h2 class="section-title">Ajustes</h2>

      <div class="card">
        <h3>Conexión de datos</h3>
        <p>${DB.isConfigured
          ? `<span class="status-ok">✓ Conectado a Supabase</span> — tu progreso se guarda en la nube.`
          : `<span class="status-warn">⚠ No conectado</span> — edita config.js con tu URL y clave de Supabase. Mientras tanto, el progreso se guarda solo en este navegador y se perderá si limpias los datos.`}</p>
      </div>

      <div class="card">
        <h3>Chat con IA para "¿Por qué?"</h3>
        <p class="muted">Opcional. Pega una clave de API de Anthropic para conversación en vivo en la pestaña "¿Por qué?". Sin clave, esa pestaña usa la referencia integrada — sigue siendo útil.</p>
        <input type="password" id="apiKeyInput" placeholder="sk-ant-..." value="${key}" />
        <div class="settings-actions">
          <button class="btn-primary" id="saveKey">Guardar clave</button>
          <button class="btn-secondary" id="clearKey">Quitar clave</button>
        </div>
        <p class="muted small">La clave se guarda solo en este navegador (localStorage), nunca se envía a ningún lado excepto directamente a la API de Anthropic.</p>
      </div>

      <div class="card">
        <h3>Reiniciar progreso local</h3>
        <p class="muted">Solo borra los datos guardados en este navegador (no afecta Supabase si ya está conectado).</p>
        <button class="btn-danger" id="resetLocal">Borrar datos locales</button>
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
    if (confirm("¿Borrar todo el progreso guardado en este navegador?")) {
      localStorage.clear();
      location.reload();
    }
  });
}

// ---------- boot ----------
render();
