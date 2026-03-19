import { useState } from "react";
import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import '../styles/global.css';

const AuthPage = ({ setPage, setUser }) => {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    setErr("");
    if (!form.email || !form.password) return setErr("Please fill in all required fields.");
    if (mode === "signup" && !form.name) return setErr("Please enter your name.");
    if (!form.email.includes("@")) return setErr("Please enter a valid email.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    setUser({ name: form.name || form.email.split("@")[0], email: form.email });
    setPage("modules");
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
            onClick={() => { setMode("signin"); setErr(""); }}
          >Sign In</button>
          <button
            className={`tab-toggle__btn ${mode === "signup" ? "tab-toggle__btn--active" : ""}`}
            onClick={() => { setMode("signup"); setErr(""); }}
          >Sign Up</button>
        </div>

        {/* Error */}
        {err && <div className="alert alert--error">{err}</div>}

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
          <button className="btn btn--primary w-full mt-8" style={{ padding: 12, justifyContent: "center", fontSize: 15 }} onClick={handleSubmit}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;