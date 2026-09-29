import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";
import "./LessonsPage.css";

const categoryOrder = ["wed-adult", "sat-youth", "sun-youth", "video"];

const LessonsPage = ({ setPage }) => {
  const { t } = useLanguage();

  return (
    <div
      className="container--narrow"
      style={{ paddingTop: 48, paddingBottom: 48 }}
    >
      <div className="text-center mb-24">
        <h1 className="font-serif mb-0" style={{ fontSize: 28 }}>
          {t("navLearning")}
        </h1>
        <p className="text-muted mt-8" style={{ fontSize: 15 }}>
          {t("chooseLessonTrack")}
        </p>
      </div>

      <section className="lessons-recommendations">
        <ol className="lessons-recommendations__list">
          {categoryOrder.map((key, index) => {
            const { titleKey } = lessonCategories[key];
            return (
              <li key={key}>
                <button type="button" onClick={() => setPage(`lessons-${key}`)}>
                  <span className="lessons-recommendations__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{t(`recommendation${index + 1}Title`)}</strong>
                    <span>{t(`recommendation${index + 1}Description`)}</span>
                  </span>
                  <span className="lessons-recommendations__track">
                    {t(titleKey)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export default LessonsPage;
