import { useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useControllerQuery } from "@entities/controllers";

export const useControllerDetailsWidget = () => {
  const { t } = useTranslation();

  const { id = "" } = useParams<{ id: string }>();

  const { controller, isLoading, isError } = useControllerQuery(id);

  const controllerStatus = controller?.controllerStatus
    ? t(`controllers.statuses.${controller.controllerStatus}`)
    : "-";

  const controllerType = controller?.controllerType
    ? t(`controllers.types.${controller.controllerType}`)
    : "-";

  const archivedStatus = controller?.isArchived
    ? t("controllers.details.values.archived")
    : t("controllers.details.values.active");

  const companyStatus = controller?.company?.isArchived
    ? t("controllers.details.values.archived")
    : t("controllers.details.values.active");

  const correctTimeLabel = controller?.correctTime
    ? t("controllers.details.values.yes")
    : t("controllers.details.values.no");

  const correctIntervalLabel = controller?.correctInterval
    ? t("controllers.details.values.yes")
    : t("controllers.details.values.no");

  return {
    t,
    id,
    controller,
    isLoading,
    isError,
    controllerStatus,
    controllerType,
    archivedStatus,
    companyStatus,
    correctTimeLabel,
    correctIntervalLabel,
  };
};
