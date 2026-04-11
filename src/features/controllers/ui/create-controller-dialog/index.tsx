import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";
import type { ControllerRow } from "@entities/controllers";

import { useAuthStore } from "@shared/stores";
import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useControllerForm } from "../../hooks/useControllerForm";
import { ControllerMainFields } from "../controller-main-fields";
import { ControllerTechnicalFields } from "../controller-technical-fields";

interface Props {
  controller?: ControllerRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string;
}

export const CreateControllerDialog = ({
  controller,
  open,
  onClose,
  onSuccess,
  initialCompanyId,
}: Props) => {
  const { t } = useTranslation();
  const currentRole = useAuthStore((state) => state.role);

  const isEditMode = Boolean(controller);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: !isEditMode && !initialCompanyId && currentRole === "admin",
  });

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const typeOptions = useMemo(
    () => [
      { value: "single", label: t("controllers.types.single") },
      {
        value: "multiple",
        label: t("controllers.types.multiple"),
      },
    ],
    [t],
  );

  const { control, isPending, isDirty, isValid, onSubmit } = useControllerForm({
    controller,
    onSuccess,
    ...(initialCompanyId !== undefined ? { initialCompanyId } : {}),
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
            ? "controllers.editDialog.title"
            : "controllers.createDialog.title",
        )}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <ControllerMainFields
              t={t}
              control={control}
              isEditMode={isEditMode}
              initialCompanyId={initialCompanyId}
              isCompaniesLoading={isCompaniesLoading}
              companyOptions={companyOptions}
              typeOptions={typeOptions}
              currentRole={currentRole}
            />

            <ControllerTechnicalFields
              t={t}
              control={control}
              isEditMode={isEditMode}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t(
                isEditMode
                  ? "controllers.editDialog.cancel"
                  : "controllers.createDialog.cancel",
              )}
              submitLabel={t(
                isEditMode
                  ? "controllers.editDialog.submit"
                  : "controllers.createDialog.submit",
              )}
              submitLabelLoading={t(
                isEditMode
                  ? "controllers.editDialog.submitLoading"
                  : "controllers.createDialog.submitLoading",
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
