import { useTheme } from "@mui/material/styles";

export const NotebookPaperDecorations = () => {
  const theme = useTheme();

  return (
    <>
      <span
        style={{
          position: "absolute",
          zIndex: 2,
          top: theme.spacing(-1),
          left: "50%",
          display: "block",
          width: theme.spacing(11),
          height: theme.spacing(2.75),
          backgroundColor: theme.alpha(theme.palette.secondary.light, 0.66),
          boxShadow: `0 ${theme.spacing(0.125)} ${theme.spacing(0.25)} ${theme.alpha(theme.palette.secondary.dark, 0.16)}`,
          clipPath: "polygon(3% 8%, 98% 0, 94% 92%, 0 100%)",
          pointerEvents: "none",
          transform: "translateX(-50%) rotate(-1.5deg)",
        }}
      />
      <span
        style={{
          position: "absolute",
          zIndex: 0,
          top: theme.spacing(1.875),
          right: theme.spacing(2.25),
          display: "block",
          width: theme.spacing(2.5),
          height: theme.spacing(1.875),
          borderWidth: theme.spacing(0.25),
          borderStyle: "solid",
          borderColor: theme.palette.secondary.main,
          borderRadius: "48% 42% 52% 45%",
          opacity: 0.46,
          pointerEvents: "none",
          transform: "rotate(13deg)",
        }}
      />
    </>
  );
};
