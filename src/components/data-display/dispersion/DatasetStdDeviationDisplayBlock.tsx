import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { mean, sum } from "d3-array";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { CollapsibleCard } from "../../surface/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetStdDeviationDisplayBlock: FC<{
  dataset: number[];
  fromPopulation: boolean;
}> = memo(
  ({ dataset, fromPopulation }) => {
    const { value, msg } = useMemo(() => {
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
      const value = Math.sqrt(dtSumSqaureDiff / size);

      return { value, msg: `$${formatNumberParentheses(value)}$` };
    }, [dataset, fromPopulation]);

    const calcSteps = useMemo(() => {
      if (value === undefined) {
        return [];
      }
      const dtMean = mean(dataset);
      if (dtMean === undefined) {
        return [];
      }
      const size = dataset.length;

      const dtDiff = dataset.map((dt) => dt - dtMean);
      const dtDiffSquare = dtDiff.map((dt) => dt * dt);
      const dtDiffSquareSum = sum(dtDiffSquare);
      const dtMeanFmt = formatNumberParentheses(dtMean, true);

      const dtFmt = dataset
        .map(
          (dt) =>
            `\\left(${formatNumberParentheses(dt, true)} - ${dtMeanFmt}\\right)^{2}`,
        )
        .join("+");
      const dtDiffFmt = dtDiff
        .map((dt) => `${formatNumberParentheses(dt, true)}^{2}`)
        .join("+");
      const dtDiffSquareFmt = dtDiffSquare
        .map((dt) => formatNumberParentheses(dt))
        .join("+");
      const dtDiffSquareSumFmt = formatNumberParentheses(dtDiffSquareSum);

      const sizeFmt = formatNumberParentheses(size);

      const step1 = fromPopulation
        ? `\\sqrt{\\frac{1}{${sizeFmt}} \\left( ${dtFmt} \\right) }`
        : `\\sqrt{\\frac{1}{${sizeFmt} - 1} \\left ( ${dtFmt} \\right) }`;

      const sizeEq = fromPopulation ? size : size - 1;
      const sizeEqFmt = formatNumberParentheses(sizeEq);

      const divRes = dtDiffSquareSum / sizeEq;
      const divResFmt = formatNumberParentheses(divRes);
      const step2 = `\\sqrt{\\frac{1}{${sizeEqFmt}} \\left( ${dtDiffFmt} \\right) }`;
      const step3 = `\\sqrt{\\frac{1}{${sizeEqFmt}} \\left( ${dtDiffSquareFmt} \\right) }`;
      const step4 = `\\sqrt{\\frac{1}{${sizeEqFmt}} \\left( ${dtDiffSquareSumFmt} \\right) }`;
      const step5 = `\\sqrt{ ${divResFmt} }`;
      return [
        step1,
        step2,
        step3,
        step4,
        step5,
        `\\boxed{${formatNumberParentheses(value)}}`,
      ];
    }, [dataset, fromPopulation, value]);

    const formulaMsg = useMemo(() => {
      return fromPopulation
        ? `\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_{i} - \\mu)^{2} }`
        : `s = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (x_{i} - \\overline{x})^{2} }`;
    }, [fromPopulation]);

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
            <Typography
              sx={{ fontWeight: 700 }}
            >{`ส่วนเบี่ยงเบนมาตรฐาน:`}</Typography>
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
  },
);
