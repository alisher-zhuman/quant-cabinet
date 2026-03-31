import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { CompanyRow } from "@entities/companies";

interface Props {
  company: CompanyRow;
  archiveLabel: string;
  unarchiveLabel: string;
  editLabel: string;
  deleteLabel: string;
  onToggleArchive: (company: CompanyRow) => void;
  onEdit: (company: CompanyRow) => void;
  onDelete: (company: CompanyRow) => void;
}

export const CompanyActions = ({
  company,
  archiveLabel,
  unarchiveLabel,
  editLabel,
  deleteLabel,
  onToggleArchive,
  onEdit,
  onDelete,
}: Props) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
    <IconButton
      aria-label={company.isArchived ? unarchiveLabel : archiveLabel}
      color={company.isArchived ? "success" : "warning"}
      onClick={() => onToggleArchive(company)}
    >
      {company.isArchived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
    </IconButton>

    <IconButton aria-label={editLabel} color="primary" onClick={() => onEdit(company)}>
      <EditOutlinedIcon />
    </IconButton>

    <IconButton
      aria-label={deleteLabel}
      color="error"
      onClick={() => onDelete(company)}
    >
      <DeleteOutlineRoundedIcon />
    </IconButton>
  </Box>
);
