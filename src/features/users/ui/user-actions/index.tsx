import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { UserRow } from "@entities/users";

import { AUTH_ROLES } from "@shared/constants";

interface Props {
  editLabel: string;
  deleteLabel: string;
  onEdit: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
  user: UserRow;
  currentRole?: string | null | undefined;
}

export const UserActions = ({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  user,
  currentRole,
}: Props) => {
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(user);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(user);
  };

  const isForbidden =
    currentRole === AUTH_ROLES.MANAGER && user.role === AUTH_ROLES.ADMIN;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
      {!isForbidden && (
        <>
          <Tooltip title={editLabel}>
            <IconButton
              aria-label={editLabel}
              color="primary"
              onClick={handleEditClick}
            >
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={deleteLabel}>
            <IconButton
              aria-label={deleteLabel}
              color="error"
              onClick={handleDeleteClick}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
