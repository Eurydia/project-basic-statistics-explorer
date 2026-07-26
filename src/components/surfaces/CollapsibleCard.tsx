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
      sx={{
        position: "relative",
        padding: { xs: 2.25, md: 2.5 },
        paddingLeft: { xs: 2.75, md: 3 },
        overflow: "hidden",
        backgroundColor: "rgba(255, 253, 247, 0.74)",
        backgroundImage:
          "repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(74, 132, 173, 0.09) 32px)",
        boxShadow: "3px 3px 0 rgba(37, 71, 106, 0.08)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 10,
          width: 2,
          backgroundColor: "rgba(224, 104, 104, 0.3)",
        },
      }}
    >
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
          sx={{
            textWrap: "nowrap",
            minWidth: 0,
            userSelect: "none",
            paddingX: 0.75,
            backgroundColor: "rgba(255, 215, 106, 0.34)",
            borderRadius: "45% 55% 48% 52%",
          }}
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
