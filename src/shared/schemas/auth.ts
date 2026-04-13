import { z } from "zod";

import { USER_ROLE_VALUES } from "@shared/constants";

export const UserRoleSchema = z.enum(USER_ROLE_VALUES);
