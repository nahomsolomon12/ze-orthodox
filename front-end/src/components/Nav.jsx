import Icon from "./Icon";
import { useThemeToggle } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { signOut } from "../lib/auth";
import "./Nav.css";
import logo from "../assets/ZEOlogo.png";

const Nav = ({ page, setPage, user, setUser, mobileOpen, setMobileOpen }) => {
  const { isDark, toggleDark } = useThemeToggle();
  const { t, toggleLanguage } = useLanguage();

  const navBtnClass = (key) =>
    `nav__btn ${page === key ? "nav__btn--active" : ""}`;

  const handleSignOut = () => {
    signOut();
    setUser(null);
    setPage("home");
  };

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

          {user ? (
            <>
              <button
                className={navBtnClass("modules")}
                onClick={() => setPage("modules")}
              >
                {t("navLearning")}
              </button>
              <button
                className="nav__btn nav__btn--danger"
                onClick={handleSignOut}
              >
                {t("navSignOut")}
              </button>
            </>
          ) : (
            <button
              className="nav__btn nav__btn--primary"
              onClick={() => setPage("auth")}
            >
              {t("navSignIn")}
            </button>
          )}

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

          {user ? (
            <>
              <button
                className={navBtnClass("modules")}
                onClick={() => {
                  setPage("modules");
                  setMobileOpen(false);
                }}
              >
                {t("navLearning")}
              </button>
              <button
                className="nav__btn nav__btn--danger"
                onClick={() => {
                  handleSignOut();
                  setMobileOpen(false);
                }}
              >
                {t("navSignOut")}
              </button>
            </>
          ) : (
            <button
              className="nav__btn nav__btn--primary"
              onClick={() => {
                setPage("auth");
                setMobileOpen(false);
              }}
            >
              {t("navSignIn")}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
