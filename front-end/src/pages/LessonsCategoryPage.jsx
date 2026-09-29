import { useMemo, useState } from "react";
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

const getLessonPdf = (lesson) => lesson.pdf || `/pdfs/${lesson.id}.pdf`;

const LessonsCategoryPage = ({ category }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [openCategories, setOpenCategories] = useState(new Set());
  const { titleKey, languageKey } = lessonCategories[category];
  const catalogByCategory = {
    "wed-adult": wednesdayLessonCategories,
    "sat-youth": saturdayLessonCategories,
    "sun-youth": sundayLessonCategories,
  };
  const lessonCatalog = catalogByCategory[category];
  const filteredCatalog = useMemo(() => {
    if (!lessonCatalog) return [];

    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return lessonCatalog;

    return lessonCatalog
      .map((lessonCategory) => {
        const categoryMatches = lessonCategory.title
          .toLocaleLowerCase()
          .includes(normalizedQuery);

        return {
          ...lessonCategory,
          lessons: categoryMatches
            ? lessonCategory.lessons
            : lessonCategory.lessons.filter((lesson) =>
                lesson.title.toLocaleLowerCase().includes(normalizedQuery),
              ),
        };
      })
      .filter(
        (lessonCategory) =>
          lessonCategory.title.toLocaleLowerCase().includes(normalizedQuery) ||
          lessonCategory.lessons.length > 0,
      );
  }, [lessonCatalog, query]);
  const totalLessons = lessonCatalog?.reduce(
    (total, lessonCategory) => total + lessonCategory.lessons.length,
    0,
  );
  const allCategoriesOpen =
    lessonCatalog?.length > 0 &&
    lessonCatalog.every((lessonCategory) =>
      openCategories.has(lessonCategory.id),
    );

  const toggleAllCategories = () => {
    setOpenCategories(
      allCategoriesOpen
        ? new Set()
        : new Set(lessonCatalog.map((lessonCategory) => lessonCategory.id)),
    );
  };

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
        <>
          <div className="lesson-catalog__toolbar">
            <label
              className="lesson-catalog__search-label"
              htmlFor="lesson-search"
            >
              {t("searchLessons")}
            </label>
            <input
              id="lesson-search"
              className="lesson-catalog__search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchLessonsPlaceholder")}
            />
            <div className="lesson-catalog__toolbar-row">
              <span className="lesson-catalog__count">
                {filteredCatalog.length} / {lessonCatalog.length}{" "}
                {t("categories")}
                <span aria-hidden="true"> · </span>
                {totalLessons} {t("lessons")}
              </span>
              <button
                className="lesson-catalog__toggle"
                type="button"
                onClick={toggleAllCategories}
              >
                {allCategoriesOpen ? t("collapseAll") : t("expandAll")}
              </button>
            </div>
          </div>

          <div
            className="lesson-catalog"
            aria-label={`${t(titleKey)} categories`}
          >
            {filteredCatalog.map((lessonCategory, index) => (
              <details
                className="lesson-category"
                key={lessonCategory.id}
                open={openCategories.has(lessonCategory.id)}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenCategories((current) => {
                    const next = new Set(current);
                    if (isOpen) {
                      next.add(lessonCategory.id);
                    } else {
                      next.delete(lessonCategory.id);
                    }
                    return next;
                  });
                }}
              >
                <summary className="lesson-category__summary">
                  <span className="lesson-category__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="lesson-category__heading">
                    <span>{lessonCategory.title}</span>
                    <span className="lesson-category__description">
                      {t("downloadableMaterials")}
                    </span>
                    <span className="lesson-category__meta">
                      {lessonCategory.lessons.length} {t("lessons")}
                    </span>
                  </span>
                  <span className="lesson-category__chevron" aria-hidden="true">
                    <Icon name="chevronDown" size={18} />
                  </span>
                </summary>
                <ul className="lesson-category__lessons">
                  {lessonCategory.lessons.map((lesson, lessonIndex) => (
                    <li className="lesson-category__lesson" key={lesson.id}>
                      <a
                        className="lesson-category__lesson-link"
                        href={getLessonPdf(lesson)}
                        download
                      >
                        <span className="lesson-category__lesson-index">
                          {String(lessonIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="lesson-category__lesson-title">
                          {lesson.title}
                        </span>
                        <Icon name="download" size={17} />
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </>
      ) : (
        <div className="lesson-empty-state text-center">
          <p className="text-muted mb-0">{t("lessonComingSoon")}</p>
        </div>
      )}
    </div>
  );
};

export default LessonsCategoryPage;
