import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./libs/chart/init";
import { App } from "./app/App";

const root = document.getElementById("root");

if (root === null) {
  throw Error("missing root element");
}
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
