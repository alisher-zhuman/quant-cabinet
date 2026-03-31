import { useTranslation } from "react-i18next";

import { deleteMeter, metersKeys } from "@entities/meters";

import { useDeleteMutation } from "@shared/hooks";

export const useDeleteMeter = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useDeleteMutation({
    mutationFn: deleteMeter,
    invalidateKeys: [metersKeys.all],
    pendingMessage: t("meters.toast.delete.loading"),
    successMessage: t("meters.toast.delete.success"),
    errorFallbackMessage: t("meters.toast.delete.error"),
    onSuccess,
  });
};
