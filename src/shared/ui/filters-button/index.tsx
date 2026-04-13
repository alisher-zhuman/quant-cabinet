import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  label: string;
  resetLabel: string;
  hasActiveFilters: boolean;
  onOpenFilters: () => void;
  onResetFilters: () => void;
}

export const FiltersButton = ({
  label,
  resetLabel,
  hasActiveFilters,
  onOpenFilters,
  onResetFilters,
}: Props) => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <Tooltip title={label}>
      <IconButton
        onClick={onOpenFilters}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Badge
          color="primary"
          overlap="circular"
          variant="dot"
          invisible={!hasActiveFilters}
        >
          <FilterListRoundedIcon />
        </Badge>
      </IconButton>
    </Tooltip>

    {hasActiveFilters && (
      <Tooltip title={resetLabel}>
        <IconButton
          size="small"
          color="error"
          aria-label={resetLabel}
          onClick={onResetFilters}
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 20,
            height: 20,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 1,
            "&:hover": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 12 }} />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);
