import { useTranslation } from "react-i18next";

import { createUser, usersKeys } from "@entities/users";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useCreateUser = (onSuccess?: () => void) => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: createUser,
    invalidateKeys: [usersKeys.all],
    pendingMessage: t("users.toast.create.loading"),
    successMessage: t("users.toast.create.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("users.toast.create.error")),
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
