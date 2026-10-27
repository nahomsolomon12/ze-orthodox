import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("language") || "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    document.documentElement.lang = language === "am" ? "am" : "en";
  }, [language]);

  const toggleLanguage = useCallback(() => {
    if (isLanguageLoading) return;

    setIsLanguageLoading(true);
    loadingTimeoutRef.current = window.setTimeout(() => {
      setLanguage((current) => (current === "en" ? "am" : "en"));
      setIsLanguageLoading(false);
    }, 500);
  }, [isLanguageLoading]);

  const value = useMemo(() => {
    const t = (key, fallback = key) => translations[language]?.[key] || translations.en[key] || fallback;

    return {
      language,
      isAmharic: language === "am",
      isLanguageLoading,
      setLanguage,
      toggleLanguage,
      t,
    };
  }, [isLanguageLoading, language, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
