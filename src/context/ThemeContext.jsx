import { createContext, useContext, useState, useEffect } from "react";
import '../styles/global.css';

const ThemeCtx = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <ThemeCtx.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export const useThemeToggle = () => {
  const ctx = useContext(ThemeCtx);
  return { isDark: ctx.isDark, toggleDark: ctx.toggleDark };
};