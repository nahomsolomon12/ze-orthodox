import { useState } from "react";
import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { supabase } from "../lib/supabase";
import '../styles/global.css';

const AuthPage = ({ setPage }) => {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr("");
    setInfo("");

    if (!form.email || !form.password) return setErr("Please fill in all required fields.");
    if (mode === "signup" && !form.name) return setErr("Please enter your name.");
    if (!form.email.includes("@")) return setErr("Please enter a valid email.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } },
      });
      if (error) {
        setErr(error.message);
      } else {
        setInfo("Account created! Check your email to confirm your address, then sign in.");
        setMode("signin");
        setForm({ name: "", email: form.email, password: "" });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        setErr(error.message);
      } else {
        setPage("modules");
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-card__header">
          <div className="auth-card__icon"><Icon name="cross" size={32} /></div>
          <h2 className="font-serif mb-0" style={{ fontSize: 24 }}>
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted" style={{ fontSize: 14 }}>
            {mode === "signin" ? "Sign in to continue your studies" : "Start your Orthodox learning journey"}
          </p>
        </div>

        <Ornament />

        {/* Toggle Tabs */}
        <div className="tab-toggle mt-16 mb-24">
          <button
            className={`tab-toggle__btn ${mode === "signin" ? "tab-toggle__btn--active" : ""}`}
            onClick={() => { setMode("signin"); setErr(""); setInfo(""); }}
          >Sign In</button>
          <button
            className={`tab-toggle__btn ${mode === "signup" ? "tab-toggle__btn--active" : ""}`}
            onClick={() => { setMode("signup"); setErr(""); setInfo(""); }}
          >Sign Up</button>
        </div>

        {/* Feedback */}
        {err && <div className="alert alert--error">{err}</div>}
        {info && <div className="alert alert--success">{info}</div>}

        {/* Form */}
        <div className="form-group">
          {mode === "signup" && (
            <div>
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          <button
            className="btn btn--primary w-full mt-8"
            style={{ padding: 12, justifyContent: "center", fontSize: 15 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
