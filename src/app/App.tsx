import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { MathJaxContext } from "better-react-mathjax";
import { type FC, useState } from "react";
import { Attribution } from "@/components/blogs/Attribution";
import { DatasetInputForm } from "@/components/forms/DatasetInputForm";
import { SplitPanelLayout } from "@/components/layouts/SplitPanelLayout";
import { NotebookHeading } from "@/components/NotebookHeading";
import { NotebookHeadingHighlight } from "@/components/NotebookHeadingHighlight";
import { NotebookPaperDecorations } from "@/components/NotebookPaperDecorations";
import { CentrumCard } from "@/components/surfaces/CentrumCard";
import { DispersionCard } from "@/components/surfaces/DispersionCard";
import { NotebookPaper } from "@/components/surfaces/NotebookPaper";
import { PositionalCard } from "@/components/surfaces/PositionalCard";
import { theme } from "./theme";

export const App: FC = () => {
  const [data, setData] = useState<{
    fromPopulation: boolean;
    dataset: number[];
  }>({ fromPopulation: true, dataset: [] });

  return (
    <MathJaxContext
      renderMode="post"
      hideUntilTypeset="every"
      config={{
        loader: ["input/tex", "output/svg"],
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SplitPanelLayout
          panel={
            <NotebookPaper
              elevation={4}
              sx={{
                padding: { xs: 2.5, md: 3 },
                maxHeight: { md: "100%" },
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              <NotebookPaperDecorations />
              <Stack spacing={2.5}>
                <NotebookHeading component="h1" variant="h4">
                  <NotebookHeadingHighlight>
                    เครื่องคำนวณสถิติพื้นฐาน
                  </NotebookHeadingHighlight>
                </NotebookHeading>
                <DatasetInputForm onSubmit={setData} />
              </Stack>
            </NotebookPaper>
          }
        >
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            <CentrumCard {...data} />
            <DispersionCard {...data} />
            <PositionalCard {...data} />
            <NotebookPaper
              component="footer"
              variant="elevation"
              sx={{ padding: { xs: 2.5, md: 3 } }}
              elevation={4}
            >
              <NotebookPaperDecorations />
              <Attribution />
            </NotebookPaper>
          </Stack>
        </SplitPanelLayout>
      </ThemeProvider>
    </MathJaxContext>
  );
};
