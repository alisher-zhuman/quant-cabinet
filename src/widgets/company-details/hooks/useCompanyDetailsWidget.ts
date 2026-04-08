import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useDeleteCompany } from "@features/companies";

import { useCompanyQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";

import type { CompanyDetailsTab } from "../types";
import { useCompanyKeyActions } from "./useCompanyKeyActions";

export const useCompanyDetailsWidget = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { companyId } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<CompanyDetailsTab>(() => {
    const tab = searchParams.get("tab");

    if (tab === "controllers") {
      return "controllers";
    }

    if (tab === "meters") {
      return "meters";
    }

    return "users";
  });

  const { company } = useCompanyQuery(companyId);

  const companyKeyActions = useCompanyKeyActions({ company, t });
  const deleteCompanyMutation = useDeleteCompany(() => {
    setIsDeleteDialogOpen(false);
    navigate(`/${ROUTES.COMPANIES}`);
  });

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!company?.id) {
      return;
    }

    deleteCompanyMutation.mutate({ id: company.id });
  };

  return {
    t,
    companyId,
    company,
    companyKey: companyKeyActions.companyKey,
    activeTab,
    handleCopyKey: companyKeyActions.handleCopyKey,
    handleRefreshKey: companyKeyActions.handleRefreshKey,
    handleTabChange: setActiveTab,
    isRefreshPending: companyKeyActions.isRefreshPending,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeletePending: deleteCompanyMutation.isPending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
