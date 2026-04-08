import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useDeleteUser } from "@features/users";

import { useUserQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
import { getBackTo } from "@shared/helpers";

export const useUserDetailsWidget = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation() as { state: unknown };

  const { userId } = useParams();

  const { user, isLoading, isError } = useUserQuery(userId);

  const backTo = getBackTo(location.state, `/${ROUTES.USERS}`);

  const deleteUserMutation = useDeleteUser();

  const userStatus = user?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");

  const companyStatus = user?.company?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const canShowCompanyDetails = Boolean(user?.company && user.role !== "admin");

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
    if (!user?.id) {
      return;
    }

    deleteUserMutation.mutate(
      { userId: user.id },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          navigate(backTo);
        },
      },
    );
  };

  return {
    t,
    userId,
    user,
    backTo,
    isLoading,
    isError,
    userStatus,
    companyStatus,
    fullName,
    canShowCompanyDetails,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeletePending: deleteUserMutation.isPending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
