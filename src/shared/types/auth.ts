type UserRole = "user" | "admin";

interface AuthSession {
  role: UserRole;
  accessToken: string;
}

export interface AuthState {
  role: UserRole | null;
  accessToken: string | null;
  setAuth: (session: AuthSession) => void;
  logout: () => void;
}
