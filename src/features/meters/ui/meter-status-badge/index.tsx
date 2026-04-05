import Box from "@mui/material/Box";

import { METER_STATUS_TONE_STYLES } from "../../constants";
import type { MeterStatusTone } from "../../types";

interface Props {
  label: string;
  tone: MeterStatusTone;
}

export const MeterStatusBadge = ({ label, tone }: Props) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 96,
      px: 1.5,
      py: 0.625,
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...METER_STATUS_TONE_STYLES[tone],
    }}
  >
    {label}
  </Box>
);
