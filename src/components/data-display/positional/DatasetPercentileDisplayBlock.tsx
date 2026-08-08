import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, memo, useCallback, useMemo, useState } from "react";
import { InlineMathBlock } from "@/components/data-display/InlineMathBlock";
import { MathBlock } from "@/components/data-display/MathBlock";
import { formatNumberParentheses } from "@/core/formatter";
import { getPercentile } from "@/core/services/make-quantile-item.helper";
import { CollapsibleCard } from "../../surfaces/CollapsibleCard";
import { StackedEquationItem } from "../StackedEquationItem";

export const DatasetPercentileDisplayBlock: FC<{
  orderedDataset: number[];
  fromPopulation: boolean;
}> = memo(({ fromPopulation, orderedDataset }) => {
  const [p, setP] = useState(1);

  const { value, msg, decimal, left, right } = useMemo(() => {
    const pValue = getPercentile(orderedDataset, p);
    if (pValue === undefined) {
      return { value: undefined, msg: "$-$" };
    }

    return {
      msg: `$${formatNumberParentheses(pValue.value)}$`,
      decimal: pValue.decimal,
      value: pValue.value,
      left: pValue.posLeft,
      right: pValue.posRight,
    };
  }, [orderedDataset, p]);

  const posCalcSteps = useMemo(() => {
    if (value === undefined) {
      return [];
    }
    const size = orderedDataset.length;
    const sizeFmt = formatNumberParentheses(size);
    const step1 = `\\frac{1}{4}(${sizeFmt} + 1)`;
    const step2 = `\\frac{1}{4}(${formatNumberParentheses(size + 1)})`;
    const step3 = formatNumberParentheses((size + 1) / 4);
    return [step1, step2, step3];
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
      ? `P_{${p}} = \\frac{${p}}{100}(N + 1)`
      : `P_{${p}} = \\frac{${p}}{100}(n + 1)`;
  }, [fromPopulation, p]);

  const handleSliderChange = useCallback((_: unknown, v: number) => {
    setP(v);
  }, []);

  return (
    <CollapsibleCard
      slotTitle={
        <Grid container spacing={1} sx={{ flexGrow: 1, flexBasis: 0 }}>
          <Grid size={12}>
            <Typography component="h3">
              <strong>{`เปอร์เซ็นไทล์ ${p}:`}</strong>
              {` `}
              <InlineMathBlock expr={msg} />
            </Typography>
          </Grid>
          <Grid size={12}>
            <Slider max={99} min={1} value={p} onChange={handleSliderChange} />
          </Grid>
        </Grid>
      }
      slotContent={
        <Stack spacing={0.5}>
          <MathBlock expr={`สูตร: $$${formulaMsg}$$`} />
          {value !== undefined && (
            <Fragment>
              <Typography component="h4" variant="body1">
                {`หาตำแหน่ง:`}
              </Typography>
              {posCalcSteps.map((msg, index) => (
                <StackedEquationItem
                  latex={`$$${msg}$$`}
                  key={`pos-step-${index}`}
                />
              ))}

              <Typography component="h4" variant="body1">
                {`เรียงลำดับข้อมูล:`}
              </Typography>
              <StackedEquationItem
                latex={`$$${orderedDataset
                  .map((dt, index) =>
                    index === left || index === right
                      ? `\\underline{${formatNumberParentheses(dt)}}`
                      : formatNumberParentheses(dt),
                  )
                  .join(",")}$$`}
              />
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
