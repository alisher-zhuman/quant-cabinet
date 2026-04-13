import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createLogInFormSchema,
  logIn,
  type LogInFormValues,
} from "@entities/auth";

import { AUTH_ROLES, ROUTE_PATHS } from "@shared/constants";
import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";
import { useAuthStore } from "@shared/stores";

export const useLogInForm = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<LogInFormValues>({
    resolver: zodResolver(createLogInFormSchema(t)),
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

      if (session.role === AUTH_ROLES.ADMIN) {
        navigate(ROUTE_PATHS.COMPANIES, { replace: true });
      } else if (session.role === AUTH_ROLES.MANAGER) {
        navigate(ROUTE_PATHS.MY_COMPANY, { replace: true });
      } else {
        navigate(ROUTE_PATHS.CONTROLLERS, { replace: true });
      }
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
    canGoBack: Boolean(accessToken),
    control,
    isDirty,
    isValid,
    isPending: mutation.isPending,
    onBack,
    onSubmit,
  };
};
