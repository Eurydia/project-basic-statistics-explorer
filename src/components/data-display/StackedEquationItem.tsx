import Box from "@mui/material/Box";
import { type FC, memo } from "react";
import { MathBlock } from "./MathBlock";

export const StackedEquationItem: FC<{
  latex: string;
  isLast?: boolean;
}> = memo(({ latex, isLast }) => {
  return (
    <Box
      sx={{
        position: "relative",
        marginLeft: 0.5,
        marginY: 0.5,
        paddingX: 2,
        paddingY: 0.75,
        borderLeftStyle: "solid",
        borderLeftColor: (theme) =>
          !isLast
            ? theme.lighten(theme.palette.primary.light, 0.5)
            : theme.palette.primary.dark,
        borderLeftWidth: (theme) => theme.spacing(0.75),
        borderRadius: (theme) =>
          theme.spacing(0.25, 0.875, 0.375, 0.625),
        backgroundColor: (theme) =>
          !isLast
            ? theme.lighten(theme.palette.primary.light, 0.87)
            : theme.palette.secondary.light,
        backgroundImage: (theme) =>
          `linear-gradient(178deg, transparent 0, ${theme.alpha(theme.palette.common.white, 0.2)} 100%)`,
        boxShadow: (theme) =>
          `${theme.spacing(0.25)} ${theme.spacing(0.25)} 0 ${theme.alpha(theme.palette.text.primary, 0.08)}`,
        transform: isLast ? "rotate(-0.2deg)" : "none",
      }}
    >
      <MathBlock expr={latex} />
    </Box>
  );
});
