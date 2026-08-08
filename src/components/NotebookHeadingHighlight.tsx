import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const NotebookHeadingHighlight = styled(Typography)({
  paddingLeft: 4,
  paddingRight: 4,
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
  backgroundImage:
    "linear-gradient(178deg, transparent 0%, transparent 54%, rgba(255, 215, 106, 0.48) 55%, rgba(255, 215, 106, 0.48) 91%, transparent 92%)",
});
