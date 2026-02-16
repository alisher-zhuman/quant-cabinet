import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { LogInSchema } from "../model/schemas";
import type { LogInFormValues } from "../model/types";

export const useLogInForm = () => {
  const form = useForm<LogInFormValues>({
    resolver: zodResolver(LogInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LogInFormValues> = (values) => {
    console.log(values);
  };

  return {
    ...form,
    onSubmit,
  };
};
