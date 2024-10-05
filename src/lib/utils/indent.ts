import { Indent, IndentStylesProps } from "@type/common";
import { indent } from "@lib/theme/sizes";

const getIndent = (i: Indent) => indent[i];

export const getIndentStyles = ({
  $top = "none",
  $left = "none",
}: IndentStylesProps) => `
  ${$top !== "none" ? `margin-top: ${getIndent($top)} !important;` : ""}
  ${$left !== "none" ? `margin-left: ${getIndent($left)} !important;` : ""}
`;
