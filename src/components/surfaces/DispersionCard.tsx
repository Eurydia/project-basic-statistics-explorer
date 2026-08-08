import Stack from "@mui/material/Stack";
import { type FC, memo } from "react";
import { NotebookHeading } from "@/components/NotebookHeading";
import { NotebookHeadingHighlight } from "@/components/NotebookHeadingHighlight";
import { NotebookPaperDecorations } from "@/components/NotebookPaperDecorations";
import { NotebookPaper } from "@/components/surfaces/NotebookPaper";
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
    <NotebookPaper
      component="section"
      elevation={4}
      sx={{ padding: { xs: 2.5, md: 3 } }}
    >
      <NotebookPaperDecorations />
      <Stack spacing={1.75}>
        <NotebookHeading component="h2" variant="h5">
          <NotebookHeadingHighlight>ค่าวัดการกระจาย</NotebookHeadingHighlight>
        </NotebookHeading>
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
    </NotebookPaper>
  );
});
