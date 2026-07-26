import { createTheme } from "@mui/material/styles";

export const notebookSurfaceSx = {
  position: "relative",
  isolation: "isolate",
  overflow: "visible",
  backgroundColor: "background.paper",
  backgroundImage:
    "repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(74, 132, 173, 0.1) 32px)",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "7px 11px 8px 10px",
  boxShadow: "7px 8px 0 rgba(37, 71, 106, 0.13)",
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: 2,
    top: -8,
    left: "50%",
    width: 88,
    height: 22,
    backgroundColor: "rgba(242, 202, 82, 0.66)",
    boxShadow: "0 1px 2px rgba(89, 66, 22, 0.16)",
    clipPath: "polygon(3% 8%, 98% 0, 94% 92%, 0 100%)",
    pointerEvents: "none",
    transform: "translateX(-50%) rotate(-1.5deg)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    top: 15,
    right: 18,
    width: 20,
    height: 15,
    border: "2px solid",
    borderColor: "secondary.main",
    borderRadius: "48% 42% 52% 45%",
    opacity: 0.46,
    pointerEvents: "none",
    transform: "rotate(13deg)",
  },
} as const;

export const notebookHeadingSx = {
  position: "relative",
  zIndex: 1,
  width: "fit-content",
  fontWeight: 800,
  "& > span": {
    paddingX: 0.5,
    boxDecorationBreak: "clone",
    WebkitBoxDecorationBreak: "clone",
    backgroundImage:
      "linear-gradient(178deg, transparent 0%, transparent 54%, rgba(255, 215, 106, 0.48) 55%, rgba(255, 215, 106, 0.48) 91%, transparent 92%)",
  },
} as const;

export const theme = createTheme({
  typography: {
    fontFamily: '"Noto Serif Thai", "Leelawadee UI", Tahoma, serif',
    h5: {
      fontFamily:
        '"Segoe Print", "Comic Sans MS", "Noto Serif Thai", "Leelawadee UI", cursive',
      lineHeight: 1.55,
    },
    button: {
      fontFamily:
        '"Segoe Print", "Comic Sans MS", "Noto Serif Thai", "Leelawadee UI", cursive',
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #root": { minHeight: "100%" },
        body: {
          backgroundColor: "#f8f2df",
          backgroundImage: [
            "linear-gradient(rgba(67, 128, 171, 0.12) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(67, 128, 171, 0.12) 1px, transparent 1px)",
            "linear-gradient(rgba(67, 128, 171, 0.08) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(67, 128, 171, 0.08) 1px, transparent 1px)",
            "linear-gradient(90deg, transparent 47px, rgba(221, 103, 103, 0.25) 48px, transparent 49px)",
          ].join(", "),
          backgroundSize:
            "24px 24px, 24px 24px, 120px 120px, 120px 120px, 100% 100%",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiStack: { defaultProps: { useFlexGap: true } },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: "#fffdf7", backgroundImage: "none" },
        elevation4: { boxShadow: "6px 7px 0 rgba(37, 71, 106, 0.13)" },
        outlined: {
          borderColor: "rgba(39, 75, 113, 0.28)",
          borderRadius: "5px 9px 6px 8px",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: "4px 8px 5px 7px",
          borderWidth: 2,
          "&:hover": { borderWidth: 2 },
        },
        contained: {
          boxShadow: "3px 3px 0 rgba(37, 71, 106, 0.22)",
          transform: "rotate(-0.35deg)",
        },
        outlined: {
          backgroundColor: "rgba(255, 253, 247, 0.72)",
          boxShadow: "2px 2px 0 rgba(37, 71, 106, 0.12)",
          transform: "rotate(0.3deg)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 253, 247, 0.86)",
          borderRadius: "5px 9px 6px 8px",
          boxShadow: "inset 4px 0 0 rgba(224, 104, 104, 0.18)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          border: "1px dashed rgba(126, 91, 16, 0.45)",
          borderRadius: "5px 9px 6px 8px",
          boxShadow: "3px 3px 0 rgba(126, 91, 16, 0.12)",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#8bb8d8",
      main: "#315f8a",
      dark: "#1f456d",
      contrastText: "#fffdf7",
    },
    secondary: {
      light: "#ffd76a",
      main: "#e9814f",
      dark: "#b65331",
      contrastText: "#2d4057",
    },
    background: { default: "#f8f2df", paper: "#fffdf7" },
    divider: "rgba(39, 75, 113, 0.28)",
    text: { primary: "#243f5d", secondary: "#5f6e7d" },
  },
});
