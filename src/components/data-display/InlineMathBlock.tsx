import { MathJax } from "better-react-mathjax";
import { type FC, memo } from "react";

export const InlineMathBlock: FC<{
  expr: string;
}> = memo(({ expr }) => {
  return <MathJax inline dynamic>{expr.normalize("NFC")}</MathJax>;
});
