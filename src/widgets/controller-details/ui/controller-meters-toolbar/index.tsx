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
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
  onOpenCreateDialog: () => void;
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
            {t("meters.actions.filters")}
          </Button>

          {hasActiveFilters && (
            <IconButton
              size="small"
              color="error"
              aria-label={t("meters.filters.reset")}
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
          {t("meters.actions.add")}
        </Button>
      </Box>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
