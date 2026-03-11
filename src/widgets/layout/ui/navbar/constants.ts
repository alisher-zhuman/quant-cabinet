import { ROUTES } from "@shared/constants";

export const NAVBAR_LINKS = [
  { to: `/${ROUTES.COMPANIES}`, label: "companies.title" },
  { to: `/${ROUTES.USERS}`, label: "users.title" },
  { to: `/${ROUTES.CONTROLLERS}`, label: "controllers.title" },
  { to: `/${ROUTES.METERS}`, label: "meters.title" },
] as const;
