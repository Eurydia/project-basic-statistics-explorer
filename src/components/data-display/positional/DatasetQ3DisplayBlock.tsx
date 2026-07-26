import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { type FC, Fragment, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { getQuantile } from "@/core/services/make-quantile-item.helper";
import { CollapsibleCard } from "../../surface/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetQ3DisplayBlock: FC<{
  orderedDataset: number[];
  fromPopulation: boolean;
}> = memo(({ orderedDataset, fromPopulation }) => {
  const { value, msg, decimal, left, right } = useMemo(() => {
    const q3 = getQuantile(orderedDataset, 3);
    if (q3 === undefined) {
      return { value: undefined, msg: "$-$" };
    }

    return {
      msg: `$${formatNumberParentheses(q3.value)}$`,
      decimal: q3.decimal,
      value: q3.value,
      left: q3.posLeft,
      right: q3.posRight,
    };
  }, [orderedDataset]);

  const posCalcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const size = orderedDataset.length;
    const sizeFmt = formatNumberParentheses(size);
    const step1 = `\\frac{3}{4}(${sizeFmt} + 1)`;
    const step2 = `\\frac{3}{4}(${formatNumberParentheses(size + 1)})`;
    const r3Size = 3 * (size + 1);
    const step3 = `\\frac{${formatNumberParentheses(r3Size)}}{4}`;
    const step4 = formatNumberParentheses(r3Size / 4);
    return [step1, step2, step3, step4];
  }, [orderedDataset.length, value]);

  const calcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const vLeft = orderedDataset[left];
    const vRight = orderedDataset[right];

    const vLeftFmt = formatNumberParentheses(vLeft, true);
    const vRightFmt = formatNumberParentheses(vRight, true);
    const decFmt = formatNumberParentheses(decimal, true);
    const step1 = `${vLeftFmt} + ${decFmt}\\left( ${vRightFmt} - ${vLeftFmt} \\right)`;

    const diff = vRight - vLeft;
    const diffFmt = formatNumberParentheses(diff);
    const step2 = `${vLeftFmt} + ${decFmt}\\left( ${diffFmt} \\right)`;

    const mul = diff * decimal;
    const multFmt = formatNumberParentheses(mul, true);
    const step3 = `${vLeftFmt} + ${multFmt}`;

    return [step1, step2, step3, `\\boxed{${formatNumberParentheses(value)}}`];
  }, [decimal, left, orderedDataset, right, value]);

  const formulaMsg = useMemo(() => {
    return fromPopulation
      ? `Q_{3} = \\frac{3}{4}(N + 1)`
      : `Q_{3} = \\frac{3}{4}(n + 1)`;
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
          <Typography sx={{ fontWeigth: 700 }}>{`ควอร์ไทล์ที่ 3:`}</Typography>
          <MathJax dynamic>{msg}</MathJax>
        </Typography>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathJax dynamic>{`สูตร: $$${formulaMsg}$$`}</MathJax>
          {value !== undefined && (
            <Fragment>
              <Typography>{`หาตำแหน่ง:`}</Typography>
              {posCalcSteps.map((msg, index) => (
                <StackedEquationItem
                  latex={`$$${msg}$$`}
                  key={`pos-step-${index}`}
                />
              ))}

              <Typography>{`เรียงลำดับข้อมูล:`}</Typography>
              <StackedEquationItem
                latex={`$$${orderedDataset
                  .map((dt, index) =>
                    index === left || index === right
                      ? `\\underline{${formatNumberParentheses(dt)}}`
                      : formatNumberParentheses(dt),
                  )
                  .join(",")}$$`}
              />
              <Typography>{`คำนวณค่า:`}</Typography>

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
