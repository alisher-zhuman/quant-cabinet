import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";

import { isAdmin, isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
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
  onOpenCreateDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
  currentRole?: UserRole | null;
}

export const ControllersToolbar = ({
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
  currentRole,
}: Props) => {
  const isAdminRole = isAdmin(currentRole);

  const filtersButton = (
    <FiltersButton
      label={t("controllers.actions.filters")}
      resetLabel={t("controllers.filters.reset")}
      hasActiveFilters={hasActiveFilters}
      onOpenFilters={onOpenFiltersDialog}
      onResetFilters={onResetFilters}
    />
  );

  return (
    <SearchTabsToolbar
      search={search}
      searchPlaceholder={t("controllers.search.placeholder")}
      activeLabel={t("controllers.tabs.active")}
      archivedLabel={t("controllers.tabs.archived")}
      isSearchLoading={isSearchLoading}
      isArchived={isArchived}
      hideSearch={!isAdminRole}
      left={!isAdminRole ? filtersButton : undefined}
      actions={
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {isAdminRole && filtersButton}

          {!isUser(currentRole) && (
            <ResponsiveButton
              variant="contained"
              icon={<AddRoundedIcon />}
              label={t("controllers.actions.create")}
              onClick={onOpenCreateDialog}
            />
          )}
        </Box>
      }
      onSearchChange={onSearchChange}
      onArchivedChange={onArchivedChange}
    />
  );
};
