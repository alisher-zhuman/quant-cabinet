import { useTranslation } from "react-i18next";

import { deleteUser, usersKeys } from "@entities/users";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useDeleteUser = () => {
  const { t } = useTranslation();

  return useToastMutation({
    mutationFn: deleteUser,
    invalidateKeys: [usersKeys.all],
    pendingMessage: t("users.toast.delete.loading"),
    successMessage: t("users.toast.delete.success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("users.toast.delete.error")),
  });
};
