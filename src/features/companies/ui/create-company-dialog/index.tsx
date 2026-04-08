import { Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import type { CompanyRow } from "@entities/companies";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormTextField } from "@shared/ui/form-text-field";

import { useCompanyForm } from "../../hooks/useCompanyForm";

interface Props {
  company?: CompanyRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateCompanyDialog = ({
  company,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  
  const isEditMode = Boolean(company);

  const { control, isPending, isDirty, isValid, onSubmit } = useCompanyForm({
    company,
    onSuccess,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {t(
          isEditMode
            ? "companies.editDialog.title"
            : "companies.createDialog.title",
        )}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <FormTextField
              name="name"
              control={control}
              label={t("companies.createDialog.fields.name")}
              fullWidth
            />

            <FormTextField
              name="address"
              control={control}
              label={t("companies.createDialog.fields.address")}
              fullWidth
            />

            {isEditMode && (
              <Controller
                name="isArchived"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label={t("companies.editDialog.fields.isArchived")}
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(_, checked) => field.onChange(checked)}
                      />
                    }
                  />
                )}
              />
            )}

            <FormActions
              onCancel={onClose}
              cancelLabel={t(
                isEditMode
                  ? "companies.editDialog.cancel"
                  : "companies.createDialog.cancel",
              )}
              submitLabel={t(
                isEditMode
                  ? "companies.editDialog.submit"
                  : "companies.createDialog.submit",
              )}
              submitLabelLoading={t(
                isEditMode
                  ? "companies.editDialog.submitLoading"
                  : "companies.createDialog.submitLoading",
              )}
              isSubmitting={isPending}
              isDirty={isDirty}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
