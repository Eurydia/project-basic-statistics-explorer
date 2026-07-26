import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { max, min } from "d3-array";
import { type FC, memo, useEffect, useRef } from "react";

Chart.register(zoomPlugin);

export const BoxPlot: FC<{
  data?: {
    q1: number;
    median: number;
    q3: number;
    whiskerMin: number;
    whiskerMax: number;
    items: number[];
  };
}> = memo(({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<BoxPlotChart | null>(null);
  const {
    palette: { primary, secondary },
  } = useTheme();

  const resetView = () => {
    chartRef.current?.resetZoom();
  };

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (ctx === null) {
      return;
    }
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const fullMin =
      data === undefined
        ? undefined
        : Math.min(data.whiskerMin, min(data.items) ?? data.whiskerMin);
    const fullMax =
      data === undefined
        ? undefined
        : Math.max(data.whiskerMax, max(data.items) ?? data.whiskerMax);

    chartRef.current = new BoxPlotChart(ctx, {
      data: {
        labels: [""],
        datasets: [
          {
            backgroundColor: primary.light,
            borderColor: primary.dark,
            borderWidth: 3,
            itemStyle: "circle",
            itemRadius: 10,
            outlierStyle: "circle",
            outlierBackgroundColor: secondary.light,
            outlierRadius: 10,
            outlierBorderWidth: 0,
            data: [
              data === undefined
                ? undefined
                : {
                    whiskerMax: data.whiskerMax,
                    whiskerMin: data.whiskerMin,
                    q1: data.q1,
                    q3: data.q3,
                    median: data.median,
                    items: data.items.filter(
                      (v) => v >= data.whiskerMin && v <= data.whiskerMax,
                    ),
                    outliers: data.items.filter(
                      (v) => v < data.whiskerMin || v > data.whiskerMax,
                    ),
                  },
            ],
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          zoom: {
            limits: {
              x: {
                min: fullMin,
                max: fullMax,
              },
            },
            pan: {
              enabled: data !== undefined,
              mode: "x",
              threshold: 5,
            },
            zoom: {
              mode: "x",
              wheel: {
                enabled: data !== undefined,
                modifierKey: "ctrl",
              },
              pinch: {
                enabled: data !== undefined,
              },
            },
          },
        },
        scales:
          data === undefined
            ? undefined
            : {
                x: {
                  type: "linear",
                  min: data.whiskerMin,
                  max: data.whiskerMax,
                  beginAtZero: false,
                },
              },
      },
    }) as unknown as BoxPlotChart;
    return () => chartRef.current?.destroy();
  }, [data, primary.dark, primary.light, secondary.light]);

  return (
    <Stack spacing={2}>
      <Typography
        component="figcaption"
        sx={(t) => ({
          alignSelf: "flex-start",
          paddingX: 4,
          paddingY: 2,
          backgroundColor: t.alpha(t.palette.secondary.light, 0.4),
          borderLeft: 5,
          borderColor: t.palette.secondary.dark,
          borderRadius: "3px 8px 4px 6px",
          boxShadow: "3px 4px 0 rgba(37, 71, 106, 0.14)",
        })}
      >
        ลากกราฟในแนวนอนเพื่อดูค่านอกเกณฑ์ กด Ctrl
        พร้อมหมุนล้อเมาส์หรือบีบนิ้วเพื่อซูม
      </Typography>
      <canvas ref={canvasRef} />
      <Button
        color="error"
        onClick={resetView}
        sx={{ width: "fit-content" }}
        variant="contained"
      >
        กลับสู่ช่วงข้อมูลหลัก
      </Button>
    </Stack>
  );
});
