import { AUTH_ROLES } from "@shared/constants";
import type { UserRole } from "@shared/types";

type MaybeRole = UserRole | null | undefined;

export const isAdmin = (role: MaybeRole) => role === AUTH_ROLES.ADMIN;
export const isManager = (role: MaybeRole) => role === AUTH_ROLES.MANAGER;
export const isUser = (role: MaybeRole) => role === AUTH_ROLES.USER;
