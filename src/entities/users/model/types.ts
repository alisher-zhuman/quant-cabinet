export interface UserRow {
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface UsersResponse {
  data: UserRow[];
  total: number;
}
