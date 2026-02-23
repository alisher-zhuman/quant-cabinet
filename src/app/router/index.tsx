import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { Layout } from "@widgets/layout";

import { ROUTES } from "@shared/constants";

import { ProtectedRoute } from "./ui/protected-route";
import { WithSuspense } from "./ui/with-suspense";

const NotFound = lazy(() =>
  import("@pages/not-found").then((m) => ({ default: m.NotFound })),
);
const LogIn = lazy(() =>
  import("@pages/log-in").then((m) => ({ default: m.LogIn })),
);
const ResetPassword = lazy(() =>
  import("@pages/reset-password").then((m) => ({ default: m.ResetPassword })),
);
const Users = lazy(() =>
  import("@pages/users").then((m) => ({ default: m.Users })),
);
const Companies = lazy(() =>
  import("@pages/companies").then((m) => ({ default: m.Companies })),
);
const Controllers = lazy(() =>
  import("@pages/controllers").then((m) => ({ default: m.Controllers })),
);
const Meters = lazy(() =>
  import("@pages/meters").then((m) => ({ default: m.Meters })),
);

export const ROUTER = createBrowserRouter([
  {
    path: `/${ROUTES.LOG_IN}`,
    element: (
      <WithSuspense>
        <LogIn />
      </WithSuspense>
    ),
  },
  {
    path: `/${ROUTES.RESET_PASSWORD}`,
    element: (
      <WithSuspense>
        <ResetPassword />
      </WithSuspense>
    ),
  },
  {
    path: "*",
    element: (
      <WithSuspense>
        <NotFound />
      </WithSuspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.USERS} replace />,
      },
      {
        path: ROUTES.USERS,
        element: (
          <WithSuspense>
            <Users />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.COMPANIES,
        element: (
          <WithSuspense>
            <Companies />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.CONTROLLERS,
        element: (
          <WithSuspense>
            <Controllers />
          </WithSuspense>
        ),
      },
      {
        path: ROUTES.METERS,
        element: (
          <WithSuspense>
            <Meters />
          </WithSuspense>
        ),
      },
    ],
  },
]);
