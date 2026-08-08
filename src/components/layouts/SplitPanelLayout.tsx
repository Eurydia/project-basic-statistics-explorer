import Grid from "@mui/material/Grid";
import { type FC, memo, type PropsWithChildren, type ReactNode } from "react";

export const SplitPanelLayout: FC<
  PropsWithChildren<{
    panel: ReactNode;
  }>
> = memo((props) => {
  return (
    <Grid
      component="main"
      container
      spacing={{ xs: 2.5, md: 3 }}
      sx={{
        padding: { xs: 2, md: 3 },
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <Grid
        component="header"
        size={{ xs: 12, md: 4 }}
        sx={(t) => ({
          position: { xs: "static", md: "sticky" },
          top: { xs: t.spacing(2.5), md: t.spacing(3) },
          alignSelf: { md: "flex-start" },
        })}
      >
        {props.panel}
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>{props.children}</Grid>
    </Grid>
  );
});
