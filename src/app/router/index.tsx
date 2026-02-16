import { lazy } from "react";
import { createBrowserRouter } from "react-router";

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
const Users = lazy(() =>
  import("@pages/users").then((m) => ({ default: m.Users })),
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
  { path: `/${ROUTES.RESET_PASSWORD}`, element: <h1>RESET PASSWORD</h1> },
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
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.USERS,
        element: (
          <WithSuspense>
            <Users />
          </WithSuspense>
        ),
      },
    ],
  },
]);
