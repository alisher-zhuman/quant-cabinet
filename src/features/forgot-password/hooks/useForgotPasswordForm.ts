import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createForgotPasswordFormSchema,
  forgotPassword,
  type ForgotPasswordFormValues,
} from "@entities/auth";

import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";

export const useForgotPasswordForm = () => {
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
    pendingMessage: t("forgotPassword.toast.loading"),
    successMessage: t("forgotPassword.toast.success"),
    errorMessage: (error) =>
      getApiErrorMessage(error, t("forgotPassword.toast.error")),
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
