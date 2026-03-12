import React, { createContext, useState, useContext, useCallback } from "react";
import en from "../locales/en";
import fr from "../locales/fr";

const translations = { en, fr };

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const newLang = prev === "en" ? "fr" : "en";
      localStorage.setItem("language", newLang);
      return newLang;
    });
  }, []);

  const t = useCallback(
    (key, params = {}) => {
      let text = translations[language][key] || key;
      Object.keys(params).forEach((param) => {
        text = text.replace(`{${param}}`, params[param]);
      });
      return text;
    },
    [language]
  );

  const value = { language, toggleLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
