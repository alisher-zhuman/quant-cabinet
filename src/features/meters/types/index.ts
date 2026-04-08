export type MeterStatusTone = "success" | "warning" | "error" | "neutral";

export interface MeterFilters {
  companyId: string;
  serialNumber: string;
  locationType: string;
  meterStatus: string;
  accountNumber: string;
  clientName: string;
  address: string;
  isValveLockedByManager: string;
}

export interface MetersSearchState {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  companyId: string;
  serialNumber: string;
  locationType: string;
  meterStatus: string;
  accountNumber: string;
  clientName: string;
  address: string;
  isValveLockedByManager: string;
}
