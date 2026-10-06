const THEME_KEY = "interview-theme";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

applyTheme(getInitialTheme());

const questions = window.INTERVIEW_QUESTIONS || [];
const state = {
  filtered: [...questions],
  currentIndex: 0,
  mockIds: null,
  mode: localStorage.getItem("interview-mode") || "quiz",
  progress: JSON.parse(localStorage.getItem("interview-progress") || "{}"),
  quizProgress: JSON.parse(localStorage.getItem("interview-quiz-progress") || "{}"),
  shuffledChoices: {},
};

const el = id => document.getElementById(id);
const categoryFilter = el("categoryFilter");
const difficultyFilter = el("difficultyFilter");
const searchInput = el("searchInput");

function saveProgress() {
  localStorage.setItem("interview-progress", JSON.stringify(state.progress));
  localStorage.setItem("interview-quiz-progress", JSON.stringify(state.quizProgress));
  localStorage.setItem("interview-mode", state.mode);
}

function shuffleWithCorrect(q) {
  if (state.shuffledChoices[q.id]) return state.shuffledChoices[q.id];
  const entries = q.choices.map((text, index) => ({ text, isCorrect: index === q.correctIndex }));
  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }
  state.shuffledChoices[q.id] = entries;
  return entries;
}

function categories() {
  return ["all", ...new Set(questions.map(q => q.category))];
}

function initCategories() {
  categoryFilter.innerHTML = categories().map(c =>
    `<option value="${c}">${c === "all" ? "Tất cả" : c}</option>`
  ).join("");
}

function applyFilters() {
  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;
  const search = searchInput.value.trim().toLowerCase();

  const source = state.mockIds ? questions.filter(q => state.mockIds.includes(q.id)) : questions;
  state.filtered = source.filter(q => {
    const byCategory = category === "all" || q.category === category;
    const byDifficulty = difficulty === "all" || q.difficulty === difficulty;
    const haystack = [q.q, q.a, q.project || "", ...(q.follow || [])].join(" ").toLowerCase();
    return byCategory && byDifficulty && (!search || haystack.includes(search));
  });

  state.currentIndex = Math.min(state.currentIndex, Math.max(0, state.filtered.length - 1));
  render();
}

function renderQuiz(q) {
  el("quizBox").classList.remove("hidden");
  el("showAnswerBtn").classList.add("hidden");
  el("ratingRow").classList.add("hidden");

  const choices = shuffleWithCorrect(q);
  const existing = state.quizProgress[q.id];
  const letters = ["A", "B", "C", "D"];

  el("choiceList").innerHTML = choices.map((c, i) => {
    let cls = "choice-btn";
    if (existing) {
      if (c.isCorrect) cls += " correct";
      else if (existing.selectedText === c.text) cls += " wrong";
    }
    return `<button class="${cls}" data-choice="${i}" ${existing ? "disabled" : ""}>
      <span class="choice-letter">${letters[i]}</span>
      <span>${c.text}</span>
    </button>`;
  }).join("");

  const result = el("quizResult");
  if (existing) {
    result.classList.remove("hidden");
    result.className = "quiz-result " + (existing.correct ? "result-correct" : "result-wrong");
    result.textContent = existing.correct ? "✓ Chính xác" : "✕ Chưa đúng";
    el("answerBox").classList.remove("hidden");
  } else {
    result.className = "quiz-result hidden";
    el("answerBox").classList.add("hidden");
  }

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.addEventListener("click", () => selectChoice(q, Number(btn.dataset.choice)));
  });
}

function selectChoice(q, index) {
  const choices = shuffleWithCorrect(q);
  const selected = choices[index];
  state.quizProgress[q.id] = {
    correct: selected.isCorrect,
    selectedText: selected.text,
  };
  saveProgress();
  render();
}

function renderFlashcard() {
  el("quizBox").classList.add("hidden");
  el("showAnswerBtn").classList.remove("hidden");
  el("ratingRow").classList.remove("hidden");
  el("answerBox").classList.add("hidden");
  el("showAnswerBtn").textContent = "Hiện đáp án";
}

