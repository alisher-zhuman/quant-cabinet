import { useTranslation } from "react-i18next";

import { companiesKeys, deleteCompany } from "@entities/companies";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useDeleteCompany = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: deleteCompany,
    invalidateKeys: [companiesKeys.all],
    pendingMessage: t("companies.toast.delete.loading"),
    successMessage: t("companies.toast.delete.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("companies.toast.delete.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
