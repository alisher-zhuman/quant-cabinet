import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getMeters } from "../api";
import { metersKeys } from "../model/keys";
import type { MeterRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  companyId: string;
  controllerId: string;
  locationType: string;
  meterStatus: string;
  accountNumber: string;
  clientName: string;
  address: string;
  isValveLockedByManager: string;
  enabled?: boolean;
}

export const useMetersQuery = ({
  page,
  limit,
  search,
  isArchived,
  companyId,
  controllerId,
  locationType,
  meterStatus,
  accountNumber,
  clientName,
  address,
  isValveLockedByManager,
  enabled = true,
}: Params) => {
  const { t } = useTranslation();

  const normalizedSearch = search.trim();
  const normalizedCompanyId = companyId.trim();
  const normalizedControllerId = controllerId.trim();
  const normalizedLocationType = locationType.trim();
  const normalizedMeterStatus = meterStatus.trim();
  const normalizedAccountNumber = accountNumber.trim();
  const normalizedClientName = clientName.trim();
  const normalizedAddress = address.trim();
  const normalizedValveLock = isValveLockedByManager.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    enabled,
    queryKey: metersKeys.list(
      page,
      limit,
      normalizedSearch,
      isArchived,
      normalizedCompanyId,
      normalizedControllerId,
      normalizedLocationType,
      normalizedMeterStatus,
      normalizedAccountNumber,
      normalizedClientName,
      normalizedAddress,
      normalizedValveLock,
    ),
    queryFn: () =>
      getMeters({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
        companyId: normalizedCompanyId,
        controllerId: normalizedControllerId,
        locationType: normalizedLocationType,
        meterStatus: normalizedMeterStatus,
        accountNumber: normalizedAccountNumber,
        clientName: normalizedClientName,
        address: normalizedAddress,
        isValveLockedByManager: normalizedValveLock,
      }),
  });

  const meters: MeterRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasMeters = meters.length > 0;

  const hasFilters = Boolean(
    normalizedSearch ||
      normalizedCompanyId ||
      normalizedControllerId ||
      normalizedLocationType ||
      normalizedMeterStatus ||
      normalizedAccountNumber ||
      normalizedClientName ||
      normalizedAddress ||
      normalizedValveLock,
  );

  const emptyText = hasFilters
    ? t("meters.empty.search")
    : isArchived
      ? t("meters.empty.archived")
      : t("meters.empty.active");

  return {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
