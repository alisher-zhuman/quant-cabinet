import { useTranslation } from "react-i18next";

import { deleteMeter, metersKeys } from "@entities/meters";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useDeleteMeter = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: deleteMeter,
    invalidateKeys: [metersKeys.all],
    pendingMessage: t("meters.toast.delete.loading"),
    successMessage: t("meters.toast.delete.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("meters.toast.delete.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
