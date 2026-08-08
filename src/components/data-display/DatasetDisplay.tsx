import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo, useMemo } from "react";
import { formatNumberParentheses } from "@/core/formatter";

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
    <Stack component="section" spacing={1.5}>
      <Typography component="h2" variant="body1">
        {`ข้อมูลที่จะถูกใช้ ${sizeMsg}`}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          padding: 2.5,
        }}
      >
        <Typography
          component="output"
          sx={{
            display: "block",
            wordBreak: "break-all",
            wordWrap: "break-word",
            whiteSpace: "wrap",
          }}
        >
          {parsedDataset.length === 0
            ? `ไม่มีข้อมูล`
            : parsedDataset.join(", ")}
        </Typography>
      </Paper>
      {hasInvalid && (
        <Alert severity="warning">
          <AlertTitle component="h3">{`คำเตือน`}</AlertTitle>
          <Typography>{`ข้อมูลบางส่วนไม่ถูกต้อง`}</Typography>
        </Alert>
      )}
    </Stack>
  );
});
