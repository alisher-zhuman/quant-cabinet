import { ROUTES } from "./routes";

export const HEADER_NAVIGATION_ITEMS = [
  { to: `/${ROUTES.USERS}`, label: "users.title" },
  { to: `/${ROUTES.COMPANIES}`, label: "companies.title" },
  { to: `/${ROUTES.CONTROLLERS}`, label: "controllers.title" },
  { to: `/${ROUTES.METERS}`, label: "meters.title" },
] as const;
