import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";

import { FiltersButton } from "@shared/ui/filters-button";
import { ResponsiveButton } from "@shared/ui/responsive-button";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";

interface Props {
  t: TFunction;
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenFiltersDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
  onOpenCreateDialog: () => void;
}

export const CompanyMetersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  hasActiveFilters,
  onResetFilters,
  onOpenFiltersDialog,
  onSearchChange,
  onArchivedChange,
  onOpenCreateDialog,
}: Props) => (
  <SearchTabsToolbar
    search={search}
    searchPlaceholder={t("meters.search.placeholder")}
    activeLabel={t("meters.tabs.active")}
    archivedLabel={t("meters.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    actions={
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        <FiltersButton
          label={t("meters.actions.filters")}
          resetLabel={t("meters.filters.reset")}
          hasActiveFilters={hasActiveFilters}
          onOpenFilters={onOpenFiltersDialog}
          onResetFilters={onResetFilters}
        />

        <ResponsiveButton
          variant="contained"
          icon={<AddRoundedIcon />}
          label={t("meters.actions.create")}
          onClick={onOpenCreateDialog}
        />
      </Box>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
