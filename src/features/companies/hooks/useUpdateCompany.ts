import { useTranslation } from "react-i18next";

import { companiesKeys, updateCompany } from "@entities/companies";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useUpdateCompany = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: updateCompany,
    invalidateKeys: [companiesKeys.all],
    pendingMessage: t("companies.toast.update.loading"),
    successMessage: t("companies.toast.update.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("companies.toast.update.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
