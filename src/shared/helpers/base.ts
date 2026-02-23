import axios from "axios";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@shared/constants";
import type { AppLanguage } from "@shared/types";

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }
  }

  return fallbackMessage;
};

export const getResolvedLanguage = (
  language: string | undefined,
): AppLanguage => {
  if (!language) {
    return DEFAULT_LANGUAGE;
  }

  const normalizedLanguage = language.split("-")[0];

  return SUPPORTED_LANGUAGES.includes(normalizedLanguage as AppLanguage)
    ? (normalizedLanguage as AppLanguage)
    : DEFAULT_LANGUAGE;
};
