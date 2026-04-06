import { useLocation, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useUserQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
import { getBackTo } from "@shared/helpers";

export const useUserDetailsWidget = () => {
  const { t } = useTranslation();
  
  const location = useLocation() as { state: unknown };

  const { userEmail } = useParams();

  const { user } = useUserQuery(userEmail);

  const backTo = getBackTo(location.state, `/${ROUTES.USERS}`);

  const userStatus = user?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");

  const companyStatus = user?.company?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const canShowCompanyDetails = Boolean(user?.company && user.role !== "admin");

  return {
    t,
    userEmail,
    user,
    backTo,
    userStatus,
    companyStatus,
    fullName,
    canShowCompanyDetails,
  };
};
