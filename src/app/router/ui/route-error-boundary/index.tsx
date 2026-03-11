import { useRouteError } from "react-router";

import { ErrorFallbackScreen } from "../../../error-boundary/ui/error-fallback-screen";
import { getRouteError } from "../../helpers/getRouteError";

export const RouteErrorBoundary = () => {
  const routeError = useRouteError();
  
  const { error, componentStack } = getRouteError(routeError);

  return (
    <ErrorFallbackScreen
      error={error}
      {...(componentStack ? { componentStack } : {})}
    />
  );
};
