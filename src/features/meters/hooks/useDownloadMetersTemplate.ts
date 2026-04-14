import { useTranslation } from "react-i18next";

import { downloadMetersTemplate } from "@entities/meters";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

const TEMPLATE_FILE_NAME = "meters-template.xlsx";

export const useDownloadMetersTemplate = () => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: downloadMetersTemplate,
    pendingMessage: t("meters.bulkUpload.template.toast.loading"),
    successMessage: t("meters.bulkUpload.template.toast.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("meters.bulkUpload.template.toast.error")),
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
