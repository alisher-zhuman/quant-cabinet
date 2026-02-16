import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { logIn } from "@entities/auth";
import { LogInSchema } from "@entities/auth/model/schemas";

import { ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";

export const useLogInForm = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LogInFormValues>({
    resolver: zodResolver(LogInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LogInFormValues> = async (values) => {
    form.clearErrors("root");

    try {
      const session = await logIn(values);

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
