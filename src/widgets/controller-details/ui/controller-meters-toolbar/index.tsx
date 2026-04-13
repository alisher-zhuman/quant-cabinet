import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
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
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
  onOpenCreateDialog: () => void;
  currentRole?: UserRole | null;
}

export const ControllerMetersToolbar = ({
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
  currentRole,
}: Props) => (
  <SearchTabsToolbar
    search={search}
    searchPlaceholder={t("meters.search.placeholder")}
    activeLabel={t("meters.tabs.active")}
    archivedLabel={t("meters.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    actions={
      <Box sx={{ display: "flex", gap: 1 }}>
        <FiltersButton
          label={t("meters.actions.filters")}
          resetLabel={t("meters.filters.reset")}
          hasActiveFilters={hasActiveFilters}
          onOpenFilters={onOpenFiltersDialog}
          onResetFilters={onResetFilters}
        />

        {!isUser(currentRole) && (
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onOpenCreateDialog}
          >
            {t("meters.actions.create")}
          </Button>
        )}
      </Box>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
