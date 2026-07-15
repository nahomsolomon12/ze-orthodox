import { useState, useEffect } from "react";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ModulesPage from "./pages/ModulesPage";
import AboutPage from "./pages/AboutPage";

const AppContent = () => {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [page]);

  return (
    <div className="app-wrapper">
      <Nav
        page={page}
        setPage={setPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className="app-main">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "modules" && <ModulesPage />}
        {page === "about" && <AboutPage />}
      </main>
      <Footer />
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
