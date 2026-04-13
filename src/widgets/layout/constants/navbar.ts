import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";

import { ROLE_GROUPS, ROUTE_PATHS } from "@shared/constants";

export const NAVBAR_LINKS = [
  {
    to: ROUTE_PATHS.COMPANIES,
    label: "companies.title",
    icon: BusinessRoundedIcon,
    allowedRoles: ROLE_GROUPS.ADMIN_ONLY,
  },
  {
    to: ROUTE_PATHS.MY_COMPANY,
    label: "myCompany.title",
    icon: StoreRoundedIcon,
    allowedRoles: ROLE_GROUPS.MANAGER_ONLY,
  },
  {
    to: ROUTE_PATHS.USERS,
    label: "users.title",
    icon: PeopleRoundedIcon,
    allowedRoles: ROLE_GROUPS.ADMIN_AND_MANAGER,
  },
  {
    to: ROUTE_PATHS.CONTROLLERS,
    label: "controllers.title",
    icon: RouterRoundedIcon,
    allowedRoles: ROLE_GROUPS.ALL,
  },
  {
    to: ROUTE_PATHS.METERS,
    label: "meters.title",
    icon: SpeedRoundedIcon,
    allowedRoles: ROLE_GROUPS.ALL,
  },
];
