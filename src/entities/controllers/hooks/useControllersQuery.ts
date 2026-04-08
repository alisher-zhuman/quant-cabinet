import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getControllers } from "../api";
import { controllersKeys } from "../model/keys";
import type { ControllerRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  companyId: string;
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  enabled?: boolean;
}

export const useControllersQuery = ({
  page,
  limit,
  search,
  isArchived,
  companyId,
  serialNumber,
  phoneNumber,
  simIMSI,
  enabled = true,
}: Params) => {
  const { t } = useTranslation();

  const normalizedSearch = search.trim();
  const normalizedCompanyId = companyId.trim();
  const normalizedSerialNumber = serialNumber.trim();
  const normalizedPhoneNumber = phoneNumber.trim();
  const normalizedSimIMSI = simIMSI.trim();

  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: controllersKeys.list(
      page,
      limit,
      normalizedSearch,
      isArchived,
      normalizedCompanyId,
      normalizedSerialNumber,
      normalizedPhoneNumber,
      normalizedSimIMSI,
    ),
    queryFn: () =>
      getControllers({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
        companyId: normalizedCompanyId,
        serialNumber: normalizedSerialNumber,
        phoneNumber: normalizedPhoneNumber,
        simIMSI: normalizedSimIMSI,
      }),
    enabled,
  });

  console.log(error);

  const controllers: ControllerRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasControllers = controllers.length > 0;

  const hasFilters = Boolean(
    normalizedSearch ||
    normalizedCompanyId ||
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
