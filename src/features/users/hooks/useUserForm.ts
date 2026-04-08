import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import type { UserFormValues, UserRow } from "@entities/users";
import { createUserFormSchema, updateUserFormSchema } from "@entities/users";

import { useCreateUser } from "./useCreateUser";
import { useUpdateUser } from "./useUpdateUser";

interface Params {
  user?: UserRow | null | undefined;
  companyId?: string | undefined;
  onSuccess?: (() => void) | undefined;
}

const getDefaultValues = (
  user?: UserRow | null,
  companyId?: string,
): UserFormValues => ({
  email: user?.email ?? "",
  firstName: user?.firstName ?? "",
  lastName: user?.lastName ?? "",
  role: user?.role ?? "user",
  phoneNumber: user?.phoneNumber ?? "",
  descriptions: user?.descriptions ?? "",
  company: user?.company?.id ?? companyId ?? "",
  isArchived: user?.isArchived ?? false,
});

export const useUserForm = ({ user, companyId, onSuccess }: Params = {}) => {
  const { t } = useTranslation();
  
  const isEditMode = Boolean(user);

  const defaultValues = useMemo(
    () => getDefaultValues(user, companyId),
    [companyId, user],
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<UserFormValues>({
    resolver: zodResolver(isEditMode ? updateUserFormSchema(t) : createUserFormSchema(t)),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleSuccess = () => {
    reset(getDefaultValues(undefined, companyId));
    onSuccess?.();
  };

  const createMutation = useCreateUser(handleSuccess);
  const updateMutation = useUpdateUser(handleSuccess);

  const isPending = user ? updateMutation.isPending : createMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    if (user) {
      updateMutation.mutate({
        userId: user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        phoneNumber: values.phoneNumber,
        descriptions: values.descriptions,
        company: values.company,
        isArchived: values.isArchived,
      });

      return;
    }

    createMutation.mutate({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      phoneNumber: values.phoneNumber,
      descriptions: values.descriptions,
      ...(values.company ? { company: values.company } : {}),
    });
  });

  return {
    control,
    isPending,
    isDirty,
    isValid,
    onSubmit,
    setValue,
  };
};
