import { useState } from "react";

import type { TFunction } from "i18next";
import type { MouseEvent } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
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
  currentRole?: UserRole | null;
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
  currentRole,
}: Props) => {
  const [importAnchorEl, setImportAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const handleOpenImportMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setImportAnchorEl(event.currentTarget);
  };

  const handleCloseImportMenu = () => {
    setImportAnchorEl(null);
  };

  const handleDownloadTemplate = () => {
    onDownloadTemplate();
    handleCloseImportMenu();
  };

  const handleOpenBulkUploadDialog = () => {
    onOpenBulkUploadDialog();
    handleCloseImportMenu();
  };

  const isImportMenuOpen = Boolean(importAnchorEl);

  return (
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

          {!isUser(currentRole) && (
            <>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={onOpenCreateDialog}
              >
                {t("meters.actions.create")}
              </Button>

              <Button
                variant="outlined"
                endIcon={<ArrowDropDownRoundedIcon />}
                onClick={handleOpenImportMenu}
                disabled={isTemplateDownloadPending}
              >
                {t("meters.actions.import")}
              </Button>

              <Menu
                anchorEl={importAnchorEl}
                open={isImportMenuOpen}
                onClose={handleCloseImportMenu}
              >
                <MenuItem
                  onClick={handleDownloadTemplate}
                  disabled={isTemplateDownloadPending}
                >
                  <DownloadRoundedIcon sx={{ mr: 1 }} />
                  {t("controllers.bulkUpload.template.action")}
                </MenuItem>
                <MenuItem onClick={handleOpenBulkUploadDialog}>
                  <UploadFileRoundedIcon sx={{ mr: 1 }} />
                  {t("controllers.bulkUpload.import.action")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      }
      onSearchChange={onSearchChange}
      onArchivedChange={onArchivedChange}
    />
  );
};
