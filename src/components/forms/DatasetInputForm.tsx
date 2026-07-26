import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { type FC, memo, useCallback, useMemo, useState } from "react";
import { DatasetOriginInput } from "@/components/form-input/DatasetOriginInput";
import { DatasetSourceDisplay } from "../data-display/DatasetDisplay";
import { DatasetSourceInput } from "../form-input/DatasetSourceInput";

export const DatasetInputForm: FC<{
  onSubmit: (value: { fromPopulation: boolean; dataset: number[] }) => unknown;
}> = memo(({ onSubmit }) => {
  const [datasetRaw, setDatasetRaw] = useState("");
  const [datasetOrigin, setDatasetOrigin] = useState("0");

  const handleClear = useCallback(() => {
    setDatasetRaw("");
  }, []);

  const { dataset, hasInvalid } = useMemo(() => {
    const dataset_: number[] = [];
    const tokens = datasetRaw.split(",");
    let hasInvalid_ = false;
    for (const token of tokens) {
      if (token.trim().length === 0) {
        continue;
      }
      const nToken = Number(token);
      if (!Number.isFinite(nToken)) {
        hasInvalid_ = true;
        continue;
      }
      dataset_.push(nToken);
    }
    return { dataset: dataset_, hasInvalid: hasInvalid_ };
  }, [datasetRaw]);

  const handleSubmit = useCallback(
    () =>
      onSubmit({
        fromPopulation: datasetOrigin === "0",
        dataset,
      }),
    [dataset, datasetOrigin, onSubmit],
  );

  const handleFormSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <Stack component="form" spacing={2} onSubmit={handleFormSubmit}>
      <DatasetOriginInput value={datasetOrigin} onChange={setDatasetOrigin} />
      <Typography
        component="label"
        htmlFor="dataset-source"
        sx={{ fontWeight: 700 }}
      >
        {`ชุดข้อมูล`}
      </Typography>
      <DatasetSourceInput value={datasetRaw} onChange={setDatasetRaw} />
      <Toolbar
        disableGutters
        variant="dense"
        sx={{ gap: 1, justifyContent: "space-between" }}
      >
        <Button variant="contained" type="submit">
          {`คำนวณ`}
        </Button>
        <Button variant="outlined" type="button" onClick={handleClear}>
          {`ลบทั้งหมด`}
        </Button>
      </Toolbar>
      <DatasetSourceDisplay
        dataset={dataset}
        hasInvalid={hasInvalid}
        datasetFromPopulation={datasetOrigin === "0"}
      />
    </Stack>
  );
});
