import { MathJax } from "better-react-mathjax";
import { type FC, memo } from "react";

type Props = {
  expr: string;
};
export const MathBlock: FC<Props> = memo(({ expr }) => {
  return <MathJax dynamic>{expr.normalize("NFC")}</MathJax>;
});
