import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createMeterFormSchema,
  type MeterFormValues,
} from "@entities/meters";

import { useCreateMeter } from "./useCreateMeter";

interface Params {
  onSuccess?: () => void;
  initialCompanyId?: string;
  initialControllerId?: string;
}

const getDefaultValues = (
  initialCompanyId?: string,
  initialControllerId?: string,
): MeterFormValues => ({
  serialNumber: "",
  controllerId: initialControllerId ?? "",
  companyId: initialCompanyId ?? "",
  locationType: "indoor",
  port: "1",
  accountNumber: "",
  clientName: "",
  address: "",
  descriptions: "",
});

export const useMeterForm = ({
  onSuccess,
  initialCompanyId,
  initialControllerId,
}: Params = {}) => {
  const { t } = useTranslation();

  const defaultValues = useMemo(
    () => getDefaultValues(initialCompanyId, initialControllerId),
    [initialCompanyId, initialControllerId],
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<MeterFormValues>({
    resolver: zodResolver(createMeterFormSchema(t)),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const createMutation = useCreateMeter(() => {
    reset(getDefaultValues(initialCompanyId, initialControllerId));
    onSuccess?.();
  });

  const onSubmit = handleSubmit((values) => {
    createMutation.mutate({
      serialNumber: values["serialNumber"],
      controllerId: values["controllerId"],
      companyId: values["companyId"],
      locationType: values["locationType"],
      port: Number(values["port"]),
      accountNumber: values["accountNumber"],
      clientName: values["clientName"],
      address: values["address"],
      descriptions: values["descriptions"],
    });
  });

  return {
    control,
    isPending: createMutation.isPending,
    isDirty,
    isValid,
    onSubmit,
    setValue,
  };
};
