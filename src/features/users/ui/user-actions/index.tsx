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
}: Props) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
    {user.role !== "admin" && user.company?.id ? (
      <IconButton
        aria-label={editLabel}
        color="primary"
        onClick={() => onEdit(user)}
      >
        <EditRoundedIcon />
      </IconButton>
    ) : null}

    <IconButton aria-label={deleteLabel} color="error" onClick={() => onDelete(user)}>
      <DeleteOutlineRoundedIcon />
    </IconButton>
  </Box>
);
