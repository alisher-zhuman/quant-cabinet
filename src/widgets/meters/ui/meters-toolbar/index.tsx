import { useState } from "react";

import type { TFunction } from "i18next";
import type { MouseEvent } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
import { FiltersButton } from "@shared/ui/filters-button";
import { ResponsiveButton } from "@shared/ui/responsive-button";
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
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1 }}>
          <FiltersButton
            label={t("meters.actions.filters")}
            resetLabel={t("meters.filters.reset")}
            hasActiveFilters={hasActiveFilters}
            onOpenFilters={onOpenFiltersDialog}
            onResetFilters={onResetFilters}
          />

          {!isUser(currentRole) && (
            <>
              <ResponsiveButton
                variant="contained"
                icon={<AddRoundedIcon />}
                label={t("meters.actions.create")}
                onClick={onOpenCreateDialog}
              />

              <ResponsiveButton
                variant="outlined"
                icon={importAnchorEl ? <ArrowDropDownRoundedIcon /> : <UploadFileRoundedIcon />}
                endIcon={<ArrowDropDownRoundedIcon />}
                label={t("meters.actions.import")}
                onClick={handleOpenImportMenu}
                disabled={isTemplateDownloadPending}
              />

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
