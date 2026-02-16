import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { logIn, LogInFormSchema, type LogInFormValues } from "@entities/auth";

import { ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";

export const useLogInForm = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LogInFormValues>({
    resolver: zodResolver(LogInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LogInFormValues> = async (values) => {
    form.clearErrors("root");

    try {
      const session = logIn(values);

      setAuth(session);
      navigate(`/${ROUTES.USERS}`, { replace: true });
    } catch {
      form.setError("root", {
        type: "server",
        message: "Не удалось войти. Проверьте email и пароль.",
      });
    }
  };

  return {
    ...form,
    onSubmit,
  };
};
