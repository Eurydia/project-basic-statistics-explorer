import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const NotebookPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  isolation: "isolate",
  overflow: "visible",
  backgroundColor: theme.palette.background.paper,
  backgroundImage:
    `repeating-linear-gradient(180deg, transparent 0, transparent ${theme.spacing(3.875)}, ${theme.alpha(theme.palette.primary.main, 0.1)} ${theme.spacing(4)})`,
  borderWidth: theme.spacing(0.125),
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(0.875, 1.375, 1, 1.25),
  boxShadow: `${theme.spacing(0.875)} ${theme.spacing(1)} 0 ${theme.alpha(theme.palette.text.primary, 0.13)}`,
})) as typeof Paper;
