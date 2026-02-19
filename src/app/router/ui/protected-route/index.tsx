import { Navigate } from "react-router";

import type { ReactNode } from "react";

import { ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";
import type { AuthState } from "@shared/types";

interface Props {
  children: ReactNode;
  allowedRoles: Array<NonNullable<AuthState["role"]>>;
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);

  if (!accessToken) {
    return <Navigate to={`/${ROUTES.LOG_IN}`} replace />;
  }

  if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={`/${ROUTES.LOG_IN}`} replace />;
  }

  return <>{children}</>;
};
