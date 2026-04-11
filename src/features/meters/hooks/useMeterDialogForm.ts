import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  type MeterEditFormValues,
  type MeterRow,
  updateMeterFormSchema,
} from "@entities/meters";

import { useAuthStore } from "@shared/stores";

import { useCreateMeter } from "./useCreateMeter";
import { useUpdateMeter } from "./useUpdateMeter";

interface Params {
  meter?: MeterRow | null | undefined;
  onSuccess?: () => void;
  initialCompanyId?: string;
  initialControllerId?: string;
}

const getDefaultValues = (
  meter?: MeterRow | null  ,
  initialCompanyId?: string,
  initialControllerId?: string,
): MeterEditFormValues => ({
  serialNumber: meter?.serialNumber ?? "",
  controllerId: meter?.controller?.id ?? initialControllerId ?? "",
  companyId: meter?.company?.id ?? initialCompanyId ?? "",
  locationType: (meter?.locationType ?? "indoor") as "indoor" | "well" | "cabinet",
  port: String(meter?.port ?? "1"),
  accountNumber: meter?.accountNumber ?? "",
  clientName: meter?.clientName ?? "",
  address: meter?.address ?? "",
  descriptions: meter?.descriptions ?? "",
  pendingCommand: ((meter as Record<string, unknown>)?.["pendingCommand"] ?? "none") as "none" | "open" | "close",
  isValveLockedByManager: (meter as Record<string, unknown>)?.["isValveLockedByManager"] as boolean ?? false,
  isArchived: meter?.isArchived ?? false,
});

export const useMeterDialogForm = ({
  meter,
  onSuccess,
  initialCompanyId,
  initialControllerId,
}: Params = {}) => {
  const { t } = useTranslation();

  const isEditMode = Boolean(meter);

  const defaultValues = useMemo(
    () => getDefaultValues(meter, initialCompanyId, initialControllerId),
    [meter, initialCompanyId, initialControllerId],
  );

  const role = useAuthStore((state) => state.role);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<MeterEditFormValues>({
    resolver: zodResolver(updateMeterFormSchema(t, role)),
    mode: "onTouched",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleSuccess = () => {
    reset(getDefaultValues(null, initialCompanyId, initialControllerId));
    onSuccess?.();
  };

  const createMutation = useCreateMeter(handleSuccess);
  const updateMutation = useUpdateMeter(handleSuccess);

  const isPending = isEditMode
    ? updateMutation.isPending
    : createMutation.isPending;

  const onSubmit = handleSubmit((values: MeterEditFormValues) => {
    if (isEditMode && meter) {
      updateMutation.mutate({
        meterId: meter.id,
        serialNumber: values.serialNumber,
        controllerId: values.controllerId,
        companyId: values.companyId,
        locationType: values.locationType,
        port: Number(values.port),
        accountNumber: values.accountNumber,
        clientName: values.clientName,
        address: values.address,
        descriptions: values.descriptions,
        pendingCommand: values.pendingCommand,
        isValveLockedByManager: values.isValveLockedByManager,
        isArchived: values.isArchived,
      });
      return;
    }

    createMutation.mutate({
      serialNumber: values.serialNumber,
      controllerId: values.controllerId,
      companyId: values.companyId,
      locationType: values.locationType,
      port: Number(values.port),
      accountNumber: values.accountNumber,
      clientName: values.clientName,
      address: values.address,
      descriptions: values.descriptions,
    });
  });

  return {
    control,
    isPending,
    isDirty,
    isValid,
    isEditMode,
    onSubmit,
    setValue,
    watch,
  };
};
