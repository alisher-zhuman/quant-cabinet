import { useTranslation } from "react-i18next";

import { updateUser, usersKeys } from "@entities/users";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useUpdateUser = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: updateUser,
    invalidateKeys: [usersKeys.all],
    pendingMessage: t("users.toast.update.loading"),
    successMessage: t("users.toast.update.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("users.toast.update.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
