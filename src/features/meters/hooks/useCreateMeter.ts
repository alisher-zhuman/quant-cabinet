import { useTranslation } from "react-i18next";

import { createMeter, metersKeys } from "@entities/meters";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useCreateMeter = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: createMeter,
    invalidateKeys: [metersKeys.all],
    pendingMessage: t("meters.toast.create.loading"),
    successMessage: t("meters.toast.create.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("meters.toast.create.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
