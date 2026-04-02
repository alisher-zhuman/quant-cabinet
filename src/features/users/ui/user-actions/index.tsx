import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { UserRow } from "@entities/users";

interface Props {
  editLabel: string;
  deleteLabel: string;
  onEdit: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
  user: UserRow;
}

export const UserActions = ({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  user,
}: Props) => {
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(user);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(user);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
      <IconButton aria-label={editLabel} color="primary" onClick={handleEditClick}>
        <EditRoundedIcon />
      </IconButton>

      <IconButton aria-label={deleteLabel} color="error" onClick={handleDeleteClick}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
