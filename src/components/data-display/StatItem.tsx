import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { type FC, memo, useCallback, useMemo, useState } from "react";
import { MathBlock } from "./MathBlock";

export const StatItem: FC<{
  label: string;
  expr?: string;
  value?: number | string;
  exprExt?: string;
}> = memo(({ label, expr, value, exprExt }) => {
  const [showExpr, setShowExpr] = useState(false);

  const valueMsg = useMemo(() => {
    return value !== undefined ? `$${value.toLocaleString("fullwide")}$` : "";
  }, [value]);

  const exprMsg = useMemo(() => {
    if (expr === undefined) {
      return "";
    }
    const exprExtMsg = exprExt !== undefined ? `\\\\${exprExt}` : "";
    const boxedValueMsg = value !== undefined ? `\\\\&=\\boxed{${value}}` : "";

    return `$$\\begin{align*}
              ${expr}
              ${exprExtMsg}
              ${boxedValueMsg}
              \\end{align*}$$`;
  }, [expr, exprExt, value]);

  const handleToggleExpr = useCallback(() => setShowExpr((prev) => !prev), []);

  return (
    <Stack sx={{ flexWrap: "warp" }}>
      <Stack
        spacing={1}
        direction={"row"}
        sx={{ justifyContent: "space-between" }}
      >
        <MathBlock expr={`${label}: ${valueMsg}`} />
        {expr !== undefined && (
          <Button
            color="inherit"
            onClick={handleToggleExpr}
            size="small"
            sx={{
              minWidth: 0,
              userSelect: "none",
              ":hover": {
                textDecorationLine: "underline",
              },
            }}
            variant="text"
          >
            {showExpr ? "(ซ่อน)" : "(แสดง)"}
          </Button>
        )}
      </Stack>
      {expr !== undefined && (
        <Collapse in={showExpr}>
          <MathBlock expr={exprMsg} />
        </Collapse>
      )}
    </Stack>
  );
});
