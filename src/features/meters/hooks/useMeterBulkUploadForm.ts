/* eslint-disable */
// @ts-nocheck
import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import {
  meterBulkUploadFormSchema,
  type MeterBulkUploadFormValues,
} from "@entities/meters";

import { useImportMeters } from "./useImportMeters";

interface Params {
  onSuccess: () => void;
}

export const useMeterBulkUploadForm = ({ onSuccess }: Params) => {
  const { t } = useTranslation();

  const schema = useMemo(() => meterBulkUploadFormSchema(t), [t]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<MeterBulkUploadFormValues>({
    resolver: zodResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      companyId: "",
      file: null,
    },
  });

  const importMutation = useImportMeters(() => {
    reset({
      companyId: "",
      file: null,
    });
    onSuccess();
  });

  const onSubmit = handleSubmit((values) => {
    if (!values.file) {
      return;
    }

    importMutation.mutate({
      companyId: values.companyId,
      file: values.file,
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
