import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createCompanyFormSchema,
  type CreateCompanyPayload,
} from "@entities/companies";

import { useCreateCompany } from "./useCreateCompany";

interface Params {
  onSuccess?: () => void;
}

export const useCreateCompanyForm = ({ onSuccess }: Params = {}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateCompanyPayload>({
    resolver: zodResolver(createCompanyFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const mutation = useCreateCompany(() => {
    reset();
    onSuccess?.();
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    control,
    isPending: mutation.isPending,
    isValid,
    onSubmit,
  };
};
