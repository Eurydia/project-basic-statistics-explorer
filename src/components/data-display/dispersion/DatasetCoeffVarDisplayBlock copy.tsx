import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MathJax } from "better-react-mathjax";
import { mean } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetCoeffVarDisplayBlock: FC<{
  dataset: number[];
  fromPopulation: boolean;
}> = memo(({ dataset, fromPopulation }) => {
  const formulaMsg = useMemo(() => {
    return !fromPopulation
      ? `\\frac{s}{|\\overline{x}|}`
      : `\\frac{\\sigma}{|\\mu|}`;
  }, [fromPopulation]);

  const { value, msg, dtStdDev, dtMean } = useMemo(() => {
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
    const dtStdDev = Math.sqrt(dtSumSqaureDiff / size);
    const value = dtStdDev / Math.abs(dtMean);

    return {
      value,
      msg: `$${formatNumberParentheses(value)}$`,
      dtStdDev,
      dtMean,
    };
  }, [dataset, fromPopulation]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }

    const dtMeanAbsFmt = formatNumberParentheses(Math.abs(dtMean));
    const dtStdDevFmt = formatNumberParentheses(dtStdDev);
    const step1 = `\\frac{${dtStdDevFmt}}{|${dtMean}|}`;
    const step2 = `\\frac{${dtStdDevFmt}}{${dtMeanAbsFmt}}`;

    return [step1, step2, `\\boxed{${formatNumberParentheses(value)}}`];
  }, [dtMean, dtStdDev, value]);

  return (
    <CollapsibleCard
      slotTitle={
        <Typography
          component="h3"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <Typography
            component="span"
            sx={{ fontWeigth: 700 }}
          >{`สัมประสิทธิ์ของการแปรผัน:`}</Typography>
          <MathJax dynamic>{msg}</MathJax>
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathJax dynamic>{`สูตร: $$${formulaMsg}$$`}</MathJax>
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
