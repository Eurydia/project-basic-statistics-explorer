import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { mean } from "d3-array";
import { type FC, memo, useMemo } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { MathBlock } from "@/components/data-display/MathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";

export const DatasetVarianceDisplayBlock: FC<{
  dataset: number[];
  fromPopulation: boolean;
}> = memo(({ dataset, fromPopulation }) => {
  const { msg } = useMemo(() => {
    const dtMean = mean(dataset);
    if (dtMean === undefined) {
      return { value: undefined, msg: "$-$" };
    }

    const size = fromPopulation ? dataset.length : dataset.length - 1;

    if (size === 0) {
      return { value: undefined, msg: "$-$" };
    }
    let dtSumSqaureDiff = 0;
    for (const dt of dataset) {
      const diff = dt - dtMean;
      dtSumSqaureDiff += diff * diff;
    }
    const value = dtSumSqaureDiff / size;

    return { msg: `$${formatNumberParentheses(value)}$` };
  }, [dataset, fromPopulation]);

  const formulaMsg = useMemo(() => {
    return fromPopulation
      ? `\\sigma^{2} = \\frac{1}{N} \\sum_{i=1}^{N} (x_{i} - \\mu)^{2}`
      : `s^{2} = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_{i} - \\overline{x})^{2}`;
  }, [fromPopulation]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography component="h3">
          <strong>{`ค่าความแปรปรวน:`}</strong>
          {` `}
          <InlineMathBlock expr={msg} />
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathBlock expr={`สูตร: $$${formulaMsg}$$`} />
        </Stack>
      }
    />
  );
});
