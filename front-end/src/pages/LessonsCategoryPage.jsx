import Icon from "../components/Icon";
import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";
import {
  saturdayLessonCategories,
  sundayLessonCategories,
  wednesdayLessonCategories,
} from "../data/wednesdayLessons";
import "./LessonsCategoryPage.css";

const videoLessons = [
  {
    id: "nEpaCs_Vcp4",
    title: "Dating for the Youth",
  },
  {
    id: "1A25lkIPRus",
    title: "ኦርቶዶክሳዊ የልጆች አስተዳደግ",
  },
];

const LessonsCategoryPage = ({ category }) => {
  const { t } = useLanguage();
  const { titleKey, languageKey } = lessonCategories[category];
  const catalogByCategory = {
    "wed-adult": wednesdayLessonCategories,
    "sat-youth": saturdayLessonCategories,
    "sun-youth": sundayLessonCategories,
  };
  const lessonCatalog = catalogByCategory[category];

  return (
    <div
      className="container--narrow"
      style={{ paddingTop: 48, paddingBottom: 48 }}
    >
      <div className="text-center mb-24">
        <h1 className="font-serif mb-0" style={{ fontSize: 28 }}>
          {t(titleKey)}
        </h1>
        <p className="text-muted mt-8" style={{ fontSize: 14 }}>
          {t(languageKey)}
        </p>
      </div>

      {category === "video" ? (
        <div className="video-lessons" aria-label={t(titleKey)}>
          {videoLessons.map((video) => (
            <article className="video-lesson" key={video.id}>
              <div className="video-lesson__frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="video-lesson__content">
                <h2 className="font-serif">{video.title}</h2>
                <a
                  className="video-lesson__link"
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("watchOnYoutube")}
                </a>
              </div>
            </article>
          ))}
          <p className="video-channel-link">
            For more lessons go to our{" "}
            <a
              href="https://www.youtube.com/@kesisolomonmulugeta"
              target="_blank"
              rel="noreferrer"
            >
              Youtube Channel
            </a>
          </p>
        </div>
      ) : lessonCatalog ? (
        <div
          className="lesson-catalog"
          aria-label={`${t(titleKey)} categories`}
        >
          {lessonCatalog.map((lessonCategory, index) => (
            <details
              className="lesson-category"
              key={lessonCategory.id}
              open={index === 0}
            >
              <summary className="lesson-category__summary">
                <span className="lesson-category__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {lessonCategory.title}
                <span className="lesson-category__chevron" aria-hidden="true">
                  <Icon name="chevronDown" size={18} />
                </span>
              </summary>
              <ul className="lesson-category__lessons">
                {lessonCategory.lessons.map((lesson, lessonIndex) => (
                  <li className="lesson-category__lesson" key={lesson.id}>
                    <span className="lesson-category__lesson-index">
                      {String(lessonIndex + 1).padStart(2, "0")}
                    </span>
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      ) : (
        <div className="lesson-empty-state text-center">
          <p className="text-muted mb-0">{t("lessonComingSoon")}</p>
        </div>
      )}
    </div>
  );
};

export default LessonsCategoryPage;
