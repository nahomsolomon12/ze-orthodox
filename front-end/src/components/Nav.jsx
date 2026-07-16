import Icon from "./Icon";
import { useThemeToggle } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { lessonCategories } from "../data/lessonCategories";
import "./Nav.css";
import logo from "../assets/ZEOlogo.png";

const lessonPages = [
  { key: "lessons-wed-adult", category: "wed-adult" },
  { key: "lessons-sat-youth", category: "sat-youth" },
  { key: "lessons-sun-youth", category: "sun-youth" },
  { key: "lessons-video", category: "video" },
];

const Nav = ({ page, setPage, mobileOpen, setMobileOpen }) => {
  const { isDark, toggleDark } = useThemeToggle();
  const { t, toggleLanguage } = useLanguage();

  const navBtnClass = (key) =>
    `nav__btn ${page === key ? "nav__btn--active" : ""}`;

  const lessonsActive = page === "lessons" || lessonPages.some(l => l.key === page);

  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__logo" onClick={() => setPage("home")}>
          <img src={logo} alt="ZeOrthodox Logo" className="nav__logo-image" />
        </div>

        <div className="nav__links">
          <button
            className={navBtnClass("home")}
            onClick={() => setPage("home")}
          >
            {t("navHome")}
          </button>
          <button
            className={navBtnClass("about")}
            onClick={() => setPage("about")}
          >
            {t("navAbout")}
          </button>

          <div className="nav__dropdown">
            <button
              className={`nav__btn ${lessonsActive ? "nav__btn--active" : ""}`}
              onClick={() => setPage("lessons")}
            >
              {t("navLearning")}
            </button>
            <div className="nav__dropdown-menu">
              {lessonPages.map(({ key, category }) => (
                <button
                  key={key}
                  className={`nav__dropdown-item ${page === key ? "nav__dropdown-item--active" : ""}`}
                  onClick={() => setPage(key)}
                >
                  {t(lessonCategories[category].titleKey)} - {t(lessonCategories[category].languageKey)}
                </button>
              ))}
            </div>
          </div>

          <button
            className="nav__language-toggle"
            onClick={toggleLanguage}
            title={t("languageTitle")}
          >
            {t("languageToggle")}
          </button>
          <button
            className="nav__theme-toggle"
            onClick={toggleDark}
            title={isDark ? t("lightMode") : t("darkMode")}
          >
            <Icon name={isDark ? "sun" : "moon"} size={16} />
          </button>
        </div>

        <div className="nav__mobile-btns">
          <button
            className="nav__language-toggle"
            onClick={toggleLanguage}
            title={t("languageTitle")}
          >
            {t("languageToggle")}
          </button>
          <button className="nav__theme-toggle" onClick={toggleDark}>
            <Icon name={isDark ? "sun" : "moon"} size={16} />
          </button>
          <button
            className="nav__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="nav__mobile-menu">
          <button
            className={navBtnClass("home")}
            onClick={() => {
              setPage("home");
              setMobileOpen(false);
            }}
          >
            {t("navHome")}
          </button>
          <button
            className={navBtnClass("about")}
            onClick={() => {
              setPage("about");
              setMobileOpen(false);
            }}
          >
            {t("navAbout")}
          </button>

          <button
            className={`nav__btn ${lessonsActive ? "nav__btn--active" : ""}`}
            onClick={() => {
              setPage("lessons");
              setMobileOpen(false);
            }}
          >
            {t("navLearning")}
          </button>
          {lessonPages.map(({ key, category }) => (
            <button
              key={key}
              className={`nav__btn nav__btn--sub ${page === key ? "nav__btn--active" : ""}`}
              onClick={() => {
                setPage(key);
                setMobileOpen(false);
              }}
            >
              {t(lessonCategories[category].titleKey)} - {t(lessonCategories[category].languageKey)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
