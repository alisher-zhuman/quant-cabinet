import { ROUTE_PATHS } from "@shared/constants";
import { isAdmin, isManager, isUser } from "@shared/helpers";
import type { AuthState } from "@shared/types";

export const getHomeRoute = (role: AuthState["role"]) => {
  if (isAdmin(role)) {
    return ROUTE_PATHS.COMPANIES;
  }

  if (isManager(role)) {
    return ROUTE_PATHS.MY_COMPANY;
  }

  if (isUser(role)) {
    return ROUTE_PATHS.CONTROLLERS;
  }

  return ROUTE_PATHS.LOG_IN;
};
