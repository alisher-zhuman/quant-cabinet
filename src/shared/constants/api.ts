export const API_PATHS = {
  LOG_IN: "/auth/login",
  FORGOT_PASSWORD: "/users/password/forgot",
  USERS: "/users",
  USERS_LANG: "/users/lang",
  USERS_UPDATE: "/users/update",
  COMPANIES: "/companies",
  COMPANIES_TOKEN_REFRESH: "/companies/token/refresh",
  CONTROLLERS: "/controllers",
  CONTROLLERS_UPDATE: "/controllers/update",
  GET_CONTROLLER: (id: string) => `/controllers/${id}`,
  METERS: "/meters",
};
