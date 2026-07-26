import { Alert, AlertTitle, Paper, Stack, Typography } from "@mui/material";
import { type FC, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";
import { MathBlock } from "./MathBlock";

export const DatasetSourceDisplay: FC<{
  dataset: number[];
  hasInvalid: boolean;
  datasetFromPopulation: boolean;
}> = memo(({ dataset, datasetFromPopulation, hasInvalid }) => {
  const sizeMsg = useMemo(() => {
    const size = formatNumberParentheses(dataset.length);
    return datasetFromPopulation ? `(N=${size})` : `(n=${size})`;
  }, [dataset.length, datasetFromPopulation]);

  const parsedDataset = useMemo(() => {
    return dataset.map((tok) => formatNumberParentheses(tok));
  }, [dataset]);

  return (
    <Stack spacing={1}>
      <MathBlock expr={`ข้อมูลที่จะถูกใช้ $${sizeMsg}$`} />
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
        }}
      >
        {parsedDataset.length === 0 ? (
          <Typography>{`ไม่มีข้อมูล`}</Typography>
        ) : (
          <Typography
            sx={{
              wordBreak: "break-all",
              wordWrap: "break-word",
              whiteSpace: "wrap",
            }}
          >
            {parsedDataset.join(", ")}
          </Typography>
        )}
      </Paper>
      {hasInvalid && (
        <Alert severity="warning">
          <AlertTitle>{`คำเตือน`}</AlertTitle>
          <Typography>{`ข้อมูลบางส่วนไม่ถูกต้อง`}</Typography>
        </Alert>
      )}
    </Stack>
  );
});
