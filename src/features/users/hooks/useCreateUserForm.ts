import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import type { CreateUserFormValues } from "@entities/users";
import { createUserFormSchema } from "@entities/users";

import { useCreateUser } from "./useCreateUser";

interface Params {
  onSuccess?: (() => void) | undefined;
}

const getDefaultValues = (): CreateUserFormValues => ({
  email: "",
  firstName: "",
  lastName: "",
  role: "user",
  phoneNumber: "",
  descriptions: "",
  company: "",
});

export const useCreateUserForm = ({ onSuccess }: Params = {}) => {
  const { t } = useTranslation();

  const defaultValues = useMemo(() => getDefaultValues(), []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema(t)),
    mode: "onChange",
    defaultValues,
  });

  const createMutation = useCreateUser(() => {
    reset(defaultValues);
    onSuccess?.();
  });

  const onSubmit = handleSubmit((values) => {
    createMutation.mutate(values);
  });

  return {
    control,
    isPending: createMutation.isPending,
    isValid,
    onSubmit,
  };
};
