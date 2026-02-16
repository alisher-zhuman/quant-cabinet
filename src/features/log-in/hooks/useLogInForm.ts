import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";

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
    try {
      const session = await logIn(values);

      setAuth(session);
      navigate(`/${ROUTES.USERS}`, { replace: true });
      toast.success("Успешный вход");
    } catch (error) {
      console.log(error);

      toast.error("Error");
    }
  };

  return {
    ...form,
    onSubmit,
  };
};
