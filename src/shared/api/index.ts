import axios from "axios";

import { useAuthStore } from "@shared/stores";

export const api = axios.create({
  baseURL: import.meta.env["VITE_API_URL"] as string,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const status =
      typeof error === "object" && error !== null && "response" in error
        ? (error as { response?: { status?: number } }).response?.status
        : undefined;

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      const { logOut } = useAuthStore.getState();

      try {
        logOut();
      } finally {
        isLoggingOut = false;
      }
    }

    return Promise.reject(
      error instanceof Error ? error : new Error("API request failed"),
    );
  },
);
