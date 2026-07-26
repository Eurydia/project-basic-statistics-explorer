import { MathJax } from "better-react-mathjax";
import { type FC, memo } from "react";

export const MathBlock: FC<{
  expr: string;
}> = memo(({ expr }) => {
  return <MathJax dynamic>{expr.normalize("NFC")}</MathJax>;
});
