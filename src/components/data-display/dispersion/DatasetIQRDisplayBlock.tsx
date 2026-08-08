import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, memo, useMemo } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { MathBlock } from "@/components/data-display/MathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { getQuantile } from "@/core/services/make-quantile-item.helper";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetIQRDisplayBlock: FC<{
  dataset: number[];
}> = memo(({ dataset }) => {
  const { value, msg, q1, q3 } = useMemo(() => {
    if (dataset.length < 2) {
      return { value: undefined, msg: "$-$" };
    }
    const orderedDataset = [...dataset].sort((a, b) => a - b);
    const q1 = getQuantile(orderedDataset, 1);
    const q3 = getQuantile(orderedDataset, 3);
    if (q1 === undefined || q3 === undefined) {
      return { value: undefined, msg: "$-$" };
    }
    const value = q3.value - q1.value;
    return {
      value,
      msg: `$${formatNumberParentheses(value)}$`,
      q1: q1.value,
      q3: q3.value,
    };
  }, [dataset]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const q1Fmt = formatNumberParentheses(q1, true);
    const q3Fmt = formatNumberParentheses(q3, true);
    return [
      `${q3Fmt} - ${q1Fmt}`,
      `\\boxed{${formatNumberParentheses(value)}}`,
    ];
  }, [q1, q3, value]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography component="h3">
          <strong>{`พิสัยระหว่างควอร์ไทล์:`}</strong>
          {` `}
          <InlineMathBlock expr={msg} />
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathBlock expr={`สูตร: $$Q_{3} - Q_{1}$$`} />
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
