import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "@shared/constants";
import { KG_COMMON_TRANSLATIONS } from "@shared/locales/kg/common";
import { RU_COMMON_TRANSLATIONS } from "@shared/locales/ru/common";

const RESOURCES = {
  ru: { common: RU_COMMON_TRANSLATIONS },
  kg: { common: KG_COMMON_TRANSLATIONS },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: RESOURCES,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: I18N_STORAGE_KEY,
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE;

  i18n.on("languageChanged", (language) => {
    document.documentElement.lang = language;
  });
}

export { i18n };
