import { Link } from "react-router";

import type { TFunction } from "i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import Box from "@mui/material/Box";

import { COLORS } from "@shared/constants";
import { isAdmin, isUser } from "@shared/helpers";
import type { AuthState } from "@shared/types";
import { ResponsiveButton } from "@shared/ui/responsive-button";

interface Props {
  t: TFunction;
  backTo: string;
  role: AuthState["role"];
  onEdit: () => void;
  onTransfer: () => void;
  onDelete: () => void;
}

export const ControllerDetailsHeader = ({
  t,
  backTo,
  role,
  onEdit,
  onTransfer,
  onDelete,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 1,
    }}
  >
    <ResponsiveButton
      component={Link}
      to={backTo}
      variant="text"
      icon={<ArrowBackRoundedIcon />}
      label={t("controllers.details.back")}
      sx={{ px: 1 }}
    />

    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {!isUser(role) && (
        <ResponsiveButton
          variant="outlined"
          icon={<EditRoundedIcon />}
          label={t("controllers.actions.edit")}
          onClick={onEdit}
        />
      )}

      {isAdmin(role) && (
        <ResponsiveButton
          variant="outlined"
          icon={<SwapHorizRoundedIcon />}
          label={t("controllers.actions.transfer")}
          onClick={onTransfer}
          sx={{
            color: COLORS.accent.violet,
            borderColor: COLORS.accent.violetSoft,
            "&:hover": {
              borderColor: COLORS.accent.violet,
              backgroundColor: COLORS.accent.violetSoft,
            },
          }}
        />
      )}

      {!isUser(role) && (
        <ResponsiveButton
          color="error"
          variant="outlined"
          icon={<DeleteOutlineRoundedIcon />}
          label={t("controllers.actions.delete")}
          onClick={onDelete}
        />
      )}
    </Box>
  </Box>
);
