import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { extent } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { MathBlock } from "@/components/data-display/MathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetRangeDisplayBlock: FC<{
  dataset: number[];
}> = memo(({ dataset }) => {
  const { value, msg } = useMemo(() => {
    if (dataset.length < 2) {
      return { value: undefined, msg: "$-$" };
    }
    const [vMin, vMax] = extent(dataset);
    if (vMin === undefined || vMax === undefined) {
      return { value: undefined, msg: "$-$" };
    }
    const value = vMax - vMin;
    return {
      value,
      msg: `${formatNumberParentheses(value)}`,
    };
  }, [dataset]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const [vMin, vMax] = extent(dataset);
    if (vMin === undefined || vMax === undefined) {
      return [];
    }
    const orderedDataset = [...dataset].sort((a, b) => a - b);
    const fmtDataset = orderedDataset
      .map((dt, index) =>
        index === 0 || index === orderedDataset.length - 1
          ? `\\underline{${formatNumberParentheses(dt)}}`
          : formatNumberParentheses(dt),
      )
      .join(",");

    const vMinFmt = formatNumberParentheses(vMin, true);
    const vMaxFmt = formatNumberParentheses(vMax, true);

    return [
      `${fmtDataset}`,
      `${vMaxFmt} - ${vMinFmt}`,
      `\\boxed{${formatNumberParentheses(value)}}`,
    ];
  }, [dataset, value]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography component="h3">
          <strong>{`พิสัย:`}</strong>
          {` `}
          <InlineMathBlock expr={msg} />
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathBlock expr={`สูตร: $$x_{\\text{max}} - x_{\\text{min}}$$`} />
          {value !== undefined && (
            <Fragment>
              <Typography component="h4" variant="body1">
                {`ขั้นตอนการคำนวณ:`}
              </Typography>
              {calcSteps.map((msg, index) => (
                <StackedEquationItem
                  latex={`$$${msg}$$`}
                  key={`step-${index}`}
                  isLast={index === calcSteps.length - 1}
                />
              ))}
            </Fragment>
          )}
        </Stack>
      }
    />
  );
});
