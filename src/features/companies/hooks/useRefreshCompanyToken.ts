import { useTranslation } from "react-i18next";

import { companiesKeys, refreshCompanyToken } from "@entities/companies";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useRefreshCompanyToken = (companyId?: string) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: refreshCompanyToken,
    invalidateKeys: companyId ? [companiesKeys.detail(companyId)] : [],
    pendingMessage: t("companies.toast.refresh.loading"),
    successMessage: t("companies.toast.refresh.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("companies.toast.refresh.error")),
  });
};
