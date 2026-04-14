import { Navigate } from "react-router";

import { useAuthStore } from "@shared/stores";

import { getHomeRoute } from "../../helpers";

export const HomeRedirect = () => {
  const role = useAuthStore((state) => state.role);

  return <Navigate to={getHomeRoute(role)} replace />;
};
