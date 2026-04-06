import { useLocation, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useControllerQuery } from "@entities/controllers";

import { ROUTES } from "@shared/constants";
import { getBackTo } from "@shared/helpers";

export const useControllerDetailsWidget = () => {
  const { t } = useTranslation();

  const { controllerId = "" } = useParams<{ controllerId: string }>();
 
  const location = useLocation() as { state: unknown };
 
  const { controller, isLoading, isError } = useControllerQuery(controllerId);
 
  const backTo = getBackTo(location.state, `/${ROUTES.CONTROLLERS}`);

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
    controllerId,
    controller,
    backTo,
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
