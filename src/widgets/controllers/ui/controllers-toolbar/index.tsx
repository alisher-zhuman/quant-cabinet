import { type MouseEvent, useState } from "react";

import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";

interface Props {
  t: TFunction;
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  isTemplateDownloadPending: boolean;
  hasActiveFilters: boolean;
  onDownloadTemplate: () => void;
  onResetFilters: () => void;
  onOpenFiltersDialog: () => void;
  onOpenBulkUploadDialog: () => void;
  onOpenCreateDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const ControllersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  isTemplateDownloadPending,
  hasActiveFilters,
  onDownloadTemplate,
  onResetFilters,
  onOpenFiltersDialog,
  onOpenBulkUploadDialog,
  onOpenCreateDialog,
  onSearchChange,
  onArchivedChange,
}: Props) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(menuAnchor);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleDownloadTemplate = () => {
    handleCloseMenu();
    onDownloadTemplate();
  };

  const handleOpenBulkUpload = () => {
    handleCloseMenu();
    onOpenBulkUploadDialog();
  };

  return (
    <>
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

            <Button
              variant="outlined"
              startIcon={<MoreHorizRoundedIcon />}
              onClick={handleOpenMenu}
            >
              {t("controllers.actions.more")}
            </Button>
          </Box>
        }
        onSearchChange={onSearchChange}
        onArchivedChange={onArchivedChange}
      />

      <Menu anchorEl={menuAnchor} open={isMenuOpen} onClose={handleCloseMenu}>
        <MenuItem
          disabled={isTemplateDownloadPending}
          onClick={handleDownloadTemplate}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DownloadRoundedIcon fontSize="small" />
            {t("controllers.bulkUpload.template.action")}
          </Box>
        </MenuItem>

        <MenuItem onClick={handleOpenBulkUpload}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <UploadFileRoundedIcon fontSize="small" />
            {t("controllers.bulkUpload.import.action")}
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};
