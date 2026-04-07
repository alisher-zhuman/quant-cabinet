import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";
import {
  type ControllerRow,
  transferControllerFormSchema,
  type TransferControllerFormValues,
} from "@entities/controllers";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormSelectField } from "@shared/ui/form-select-field";

import { useTransferController } from "../../hooks/useTransferController";

interface Props {
  controller: ControllerRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string;
}

export const TransferControllerDialog = ({
  controller,
  open,
  onClose,
  onSuccess,
  initialCompanyId,
}: Props) => {
  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: open,
  });

  const companyOptions = useMemo(
    () => companies.map((company) => ({ value: company.id, label: company.name })),
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
  }, [open, controller, initialCompanyId, reset]);

  const transferMutation = useTransferController(onSuccess);

  const onSubmit = handleSubmit((data) => {
    if (!controller) return;

    transferMutation.mutate({
      controllerId: controller.id,
      companyId: data.companyId,
    });
  });

  return (
    <Dialog
      open={open}
      onClose={transferMutation.isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("controllers.transferDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={transferMutation.isPending} sx={{ pt: 1 }}>
            <FormSelectField
              name="companyId"
              control={control}
              label={t("controllers.transferDialog.fields.company")}
              fullWidth
              disabled={isCompaniesLoading}
              options={companyOptions}
              emptyOptionLabel={t(
                "controllers.transferDialog.fields.companyPlaceholder",
              )}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("controllers.transferDialog.cancel")}
              submitLabel={t("controllers.transferDialog.submit")}
              submitLabelLoading={t("controllers.transferDialog.submitLoading")}
              isSubmitting={transferMutation.isPending}
              isDirty={isDirty}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
