import { useTranslation } from "react-i18next";

import { deleteUser, usersKeys } from "@entities/users";

import { useDeleteMutation } from "@shared/hooks";

export const useDeleteUser = () => {
  const { t } = useTranslation();

  return useDeleteMutation({
    mutationFn: deleteUser,
    invalidateKeys: [usersKeys.all],
    pendingMessage: t("users.toast.delete.loading"),
    successMessage: t("users.toast.delete.success"),
    errorFallbackMessage: t("users.toast.delete.error"),
  });
};
