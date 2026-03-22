import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

// POST /api/contact — save a contact form submission (public, no auth required)
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ success: true });
});

export default router;
