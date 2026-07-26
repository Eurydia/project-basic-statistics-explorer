import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { max } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surface/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetModeDisplayBlock: FC<{
  dataset: number[];
}> = memo(({ dataset }) => {
  const { value, msg, counter } = useMemo(() => {
    const counter: Record<number, number> = {};
    for (const dt of dataset) {
      if (counter[dt] === undefined) {
        counter[dt] = 1;
      } else {
        counter[dt]++;
      }
    }

    const maxFreq = max(Object.values(counter));
    if (maxFreq === undefined) {
      return { msg: "$-$", value: undefined, counter };
    }

    const datasetMode = Object.entries(counter)
      .filter(([, freq]) => freq === maxFreq)
      .map(([value]) => Number(value));

    let msg = "$-$";
    let value: number | undefined;
    if (datasetMode.length === 1) {
      value = datasetMode[0];
      msg = `$${formatNumberParentheses(value)}$`;
    }
    return {
      value,
      msg,
      counter,
    };
  }, [dataset]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const orderedDatasetExpanded = Object.entries(counter)
      .map(([value, freq]) => {
        const arr = new Array(freq);
        arr.fill(formatNumberParentheses(Number(value)));
        const arrFmt = arr.join(",");

        return freq > 2 ? `\\overbrace{${arrFmt}}^{${freq}}` : arrFmt;
      })
      .join(",");
    return [
      orderedDatasetExpanded,
      `\\boxed{${formatNumberParentheses(value)}}`,
    ];
  }, [counter, value]);

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
          <Typography sx={{ fontWeigth: 700 }}>{`ฐานนิยม:`}</Typography>
          <MathJax dynamic>{msg}</MathJax>
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
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
