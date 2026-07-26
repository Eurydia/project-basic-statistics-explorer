import Box from "@mui/material/Box";
import { lighten, useTheme } from "@mui/material/styles";
import { MathJax } from "better-react-mathjax";
import { type FC, memo } from "react";

export const StackedEquationItem: FC<{
  latex: string;
  isLast?: boolean;
}> = memo(({ latex, isLast }) => {
  const {
    palette: {
      primary: { light, dark },
    },
  } = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        marginLeft: 0.5,
        marginY: 0.5,
        paddingX: 2,
        paddingY: 0.75,
        borderLeftStyle: "solid",
        borderLeftColor: !isLast ? lighten(light, 0.5) : dark,
        borderLeftWidth: 6,
        borderRadius: "2px 7px 3px 5px",
        backgroundColor: !isLast ? lighten(light, 0.87) : "secondary.light",
        backgroundImage:
          "linear-gradient(178deg, transparent 0, rgba(255,255,255,0.2) 100%)",
        boxShadow: "2px 2px 0 rgba(37, 71, 106, 0.08)",
        transform: isLast ? "rotate(-0.2deg)" : "none",
      }}
    >
      <MathJax dynamic>{latex}</MathJax>
    </Box>
  );
});
