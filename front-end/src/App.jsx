import { useCallback, useEffect, useState } from "react";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import AboutPage from "./pages/AboutPage";
import LessonsCategoryPage from "./pages/LessonsCategoryPage";

const pageRoutes = {
  home: "/",
  about: "/about",
  lessons: "/lessons",
  "lessons-wed-adult": "/lessons/wednesday-adult",
  "lessons-sat-youth": "/lessons/saturday-youth",
  "lessons-sun-youth": "/lessons/sunday-youth",
  "lessons-video": "/lessons/video",
};

const routesByPath = Object.fromEntries(
  Object.entries(pageRoutes).map(([page, path]) => [path, page]),
);

const getPageFromPath = () => routesByPath[window.location.pathname] || "home";

const AppContent = () => {
  const [page, setPage] = useState(getPageFromPath);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useCallback((nextPage) => {
    const nextPath = pageRoutes[nextPage] || pageRoutes.home;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: nextPage }, "", nextPath);
    }
    setMobileOpen(false);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setMobileOpen(false);
      setPage(getPageFromPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="app-wrapper">
      <Nav
        page={page}
        setPage={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className="app-main">
        {page === "home" && <HomePage setPage={navigate} />}
        {page === "lessons" && <LessonsPage setPage={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "lessons-wed-adult" && <LessonsCategoryPage category="wed-adult" />}
        {page === "lessons-sat-youth" && <LessonsCategoryPage category="sat-youth" />}
        {page === "lessons-sun-youth" && <LessonsCategoryPage category="sun-youth" />}
        {page === "lessons-video" && <LessonsCategoryPage category="video" />}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
