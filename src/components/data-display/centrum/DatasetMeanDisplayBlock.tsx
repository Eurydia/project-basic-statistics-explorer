import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MathJax } from "better-react-mathjax";
import { mean, sum } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetMeanDisplayBlock: FC<{
  fromPopulation: boolean;
  dataset: number[];
}> = memo(({ dataset, fromPopulation }) => {
  const result = useMemo(() => {
    let msg = "$-$";
    const value = mean(dataset);
    if (value !== undefined) {
      msg = fromPopulation
        ? `$\\mu=${formatNumberParentheses(value)}$`
        : `$\\overline{x}=${formatNumberParentheses(value)}$`;
    }
    return {
      value,
      msg,
    };
  }, [dataset, fromPopulation]);

  const formulaBaseMsg = useMemo(() => {
    return !fromPopulation
      ? `\\overline{x}=\\frac{1}{n}\\sum_{i=1}^{n} x_{i}`
      : `\\mu=\\frac{1}{N}\\sum_{i=1}^{N} x_{i}`;
  }, [fromPopulation]);

  const calcSteps = useMemo(() => {
    if (result.value === undefined) {
      return [];
    }
    const datasetExpandedSum = dataset
      .map((dt) =>
        dt < 0
          ? `\\left(${formatNumberParentheses(dt)}\\right)`
          : formatNumberParentheses(dt),
      )
      .join("+");

    const datasetSize = formatNumberParentheses(dataset.length);
    const datasetSum = formatNumberParentheses(sum(dataset));
    return [
      `\\frac{1}{${datasetSize}}\\left(${datasetExpandedSum}\\right)`,
      `\\frac{1}{${datasetSize}}\\left(${datasetSum}\\right)`,
      `\\boxed{${formatNumberParentheses(result.value)}}`,
    ];
  }, [dataset, result]);

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
          >{`ค่าเฉลี่ย:`}</Typography>
          <MathJax dynamic>{result.msg}</MathJax>
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathJax dynamic>{`สูตร:  $$${formulaBaseMsg}$$`}</MathJax>
          {result.value !== undefined && (
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
