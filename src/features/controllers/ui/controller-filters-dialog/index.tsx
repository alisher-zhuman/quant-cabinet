import type { ControllerFilters } from "../../types";
import { ControllerFiltersDialogContent } from "../controller-filters-dialog-content";

interface Props {
  open: boolean;
  filters: ControllerFilters;
  onClose: () => void;
  onApply: (filters: ControllerFilters) => void;
  hideCompanyField?: boolean;
}

export const ControllerFiltersDialog = (props: Props) => {
  return <ControllerFiltersDialogContent {...props} />;
};
