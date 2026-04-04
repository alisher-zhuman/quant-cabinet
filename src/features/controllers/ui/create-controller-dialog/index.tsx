import { useMemo } from "react";

import { Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useCompaniesQuery } from "@entities/companies";
import type { ControllerRow } from "@entities/controllers";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

import { useControllerForm } from "../../hooks/useControllerForm";

interface Props {
  controller?: ControllerRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateControllerDialog = ({
  controller,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  
  const isEditMode = Boolean(controller);

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
    controller,
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
            ? "controllers.editDialog.title"
            : "controllers.createDialog.title",
        )}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            {!isEditMode && (
              <>
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
              </>
            )}

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

            {isEditMode && (
              <>
                <FormTextField
                  name="setInterval"
                  control={control}
                  label={t("controllers.editDialog.fields.setInterval")}
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max: 255,
                    },
                  }}
                  fullWidth
                />

                <Controller
                  name="correctTime"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={t("controllers.editDialog.fields.correctTime")}
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(_, checked) => field.onChange(checked)}
                        />
                      }
                    />
                  )}
                />

                <Controller
                  name="correctInterval"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={t("controllers.editDialog.fields.correctInterval")}
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(_, checked) => field.onChange(checked)}
                        />
                      }
                    />
                  )}
                />

                <Controller
                  name="isArchived"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={t("controllers.editDialog.fields.isArchived")}
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(_, checked) => field.onChange(checked)}
                        />
                      }
                    />
                  )}
                />
              </>
            )}

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
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
