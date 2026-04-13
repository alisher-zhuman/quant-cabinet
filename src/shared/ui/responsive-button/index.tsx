import type { ElementType, ReactNode } from "react";

import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props extends Omit<ButtonProps, "startIcon" | "endIcon"> {
  label: string;
  icon?: ReactNode;
  endIcon?: ReactNode;
  tooltip?: string;
  component?: ElementType;
  to?: string;
}

export const ResponsiveButton = ({
  label,
  icon,
  endIcon,
  tooltip,
  ...props
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const title = tooltip || label;

  if (isMobile) {
    return (
      <Tooltip title={title}>
        <IconButton
          {...props}
          color={props.color || "primary"}
          sx={{
            border: props.variant === "outlined" ? "1px solid" : "none",
            borderColor: props.variant === "outlined" ? "divider" : "transparent",
            ...props.sx,
          }}
        >
          {icon || endIcon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={title}>
      <Button {...props} startIcon={icon} endIcon={endIcon}>
        {label}
      </Button>
    </Tooltip>
  );
};
