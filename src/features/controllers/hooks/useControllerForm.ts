import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  type ControllerFormValues,
  type ControllerRow,
  createControllerFormSchema,
  updateControllerFormSchema,
} from "@entities/controllers";

import { useCreateController } from "./useCreateController";
import { useUpdateController } from "./useUpdateController";

interface Params {
  controller?: ControllerRow | null | undefined;
  onSuccess?: (() => void) | undefined;
  initialCompanyId?: string;
}

const getDefaultValues = (
  controller?: ControllerRow | null,
  initialCompanyId?: string,
): ControllerFormValues => ({
  serialNumber: "",
  companyId: initialCompanyId ?? "",
  type: "single",
  simIMSI: controller?.simIMSI ?? "",
  phoneNumber: controller?.phoneNumber ?? "",
  descriptions: controller?.descriptions ?? "",
  correctTime: controller?.correctTime ?? false,
  correctInterval: controller?.correctInterval ?? false,
  setInterval: String(controller?.["setInterval"] ?? 1),
  isArchived: controller?.isArchived ?? false,
});

export const useControllerForm = ({
  controller,
  onSuccess,
  initialCompanyId,
}: Params = {}) => {
  const { t } = useTranslation();
  const defaultValues = useMemo(
    () => getDefaultValues(controller, initialCompanyId),
    [controller, initialCompanyId],
  );
  const isEditMode = Boolean(controller);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ControllerFormValues>({
    resolver: zodResolver(
      isEditMode ? updateControllerFormSchema(t) : createControllerFormSchema(t),
    ),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleSuccess = () => {
    reset(getDefaultValues(undefined, initialCompanyId));
    onSuccess?.();
  };

  const createMutation = useCreateController(handleSuccess);
  const updateMutation = useUpdateController(handleSuccess);
  const isPending = controller
    ? updateMutation.isPending
    : createMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    if (controller) {
      updateMutation.mutate({
        id: controller.id,
        simIMSI: values["simIMSI"],
        phoneNumber: values["phoneNumber"],
        descriptions: values["descriptions"],
        correctTime: values["correctTime"],
        correctInterval: values["correctInterval"],
        setInterval: Number(values["setInterval"]),
        isArchived: values["isArchived"],
      });

      return;
    }

    createMutation.mutate({
      serialNumber: values["serialNumber"],
      companyId: values["companyId"],
      type: values["type"],
      simIMSI: values["simIMSI"],
      phoneNumber: values["phoneNumber"],
      descriptions: values["descriptions"],
    });
  });

  return {
    control,
    isPending,
    isValid,
    onSubmit,
  };
};
