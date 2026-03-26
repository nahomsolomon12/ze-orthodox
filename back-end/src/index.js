import "dotenv/config";
import express from "express";
import cors from "cors";
import modulesRouter from "./routes/modules.js";
import quizzesRouter from "./routes/quizzes.js";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

const allowedOrigin = process.env.FRONTEND_URL ?? "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.use("/api/modules", modulesRouter);
app.use("/api/quizzes", quizzesRouter);
app.use("/api/contact", contactRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
