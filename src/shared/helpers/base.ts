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

export const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};
