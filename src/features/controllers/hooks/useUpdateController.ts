import { useTranslation } from "react-i18next";

import { controllersKeys, updateController } from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useUpdateController = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: updateController,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.toast.update.loading"),
    successMessage: t("controllers.toast.update.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("controllers.toast.update.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
