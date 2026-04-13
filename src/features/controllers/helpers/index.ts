import { COLORS } from "@shared/constants";
import { createListSearchString, parseListSearchState } from "@shared/helpers";

import type { ControllersSearchState } from "../types";

export const parseControllersSearchState = (
  params: URLSearchParams,
): ControllersSearchState => ({
  ...parseListSearchState(params),
  companyId: params.get("companyId")?.trim() ?? "",
  serialNumber: params.get("serialNumber")?.trim() ?? "",
  phoneNumber: params.get("phoneNumber")?.trim() ?? "",
  simIMSI: params.get("simIMSI")?.trim() ?? "",
});

export const createControllersSearchString = ({
  companyId,
  serialNumber,
  phoneNumber,
  simIMSI,
  ...listState
}: ControllersSearchState) => {
  const params = new URLSearchParams(createListSearchString(listState));

  if (companyId.trim()) {
    params.set("companyId", companyId.trim());
  }

  if (serialNumber.trim()) {
    params.set("serialNumber", serialNumber.trim());
  }

  if (phoneNumber.trim()) {
    params.set("phoneNumber", phoneNumber.trim());
  }

  if (simIMSI.trim()) {
    params.set("simIMSI", simIMSI.trim());
  }

  return params.toString();
};

export const getStatusColor = (status?: string | null) => {
  if (status === "normal") return "success.main";
  if (status === "error") return "error.main";
  return "text.disabled";
};

export const getTypeStyles = (type?: string | null) => {
  if (type === "single") {
    return {
      color: COLORS.accent.cyan,
      backgroundColor: COLORS.accent.cyanSoft,
    };
  }
  return {
    color: COLORS.accent.violet,
    backgroundColor: COLORS.accent.violetSoft,
  };
};
