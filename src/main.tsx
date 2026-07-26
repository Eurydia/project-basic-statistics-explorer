import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { MathJaxContext } from "better-react-mathjax";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { theme } from "./theme";

const root = document.getElementById("root");

if (root === null) {
  throw Error("missing root element");
}
createRoot(root).render(
  <StrictMode>
    <MathJaxContext
      renderMode="post"
      hideUntilTypeset="every"
      config={{
        loader: ["input/tex", "output/svg"],
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MathJaxContext>
  </StrictMode>,
);
