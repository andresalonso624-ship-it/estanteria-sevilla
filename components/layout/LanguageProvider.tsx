
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("site-language");

    if (savedLanguage === "es" || savedLanguage === "zh") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem("site-language", nextLanguage);
    setLanguageState(nextLanguage);
    document.documentElement.lang =
      nextLanguage === "zh" ? "zh-CN" : "es";
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language],
  );

  useEffect(() => {
    document.documentElement.lang =
      language === "zh" ? "zh-CN" : "es";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage debe utilizarse dentro de LanguageProvider",
    );
  }

  return context;
}
