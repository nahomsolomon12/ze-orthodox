import Icon from "./Icon";
import { useThemeToggle } from "../context/ThemeContext";
import '../styles/global.css';

const Nav = ({ page, setPage, user, setUser, mobileOpen, setMobileOpen }) => {
  const { isDark, toggleDark } = useThemeToggle();

  const navBtnClass = (key) =>
    `nav__btn ${page === key ? "nav__btn--active" : ""}`;

  return (
    <nav className="nav">
      <div className="nav__inner">
        {/* Logo */}
        <div className="nav__logo" onClick={() => setPage("home")}>
          <span className="nav__logo-icon"><Icon name="cross" size={28} /></span>
          <span className="nav__logo-text">Theosis</span>
        </div>

        {/* Desktop nav */}
        <div className="nav__links">
          <button className={navBtnClass("home")} onClick={() => setPage("home")}>Home</button>
          <button className={navBtnClass("about")} onClick={() => setPage("about")}>About & Contact</button>

          {user ? (
            <>
              <button className={navBtnClass("modules")} onClick={() => setPage("modules")}>My Learning</button>
              <button className="nav__btn nav__btn--danger" onClick={() => { setUser(null); setPage("home"); }}>Sign Out</button>
            </>
          ) : (
            <button className="nav__btn nav__btn--primary" onClick={() => setPage("auth")}>Sign In</button>
          )}

          <button className="nav__theme-toggle" onClick={toggleDark} title={isDark ? "Light mode" : "Dark mode"}>
            <Icon name={isDark ? "sun" : "moon"} size={16} />
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="nav__mobile-btns">
          <button className="nav__theme-toggle" onClick={toggleDark}>
            <Icon name={isDark ? "sun" : "moon"} size={16} />
          </button>
          <button className="nav__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav__mobile-menu">
          <button className={navBtnClass("home")} onClick={() => { setPage("home"); setMobileOpen(false); }}>Home</button>
          <button className={navBtnClass("about")} onClick={() => { setPage("about"); setMobileOpen(false); }}>About & Contact</button>

          {user ? (
            <>
              <button className={navBtnClass("modules")} onClick={() => { setPage("modules"); setMobileOpen(false); }}>My Learning</button>
              <button className="nav__btn nav__btn--danger" onClick={() => { setUser(null); setPage("home"); setMobileOpen(false); }}>Sign Out</button>
            </>
          ) : (
            <button className="nav__btn nav__btn--primary" onClick={() => { setPage("auth"); setMobileOpen(false); }}>Sign In</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;