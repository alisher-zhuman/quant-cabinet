import { AUTH_ROLES, ROUTE_PATHS } from "@shared/constants";
import type { AuthState } from "@shared/types";

export const getHomeRoute = (role: AuthState["role"]) => {
  switch (role) {
    case AUTH_ROLES.ADMIN:
      return ROUTE_PATHS.COMPANIES;
    case AUTH_ROLES.MANAGER:
      return ROUTE_PATHS.MY_COMPANY;
    case AUTH_ROLES.USER:
      return ROUTE_PATHS.CONTROLLERS;
    default:
      return ROUTE_PATHS.LOG_IN;
  }
};
