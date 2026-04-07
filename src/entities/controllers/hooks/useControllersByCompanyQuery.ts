import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getControllersByCompany } from "../api";
import { controllersKeys } from "../model/keys";
import type { ControllerRow } from "../model/types";

interface Params {
  companyId: string;
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  enabled?: boolean;
}

export const useControllersByCompanyQuery = ({
  companyId,
  page,
  limit,
  search,
  isArchived,
  serialNumber,
  phoneNumber,
  simIMSI,
  enabled = true,
}: Params) => {
  const { t } = useTranslation();

  const normalizedSearch = search.trim();
  const normalizedSerialNumber = serialNumber.trim();
  const normalizedPhoneNumber = phoneNumber.trim();
  const normalizedSimIMSI = simIMSI.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: controllersKeys.companyList(
      companyId,
      page,
      limit,
      normalizedSearch,
      isArchived,
      normalizedSerialNumber,
      normalizedPhoneNumber,
      normalizedSimIMSI,
    ),
    queryFn: () =>
      getControllersByCompany(companyId, {
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
        serialNumber: normalizedSerialNumber,
        phoneNumber: normalizedPhoneNumber,
        simIMSI: normalizedSimIMSI,
      }),
    enabled: Boolean(companyId) && enabled,
  });

  const controllers: ControllerRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasControllers = controllers.length > 0;

  const hasFilters = Boolean(
    normalizedSearch ||
    normalizedSerialNumber ||
    normalizedPhoneNumber ||
    normalizedSimIMSI,
  );

  const emptyText = hasFilters
    ? t("controllers.empty.search")
    : isArchived
      ? t("controllers.empty.archived")
      : t("controllers.empty.active");

  return {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
