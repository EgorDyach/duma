import styled from "styled-components";
import { IndentStylesProps } from "@type/common";
import { getIndentStyles } from "@lib/utils/indent";

export function withIndentStyles<T>(Component: React.ComponentType<T>) {
  return styled(Component)<IndentStylesProps>`
    ${(indents: IndentStylesProps) => getIndentStyles(indents)}
  `;
}
