import { ROLE_GROUPS, ROUTE_PATHS } from "@shared/constants";

export const NAVBAR_LINKS = [
  { to: ROUTE_PATHS.COMPANIES, label: "companies.title", allowedRoles: ROLE_GROUPS.ADMIN_ONLY },
  { to: ROUTE_PATHS.MY_COMPANY, label: "myCompany.title", allowedRoles: ROLE_GROUPS.MANAGER_ONLY },
  { to: ROUTE_PATHS.USERS, label: "users.title", allowedRoles: ROLE_GROUPS.ADMIN_AND_MANAGER },
  { to: ROUTE_PATHS.CONTROLLERS, label: "controllers.title", allowedRoles: ROLE_GROUPS.ALL },
  { to: ROUTE_PATHS.METERS, label: "meters.title", allowedRoles: ROLE_GROUPS.ALL },
];
