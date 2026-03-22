import { supabase } from "./supabase";

const BASE = import.meta.env.VITE_API_URL;

// Attaches the current user's JWT as a Bearer token
async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Request failed");
  return json;
}

// -- Modules --

export async function getModules() {
  return request("/api/modules", { headers: await authHeaders() });
}

export async function getModuleProgress(moduleId) {
  return request(`/api/modules/${moduleId}/progress`, { headers: await authHeaders() });
}

export async function saveModuleProgress(moduleId, completedLessons) {
  return request(`/api/modules/${moduleId}/progress`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ completed_lessons: completedLessons }),
  });
}

// -- Quizzes --

export async function getQuizzes() {
  return request("/api/quizzes", { headers: await authHeaders() });
}

export async function saveQuizResult(quizId, score) {
  return request(`/api/quizzes/${quizId}/result`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ score }),
  });
}

// -- Contact --

export async function sendContact(name, email, message) {
  return request("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
}
