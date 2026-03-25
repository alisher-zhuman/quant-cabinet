import type { UserRole } from "@shared/types";

export interface UserRow {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

export interface UsersResponse {
  data: UserRow[];
  total: number;
}
