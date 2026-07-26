import Grid from "@mui/material/Grid";
import { type FC, memo, type ReactNode } from "react";

export const SplitPanelLayout: FC<{
  left: ReactNode;
  right: ReactNode;
}> = memo(({ left, right }) => {
  return (
    <Grid
      component="main"
      container
      spacing={{ xs: 2.5, md: 3 }}
      sx={(t) => ({
        padding: { xs: 2, md: 3 },
        position: "relative",
        backgroundColor: "transparent",
        height: { md: "100vh" },
        maxHeight: { md: "100vh" },
        "&::after": {
          content: '""',
          position: "fixed",
          zIndex: 0,
          right: 18,
          bottom: 18,
          width: 54,
          height: 33,
          borderBottom: `3px solid ${t.palette.secondary.main}`,
          borderRadius: "50%",
          opacity: 0.36,
          pointerEvents: "none",
          transform: "rotate(-11deg)",
        },
      })}
    >
      <Grid
        component="aside"
        size={{ xs: 12, md: 4 }}
        sx={{
          height: { md: "100%" },
          maxHeight: { md: "100vh" },
        }}
      >
        {left}
      </Grid>
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          height: { md: "100%" },
          maxHeight: { md: "100vh" },
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {right}
      </Grid>
    </Grid>
  );
});
