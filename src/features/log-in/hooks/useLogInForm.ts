import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createLogInFormSchema,
  logIn,
  type LogInFormValues,
} from "@entities/auth";

import { ROUTES } from "@shared/constants";
import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";
import { useAuthStore } from "@shared/stores";

export const useLogInForm = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LogInFormValues>({
    resolver: zodResolver(createLogInFormSchema()),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: logIn,
    pendingMessage: t("logIn.toast.loading"),
    onSuccess: (session) => {
      setAuth(session);
      navigate(`/${ROUTES.USERS}`, { replace: true });
    },
    successMessage: t("logIn.toast.success"),
    errorMessage: (error) => getApiErrorMessage(error, t("logIn.toast.error")),
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  const onBack = () => {
    navigate(-1);
  };

  return {
    control,
    isValid,
    isPending: mutation.isPending,
    onBack,
    onSubmit,
  };
};
