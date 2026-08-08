import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { median } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetMedianDisplayBlock: FC<{
  dataset: number[];
}> = memo(({ dataset }) => {
  const { value, msg } = useMemo(() => {
    let msg = "$-$";
    const value = median(dataset);
    if (value !== undefined) {
      msg = `$${formatNumberParentheses(value)}$`;
    }
    return {
      value,
      msg,
    };
  }, [dataset]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const mid = (dataset.length + 1) / 2 - 1;
    const left = Math.floor(mid);
    const right = Math.ceil(mid);

    const centerPoints = new Set([left, right]);
    const orderedDataset = [...dataset].sort((a, b) => a - b);

    const orderedDatasetExpanded = orderedDataset
      .map((dt, index) =>
        centerPoints.has(index)
          ? `\\underline{${formatNumberParentheses(dt)}}`
          : formatNumberParentheses(dt),
      )
      .join(",");

    if (centerPoints.size === 1) {
      return [
        orderedDatasetExpanded,
        `\\boxed{${formatNumberParentheses(value)}}`,
      ];
    }
    const vLeft = orderedDataset[left];
    const vRight = orderedDataset[right];

    const vLeftFmt = formatNumberParentheses(vLeft, true);
    const vRightFmt = formatNumberParentheses(vRight, true);
    const midSum = vLeft + vRight;
    const midSumFmt = formatNumberParentheses(midSum, true);
    return [
      orderedDatasetExpanded,
      `\\frac{${vLeftFmt} + ${vRightFmt}}{2}`,
      `\\frac{${midSumFmt}}{2}`,
      `\\boxed{${formatNumberParentheses(value)}}`,
    ];
  }, [dataset, value]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography component="h3">
          <strong>{`มัธยฐาน:`}</strong>
          {` `}
          <InlineMathBlock expr={msg} />
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
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
