import { useTranslation } from "react-i18next";

import { metersKeys, updateMeter } from "@entities/meters";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useUpdateMeter = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: updateMeter,
    invalidateKeys: [metersKeys.all],
    pendingMessage: t("meters.toast.update.loading"),
    successMessage: t("meters.toast.update.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("meters.toast.update.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
