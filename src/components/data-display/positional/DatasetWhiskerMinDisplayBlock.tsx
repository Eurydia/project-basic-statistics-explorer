import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, memo, useMemo } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { getQuantile } from "@/core/services/make-quantile-item.helper";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetWhiskerMinDisplayBlock: FC<{
  orderedDataset: number[];
}> = memo(({ orderedDataset }) => {
  const { value, msg, q1, q3 } = useMemo(() => {
    const q1 = getQuantile(orderedDataset, 1);
    const q3 = getQuantile(orderedDataset, 3);
    if (q3 === undefined || q1 === undefined) {
      return { value: undefined, msg: "-" };
    }
    const value = q1.value - 1.5 * (q3.value - q1.value);
    return {
      msg: formatNumberParentheses(value, false),
      value,
      q1: q1.value,
      q3: q3.value,
    };
  }, [orderedDataset]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const q1Fmt = formatNumberParentheses(q1, true);
    const q3Fmt = formatNumberParentheses(q3, true);

    const diff = q3 - q1;
    const diffFmt = formatNumberParentheses(diff);

    const mult = 1.5 * diff;
    const multFmt = formatNumberParentheses(mult, true);

    return [
      `${q1Fmt} - 1.5\\left (${q3Fmt} - ${q1Fmt} \\right)`,
      `${q1Fmt} - 1.5\\left (${diffFmt} \\right)`,
      `${q1Fmt} - ${multFmt}`,
      `\\boxed{${formatNumberParentheses(value)}}`,
    ];
  }, [q1, q3, value]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography component="h3">
          <InlineMathBlock
            expr={`$\\symbf{Q_{1} - 1.5\\left (Q_{3} - Q_{1} \\right)}: ${msg}$`}
          />
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          {value !== undefined && (
            <Fragment>
              <Typography component="h4" variant="body1">
                {`คำนวณค่า:`}
              </Typography>
              {calcSteps.map((msg, index) => (
                <StackedEquationItem
                  latex={`$$${msg}$$`}
                  key={`pos-step-${index}`}
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
