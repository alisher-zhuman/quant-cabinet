import { useEffect, useMemo } from "react";

import { useWatch } from "react-hook-form";

import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCompaniesQuery } from "@entities/companies";
import { useControllerQuery, useControllersQuery } from "@entities/controllers";
import type { MeterEditFormValues, MeterRow } from "@entities/meters";

import { isAdmin, isManager } from "@shared/helpers";
import type { AuthState } from "@shared/types";

interface UseMeterDialogOptionsProps {
  meter?: MeterRow | null | undefined;
  role: AuthState["role"];
  control: Control<MeterEditFormValues>;
  setValue: UseFormSetValue<MeterEditFormValues>;
  initialCompanyId?: string | undefined;
  initialControllerId?: string | undefined;
  isEditMode: boolean;
}

export const useMeterDialogOptions = ({
  meter,
  role,
  control,
  setValue,
  initialCompanyId,
  initialControllerId,
  isEditMode,
}: UseMeterDialogOptionsProps) => {
  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: !initialCompanyId && isAdmin(role),
  });

  const companyOptions = useMemo(() => {
    const opts = companies.map((company) => ({
      value: company.id,
      label: company.name,
    }));
    if (meter?.company && !opts.some((o) => o.value === meter.company!.id)) {
      opts.push({ value: meter.company.id, label: meter.company.name });
    }
    return opts;
  }, [companies, meter]);

  const selectedCompanyId = useWatch({ control, name: "companyId" });
  const watchedControllerId = useWatch({ control, name: "controllerId" });

  const selectedControllerId = watchedControllerId ?? initialControllerId;

  const { controller: selectedController } = useControllerQuery(selectedControllerId);

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
    companyId: initialCompanyId ?? (isAdmin(role) ? selectedCompanyId : undefined),
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

  return {
    isCompaniesLoading,
    isControllersLoading,
    companyOptions,
    controllerOptions,
    locationTypeOptions,
    pendingCommandOptions,
    controllerRestrictionMessage,
  };
};
