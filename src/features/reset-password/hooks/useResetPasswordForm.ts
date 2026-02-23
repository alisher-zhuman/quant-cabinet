import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createForgotPasswordFormSchema,
  forgotPassword,
  type ForgotPasswordFormValues,
} from "@entities/auth";

import { ROUTES } from "@shared/constants";
import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useResetPasswordForm = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordFormSchema()),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: forgotPassword,
    pendingMessage: t("resetPassword.toast.loading"),
    successMessage: t("resetPassword.toast.success"),
    errorMessage: (error) =>
      getApiErrorMessage(error, t("resetPassword.toast.error")),
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  const onBack = () => {
    navigate(`/${ROUTES.LOG_IN}`);
  };

  return {
    control,
    isValid,
    isPending: mutation.isPending,
    onBack,
    onSubmit,
  };
};
