import { create } from "zustand";

import type { AuthSession, AuthState } from "@shared/types";

export const AUTH_STORAGE_KEY = "quant-cabinet-auth";

const getInitialAuthState = (): Pick<AuthState, "role" | "accessToken"> => {
  if (typeof window === "undefined") {
    return { role: null, accessToken: null };
  }

  const stored = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!stored) {
    return { role: null, accessToken: null };
  }

  try {
    const parsed = JSON.parse(stored) as Partial<AuthSession>;

    return {
      role: parsed.role ?? null,
      accessToken: parsed.accessToken ?? null,
    };
  } catch {
    return { role: null, accessToken: null };
  }
};

export const useAuthStore = create<AuthState>((set) => {
  const initialState = getInitialAuthState();

  return {
    ...initialState,

    setAuth: (session) => {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      set({ role: session.role, accessToken: session.accessToken });
    },

    logout: () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      set({ role: null, accessToken: null });
    },
  };
});
