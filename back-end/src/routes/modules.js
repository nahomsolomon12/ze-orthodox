import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/modules — returns all modules
router.get("/", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("id");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/modules/:id/progress — returns the authenticated user's progress for a module
router.get("/:id/progress", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", req.user.id)
    .eq("module_id", req.params.id)
    .single();

  if (error && error.code !== "PGRST116") {
    return res.status(500).json({ error: error.message });
  }

  res.json(data ?? { user_id: req.user.id, module_id: req.params.id, completed_lessons: 0 });
});

// POST /api/modules/:id/progress — upsert the user's lesson completion count for a module
router.post("/:id/progress", requireAuth, async (req, res) => {
  const { completed_lessons } = req.body;

  if (typeof completed_lessons !== "number") {
    return res.status(400).json({ error: "completed_lessons must be a number." });
  }

  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      { user_id: req.user.id, module_id: Number(req.params.id), completed_lessons },
      { onConflict: "user_id,module_id" }
    )
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
