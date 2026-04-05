import { useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useMeterQuery } from "@entities/meters";

export const useMeterDetailsWidget = () => {
  const { t } = useTranslation();

  const { id = "" } = useParams<{ id: string }>();

  const { meter, isLoading, isError } = useMeterQuery(id);

  const meterStatus = meter?.meterStatus
    ? t(`meters.batteryStatus.${meter.meterStatus}`)
    : "-";

  const valveStatus = meter?.valveState
    ? t(`meters.valveStatus.${meter.valveState}`)
    : "-";

  const pendingCommand = meter?.pendingCommand
    ? t(`meters.details.pendingCommand.${meter.pendingCommand}`)
    : "-";

  const locationType = meter?.locationType
    ? t(`meters.details.locationType.${meter.locationType}`)
    : "-";

  const archivedStatus = meter?.isArchived
    ? t("meters.details.values.archived")
    : t("meters.details.values.active");

  const valveLockStatus = meter?.isValveLockedByManager
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  const controllerStatus = meter?.controller?.controllerStatus
    ? t(`controllers.statuses.${meter.controller.controllerStatus}`)
    : "-";

  const controllerType = meter?.controller?.controllerType
    ? t(`controllers.types.${meter.controller.controllerType}`)
    : "-";

  const controllerArchivedStatus = meter?.controller?.isArchived
    ? t("meters.details.values.archived")
    : t("meters.details.values.active");

  const correctTimeLabel = meter?.controller?.correctTime
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  const correctIntervalLabel = meter?.controller?.correctInterval
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  return {
    t,
    id,
    meter,
    isLoading,
    isError,
    meterStatus,
    valveStatus,
    pendingCommand,
    locationType,
    archivedStatus,
    valveLockStatus,
    controllerStatus,
    controllerType,
    controllerArchivedStatus,
    correctTimeLabel,
    correctIntervalLabel,
  };
};
