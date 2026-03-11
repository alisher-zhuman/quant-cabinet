export const API_PATHS = {
  LOG_IN: "/auth/login",
  FORGOT_PASSWORD: "/users/password/forgot",
  USERS: "/users",
  COMPANIES: "/companies",
  COMPANIES_ARCHIVE: (id: string) => `/companies/archive/${id}`,
  COMPANIES_UNARCHIVE: (id: string) => `/companies/unarchive/${id}`,
  CONTROLLERS: "/controllers",
  METERS: "/meters",
};
