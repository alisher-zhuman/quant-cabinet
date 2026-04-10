import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useDeleteCompany } from "@features/companies";

import { useCompanyQuery, useMyCompanyQuery } from "@entities/companies";


export const useCompanyDetailsWidget = ({
  isManagerView = false,
}: {
  isManagerView?: boolean;
} = {}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { companyId } = useParams();

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

  const queryParamsCompany = useCompanyQuery(isManagerView ? undefined : companyId);
  const myCompany = useMyCompanyQuery();

  const { company } = isManagerView ? myCompany : queryParamsCompany;

  const currentCompanyId = isManagerView ? company?.id : companyId;

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
    companyId: currentCompanyId,
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
