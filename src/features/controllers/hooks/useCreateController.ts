import { useTranslation } from "react-i18next";

import { controllersKeys, createController } from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useCreateController = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: createController,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.toast.create.loading"),
    successMessage: t("controllers.toast.create.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("controllers.toast.create.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
