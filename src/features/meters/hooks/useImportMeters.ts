import { useTranslation } from "react-i18next";

import { importMeters, metersKeys } from "@entities/meters";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useImportMeters = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: importMeters,
    invalidateKeys: [metersKeys.all],
    pendingMessage: t("meters.bulkUpload.import.toast.loading"),
    successMessage: t("meters.bulkUpload.import.toast.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("meters.bulkUpload.import.toast.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
