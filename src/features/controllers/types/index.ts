import type { ListSearchState } from "@shared/types";

export interface ControllerFilters {
  companyId: string;
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
}

export interface ControllersSearchState
  extends ListSearchState,
    ControllerFilters {}
