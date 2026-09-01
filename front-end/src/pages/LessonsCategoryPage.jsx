import Icon from "../components/Icon";
import Ornament from "../components/Ornament";
import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";
import {
  saturdayLessonCategories,
  sundayLessonCategories,
  wednesdayLessonCategories,
} from "../data/wednesdayLessons";
import "./LessonsCategoryPage.css";

const LessonsCategoryPage = ({ category }) => {
  const { t } = useLanguage();
  const { titleKey, languageKey, icon } = lessonCategories[category];
  const catalogByCategory = {
    "wed-adult": wednesdayLessonCategories,
    "sat-youth": saturdayLessonCategories,
    "sun-youth": sundayLessonCategories,
  };
  const lessonCatalog = catalogByCategory[category];

  return (
    <div className="container--narrow" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="text-center mb-24">
        <div className="icon-box icon-box--accent" style={{ margin: "0 auto 16px" }}>
          <Icon name={icon} size={26} />
        </div>
        <h1 className="font-serif mb-0" style={{ fontSize: 28 }}>{t(titleKey)}</h1>
        <p className="text-muted mt-8" style={{ fontSize: 14 }}>{t(languageKey)}</p>
        <div className="flex justify-center mt-16">
          <Ornament />
        </div>
      </div>

      {lessonCatalog ? (
        <div className="lesson-catalog" aria-label={`${t(titleKey)} categories`}>
          {lessonCatalog.map((lessonCategory, index) => (
            <details className="lesson-category" key={lessonCategory.id} open={index === 0}>
              <summary className="lesson-category__summary">
                <span className="lesson-category__number">{String(index + 1).padStart(2, "0")}</span>
                {lessonCategory.title}
                <span className="lesson-category__chevron" aria-hidden="true">⌄</span>
              </summary>
              <ul className="lesson-category__lessons">
                {lessonCategory.lessons.map((lesson, lessonIndex) => (
                  <li className="lesson-category__lesson" key={lesson.id}>
                    <span className="lesson-category__lesson-index">{String(lessonIndex + 1).padStart(2, "0")}</span>
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: "40px 24px" }}>
          <p className="text-muted mb-0">{t("lessonComingSoon")}</p>
        </div>
      )}
    </div>
  );
};

export default LessonsCategoryPage;
