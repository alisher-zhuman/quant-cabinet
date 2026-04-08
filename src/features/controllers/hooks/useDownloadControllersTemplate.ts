import { useTranslation } from "react-i18next";

import { downloadControllersTemplate } from "@entities/controllers";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

const TEMPLATE_FILE_NAME = "controllers-template.xlsx";

export const useDownloadControllersTemplate = () => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: downloadControllersTemplate,
    pendingMessage: t("controllers.bulkUpload.template.toast.loading"),
    successMessage: t("controllers.bulkUpload.template.toast.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(
        error,
        t("controllers.bulkUpload.template.toast.error"),
      ),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = TEMPLATE_FILE_NAME;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    },
  });
};
