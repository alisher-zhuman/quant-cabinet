import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthState } from "@shared/types";

export const AUTH_STORAGE_KEY = "quant-cabinet-auth";

const INITIAL_AUTH_STATE: Pick<AuthState, "role" | "accessToken"> = {
  role: null,
  accessToken: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,

      setAuth: (session) => {
        set({ role: session.role, accessToken: session.accessToken });
      },

      logOut: () => {
        set(INITIAL_AUTH_STATE);
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        role: state.role,
        accessToken: state.accessToken,
      }),
    },
  ),
);
