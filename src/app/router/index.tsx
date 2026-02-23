import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { useTranslation } from "react-i18next";

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

const ResetPassword = () => {
  const { t } = useTranslation();

  return <h1>{t("resetPassword.title")}</h1>;
};

export const ROUTER = createBrowserRouter([
  {
    path: `/${ROUTES.LOG_IN}`,
    element: (
      <WithSuspense>
        <LogIn />
      </WithSuspense>
    ),
  },
  { path: `/${ROUTES.RESET_PASSWORD}`, element: <ResetPassword /> },
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
    ],
  },
]);
