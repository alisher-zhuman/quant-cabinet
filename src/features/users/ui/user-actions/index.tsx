import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { UserRow } from "@entities/users";

interface Props {
  detailsLabel: string;
  editLabel: string;
  deleteLabel: string;
  onView: (user: UserRow) => void;
  onEdit: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
  user: UserRow;
}

export const UserActions = ({
  detailsLabel,
  editLabel,
  deleteLabel,
  onView,
  onEdit,
  onDelete,
  user,
}: Props) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
    <IconButton
      aria-label={detailsLabel}
      color="default"
      onClick={() => onView(user)}
    >
      <ErrorOutlineRoundedIcon />
    </IconButton>

    <IconButton aria-label={editLabel} color="primary" onClick={() => onEdit(user)}>
      <EditRoundedIcon />
    </IconButton>

    <IconButton aria-label={deleteLabel} color="error" onClick={() => onDelete(user)}>
      <DeleteOutlineRoundedIcon />
    </IconButton>
  </Box>
);
