import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("language") || "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem("language", language);
    document.documentElement.lang = language === "am" ? "am" : "en";
  }, [language]);

  const value = useMemo(() => {
    const t = (key, fallback = key) => translations[language]?.[key] || translations.en[key] || fallback;

    return {
      language,
      isAmharic: language === "am",
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "am" : "en")),
      t,
    };
  }, [language]);

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
