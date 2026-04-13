import type { TFunction } from "i18next";

import type { MeterRow } from "@entities/meters";

import { formatDate, isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
import type { Column } from "@shared/types";

import {
  getBatteryStatusLabel,
  getBatteryStatusTone,
  getValveStatusLabel,
  getValveStatusTone,
} from "../helpers";
import { MeterActions } from "../ui/meter-actions";
import { MeterStatusBadge } from "../ui/meter-status-badge";

export const createMeterColumns = (
  t: TFunction,
  onDelete: (meter: MeterRow) => void,
  onEdit: (meter: MeterRow) => void,
  options?: {
    showCompanyColumn?: boolean;
    currentRole?: UserRole | null;
  },
): Column<MeterRow>[] => [
  {
    id: "serialNumber",
    header: t("meters.table.columns.id"),
    cell: (meter) => meter.serialNumber || "-",
  },
  {
    id: "clientName",
    header: t("meters.table.columns.clientName"),
    cell: (meter) => meter.clientName || "-",
  },
  {
    id: "accountNumber",
    header: t("meters.table.columns.accountNumber"),
    cell: (meter) => meter.accountNumber || "-",
  },
  ...(options?.showCompanyColumn === false
    ? []
    : [
        {
          id: "company",
          header: t("meters.table.columns.company"),
          cell: (meter: MeterRow) => meter.company?.name || "-",
        },
      ]),
  {
    id: "readings",
    header: t("meters.table.columns.readings"),
    cell: (meter) => meter.readings,
  },
  {
    id: "batteryStatus",
    header: t("meters.table.columns.batteryStatus"),
    cell: (meter) => (
      <MeterStatusBadge
        label={getBatteryStatusLabel(meter.meterStatus, t)}
        tone={getBatteryStatusTone(meter.meterStatus)}
      />
    ),
  },
  {
    id: "valveStatus",
    header: t("meters.table.columns.valveStatus"),
    cell: (meter) => (
      <MeterStatusBadge
        label={getValveStatusLabel(meter.valveState, t)}
        tone={getValveStatusTone(meter.valveState)}
      />
    ),
  },
  {
    id: "createdAt",
    header: t("meters.table.columns.createdAt"),
    cell: (meter) => formatDate(meter.createdAt),
  },
  ...(!isUser(options?.currentRole)
    ? [
        {
          id: "actions",
          header: t("meters.table.columns.actions"),
          align: "right",
          cell: (meter: MeterRow) => (
            <MeterActions
              deleteLabel={t("meters.actions.delete")}
              editLabel={t("meters.actions.edit")}
              meter={meter}
              onDelete={onDelete}
              onEdit={onEdit}
              role={options?.currentRole}
            />
          ),
        } as Column<MeterRow>,
      ]
    : []),
];
