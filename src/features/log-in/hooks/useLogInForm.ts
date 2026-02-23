import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { logIn, LogInFormSchema, type LogInFormValues } from "@entities/auth";

import { ROUTES } from "@shared/constants";
import { getApiErrorMessage } from "@shared/helpers";
import { useToastMutation } from "@shared/hooks";
import { useAuthStore } from "@shared/stores";

export const useLogInForm = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LogInFormValues>({
    resolver: zodResolver(LogInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: logIn,
    pendingMessage: "Вход...",
    onSuccess: (session) => {
      setAuth(session);
      navigate(`/${ROUTES.USERS}`, { replace: true });
    },
    successMessage: "Успешный вход",
    errorMessage: (error) =>
      getApiErrorMessage(error, "Не удалось войти. Попробуйте снова."),
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
