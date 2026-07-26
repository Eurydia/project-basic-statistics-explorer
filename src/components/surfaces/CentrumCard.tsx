import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { notebookHeadingSx, notebookSurfaceSx } from "@/theme";
import { DatasetMeanDisplayBlock } from "../data-display/centrum/DatasetMeanDisplayBlock";
import { DatasetMedianDisplayBlock } from "../data-display/centrum/DatasetMedianDisplayBlock";
import { DatasetModeDisplayBlock } from "../data-display/centrum/DatasetModeDisplayBlock";

export const CentrumCard: FC<{
  fromPopulation: boolean;
  dataset: number[];
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
            {`ค่ากลางของข้อมูล`}
          </Typography>
        </Typography>
        <DatasetMeanDisplayBlock
          dataset={dataset}
          fromPopulation={fromPopulation}
        />
        <DatasetMedianDisplayBlock dataset={dataset} />
        <DatasetModeDisplayBlock dataset={dataset} />
      </Stack>
    </Paper>
  );
});
