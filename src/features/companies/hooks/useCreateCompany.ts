import { useTranslation } from "react-i18next";

import { companiesKeys, createCompany } from "@entities/companies";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useCreateCompany = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: createCompany,
    invalidateKeys: [companiesKeys.all],
    pendingMessage: t("companies.toast.create.loading"),
    successMessage: t("companies.toast.create.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("companies.toast.create.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
