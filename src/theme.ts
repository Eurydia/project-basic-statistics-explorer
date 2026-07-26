import { createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

export const theme = createTheme({
  typography: { fontFamily: "Noto Serif Thai; serif" },
  components: {
    MuiStack: {
      defaultProps: { useFlexGap: true },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: blue,
    secondary: orange,
    background: {
      default: blue.A100,
      paper: "#fff",
    },
    text: { primary: blue[900] },
  },
});
