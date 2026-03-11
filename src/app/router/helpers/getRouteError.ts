import { isRouteErrorResponse } from "react-router";

interface RouteErrorResult {
  error: Error | null;
  componentStack?: string;
}

const getErrorMessage = (routeError: unknown) => {
  if (typeof routeError === "string") {
    return routeError;
  }

  if (
    typeof routeError === "object" &&
    routeError !== null &&
    "message" in routeError &&
    typeof routeError.message === "string"
  ) {
    return routeError.message;
  }

  return undefined;
};

const getComponentStack = (routeError: unknown) => {
  if (
    typeof routeError === "object" &&
    routeError !== null &&
    "componentStack" in routeError &&
    typeof routeError.componentStack === "string"
  ) {
    return routeError.componentStack;
  }

  return undefined;
};

export const getRouteError = (routeError: unknown): RouteErrorResult => {
  if (isRouteErrorResponse(routeError)) {
    const errorMessage =
      getErrorMessage(routeError.data) ||
      routeError.statusText ||
      `Route error ${routeError.status}`;
    const componentStack = getComponentStack(routeError.data);

    return {
      error: new Error(errorMessage),
      ...(componentStack ? { componentStack } : {}),
    };
  }

  if (routeError instanceof Error) {
    const componentStack = getComponentStack(routeError);

    return {
      error: routeError,
      ...(componentStack ? { componentStack } : {}),
    };
  }

  const errorMessage = getErrorMessage(routeError);
  const componentStack = getComponentStack(routeError);

  return {
    error: errorMessage ? new Error(errorMessage) : null,
    ...(componentStack ? { componentStack } : {}),
  };
};
