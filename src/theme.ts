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
      styleOverrides: (theme) => ({
        "html, body, #root": { minHeight: "100%" },
        body: {
          backgroundColor: theme.palette.background.default,
          backgroundImage: [
            `linear-gradient(${theme.alpha(theme.palette.primary.main, 0.12)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
            `linear-gradient(90deg, ${theme.alpha(theme.palette.primary.main, 0.12)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
            `linear-gradient(${theme.alpha(theme.palette.primary.main, 0.08)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
            `linear-gradient(90deg, ${theme.alpha(theme.palette.primary.main, 0.08)} ${theme.spacing(0.125)}, transparent ${theme.spacing(0.125)})`,
            `linear-gradient(90deg, transparent ${theme.spacing(5.875)}, ${theme.alpha(theme.palette.secondary.main, 0.25)} ${theme.spacing(6)}, transparent ${theme.spacing(6.125)})`,
          ].join(", "),
          backgroundSize: [
            theme.spacing(3, 3),
            theme.spacing(3, 3),
            theme.spacing(15, 15),
            theme.spacing(15, 15),
            "100% 100%",
          ].join(", "),
          backgroundAttachment: "fixed",
        },
      }),
    },
    MuiStack: { defaultProps: { useFlexGap: true } },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: "none",
        }),
        elevation4: ({ theme }) => ({
          boxShadow: `${theme.spacing(0.75)} ${theme.spacing(0.875)} 0 ${theme.alpha(theme.palette.text.primary, 0.13)}`,
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.divider,
          borderRadius: theme.spacing(0.625, 1.125, 0.75, 1),
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(0.5, 1, 0.625, 0.875),
          borderWidth: theme.spacing(0.25),
          ":hover": { borderWidth: theme.spacing(0.25) },
        }),
        contained: ({ theme }) => ({
          boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.375)} 0 ${theme.alpha(theme.palette.text.primary, 0.22)}`,
          transform: "rotate(-0.35deg)",
        }),
        outlined: ({ theme }) => ({
          backgroundColor: theme.alpha(theme.palette.background.paper, 0.72),
          boxShadow: `${theme.spacing(0.25)} ${theme.spacing(0.25)} 0 ${theme.alpha(theme.palette.text.primary, 0.12)}`,
          transform: "rotate(0.3deg)",
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.alpha(theme.palette.background.paper, 0.86),
          borderRadius: theme.spacing(0.625, 1.125, 0.75, 1),
          boxShadow: `inset ${theme.spacing(0.5)} 0 0 ${theme.alpha(theme.palette.secondary.main, 0.18)}`,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: theme.spacing(0.125),
          borderStyle: "dashed",
          borderColor: theme.alpha(theme.palette.secondary.dark, 0.45),
          borderRadius: theme.spacing(0.625, 1.125, 0.75, 1),
          boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.375)} 0 ${theme.alpha(theme.palette.secondary.dark, 0.12)}`,
        }),
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
    divider: "#274b7147",
    text: { primary: "#243f5d", secondary: "#5f6e7d" },
  },
});
