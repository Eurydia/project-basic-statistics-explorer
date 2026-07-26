import { Paper, Stack, Typography } from "@mui/material";
import { type FC, memo } from "react";
import { DatasetCoeffVarDisplayBlock } from "../data-display/dispersion/DatasetCoeffVarDisplayBlock copy";
import { DatasetIQRDisplayBlock } from "../data-display/dispersion/DatasetIQRDisplayBlock";
import { DatasetRangeDisplayBlock } from "../data-display/dispersion/DatasetRangeDisplayBlock";
import { DatasetStdDeviationDisplayBlock } from "../data-display/dispersion/DatasetStdDeviationDisplayBlock";
import { DatasetVarianceDisplayBlock } from "../data-display/dispersion/DatasetVarianceDisplayBlock";

export const DispersionCard: FC<{
  dataset: number[];
  fromPopulation: boolean;
}> = memo(({ dataset, fromPopulation }) => {
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack spacing={1}>
        <Typography component="div" variant="h5">
          {`ค่าวัดการกระจาย`}
        </Typography>
        <DatasetRangeDisplayBlock dataset={dataset} />
        <DatasetIQRDisplayBlock dataset={dataset} />
        <DatasetStdDeviationDisplayBlock
          dataset={dataset}
          fromPopulation={fromPopulation}
        />
        <DatasetVarianceDisplayBlock
          dataset={dataset}
          fromPopulation={fromPopulation}
        />
        <DatasetCoeffVarDisplayBlock
          dataset={dataset}
          fromPopulation={fromPopulation}
        />
      </Stack>
    </Paper>
  );
});
