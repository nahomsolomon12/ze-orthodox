import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ModulesPage from "./pages/ModulesPage";
import AboutPage from "./pages/AboutPage";
import { supabase } from "./lib/supabase";
import './styles/global.css';

const AppContent = () => {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Load existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Keep user in sync with Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [page]);

  if (authLoading) return null;

  return (
    <div className="app-wrapper">
      <Nav
        page={page}
        setPage={setPage}
        user={user}
        setUser={setUser}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className="app-main">
        {page === "home" && <HomePage setPage={setPage} user={user} />}
        {page === "auth" && <AuthPage setPage={setPage} setUser={setUser} />}
        {page === "modules" && (
          user ? <ModulesPage user={user} /> : <AuthPage setPage={setPage} setUser={setUser} />
        )}
        {page === "about" && <AboutPage />}
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
