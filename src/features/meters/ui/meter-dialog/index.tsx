import { useEffect, useMemo } from "react";

import { useWatch } from "react-hook-form";

import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";
import { useControllerQuery, useControllersQuery } from "@entities/controllers";
import type { MeterFormValues, MeterRow } from "@entities/meters";

import { isAdmin, isManager } from "@shared/helpers";
import { useAuthStore } from "@shared/stores";
import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useMeterDialogForm } from "../../hooks/useMeterDialogForm";
import { MeterContextFields } from "../meter-context-fields";
import { MeterMainFields } from "../meter-main-fields";

interface Props {
  meter?: MeterRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string | undefined;
  initialControllerId?: string | undefined;
}

export const MeterDialog = ({
  meter,
  open,
  onClose,
  onSuccess,
  initialCompanyId,
  initialControllerId,
}: Props) => {
  const { t } = useTranslation();

  const role = useAuthStore((state) => state.role);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: !initialCompanyId && isAdmin(role),
  });

  const companyOptions = useMemo(() => {
    const opts = companies.map((company) => ({ value: company.id, label: company.name }));
    if (meter?.company && !opts.some((o) => o.value === meter.company!.id)) {
      opts.push({ value: meter.company.id, label: meter.company.name });
    }
    return opts;
  }, [companies, meter]);

  const { control, isPending, isDirty, isValid, isEditMode, onSubmit, setValue } =
    useMeterDialogForm({
      meter,
      onSuccess,
      ...(initialCompanyId !== undefined ? { initialCompanyId } : {}),
      ...(initialControllerId !== undefined ? { initialControllerId } : {}),
    });

  const selectedCompanyId = useWatch({ control, name: "companyId" });
  const watchedControllerId = useWatch({ control, name: "controllerId" });

  const selectedControllerId = watchedControllerId ?? initialControllerId;

  const { controller: selectedController } =
    useControllerQuery(selectedControllerId);

  const activeControllerMeters = useMemo(
    () =>
      selectedController?.meters?.filter((m) => !m.isArchived && m.id !== meter?.id) ?? [],
    [selectedController?.meters, meter?.id],
  );

  const controllerRestrictionMessage = useMemo(() => {
    if (!selectedController) {
      return undefined;
    }

    if (
      selectedController.controllerType === "single" &&
      activeControllerMeters.length >= 1
    ) {
      return t("meters.createDialog.controllerRestriction.single");
    }

    if (
      selectedController.controllerType === "multiple" &&
      activeControllerMeters.length >= 8
    ) {
      return t("meters.createDialog.controllerRestriction.multiple");
    }

    return undefined;
  }, [selectedController, activeControllerMeters.length, t]);

  const { controllers, isLoading: isControllersLoading } = useControllersQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    companyId:
      initialCompanyId ??
      (isAdmin(role) ? selectedCompanyId : undefined),
    serialNumber: "",
    phoneNumber: "",
    simIMSI: "",
    enabled: isManager(role) || Boolean(initialCompanyId ?? selectedCompanyId),
  });

  const controllerOptions = useMemo(() => {
    const opts = controllers.map((controller) => ({
      value: controller.id,
      label: controller.serialNumber,
    }));
    if (meter?.controller && !opts.some((o) => o.value === meter.controller!.id)) {
      opts.push({ value: meter.controller.id, label: meter.controller.serialNumber });
    }
    return opts;
  }, [controllers, meter]);

  const locationTypeOptions = useMemo(
    () => [
      { value: "indoor", label: t("meters.details.locationType.indoor") },
      { value: "well", label: t("meters.details.locationType.well") },
      { value: "cabinet", label: t("meters.details.locationType.cabinet") },
    ],
    [t],
  );

  const pendingCommandOptions = useMemo(
    () => [
      { value: "none", label: t("meters.details.pendingCommand.none") },
      { value: "open", label: t("meters.details.pendingCommand.open") },
      { value: "close", label: t("meters.details.pendingCommand.close") },
    ],
    [t],
  );

  useEffect(() => {
    if (initialCompanyId || initialControllerId || isEditMode) {
      return;
    }

    setValue("controllerId", "", {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [initialCompanyId, initialControllerId, selectedCompanyId, setValue, isEditMode]);

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {t(isEditMode ? "meters.editDialog.title" : "meters.createDialog.title")}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <MeterContextFields
              t={t}
              control={control as unknown as Control<MeterFormValues>}
              initialCompanyId={initialCompanyId}
              initialControllerId={initialControllerId}
              currentRole={role}
              isCompaniesLoading={isCompaniesLoading}
              isControllersLoading={isControllersLoading}
              companyOptions={companyOptions}
              controllerOptions={controllerOptions}
              controllerHelperText={controllerRestrictionMessage}
            />

            {!controllerRestrictionMessage && (
              <MeterMainFields
                t={t}
                control={control}
                locationTypeOptions={locationTypeOptions}
                isEditMode={isEditMode}
                pendingCommandOptions={pendingCommandOptions}
              />
            )}

            {controllerRestrictionMessage ? (
              <Button
                size="small"
                onClick={onClose}
                sx={{ alignSelf: "flex-end" }}
              >
                {t(isEditMode ? "meters.editDialog.cancel" : "meters.createDialog.cancel")}
              </Button>
            ) : (
              <FormActions
                onCancel={onClose}
                cancelLabel={t(isEditMode ? "meters.editDialog.cancel" : "meters.createDialog.cancel")}
                submitLabel={t(isEditMode ? "meters.editDialog.submit" : "meters.createDialog.submit")}
                submitLabelLoading={t(isEditMode ? "meters.editDialog.submitLoading" : "meters.createDialog.submitLoading")}
                isSubmitting={isPending}
                isDirty={isDirty}
                submitProps={{ disabled: !isValid }}
              />
            )}
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
