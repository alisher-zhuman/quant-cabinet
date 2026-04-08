import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  controllerBulkUploadFormSchema,
  type ControllerBulkUploadFormValues,
} from "@entities/controllers";

import { useImportControllers } from "./useImportControllers";

interface Params {
  onSuccess: () => void;
}

export const useControllerBulkUploadForm = ({ onSuccess }: Params) => {
  const { t } = useTranslation();

  const schema = useMemo(
    () => controllerBulkUploadFormSchema(t),
    [t],
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<ControllerBulkUploadFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      companyId: "",
      file: null,
    },
  });

  const importMutation = useImportControllers(() => {
    reset({
      companyId: "",
      file: null,
    });
    onSuccess();
  });

  const onSubmit = handleSubmit((values) => {
    if (!values["file"]) {
      return;
    }

    importMutation.mutate({
      companyId: values["companyId"],
      file: values["file"],
    });
  });

  const handleFileChange = (file: File | null) => {
    setValue("file", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return {
    control,
    isPending: importMutation.isPending,
    isDirty,
    isValid,
    onSubmit,
    handleFileChange,
  };
};
