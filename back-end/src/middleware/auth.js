import { supabase } from "../lib/supabase.js";

// Verifies the Supabase JWT sent in the Authorization header.
// Attaches the authenticated user to req.user on success.
export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization token." });
  }

  const token = header.split(" ")[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  req.user = user;
  next();
};
