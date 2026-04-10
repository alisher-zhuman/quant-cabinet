import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Layout } from "@widgets/layout";

import { ROUTES } from "@shared/constants";

import { HomeRedirect } from "./ui/home-redirect";
import { ProtectedRoute } from "./ui/protected-route";
import { RouteErrorBoundary } from "./ui/route-error-boundary";
import { WithSuspense } from "./ui/with-suspense";

const NotFound = lazy(() =>
  import("@pages/not-found").then((m) => ({ default: m.NotFound })),
);
const LogIn = lazy(() =>
  import("@pages/log-in").then((m) => ({ default: m.LogIn })),
);
const ForgotPassword = lazy(() =>
  import("@pages/forgot-password").then((m) => ({ default: m.ForgotPassword })),
);
const Users = lazy(() =>
  import("@pages/users").then((m) => ({ default: m.Users })),
);
const UserDetails = lazy(() =>
  import("@pages/user-details").then((m) => ({ default: m.UserDetails })),
);
const MyCompany = lazy(() =>
  import("@pages/my-company").then((m) => ({ default: m.MyCompany })),
);
const Companies = lazy(() =>
  import("@pages/companies").then((m) => ({ default: m.Companies })),
);
const CompanyDetails = lazy(() =>
  import("@pages/company-details").then((m) => ({
    default: m.CompanyDetails,
  })),
);
const Controllers = lazy(() =>
  import("@pages/controllers").then((m) => ({ default: m.Controllers })),
);
const ControllerDetails = lazy(() =>
  import("@pages/controller-details").then((m) => ({
    default: m.ControllerDetails,
  })),
);
const Meters = lazy(() =>
  import("@pages/meters").then((m) => ({ default: m.Meters })),
);
const MeterDetails = lazy(() =>
  import("@pages/meter-details").then((m) => ({ default: m.MeterDetails })),
);

export const ROUTER = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: `/${ROUTES.LOG_IN}`,
        element: (
          <WithSuspense>
            <LogIn />
          </WithSuspense>
        ),
      },
      {
        path: `/${ROUTES.FORGOT_PASSWORD}`,
        element: (
          <WithSuspense>
            <ForgotPassword />
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
          <ProtectedRoute allowedRoles={["admin", "manager", "user"]}>
            <Layout />
          </ProtectedRoute>
        ),
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            element: <HomeRedirect />,
          },
          {
            path: ROUTES.COMPANIES,
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <WithSuspense>
                  <Companies />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: `${ROUTES.COMPANIES}/:companyId`,
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <WithSuspense>
                  <CompanyDetails />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.MY_COMPANY,
            element: (
              <ProtectedRoute allowedRoles={["manager"]}>
                <WithSuspense>
                  <MyCompany />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.USERS,
            element: (
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <WithSuspense>
                  <Users />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: `${ROUTES.USERS}/:userId`,
            element: (
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <WithSuspense>
                  <UserDetails />
                </WithSuspense>
              </ProtectedRoute>
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
            path: `${ROUTES.CONTROLLERS}/:controllerId`,
            element: (
              <WithSuspense>
                <ControllerDetails />
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
          {
            path: `${ROUTES.METERS}/:meterId`,
            element: (
              <WithSuspense>
                <MeterDetails />
              </WithSuspense>
            ),
          },
        ],
      },
    ],
  },
]);
