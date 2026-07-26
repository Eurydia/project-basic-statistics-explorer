import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { notebookHeadingSx, notebookSurfaceSx } from "@/theme";
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
    <Paper
      component="section"
      elevation={4}
      sx={[notebookSurfaceSx, { padding: { xs: 2.5, md: 3 } }]}
    >
      <Stack spacing={1.75}>
        <Typography component="h2" variant="h5" sx={notebookHeadingSx}>
          <Typography component="span" variant="inherit">
            {`ค่าวัดการกระจาย`}
          </Typography>
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
