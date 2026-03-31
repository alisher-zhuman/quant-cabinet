import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import IconButton from "@mui/material/IconButton";

import type { MeterRow } from "@entities/meters";

interface Props {
  deleteLabel: string;
  meter: MeterRow;
  onDelete: (meter: MeterRow) => void;
}

export const MeterActions = ({ deleteLabel, meter, onDelete }: Props) => (
  <IconButton aria-label={deleteLabel} color="error" onClick={() => onDelete(meter)}>
    <DeleteOutlineRoundedIcon />
  </IconButton>
);
