import { useTranslation } from "react-i18next";

import {
  persistLanguage,
} from "../../i18n";

import type {
  SupportedLanguage,
} from "../../i18n";

function LanguageSwitcher() {

  const { i18n, t } = useTranslation();

  const currentLanguage =
    i18n.language as SupportedLanguage;

  const switchTo = (
    language: SupportedLanguage
  ) => {

    if (language === currentLanguage) {
      return;
    }

    void i18n.changeLanguage(language);
    persistLanguage(language);
  };

  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t(
        "common.language.switchLabel"
      )}
    >

      <button
        type="button"
        className={
          currentLanguage === "en"
            ? "language-option is-active"
            : "language-option"
        }
        aria-pressed={
          currentLanguage === "en"
        }
        onClick={() => switchTo("en")}
      >
        {t("common.language.english")}
      </button>

      <span
        className="language-divider"
        aria-hidden="true"
      >
        |
      </span>

      <button
        type="button"
        className={
          currentLanguage === "hi"
            ? "language-option is-active"
            : "language-option"
        }
        aria-pressed={
          currentLanguage === "hi"
        }
        onClick={() => switchTo("hi")}
      >
        {t("common.language.hindi")}
      </button>

    </div>
  );
}

export default LanguageSwitcher;
