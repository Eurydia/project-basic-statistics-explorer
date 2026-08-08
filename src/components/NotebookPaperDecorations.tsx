import { useTheme } from "@mui/material/styles";

export const NotebookPaperDecorations = () => {
  const theme = useTheme();

  return (
    <>
      <span
        style={{
          position: "absolute",
          zIndex: 2,
          top: -8,
          left: "50%",
          display: "block",
          width: 88,
          height: 22,
          backgroundColor: "rgba(242, 202, 82, 0.66)",
          boxShadow: "0 1px 2px rgba(89, 66, 22, 0.16)",
          clipPath: "polygon(3% 8%, 98% 0, 94% 92%, 0 100%)",
          pointerEvents: "none",
          transform: "translateX(-50%) rotate(-1.5deg)",
        }}
      />
      <span
        style={{
          position: "absolute",
          zIndex: 0,
          top: 15,
          right: 18,
          display: "block",
          width: 20,
          height: 15,
          border: "2px solid",
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
