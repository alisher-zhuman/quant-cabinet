import { ROUTES } from "@shared/constants";

export const NAVBAR_LINKS = [
  { to: `/${ROUTES.COMPANIES}`, label: "companies.title", allowedRoles: ["admin"] },
  { to: `/${ROUTES.MY_COMPANY}`, label: "myCompany.title", allowedRoles: ["manager"] },
  { to: `/${ROUTES.USERS}`, label: "users.title", allowedRoles: ["admin", "manager"] },
  { to: `/${ROUTES.CONTROLLERS}`, label: "controllers.title", allowedRoles: ["admin", "manager", "user"] },
  { to: `/${ROUTES.METERS}`, label: "meters.title", allowedRoles: ["admin", "manager", "user"] },
];
