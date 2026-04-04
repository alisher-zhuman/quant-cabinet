import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

import { useControllerForm } from "../../hooks/useControllerForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateControllerDialog = ({ open, onClose, onSuccess }: Props) => {
  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
  });

  const companyOptions = useMemo(
    () => companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const typeOptions = useMemo(
    () => [
      { value: "single", label: t("controllers.createDialog.type.single") },
      {
        value: "multiple",
        label: t("controllers.createDialog.type.multiple"),
      },
    ],
    [t],
  );

  const { control, isPending, isValid, onSubmit } = useControllerForm({
    onSuccess,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("controllers.createDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <FormTextField
              name="serialNumber"
              control={control}
              label={t("controllers.createDialog.fields.serialNumber")}
              fullWidth
            />

            <FormSelectField
              name="companyId"
              control={control}
              label={t("controllers.createDialog.fields.company")}
              fullWidth
              disabled={isCompaniesLoading}
              options={companyOptions}
              emptyOptionLabel={t(
                "controllers.createDialog.fields.companyPlaceholder",
              )}
            />

            <FormSelectField
              name="type"
              control={control}
              label={t("controllers.createDialog.fields.type")}
              fullWidth
              options={typeOptions}
            />

            <FormTextField
              name="simIMSI"
              control={control}
              label={t("controllers.createDialog.fields.simIMSI")}
              fullWidth
            />

            <FormTextField
              name="phoneNumber"
              control={control}
              label={t("controllers.createDialog.fields.phoneNumber")}
              fullWidth
            />

            <FormTextField
              name="descriptions"
              control={control}
              label={t("controllers.createDialog.fields.descriptions")}
              fullWidth
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("controllers.createDialog.cancel")}
              submitLabel={t("controllers.createDialog.submit")}
              submitLabelLoading={t("controllers.createDialog.submitLoading")}
              isSubmitting={isPending}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
