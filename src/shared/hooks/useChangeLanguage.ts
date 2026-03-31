import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { changeLanguage } from "../api";
import { useAuthStore } from "../stores";
import type { AppLanguage } from "../types";

export const useChangeLanguage = () => {
  const { i18n } = useTranslation();

  const accessToken = useAuthStore((state) => state.accessToken);

  const mutation = useMutation({
    mutationFn: changeLanguage,
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
