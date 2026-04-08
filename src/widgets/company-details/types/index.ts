import type { ListSearchState } from "@shared/types";

export type CompanyDetailsTab = "users" | "controllers" | "meters";

export interface CompanyDetailsSearchState extends ListSearchState {
  tab: CompanyDetailsTab;
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  locationType: string;
  meterStatus: string;
  accountNumber: string;
  clientName: string;
  address: string;
  isValveLockedByManager: string;
}
