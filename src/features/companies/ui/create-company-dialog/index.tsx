import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormTextField } from "@shared/ui/form-text-field";

import { useCreateCompanyForm } from "../../hooks/useCreateCompanyForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateCompanyDialog = ({ open, onClose, onSuccess }: Props) => {
  const { t } = useTranslation();

  const { control, isPending, isValid, onSubmit } = useCreateCompanyForm({
    onSuccess,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("companies.createDialog.title")}</DialogTitle>

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

            <FormActions
              onCancel={onClose}
              cancelLabel={t("companies.createDialog.cancel")}
              submitLabel={t("companies.createDialog.submit")}
              submitLabelLoading={t("companies.createDialog.submitLoading")}
              isSubmitting={isPending}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
