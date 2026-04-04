import { useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useUserQuery } from "@entities/users";

export const useUserDetailsWidget = () => {
  const { t } = useTranslation();

  const { userEmail } = useParams();
  
  const { user } = useUserQuery(userEmail);

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
    userStatus,
    companyStatus,
    fullName,
    canShowCompanyDetails,
  };
};
