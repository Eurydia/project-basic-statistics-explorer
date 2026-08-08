import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { type FC, memo, useMemo } from "react";
import { NotebookHeading } from "@/components/NotebookHeading";
import { NotebookHeadingHighlight } from "@/components/NotebookHeadingHighlight";
import { NotebookPaperDecorations } from "@/components/NotebookPaperDecorations";
import { NotebookPaper } from "@/components/surfaces/NotebookPaper";
import { getQuantile } from "@/core/services/make-quantile-item.helper";
import { BoxPlot } from "../data-display/BoxPlot";
import { DatasetOutlierDisplayBlock } from "../data-display/positional/DatasetOutlierDisplayBlock";
import { DatasetPercentileDisplayBlock } from "../data-display/positional/DatasetPercentileDisplayBlock";
import { DatasetQ1DisplayBlock } from "../data-display/positional/DatasetQ1DisplayBlock";
import { DatasetQ2DisplayBlock } from "../data-display/positional/DatasetQ2DisplayBlock";
import { DatasetQ3DisplayBlock } from "../data-display/positional/DatasetQ3DisplayBlock";
import { DatasetWhiskerMaxDisplayBlock } from "../data-display/positional/DatasetWhiskerMaxDisplayBlock";
import { DatasetWhiskerMinDisplayBlock } from "../data-display/positional/DatasetWhiskerMinDisplayBlock";

export const PositionalCard: FC<{
  dataset: number[];
  fromPopulation: boolean;
}> = memo(({ dataset, fromPopulation }) => {
  const orderedDataset = useMemo(() => {
    return structuredClone(dataset).sort((a, b) => a - b);
  }, [dataset]);

  const plotData = useMemo(() => {
    const q1 = getQuantile(orderedDataset, 1);
    const q2 = getQuantile(orderedDataset, 2);
    const q3 = getQuantile(orderedDataset, 3);
    if (q1 === undefined || q2 === undefined || q3 === undefined) {
      return undefined;
    }

    const wMax = q3.value + 1.5 * (q3.value - q1.value);
    const wMin = q1.value - 1.5 * (q3.value - q1.value);

    return {
      q1: q1.value,
      median: q2.value,
      q3: q3.value,
      whiskerMax: wMax,
      whiskerMin: wMin,
      items: orderedDataset,
    };
  }, [orderedDataset]);

  return (
    <NotebookPaper
      component="section"
      elevation={4}
      sx={{ padding: { xs: 2.5, md: 3 } }}
    >
      <NotebookPaperDecorations />
      <Stack spacing={1.75}>
        <NotebookHeading component="h2" variant="h5">
          <NotebookHeadingHighlight>
            ค่าวัดตำแหน่งของข้อมูล
          </NotebookHeadingHighlight>
        </NotebookHeading>
        <DatasetQ1DisplayBlock
          orderedDataset={orderedDataset}
          fromPopulation={fromPopulation}
        />
        <DatasetQ2DisplayBlock
          orderedDataset={orderedDataset}
          fromPopulation={fromPopulation}
        />
        <DatasetQ3DisplayBlock
          orderedDataset={orderedDataset}
          fromPopulation={fromPopulation}
        />
        <DatasetWhiskerMinDisplayBlock orderedDataset={orderedDataset} />
        <DatasetWhiskerMaxDisplayBlock orderedDataset={orderedDataset} />

        <DatasetOutlierDisplayBlock orderedDataset={orderedDataset} />
        <DatasetPercentileDisplayBlock
          orderedDataset={orderedDataset}
          fromPopulation={fromPopulation}
        />
        <Paper
          component="figure"
          variant="outlined"
          sx={{ margin: 0, padding: { xs: 2, md: 2.5 } }}
        >
          <BoxPlot data={plotData} />
        </Paper>
      </Stack>
    </NotebookPaper>
  );
});
