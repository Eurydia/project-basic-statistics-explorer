import { styled } from "@mui/material/styles";

export const NotebookHeadingHighlight = styled("span")(({ theme }) => ({
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
  backgroundImage:
    `linear-gradient(178deg, transparent 0%, transparent 54%, ${theme.alpha(theme.palette.secondary.light, 0.48)} 55%, ${theme.alpha(theme.palette.secondary.light, 0.48)} 91%, transparent 92%)`,
}));
