import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { FiltersButton } from "@shared/ui/filters-button";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";

interface Props {
  t: TFunction;
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenFiltersDialog: () => void;
  onOpenCreateDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const CompanyControllersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  hasActiveFilters,
  onResetFilters,
  onOpenFiltersDialog,
  onOpenCreateDialog,
  onSearchChange,
  onArchivedChange,
}: Props) => (
  <SearchTabsToolbar
    search={search}
    searchPlaceholder={t("controllers.search.placeholder")}
    activeLabel={t("controllers.tabs.active")}
    archivedLabel={t("controllers.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    left={
      <FiltersButton
        label={t("controllers.actions.filters")}
        resetLabel={t("controllers.filters.reset")}
        hasActiveFilters={hasActiveFilters}
        onOpenFilters={onOpenFiltersDialog}
        onResetFilters={onResetFilters}
      />
    }
    actions={
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onOpenCreateDialog}
        >
          {t("controllers.actions.create")}
        </Button>
      </Box>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
