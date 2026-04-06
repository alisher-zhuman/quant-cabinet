import type { ListSearchState } from "@shared/types";

export type CompanyDetailsTab = "users" | "controllers";

export interface CompanyDetailsSearchState extends ListSearchState {
  tab: CompanyDetailsTab;
}
