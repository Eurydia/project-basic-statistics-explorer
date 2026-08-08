import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { type FC, memo, type ReactNode, useCallback, useState } from "react";

export const CollapsibleCard: FC<{
  slotTitle: ReactNode;
  slotContent: ReactNode;
}> = memo(({ slotContent, slotTitle }) => {
  const [open, setOpen] = useState(false);
  const handleOpenToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return (
    <Paper
      component="article"
      variant="outlined"
      sx={(theme) => ({
        position: "relative",
        padding: { xs: 2.25, md: 2.5 },
        paddingLeft: { xs: 2.75, md: 3 },
        overflow: "hidden",
        backgroundColor: theme.alpha(theme.palette.background.paper, 0.74),
        backgroundImage:
          `repeating-linear-gradient(180deg, transparent 0, transparent ${theme.spacing(3.875)}, ${theme.alpha(theme.palette.primary.main, 0.09)} ${theme.spacing(4)})`,
        boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.375)} 0 ${theme.alpha(theme.palette.text.primary, 0.08)}`,
      })}
    >
      <Box
        component="span"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          bottom: 0,
          left: theme.spacing(1.25),
          width: theme.spacing(0.25),
          backgroundColor: theme.alpha(theme.palette.secondary.main, 0.3),
        })}
      />
      <Stack
        component="header"
        direction={"row"}
        spacing={0.5}
        sx={{
          flexWrap: "wap",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        {slotTitle}
        <Button
          color="inherit"
          size="small"
          onClick={handleOpenToggle}
          variant="text"
          sx={(theme) => ({
            textWrap: "nowrap",
            minWidth: 0,
            userSelect: "none",
            paddingX: 0.75,
            backgroundColor: theme.alpha(theme.palette.secondary.light, 0.34),
            borderRadius: "45% 55% 48% 52%",
          })}
        >
          {open ? "(ซ่อน)" : "(แสดง)"}
        </Button>
      </Stack>
      <Collapse in={open} sx={{ paddingTop: open ? 1.5 : 0 }}>
        {slotContent}
      </Collapse>
    </Paper>
  );
});
