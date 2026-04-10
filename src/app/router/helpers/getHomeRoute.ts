import { ROUTES } from "@shared/constants";
import type { AuthState } from "@shared/types";

export const getHomeRoute = (role: AuthState["role"]) => {
  switch (role) {
    case "admin":
      return `/${ROUTES.COMPANIES}`;
    case "manager":
      return `/${ROUTES.MY_COMPANY}`;
    case "user":
      return `/${ROUTES.CONTROLLERS}`;
    default:
      return `/${ROUTES.LOG_IN}`;
  }
};
