import { createTheme } from "@mui/material/styles";

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
