import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import type { CompanyRow, CreateCompanyPayload } from "@entities/companies";
import { createCompanyFormSchema } from "@entities/companies";

import { useCreateCompany } from "./useCreateCompany";
import { useUpdateCompany } from "./useUpdateCompany";

interface Params {
  company?: CompanyRow | null | undefined;
  onSuccess?: (() => void) | undefined;
}

const getDefaultValues = (
  company?: CompanyRow | null,
): CreateCompanyPayload => ({
  name: company?.name ?? "",
  address: company?.address ?? "",
});

export const useCompanyForm = ({ company, onSuccess }: Params = {}) => {
  const { t } = useTranslation();
  const defaultValues = useMemo(() => getDefaultValues(company), [company]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateCompanyPayload>({
    resolver: zodResolver(createCompanyFormSchema(t)),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleSuccess = () => {
    reset(getDefaultValues());
    onSuccess?.();
  };

  const createMutation = useCreateCompany(handleSuccess);
  const updateMutation = useUpdateCompany(handleSuccess);
  const isPending = company
    ? updateMutation.isPending
    : createMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    if (company) {
      updateMutation.mutate({
        id: company.id,
        ...values,
      });

      return;
    }

    createMutation.mutate(values);
  });

  return {
    control,
    isPending,
    isValid,
    onSubmit,
  };
};
