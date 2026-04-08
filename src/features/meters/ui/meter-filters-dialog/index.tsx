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
  const dialogKey = JSON.stringify({
    filters: props.filters,
    hideCompanyField: props.hideCompanyField ?? false,
  });

  return <MeterFiltersDialogContent key={dialogKey} {...props} />;
};
