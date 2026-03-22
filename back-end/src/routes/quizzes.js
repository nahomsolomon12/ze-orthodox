import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/quizzes — returns all quizzes with the authenticated user's result merged in
router.get("/", requireAuth, async (req, res) => {
  const [{ data: quizzes, error: qErr }, { data: results, error: rErr }] = await Promise.all([
    supabase.from("quizzes").select("*").order("id"),
    supabase.from("quiz_results").select("*").eq("user_id", req.user.id),
  ]);

  if (qErr) return res.status(500).json({ error: qErr.message });
  if (rErr) return res.status(500).json({ error: rErr.message });

  const resultMap = Object.fromEntries((results ?? []).map(r => [r.quiz_id, r]));

  const merged = quizzes.map(q => ({
    ...q,
    score: resultMap[q.id]?.score ?? null,
    passed: resultMap[q.id]?.passed ?? false,
  }));

  res.json(merged);
});

// POST /api/quizzes/:id/result — save or update the user's quiz result
router.post("/:id/result", requireAuth, async (req, res) => {
  const { score } = req.body;

  if (typeof score !== "number" || score < 0 || score > 100) {
    return res.status(400).json({ error: "score must be a number between 0 and 100." });
  }

  const { data, error } = await supabase
    .from("quiz_results")
    .upsert(
      {
        user_id: req.user.id,
        quiz_id: Number(req.params.id),
        score,
        passed: score >= 70,
      },
      { onConflict: "user_id,quiz_id" }
    )
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
