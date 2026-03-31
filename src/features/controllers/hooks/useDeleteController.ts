import { useTranslation } from "react-i18next";

import { controllersKeys, deleteController } from "@entities/controllers";

import { useDeleteMutation } from "@shared/hooks";

export const useDeleteController = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useDeleteMutation({
    mutationFn: deleteController,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.toast.delete.loading"),
    successMessage: t("controllers.toast.delete.success"),
    errorFallbackMessage: t("controllers.toast.delete.error"),
    onSuccess,
  });
};
