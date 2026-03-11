import { useTranslation } from "react-i18next";

import { companiesKeys, toggleCompanyArchive } from "@entities/companies";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useToggleCompanyArchive = () => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: toggleCompanyArchive,
    invalidateKeys: [companiesKeys.all],
    pendingMessage: ({ isArchived }) =>
      isArchived
        ? t("companies.toast.unarchive.loading")
        : t("companies.toast.archive.loading"),
    successMessage: (_data, { isArchived }) =>
      isArchived
        ? t("companies.toast.unarchive.success")
        : t("companies.toast.archive.success"),
    errorMessage: (error: unknown, { isArchived }) =>
      getApiErrorMessage(
        error,
        isArchived
          ? t("companies.toast.unarchive.error")
          : t("companies.toast.archive.error"),
      ),
  });
};
