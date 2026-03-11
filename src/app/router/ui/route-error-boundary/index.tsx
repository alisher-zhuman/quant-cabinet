import { useRouteError } from "react-router";

import { ErrorFallback } from "@shared/ui/error-fallback";

import { getRouteError } from "../../helpers/getRouteError";

export const RouteErrorBoundary = () => {
  const routeError = useRouteError();
  const { error, componentStack } = getRouteError(routeError);

  return (
    <ErrorFallback
      error={error}
      {...(componentStack ? { componentStack } : {})}
    />
  );
};
