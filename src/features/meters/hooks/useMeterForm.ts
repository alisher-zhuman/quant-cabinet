import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  createMeterFormSchema,
  type MeterFormValues,
} from "@entities/meters";

import { useCreateMeter } from "./useCreateMeter";
import { useUpdateMeter } from "./useUpdateMeter";

interface Params {
  onSuccess?: () => void;
  initialCompanyId?: string;
  initialControllerId?: string;
  meterId?: string;
  initialValues?: Partial<MeterFormValues>;
}

const getDefaultValues = (
  initialCompanyId?: string,
  initialControllerId?: string,
  initialValues?: Partial<MeterFormValues>,
): MeterFormValues => ({
  serialNumber: initialValues?.serialNumber ?? "",
  controllerId: initialValues?.controllerId ?? initialControllerId ?? "",
  companyId: initialValues?.companyId ?? initialCompanyId ?? "",
  locationType: initialValues?.locationType ?? "indoor",
  port: initialValues?.port ?? "1",
  accountNumber: initialValues?.accountNumber ?? "",
  clientName: initialValues?.clientName ?? "",
  address: initialValues?.address ?? "",
  descriptions: initialValues?.descriptions ?? "",
});

export const useMeterForm = ({
  onSuccess,
  initialCompanyId,
  initialControllerId,
  meterId,
  initialValues,
}: Params = {}) => {
  const { t } = useTranslation();

  const defaultValues = useMemo(
    () => getDefaultValues(initialCompanyId, initialControllerId, initialValues),
    [initialCompanyId, initialControllerId, initialValues],
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

  const updateMutation = useUpdateMeter(() => {
    onSuccess?.();
  });

  const onSubmit = handleSubmit((values) => {
    if (meterId) {
      updateMutation.mutate({
        meterId,
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
    } else {
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
    }
  });

  return {
    control,
    isPending: createMutation.isPending || updateMutation.isPending,
    isDirty,
    isValid,
    onSubmit,
    setValue,
  };
};
