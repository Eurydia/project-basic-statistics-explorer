import { Collapse, Paper, Stack, Typography } from "@mui/material";
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
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        spacing={0.5}
        sx={{
          flexWrap: "wap",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        {slotTitle}
        <Typography
          component="div"
          onClick={handleOpenToggle}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            ":hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? "(ซ่อน)" : "(แสดง)"}
        </Typography>
      </Stack>
      <Collapse in={open}>{slotContent}</Collapse>
    </Paper>
  );
});
