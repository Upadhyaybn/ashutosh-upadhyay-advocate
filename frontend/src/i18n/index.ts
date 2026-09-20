import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const SUPPORTED_LANGUAGES = ["en", "hi"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const SESSION_STORAGE_KEY = "advocate-site-language";

const HTML_LANG_BY_LANGUAGE: Record<SupportedLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
};

function readStoredLanguage(): SupportedLanguage {
  try {
    const stored = window.sessionStorage.getItem(
      SESSION_STORAGE_KEY
    );

    if (
      stored === "en" ||
      stored === "hi"
    ) {
      return stored;
    }

  } catch {
    // sessionStorage unavailable (private mode, etc.) - fall back to default.
  }

  return "en";
}

export function persistLanguage(
  language: SupportedLanguage
): void {

  try {
    window.sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      language
    );

  } catch {
    // sessionStorage unavailable - language still switches for this render.
  }
}

export function applyHtmlLang(
  language: SupportedLanguage
): void {

  document.documentElement.lang =
    HTML_LANG_BY_LANGUAGE[language];
}

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },

    lng: readStoredLanguage(),
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

applyHtmlLang(
  i18n.language as SupportedLanguage
);

i18n.on("languageChanged", (language) => {
  applyHtmlLang(language as SupportedLanguage);
});

export default i18n;
