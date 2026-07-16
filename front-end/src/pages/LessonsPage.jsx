import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";
import "./LessonsPage.css";

const categoryOrder = ["wed-adult", "sat-youth", "sun-youth", "video"];

const LessonsPage = ({ setPage }) => {
  const { t } = useLanguage();

  return (
    <div className="container--narrow" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="text-center mb-24">
        <h1 className="font-serif mb-0" style={{ fontSize: 28 }}>{t("navLearning")}</h1>
        <p className="text-muted mt-8" style={{ fontSize: 15 }}>{t("chooseLessonTrack")}</p>
        <div className="flex justify-center mt-16">
          <Ornament />
        </div>
      </div>

      <div className="lessons-grid">
        {categoryOrder.map((key) => {
          const { titleKey, languageKey, icon } = lessonCategories[key];
          return (
            <button
              key={key}
              className="card lessons-grid__card"
              onClick={() => setPage(`lessons-${key}`)}
            >
              <div className="icon-box icon-box--accent mb-16">
                <Icon name={icon} size={22} />
              </div>
              <h3 className="font-serif mb-8">{t(titleKey)}</h3>
              <p className="text-muted mb-0" style={{ fontSize: 14 }}>{t(languageKey)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsPage;
