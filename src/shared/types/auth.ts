import type { infer as ZodInfer } from "zod";

import type { UserRoleSchema } from "../schemas/auth";

export type UserRole = ZodInfer<typeof UserRoleSchema>;

interface AuthSession {
  role: UserRole;
  accessToken: string;
  company?: { id: string } | null | undefined;
}

export interface AuthState {
  role: UserRole | null;
  accessToken: string | null;
  companyId: string | null;
  setAuth: (session: AuthSession) => void;
  logOut: () => void;
}