function render() {
  const q = state.filtered[state.currentIndex];
  const noQuestion = !q;

  el("questionText").textContent = noQuestion ? "Không có câu hỏi phù hợp." : q.q;
  el("categoryBadge").textContent = noQuestion ? "—" : q.category;
  el("difficultyBadge").textContent = noQuestion ? "—" : q.difficulty.toUpperCase();
  el("positionText").textContent = noQuestion ? "0 / 0" : `${state.currentIndex + 1} / ${state.filtered.length}`;

  el("quizModeBtn").classList.toggle("active", state.mode === "quiz");
  el("flashModeBtn").classList.toggle("active", state.mode === "flash");

  if (noQuestion) {
    el("quizBox").classList.add("hidden");
    el("showAnswerBtn").classList.add("hidden");
    el("answerBox").classList.add("hidden");
    updateStats();
    return;
  }

  el("answerText").textContent = q.a;

  if (q.project) {
    el("projectBox").classList.remove("hidden");
    el("projectText").textContent = q.project;
  } else {
    el("projectBox").classList.add("hidden");
  }

  if (q.follow?.length) {
    el("followupBox").classList.remove("hidden");
    el("followupList").innerHTML = q.follow.map(x => `<li>${x}</li>`).join("");
  } else {
    el("followupBox").classList.add("hidden");
  }

  if (state.mode === "quiz" && q.choices?.length) renderQuiz(q);
  else renderFlashcard();

  document.querySelectorAll(".rating").forEach(btn => {
    btn.classList.toggle("active", state.progress[q.id] === btn.dataset.rating);
  });

  updateStats();
}

function updateStats() {
  const ratings = Object.values(state.progress);
  const quiz = Object.values(state.quizProgress);
  const correct = quiz.filter(x => x.correct).length;
  const wrong = quiz.length - correct;

  el("answeredCount").textContent = ratings.length;
  el("correctCount").textContent = correct;
  el("wrongCount").textContent = wrong;
  el("accuracyText").textContent = quiz.length ? Math.round(correct / quiz.length * 100) + "%" : "0%";
}

el("quizModeBtn").addEventListener("click", () => {
  state.mode = "quiz";
  saveProgress();
  render();
});

el("flashModeBtn").addEventListener("click", () => {
  state.mode = "flash";
  saveProgress();
  render();
});

el("showAnswerBtn").addEventListener("click", () => {
  el("answerBox").classList.toggle("hidden");
  el("showAnswerBtn").textContent =
    el("answerBox").classList.contains("hidden") ? "Hiện đáp án" : "Ẩn đáp án";
});

el("nextBtn").addEventListener("click", () => {
  if (!state.filtered.length) return;
  state.currentIndex = (state.currentIndex + 1) % state.filtered.length;
  render();
});

el("prevBtn").addEventListener("click", () => {
  if (!state.filtered.length) return;
  state.currentIndex = (state.currentIndex - 1 + state.filtered.length) % state.filtered.length;
  render();
});

el("randomBtn").addEventListener("click", () => {
  if (!state.filtered.length) return;
  state.currentIndex = Math.floor(Math.random() * state.filtered.length);
  render();
});

el("mockBtn").addEventListener("click", () => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  state.mockIds = shuffled.slice(0, Math.min(10, questions.length)).map(q => q.id);
  categoryFilter.value = "all";
  difficultyFilter.value = "all";
  searchInput.value = "";
  state.currentIndex = 0;
  state.shuffledChoices = {};
  applyFilters();
  el("mockBtn").textContent = "Mock mode: 10 câu";
});

el("resetProgress").addEventListener("click", () => {
  state.progress = {};
  state.quizProgress = {};
  state.shuffledChoices = {};
  saveProgress();
  render();
});

document.querySelectorAll(".rating").forEach(btn => {
  btn.addEventListener("click", () => {
    const q = state.filtered[state.currentIndex];
    if (!q) return;
    state.progress[q.id] = btn.dataset.rating;
    saveProgress();
    render();
  });
});

[categoryFilter, difficultyFilter].forEach(node => node.addEventListener("change", () => {
  state.mockIds = null;
  state.shuffledChoices = {};
  el("mockBtn").textContent = "Mock 10 câu";
  state.currentIndex = 0;
  applyFilters();
}));

searchInput.addEventListener("input", () => {
  state.mockIds = null;
  el("mockBtn").textContent = "Mock 10 câu";
  state.currentIndex = 0;
  applyFilters();
});

initCategories();
applyFilters();

el("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});
