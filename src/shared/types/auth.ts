import type { infer as ZodInfer } from "zod";

import type { UserRoleSchema } from "../schemas/auth";

export type UserRole = ZodInfer<typeof UserRoleSchema>;

interface AuthSession {
  role: UserRole;
  accessToken: string;
}

export interface AuthState {
  role: UserRole | null;
  accessToken: string | null;
  setAuth: (session: AuthSession) => void;
  logOut: () => void;
}
