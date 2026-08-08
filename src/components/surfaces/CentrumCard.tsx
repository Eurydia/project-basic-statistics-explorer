import Stack from "@mui/material/Stack";
import { type FC, memo } from "react";
import { NotebookHeading } from "@/components/NotebookHeading";
import { NotebookHeadingHighlight } from "@/components/NotebookHeadingHighlight";
import { NotebookPaperDecorations } from "@/components/NotebookPaperDecorations";
import { NotebookPaper } from "@/components/surfaces/NotebookPaper";
import { DatasetMeanDisplayBlock } from "../data-display/centrum/DatasetMeanDisplayBlock";
import { DatasetMedianDisplayBlock } from "../data-display/centrum/DatasetMedianDisplayBlock";
import { DatasetModeDisplayBlock } from "../data-display/centrum/DatasetModeDisplayBlock";

export const CentrumCard: FC<{
  fromPopulation: boolean;
  dataset: number[];
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
          <NotebookHeadingHighlight>ค่ากลางของข้อมูล</NotebookHeadingHighlight>
        </NotebookHeading>
        <DatasetMeanDisplayBlock
          dataset={dataset}
          fromPopulation={fromPopulation}
        />
        <DatasetMedianDisplayBlock dataset={dataset} />
        <DatasetModeDisplayBlock dataset={dataset} />
      </Stack>
    </NotebookPaper>
  );
});
