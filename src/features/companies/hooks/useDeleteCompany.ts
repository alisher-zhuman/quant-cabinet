import { useTranslation } from "react-i18next";

import { companiesKeys, deleteCompany } from "@entities/companies";

import { useDeleteMutation } from "@shared/hooks";

export const useDeleteCompany = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useDeleteMutation({
    mutationFn: deleteCompany,
    invalidateKeys: [companiesKeys.all],
    pendingMessage: t("companies.toast.delete.loading"),
    successMessage: t("companies.toast.delete.success"),
    errorFallbackMessage: t("companies.toast.delete.error"),
    onSuccess,
  });
};
