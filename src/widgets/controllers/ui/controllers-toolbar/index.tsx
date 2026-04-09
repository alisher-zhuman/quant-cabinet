import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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
}: Props) => {
  return (
    <SearchTabsToolbar
      search={search}
      searchPlaceholder={t("controllers.search.placeholder")}
      activeLabel={t("controllers.tabs.active")}
      archivedLabel={t("controllers.tabs.archived")}
      isSearchLoading={isSearchLoading}
      isArchived={isArchived}
      actions={
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <Button
              variant="outlined"
              startIcon={
                <Badge
                  color="primary"
                  overlap="circular"
                  variant="dot"
                  invisible={!hasActiveFilters}
                >
                  <FilterListRoundedIcon />
                </Badge>
              }
              onClick={onOpenFiltersDialog}
            >
              {t("controllers.actions.filters")}
            </Button>

            {hasActiveFilters && (
              <IconButton
                size="small"
                color="error"
                aria-label={t("controllers.filters.reset")}
                onClick={onResetFilters}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 20,
                  height: 20,
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: 1,
                  "&:hover": {
                    backgroundColor: "background.paper",
                  },
                }}
              >
                <CloseRoundedIcon sx={{ fontSize: 12 }} />
              </IconButton>
            )}
          </Box>

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
};
