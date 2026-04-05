import { alpha } from "@mui/material/styles";

import { COLORS } from "@shared/constants";

import type { MeterStatusTone } from "../types";

export const METER_STATUS_TONE_STYLES: Record<
  MeterStatusTone,
  { color: string; backgroundColor: string }
> = {
  success: {
    color: COLORS.system.success,
    backgroundColor: alpha(COLORS.system.success, 0.12),
  },
  warning: {
    color: COLORS.system.warning,
    backgroundColor: alpha(COLORS.system.warning, 0.14),
  },
  error: {
    color: COLORS.system.error,
    backgroundColor: alpha(COLORS.system.error, 0.12),
  },
  neutral: {
    color: COLORS.neutral[600],
    backgroundColor: COLORS.neutral[100],
  },
};
