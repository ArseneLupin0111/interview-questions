const questions = window.INTERVIEW_QUESTIONS || [];
const state = {
  filtered: [...questions],
  currentIndex: 0,
  mockIds: null,
  progress: JSON.parse(localStorage.getItem("interview-progress") || "{}"),
};

const el = id => document.getElementById(id);
const categoryFilter = el("categoryFilter");
const difficultyFilter = el("difficultyFilter");
const searchInput = el("searchInput");

function saveProgress() {
  localStorage.setItem("interview-progress", JSON.stringify(state.progress));
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

  let source = state.mockIds
    ? questions.filter(q => state.mockIds.includes(q.id))
    : questions;

  state.filtered = source.filter(q => {
    const byCategory = category === "all" || q.category === category;
    const byDifficulty = difficulty === "all" || q.difficulty === difficulty;
    const haystack = [q.q, q.a, q.project || "", ...(q.follow || [])].join(" ").toLowerCase();
    const bySearch = !search || haystack.includes(search);
    return byCategory && byDifficulty && bySearch;
  });

  state.currentIndex = Math.min(state.currentIndex, Math.max(0, state.filtered.length - 1));
  render();
}

function render() {
  const q = state.filtered[state.currentIndex];
  const noQuestion = !q;

  el("questionText").textContent = noQuestion ? "Không có câu hỏi phù hợp." : q.q;
  el("categoryBadge").textContent = noQuestion ? "—" : q.category;
  el("difficultyBadge").textContent = noQuestion ? "—" : q.difficulty.toUpperCase();
  el("positionText").textContent = noQuestion ? "0 / 0" : `${state.currentIndex + 1} / ${state.filtered.length}`;

  el("answerText").textContent = noQuestion ? "" : q.a;
  el("answerBox").classList.add("hidden");
  el("showAnswerBtn").textContent = "Hiện đáp án";
  el("showAnswerBtn").disabled = noQuestion;

  const projectBox = el("projectBox");
  if (!noQuestion && q.project) {
    projectBox.classList.remove("hidden");
    el("projectText").textContent = q.project;
  } else {
    projectBox.classList.add("hidden");
  }

  const followupBox = el("followupBox");
  if (!noQuestion && q.follow?.length) {
    followupBox.classList.remove("hidden");
    el("followupList").innerHTML = q.follow.map(x => `<li>${x}</li>`).join("");
  } else {
    followupBox.classList.add("hidden");
  }

  document.querySelectorAll(".rating").forEach(btn => {
    btn.classList.toggle("active", !noQuestion && state.progress[q.id] === btn.dataset.rating);
    btn.disabled = noQuestion;
  });

  updateStats();
}

function updateStats() {
  const values = Object.values(state.progress);
  el("answeredCount").textContent = values.length;
  el("easyCount").textContent = values.filter(v => v === "easy").length;
  el("mediumCount").textContent = values.filter(v => v === "medium").length;
  el("hardCount").textContent = values.filter(v => v === "hard").length;
}

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
  applyFilters();
  el("mockBtn").textContent = "Mock mode: 10 câu";
});

el("resetProgress").addEventListener("click", () => {
  state.progress = {};
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