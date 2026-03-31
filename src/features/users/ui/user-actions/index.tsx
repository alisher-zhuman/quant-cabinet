import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import IconButton from "@mui/material/IconButton";

import type { UserRow } from "@entities/users";

interface Props {
  deleteLabel: string;
  onDelete: (user: UserRow) => void;
  user: UserRow;
}

export const UserActions = ({ deleteLabel, onDelete, user }: Props) => (
  <IconButton aria-label={deleteLabel} color="error" onClick={() => onDelete(user)}>
    <DeleteOutlineRoundedIcon />
  </IconButton>
);
