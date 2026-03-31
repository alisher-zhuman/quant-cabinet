import type { TFunction } from "i18next";

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

export const getBatteryStatusLabel = (meterStatus: string, t: TFunction) => {
  if (meterStatus === "normal") {
    return t("meters.batteryStatus.normal");
  }

  if (meterStatus === "low") {
    return t("meters.batteryStatus.low");
  }

  if (meterStatus === "critical") {
    return t("meters.batteryStatus.critical");
  }

  return meterStatus;
};
