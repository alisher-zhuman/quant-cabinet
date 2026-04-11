import type { MeterFilters } from "../../types";
import { MeterFiltersDialogContent } from "../meter-filters-dialog-content";

interface Props {
  open: boolean;
  filters: MeterFilters;
  onClose: () => void;
  onApply: (filters: MeterFilters) => void;
  hideCompanyField?: boolean;
}

export const MeterFiltersDialog = (props: Props) => {
  return <MeterFiltersDialogContent {...props} />;
};
