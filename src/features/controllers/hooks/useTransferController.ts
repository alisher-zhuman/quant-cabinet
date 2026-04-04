import { useTranslation } from "react-i18next";

import { controllersKeys, transferController } from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useTransferController = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: transferController,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.toast.transfer.loading"),
    successMessage: t("controllers.toast.transfer.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("controllers.toast.transfer.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
