import axios from "axios";

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
