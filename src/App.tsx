import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, useState } from "react";
import { Attribution } from "./components/blogs/Attribution";
import { DatasetInputForm } from "./components/forms/DatasetInputForm";
import { SplitPanelLayout } from "./components/layouts/SplitPanelLayout";
import { CentrumCard } from "./components/surfaces/CentrumCard";
import { DispersionCard } from "./components/surfaces/DispersionCard";
import { PositionalCard } from "./components/surfaces/PositionalCard";
import { notebookHeadingSx, notebookSurfaceSx } from "./theme";

export const App: FC = () => {
  const [data, setData] = useState<{
    fromPopulation: boolean;
    dataset: number[];
  }>({ fromPopulation: true, dataset: [] });

  return (
    <SplitPanelLayout
      panel={
        <Paper
          component="section"
          elevation={4}
          sx={[
            notebookSurfaceSx,
            {
              padding: { xs: 2.5, md: 3 },
              maxHeight: { md: "100%" },
              overflowY: "auto",
              scrollbarWidth: "none",
            },
          ]}
        >
          <Stack spacing={2.5}>
            <Typography component="h1" variant="h4" sx={notebookHeadingSx}>
              <Typography component="span" variant="inherit">
                {`เครื่องคำนวณสถิติพื้นฐาน`}
              </Typography>
            </Typography>
            <DatasetInputForm onSubmit={setData} />
          </Stack>
        </Paper>
      }
    >
      <Stack spacing={{ xs: 2.5, md: 3 }}>
        <CentrumCard {...data} />
        <DispersionCard {...data} />
        <PositionalCard {...data} />
        <Paper
          component="footer"
          variant="elevation"
          sx={[notebookSurfaceSx, { padding: { xs: 2.5, md: 3 } }]}
          elevation={4}
        >
          <Attribution />
        </Paper>
      </Stack>
    </SplitPanelLayout>
  );
};
