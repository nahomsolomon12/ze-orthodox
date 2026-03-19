import { useState } from "react";
import Icon from "../components/Icon";
import { modules, quizzes } from "../data/modules";
import '../styles/global.css';

const ModulesPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("modules");
  const [expandedModule, setExpandedModule] = useState(null);

  const totalLessons = modules.reduce((a, m) => a + m.lessons, 0);
  const completedLessons = modules.reduce((a, m) => a + m.completed, 0);
  const pct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="container--narrow" style={{ paddingTop: 32, paddingBottom: 32 }}>
      {/* Welcome */}
      <div className="mb-24">
        <h1 className="font-serif mb-0" style={{ fontSize: 26 }}>Welcome back, {user?.name}</h1>
        <p className="text-muted mt-0" style={{ fontSize: 15 }}>Continue your journey in the Orthodox faith</p>
      </div>

      {/* Progress Card */}
      <div className="progress-card">
        <div>
          <p className="progress-card__label">Overall Progress</p>
          <p className="progress-card__value">{pct}%</p>
          <p className="progress-card__sub">{completedLessons} of {totalLessons} lessons completed</p>
        </div>
        <div style={{ width: 200 }}>
          <div className="progress">
            <div className="progress__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "modules" ? "tab--active" : ""}`} onClick={() => setActiveTab("modules")}>Modules</button>
        <button className={`tab ${activeTab === "quizzes" ? "tab--active" : ""}`} onClick={() => setActiveTab("quizzes")}>Quizzes</button>
      </div>

      {/* Modules List */}
      {activeTab === "modules" ? (
        <div className="module-list">
          {modules.map(m => {
            const prog = m.lessons > 0 ? Math.round((m.completed / m.lessons) * 100) : 0;
            const expanded = expandedModule === m.id;
            const iconBoxClass = `icon-box icon-box--sm ${prog === 100 ? "icon-box--success" : prog > 0 ? "icon-box--accent" : "icon-box--muted"}`;

            return (
              <div key={m.id} className="module-item">
                <div className="module-item__header" onClick={() => setExpandedModule(expanded ? null : m.id)}>
                  <div className={iconBoxClass}>
                    {prog === 100 ? <Icon name="check" size={20} /> : m.type === "video" ? <Icon name="play" size={20} /> : <Icon name="book" size={20} />}
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center gap-8 flex-wrap">
                      <h3 className="mb-0">{m.title}</h3>
                      <span className={`tag ${m.type === "video" ? "tag--video" : "tag--reading"}`}>
                        {m.type === "video" ? "Video" : "Reading"}
                      </span>
                    </div>
                    <p className="text-muted mt-0" style={{ fontSize: 13, marginTop: 3 }}>{m.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`mb-0 ${prog === 100 ? "text-success" : ""}`} style={{ fontSize: 14, fontWeight: 600 }}>{prog}%</p>
                    <p className="text-muted mb-0" style={{ fontSize: 12, marginTop: 2 }}>{m.completed}/{m.lessons}</p>
                  </div>
                </div>

                {expanded && (
                  <div className="module-item__body">
                    <div className="module-item__meta">
                      <div><strong>Duration:</strong> {m.duration}</div>
                      <div><strong>Lessons:</strong> {m.lessons}</div>
                    </div>
                    <div className="mt-16">
                      <div className="progress progress--sm">
                        <div className={`progress__fill ${prog === 100 ? "progress__fill--success" : ""}`} style={{ width: `${prog}%` }} />
                      </div>
                    </div>
                    <button className={`btn btn--sm mt-16 ${prog === 100 ? "btn--success" : "btn--primary"}`} style={{ padding: "8px 20px" }}>
                      {prog === 100 ? "Review Module" : prog > 0 ? "Continue" : "Start Module"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Quizzes List */
        <div className="quiz-list">
          {quizzes.map(q => (
            <div key={q.id} className="quiz-item">
              <div>
                <h3 className="mb-0" style={{ fontSize: 15 }}>{q.title}</h3>
                <p className="text-muted mb-0" style={{ fontSize: 13, marginTop: 4 }}>{q.questions} questions · Module {q.module}</p>
              </div>
              {q.score != null ? (
                <div className="flex items-center gap-12">
                  <span className={`quiz-item__score ${q.score >= 70 ? "quiz-item__score--pass" : "quiz-item__score--fail"}`}>{q.score}%</span>
                  <span className={`status-badge ${q.passed ? "status-badge--passed" : "status-badge--failed"}`}>
                    {q.passed ? "Passed" : "Retry"}
                  </span>
                </div>
              ) : (
                <button className="btn btn--ghost">Take Quiz</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;