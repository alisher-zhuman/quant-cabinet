import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
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
  isTemplateDownloadPending: boolean;
  hasActiveFilters: boolean;
  onOpenCreateDialog: () => void;
  onDownloadTemplate: () => void;
  onOpenBulkUploadDialog: () => void;
  onResetFilters: () => void;
  onOpenFiltersDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const MetersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  isTemplateDownloadPending,
  hasActiveFilters,
  onOpenCreateDialog,
  onDownloadTemplate,
  onOpenBulkUploadDialog,
  onResetFilters,
  onOpenFiltersDialog,
  onSearchChange,
  onArchivedChange,
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
          {t("meters.actions.create")}
        </Button>

        <Button
          variant="outlined"
          startIcon={<DownloadRoundedIcon />}
          onClick={onDownloadTemplate}
          disabled={isTemplateDownloadPending}
        >
          {t("controllers.bulkUpload.template.action")}
        </Button>

        <Button
          variant="outlined"
          startIcon={<UploadFileRoundedIcon />}
          onClick={onOpenBulkUploadDialog}
        >
          {t("controllers.bulkUpload.import.action")}
        </Button>
      </Box>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
