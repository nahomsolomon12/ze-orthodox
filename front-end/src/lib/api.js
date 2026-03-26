import { supabase } from "./supabase";

// -- Modules --

export async function getModules() {
  const { data, error } = await supabase.from("modules").select("*").order("id");
  if (error) throw new Error(error.message);
  return data;
}

export async function getModuleProgress(moduleId) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user_progress")
    .select("completed_lessons")
    .eq("module_id", moduleId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data; // { completed_lessons: number } or null
}

export async function saveModuleProgress(moduleId, completedLessons) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("user_progress").upsert({
    user_id: user.id,
    module_id: moduleId,
    completed_lessons: completedLessons,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

// -- Quizzes --

export async function getQuizzes() {
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: quizzes, error: qErr }, { data: results, error: rErr }] = await Promise.all([
    supabase.from("quizzes").select("*").order("id"),
    supabase.from("quiz_results").select("quiz_id, score, passed").eq("user_id", user.id),
  ]);

  if (qErr) throw new Error(qErr.message);
  if (rErr) throw new Error(rErr.message);

  const resultMap = Object.fromEntries(results.map(r => [r.quiz_id, r]));
  return quizzes.map(q => ({
    ...q,
    score: resultMap[q.id]?.score ?? null,
    passed: resultMap[q.id]?.passed ?? false,
  }));
}

export async function saveQuizResult(quizId, score) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("quiz_results").upsert({
    user_id: user.id,
    quiz_id: quizId,
    score,
    passed: score >= 70,
    taken_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

// -- Contact --

export async function sendContact(name, email, message) {
  const { error } = await supabase.from("contact_messages").insert({ name, email, message });
  if (error) throw new Error(error.message);
}
