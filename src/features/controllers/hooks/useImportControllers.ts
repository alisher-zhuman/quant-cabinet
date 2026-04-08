import { useTranslation } from "react-i18next";

import {
  controllersKeys,
  importControllers,
} from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useImportControllers = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: importControllers,
    invalidateKeys: [controllersKeys.all],
    pendingMessage: t("controllers.bulkUpload.import.toast.loading"),
    successMessage: t("controllers.bulkUpload.import.toast.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("controllers.bulkUpload.import.toast.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
