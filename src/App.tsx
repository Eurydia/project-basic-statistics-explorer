import { Paper, Stack } from "@mui/material";
import { type FC, useState } from "react";
import { Attribution } from "./components/blogs/Attribution";
import { DatasetInputForm } from "./components/forms/DatasetInputForm";
import { SplitPanelLayout } from "./components/layouts/SplitPanelLayout";
import { CentrumCard } from "./components/surfaces/CentrumCard";
import { DispersionCard } from "./components/surfaces/DispersionCard";
import { PositionalCard } from "./components/surfaces/PositionalCard";

export const App: FC = () => {
  const [data, setData] = useState<{
    fromPopulation: boolean;
    dataset: number[];
  }>({ fromPopulation: true, dataset: [] });

  return (
    <SplitPanelLayout
      left={
        <Paper
          elevation={4}
          sx={{
            backgroundColor: "background.paper",
            padding: 2,
            maxHeight: { md: "100%" },
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <DatasetInputForm onSubmit={setData} />
        </Paper>
      }
      right={
        <Stack spacing={2}>
          <CentrumCard {...data} />
          <DispersionCard {...data} />
          <PositionalCard {...data} />
          <Paper variant="elevation" sx={{ padding: 2 }} elevation={4}>
            <Attribution />
          </Paper>
        </Stack>
      }
    />
  );
};
