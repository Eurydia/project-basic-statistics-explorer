export const formatNumberParentheses = (
  n: number,
  parenNegative: boolean = false,
) => {
  return n < 0 && parenNegative ? `(${n})` : n.toString();
};
