import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { CreateUserDialog } from "@features/users";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { Loader } from "@shared/ui/loader";

import { useUserDetailsWidget } from "../../hooks/useUserDetailsWidget";
import { UserCompanySection } from "../user-company-section";
import { UserInfoSection } from "../user-info-section";

export const UserDetailsWidget = () => {
  const {
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
    isDeletePending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  } = useUserDetailsWidget();

  if (isLoading) {
    return <Loader isFullscreen />;
  }

  if (isError || !user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "100%",
        maxWidth: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          component={Link}
          to={backTo}
          variant="text"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
        >
          {t("users.details.back")}
        </Button>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={handleOpenEditDialog}
          >
            {t("users.actions.edit")}
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={handleOpenDeleteDialog}
          >
            {t("users.actions.delete")}
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          <UserInfoSection
            t={t}
            user={user}
            userId={userId}
            userStatus={userStatus}
            fullName={fullName}
          />

          {canShowCompanyDetails && (
            <>
              <Divider />
              <UserCompanySection
                t={t}
                user={user}
                companyStatus={companyStatus}
              />
            </>
          )}
        </Stack>
      </Paper>

      {isEditDialogOpen && (
        <CreateUserDialog
          user={user}
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSuccess={handleEditSuccess}
        />
      )}

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={t("users.deleteDialog.title")}
        description={t("users.deleteDialog.description")}
        cancelLabel={t("users.deleteDialog.cancel")}
        confirmLabel={t("users.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};
