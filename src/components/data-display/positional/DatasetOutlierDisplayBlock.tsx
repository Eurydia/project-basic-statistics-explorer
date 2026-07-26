import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { MathJax } from "better-react-mathjax";
import { type FC, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { getQuantile } from "@/core/services/make-quantile-item.helper";

export const DatasetOutlierDisplayBlock: FC<{
  orderedDataset: number[];
}> = memo(({ orderedDataset }) => {
  const { msg } = useMemo(() => {
    const q1 = getQuantile(orderedDataset, 1);
    const q3 = getQuantile(orderedDataset, 3);
    if (q3 === undefined || q1 === undefined) {
      return { msg: "$-$" };
    }
    const vMin = q1.value - 1.5 * (q3.value - q1.value);
    const vMax = q3.value + 1.5 * (q3.value - q1.value);

    const v = orderedDataset
      .filter((dt) => dt < vMin || dt > vMax)
      .map((v) => formatNumberParentheses(v));
    return {
      msg: v.length === 0 ? "ไม่พบค่านอกเกณฑ์" : `$${v.join(",")}$`,
    };
  }, [orderedDataset]);

  return (
    <Paper component="article" variant="outlined" sx={{ padding: 2 }}>
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
        >{`ค่านอกเกณฑ์:`}</Typography>
        <MathJax dynamic>{`${msg}`}</MathJax>
      </Typography>
    </Paper>
  );
});
