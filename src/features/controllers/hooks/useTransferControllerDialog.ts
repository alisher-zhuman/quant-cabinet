import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { useCompaniesQuery } from "@entities/companies";
import {
  type ControllerRow,
  transferControllerFormSchema,
  type TransferControllerFormValues,
} from "@entities/controllers";

import { useTransferController } from "./useTransferController";

interface Params {
  controller: ControllerRow | null;
  open: boolean;
  onSuccess: () => void;
  initialCompanyId?: string | undefined;
}

export const useTransferControllerDialog = ({
  controller,
  open,
  onSuccess,
  initialCompanyId,
}: Params) => {
  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: open,
  });

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<TransferControllerFormValues>({
    resolver: zodResolver(transferControllerFormSchema(t)),
    defaultValues: {
      companyId: initialCompanyId ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      reset({ companyId: initialCompanyId ?? controller?.company?.id ?? "" });
    }
  }, [controller, initialCompanyId, open, reset]);

  const transferMutation = useTransferController(onSuccess);

  const onSubmit = handleSubmit((data) => {
    if (!controller) {
      return;
    }

    transferMutation.mutate({
      controllerId: controller.id,
      companyId: data.companyId,
    });
  });

  return {
    t,
    control,
    isDirty,
    isValid,
    onSubmit,
    isPending: transferMutation.isPending,
    isCompaniesLoading,
    companyOptions,
  };
};
