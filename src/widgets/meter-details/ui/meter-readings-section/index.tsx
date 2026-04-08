import type { ChangeEvent } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { MeterDetails } from "@entities/meters";

import { TableSection } from "@shared/ui/table-section";

import { useMeterReadingsSection } from "../../hooks/useMeterReadingsSection";

export const MeterReadingsSection = ({ meter }: { meter: MeterDetails }) => {
  const { t, toolbarProps, tableSectionProps } = useMeterReadingsSection({
    meter,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {t("meters.readings.title")}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {t("meters.readings.subtitle")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          <TextField
            label={t("meters.readings.filters.serialNumber")}
            value={toolbarProps.serialNumber}
            disabled
          />

          {typeof toolbarProps.port === "number" && (
            <TextField
              label={t("meters.readings.filters.port")}
              value={String(toolbarProps.port)}
              disabled
            />
          )}

          <TextField
            label={t("meters.readings.filters.from")}
            type="date"
            value={toolbarProps.from}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              toolbarProps.onFromChange(event.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label={t("meters.readings.filters.to")}
            type="date"
            value={toolbarProps.to}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              toolbarProps.onToChange(event.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>

        <TableSection
          isLoading={tableSectionProps.isLoading}
          isError={tableSectionProps.isError}
          errorText={tableSectionProps.errorText}
          hasItems={tableSectionProps.hasItems}
          emptyText={tableSectionProps.emptyText}
          rows={tableSectionProps.rows}
          columns={tableSectionProps.columns}
          getRowId={(reading) => reading.id}
          pagination={tableSectionProps.pagination}
        />
      </Stack>
    </Paper>
  );
};
