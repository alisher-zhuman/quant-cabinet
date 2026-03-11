import { useTranslation } from "react-i18next";

import { controllersKeys, deleteController } from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useDeleteController = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: deleteController,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.toast.delete.loading"),
    successMessage: t("controllers.toast.delete.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("controllers.toast.delete.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
