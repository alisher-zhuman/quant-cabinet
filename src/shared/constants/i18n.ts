export const DEFAULT_LANGUAGE = "ru" as const;
export const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, "kg"] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const I18N_STORAGE_KEY = "quant-cabinet-language";
