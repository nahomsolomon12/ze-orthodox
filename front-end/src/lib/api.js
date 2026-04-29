import { modules as moduleData, quizzes as quizData } from "../data/modules";

export async function getModules() {
  return moduleData.map(({ desc, ...m }) => ({ ...m, description: desc }));
}

export async function getModuleProgress(moduleId) {
  try {
    const progress = JSON.parse(localStorage.getItem("ze_progress") || "{}");
    return { completed_lessons: progress[moduleId] ?? 0 };
  } catch {
    return { completed_lessons: 0 };
  }
}

export async function saveModuleProgress(moduleId, completedLessons) {
  const progress = JSON.parse(localStorage.getItem("ze_progress") || "{}");
  progress[moduleId] = completedLessons;
  localStorage.setItem("ze_progress", JSON.stringify(progress));
}

export async function getQuizzes() {
  try {
    const scores = JSON.parse(localStorage.getItem("ze_quiz_scores") || "{}");
    return quizData.map(({ module: module_id, ...q }) => ({
      ...q,
      module_id,
      score: scores[q.id]?.score ?? null,
      passed: scores[q.id]?.passed ?? false,
    }));
  } catch {
    return quizData.map(({ module: module_id, ...q }) => ({ ...q, module_id, score: null, passed: false }));
  }
}

export async function saveQuizResult(quizId, score) {
  const scores = JSON.parse(localStorage.getItem("ze_quiz_scores") || "{}");
  scores[quizId] = { score, passed: score >= 70 };
  localStorage.setItem("ze_quiz_scores", JSON.stringify(scores));
}

export async function sendContact(_name, _email, _message) {}
