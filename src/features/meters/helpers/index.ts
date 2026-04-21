import type { TFunction } from "i18next";

import { createListSearchString, parseListSearchState } from "@shared/helpers";

import type { MetersSearchState } from "../types";
import type { MeterStatusTone } from "../types";

export const parseMetersSearchState = (
  params: URLSearchParams,
): MetersSearchState => ({
  ...parseListSearchState(params),
  companyId: params.get("companyId")?.trim() ?? "",
  locationType: params.get("locationType")?.trim() ?? "",
  accountNumber: params.get("accountNumber")?.trim() ?? "",
  clientName: params.get("clientName")?.trim() ?? "",
  address: params.get("address")?.trim() ?? "",
  isValveLockedByManager: params.get("isValveLockedByManager")?.trim() ?? "",
});

export const createMetersSearchString = ({
  companyId,
  locationType,
  accountNumber,
  clientName,
  address,
  isValveLockedByManager,
  ...listState
}: MetersSearchState) => {
  const params = new URLSearchParams(createListSearchString(listState));

  if (companyId.trim()) {
    params.set("companyId", companyId.trim());
  }

  if (locationType.trim()) {
    params.set("locationType", locationType.trim());
  }

  if (accountNumber.trim()) {
    params.set("accountNumber", accountNumber.trim());
  }

  if (clientName.trim()) {
    params.set("clientName", clientName.trim());
  }

  if (address.trim()) {
    params.set("address", address.trim());
  }

  if (isValveLockedByManager.trim()) {
    params.set("isValveLockedByManager", isValveLockedByManager.trim());
  }

  return params.toString();
};

export const getValveStatusLabel = (valveState: string, t: TFunction) => {
  if (valveState === "open") {
    return t("meters.valveStatus.open");
  }

  if (valveState === "closed") {
    return t("meters.valveStatus.closed");
  }

  if (valveState === "none") {
    return t("meters.valveStatus.none");
  }

  return valveState;
};

export const getValveStatusTone = (valveState: string): MeterStatusTone => {
  if (valveState === "open") {
    return "success";
  }

  if (valveState === "closed") {
    return "error";
  }

  return "neutral";
};
