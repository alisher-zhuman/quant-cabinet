import { Navigate } from "react-router";

import type { ReactNode } from "react";

import { ROUTE_PATHS } from "@shared/constants";
import { useAuthStore } from "@shared/stores";
import type { AuthState } from "@shared/types";

import { getHomeRoute } from "../../helpers/getHomeRoute";

interface Props {
  children: ReactNode;
  allowedRoles: ReadonlyArray<NonNullable<AuthState["role"]>>;
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);

  if (!accessToken) {
    return <Navigate to={ROUTE_PATHS.LOG_IN} replace />;
  }

  if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={getHomeRoute(role)} replace />;
  }

  return <>{children}</>;
};
