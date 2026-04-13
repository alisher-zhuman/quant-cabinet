export const ROUTES = {
  LOG_IN: "log-in",
  FORGOT_PASSWORD: "forgot-password",
  USERS: "users",
  COMPANIES: "companies",
  CONTROLLERS: "controllers",
  METERS: "meters",
  MY_COMPANY: "my-company",
};

export const ROUTE_PATTERNS = {
  LOG_IN: ROUTES.LOG_IN,
  FORGOT_PASSWORD: ROUTES.FORGOT_PASSWORD,
  USERS: ROUTES.USERS,
  USER_DETAILS: `${ROUTES.USERS}/:userId`,
  COMPANIES: ROUTES.COMPANIES,
  COMPANY_DETAILS: `${ROUTES.COMPANIES}/:companyId`,
  CONTROLLERS: ROUTES.CONTROLLERS,
  CONTROLLER_DETAILS: `${ROUTES.CONTROLLERS}/:controllerId`,
  METERS: ROUTES.METERS,
  METER_DETAILS: `${ROUTES.METERS}/:meterId`,
  MY_COMPANY: ROUTES.MY_COMPANY,
} as const;

export const ROUTE_PATHS = {
  LOG_IN: `/${ROUTE_PATTERNS.LOG_IN}`,
  FORGOT_PASSWORD: `/${ROUTE_PATTERNS.FORGOT_PASSWORD}`,
  USERS: `/${ROUTE_PATTERNS.USERS}`,
  USER_DETAILS: `/${ROUTE_PATTERNS.USER_DETAILS}`,
  COMPANIES: `/${ROUTE_PATTERNS.COMPANIES}`,
  COMPANY_DETAILS: `/${ROUTE_PATTERNS.COMPANY_DETAILS}`,
  CONTROLLERS: `/${ROUTE_PATTERNS.CONTROLLERS}`,
  CONTROLLER_DETAILS: `/${ROUTE_PATTERNS.CONTROLLER_DETAILS}`,
  METERS: `/${ROUTE_PATTERNS.METERS}`,
  METER_DETAILS: `/${ROUTE_PATTERNS.METER_DETAILS}`,
  MY_COMPANY: `/${ROUTE_PATTERNS.MY_COMPANY}`,
} as const;

export const getUserDetailsRoute = (userId: string) => `/${ROUTES.USERS}/${userId}`;
export const getCompanyDetailsRoute = (companyId: string) =>
  `/${ROUTES.COMPANIES}/${companyId}`;
export const getControllerDetailsRoute = (controllerId: string) =>
  `/${ROUTES.CONTROLLERS}/${controllerId}`;
export const getMeterDetailsRoute = (meterId: string) =>
  `/${ROUTES.METERS}/${meterId}`;
