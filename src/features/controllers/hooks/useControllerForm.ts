import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  type ControllerFormValues,
  createControllerFormSchema,
} from "@entities/controllers";

import { useCreateController } from "./useCreateController";

interface Params {
  onSuccess?: (() => void) | undefined;
}

const defaultValues: ControllerFormValues = {
  serialNumber: "",
  companyId: "",
  type: "single",
  simIMSI: "",
  phoneNumber: "",
  descriptions: "",
};

export const useControllerForm = ({ onSuccess }: Params = {}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ControllerFormValues>({
    resolver: zodResolver(createControllerFormSchema(t)),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset]);

  const handleSuccess = () => {
    reset(defaultValues);
    onSuccess?.();
  };

  const createMutation = useCreateController(handleSuccess);

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
