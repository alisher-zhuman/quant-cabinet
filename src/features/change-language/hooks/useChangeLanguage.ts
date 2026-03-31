import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { changeUserLanguage } from "@entities/users";

import { useAuthStore } from "@shared/stores";
import type { AppLanguage } from "@shared/types";

export const useChangeLanguage = () => {
  const { i18n } = useTranslation();
  const accessToken = useAuthStore((state) => state.accessToken);

  const mutation = useMutation({
    mutationFn: changeUserLanguage,
  });

  const handleChangeLanguage = async (language: AppLanguage) => {
    await i18n.changeLanguage(language);

    if (!accessToken) {
      return;
    }

    try {
      await mutation.mutateAsync({ lang: language });
    } catch {
      return;
    }
  };

  return {
    isPending: mutation.isPending,
    onChangeLanguage: handleChangeLanguage,
  };
};
