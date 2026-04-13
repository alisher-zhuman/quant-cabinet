import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Layout } from "@widgets/layout";

import {
  ROLE_GROUPS,
  ROUTE_PATHS,
  ROUTE_PATTERNS,
  ROUTES,
} from "@shared/constants";

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
        path: ROUTE_PATHS.LOG_IN,
        element: (
          <WithSuspense>
            <LogIn />
          </WithSuspense>
        ),
      },
      {
        path: ROUTE_PATHS.FORGOT_PASSWORD,
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
          <ProtectedRoute allowedRoles={ROLE_GROUPS.ALL}>
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
              <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                <WithSuspense>
                  <Companies />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATTERNS.COMPANY_DETAILS,
            element: (
              <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_ONLY}>
                <WithSuspense>
                  <CompanyDetails />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.MY_COMPANY,
            element: (
              <ProtectedRoute allowedRoles={ROLE_GROUPS.MANAGER_ONLY}>
                <WithSuspense>
                  <MyCompany />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.USERS,
            element: (
              <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_AND_MANAGER}>
                <WithSuspense>
                  <Users />
                </WithSuspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTE_PATTERNS.USER_DETAILS,
            element: (
              <ProtectedRoute allowedRoles={ROLE_GROUPS.ADMIN_AND_MANAGER}>
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
            path: ROUTE_PATTERNS.CONTROLLER_DETAILS,
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
            path: ROUTE_PATTERNS.METER_DETAILS,
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
