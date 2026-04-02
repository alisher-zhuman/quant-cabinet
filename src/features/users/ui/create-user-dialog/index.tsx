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

import { useCreateUserForm } from "../../hooks/useCreateUserForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateUserDialog = ({ open, onClose, onSuccess }: Props) => {
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

  const roleOptions = useMemo(
    () => [
      { value: "user", label: t("profile.roles.user") },
      { value: "manager", label: t("profile.roles.manager") },
    ],
    [t],
  );

  const { control, isPending, isValid, onSubmit } = useCreateUserForm({
    onSuccess,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("users.createDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <FormTextField
              name="email"
              control={control}
              label={t("users.createDialog.fields.email")}
              type="email"
              fullWidth
            />

            <FormTextField
              name="firstName"
              control={control}
              label={t("users.createDialog.fields.firstName")}
              fullWidth
            />

            <FormTextField
              name="lastName"
              control={control}
              label={t("users.createDialog.fields.lastName")}
              fullWidth
            />

            <FormSelectField
              name="role"
              control={control}
              label={t("users.createDialog.fields.role")}
              fullWidth
              options={roleOptions}
            />

            <FormTextField
              name="phoneNumber"
              control={control}
              label={t("users.createDialog.fields.phoneNumber")}
              fullWidth
            />

            <FormTextField
              name="descriptions"
              control={control}
              label={t("users.createDialog.fields.descriptions")}
              fullWidth
            />

            <FormSelectField
              name="company"
              control={control}
              label={t("users.createDialog.fields.company")}
              fullWidth
              disabled={isCompaniesLoading}
              options={companyOptions}
              emptyOptionLabel={t("users.createDialog.fields.companyPlaceholder")}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("users.createDialog.cancel")}
              submitLabel={t("users.createDialog.submit")}
              submitLabelLoading={t("users.createDialog.submitLoading")}
              isSubmitting={isPending}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
