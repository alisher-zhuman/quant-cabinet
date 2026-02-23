export const DEFAULT_LANGUAGE = "kg" as const;
export const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, "ru"] as const;
export const I18N_STORAGE_KEY = "quant-cabinet-language";

export const LANGUAGE_BADGE: Record<
  (typeof SUPPORTED_LANGUAGES)[number],
  { flag: string; code: string }
> = {
  kg: { flag: "🇰🇬", code: "КР" },
  ru: { flag: "🇷🇺", code: "RU" },
};
