import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const NotebookPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  isolation: "isolate",
  overflow: "visible",
  backgroundColor: theme.palette.background.paper,
  backgroundImage:
    "repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(74, 132, 173, 0.1) 32px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: "7px 11px 8px 10px",
  boxShadow: "7px 8px 0 rgba(37, 71, 106, 0.13)",
})) as typeof Paper;
