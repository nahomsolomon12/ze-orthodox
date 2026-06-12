import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import { useLanguage } from "../context/LanguageContext";
import { getModules, getModuleProgress, getQuizzes } from "../lib/api";
import "../styles/global.css";

const ModulesPage = ({ user }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("modules");
  const [expandedModule, setExpandedModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [fetchedModules, fetchedQuizzes] = await Promise.all([
          getModules(),
          getQuizzes(),
        ]);

        const progressList = await Promise.all(
          fetchedModules.map(m => getModuleProgress(m.id))
        );

        const modulesWithProgress = fetchedModules.map((m, i) => ({
          ...m,
          desc: m.description,
          completed: progressList[i]?.completed_lessons ?? 0,
        }));

        setModules(modulesWithProgress);
        setQuizzes(fetchedQuizzes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totalLessons = modules.reduce((a, m) => a + m.lessons, 0);
  const completedLessons = modules.reduce((a, m) => a + m.completed, 0);
  const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || t("fallbackName");

  if (loading) {
    return (
      <div className="container--narrow" style={{ paddingTop: 64, textAlign: "center" }}>
        <p className="text-muted">{t("loadingDashboard")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container--narrow" style={{ paddingTop: 64 }}>
        <div className="alert alert--error">{t("loadError")} {error}</div>
      </div>
    );
  }

  return (
    <div className="container--narrow" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="mb-24">
        <h1 className="font-serif mb-0" style={{ fontSize: 26 }}>{t("welcomeUser")}, {displayName}</h1>
        <p className="text-muted mt-0" style={{ fontSize: 15 }}>{t("journey")}</p>
      </div>

      <div className="progress-card">
        <div>
          <p className="progress-card__label">{t("overallProgress")}</p>
          <p className="progress-card__value">{pct}%</p>
          <p className="progress-card__sub">{completedLessons} {t("of")} {totalLessons} {t("lessonsCompleted")}</p>
        </div>
        <div style={{ width: 200 }}>
          <div className="progress">
            <div className="progress__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === "modules" ? "tab--active" : ""}`} onClick={() => setActiveTab("modules")}>{t("modules")}</button>
        <button className={`tab ${activeTab === "quizzes" ? "tab--active" : ""}`} onClick={() => setActiveTab("quizzes")}>{t("quizzes")}</button>
      </div>

      {activeTab === "modules" ? (
        <div className="module-list">
          {modules.map(m => {
            const prog = m.lessons > 0 ? Math.round((m.completed / m.lessons) * 100) : 0;
            const expanded = expandedModule === m.id;
            const iconBoxClass = `icon-box icon-box--sm ${prog === 100 ? "icon-box--success" : prog > 0 ? "icon-box--accent" : "icon-box--muted"}`;
            const moduleTitle = t(`moduleTitle${m.id}`, m.title);
            const moduleDesc = t(`moduleDesc${m.id}`, m.desc);
            const moduleDuration = t(`moduleDuration${m.id}`, m.duration);

            return (
              <div key={m.id} className="module-item">
                <div className="module-item__header" onClick={() => setExpandedModule(expanded ? null : m.id)}>
                  <div className={iconBoxClass}>
                    {prog === 100 ? <Icon name="check" size={20} /> : m.type === "video" ? <Icon name="play" size={20} /> : <Icon name="book" size={20} />}
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center gap-8 flex-wrap">
                      <h3 className="mb-0">{moduleTitle}</h3>
                      <span className={`tag ${m.type === "video" ? "tag--video" : "tag--reading"}`}>
                        {m.type === "video" ? t("video") : t("reading")}
                      </span>
                    </div>
                    <p className="text-muted mt-0" style={{ fontSize: 13, marginTop: 3 }}>{moduleDesc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`mb-0 ${prog === 100 ? "text-success" : ""}`} style={{ fontSize: 14, fontWeight: 600 }}>{prog}%</p>
                    <p className="text-muted mb-0" style={{ fontSize: 12, marginTop: 2 }}>{m.completed}/{m.lessons}</p>
                  </div>
                </div>

                {expanded && (
                  <div className="module-item__body">
                    <div className="module-item__meta">
                      <div><strong>{t("duration")}</strong> {moduleDuration}</div>
                      <div><strong>{t("lessons")}</strong> {m.lessons}</div>
                    </div>
                    <div className="mt-16">
                      <div className="progress progress--sm">
                        <div className={`progress__fill ${prog === 100 ? "progress__fill--success" : ""}`} style={{ width: `${prog}%` }} />
                      </div>
                    </div>
                    <button className={`btn btn--sm mt-16 ${prog === 100 ? "btn--success" : "btn--primary"}`} style={{ padding: "8px 20px" }}>
                      {prog === 100 ? t("reviewModule") : prog > 0 ? t("continue") : t("startModule")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="quiz-list">
          {quizzes.map(q => (
            <div key={q.id} className="quiz-item">
              <div>
                <h3 className="mb-0" style={{ fontSize: 15 }}>{t(`quizTitle${q.id}`, q.title)}</h3>
                <p className="text-muted mb-0" style={{ fontSize: 13, marginTop: 4 }}>{q.questions} {t("questions")} · {t("module")} {q.module_id}</p>
              </div>
              {q.score != null ? (
                <div className="flex items-center gap-12">
                  <span className={`quiz-item__score ${q.score >= 70 ? "quiz-item__score--pass" : "quiz-item__score--fail"}`}>{q.score}%</span>
                  <span className={`status-badge ${q.passed ? "status-badge--passed" : "status-badge--failed"}`}>
                    {q.passed ? t("passed") : t("retry")}
                  </span>
                </div>
              ) : (
                <button className="btn btn--ghost">{t("takeQuiz")}</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
