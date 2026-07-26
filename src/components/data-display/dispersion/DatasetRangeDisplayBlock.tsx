import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { extent } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surface/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

type Props = {
  dataset: number[];
};
export const DatasetRangeDisplayBlock: FC<Props> = memo(({ dataset }) => {
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
        <Typography
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>{`พิสัย:`}</Typography>
          <MathJax dynamic>{msg}</MathJax>
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathJax dynamic>
            {`สูตร: $$x_{\\text{max}} - x_{\\text{min}}$$`}
          </MathJax>
          {value !== undefined && (
            <Fragment>
              <Typography>{`ขั้นตอนการคำนวณ:`}</Typography>
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
