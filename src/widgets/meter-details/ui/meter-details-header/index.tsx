import { Link } from "react-router";

import type { TFunction } from "i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { isUser } from "@shared/helpers";
import type { AuthState } from "@shared/types";
import { ResponsiveButton } from "@shared/ui/responsive-button";

interface Props {
  t: TFunction;
  backTo: string;
  role: AuthState["role"];
  onEdit: () => void;
  onDelete: () => void;
}

export const MeterDetailsHeader = ({
  t,
  backTo,
  role,
  onEdit,
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
      label={t("meters.details.back")}
      sx={{ px: 1 }}
    />

    {!isUser(role) && (
      <Stack direction="row" spacing={1}>
        <ResponsiveButton
          variant="outlined"
          icon={<EditRoundedIcon />}
          label={t("meters.actions.edit")}
          onClick={onEdit}
        />

        <ResponsiveButton
          color="error"
          variant="outlined"
          icon={<DeleteOutlineRoundedIcon />}
          label={t("meters.actions.delete")}
          onClick={onDelete}
        />
      </Stack>
    )}
  </Box>
);
