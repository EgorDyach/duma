import { withIndentStyles } from "@hocs/withIndentStyles";
import styled from "styled-components";
import { FontSize } from "@type/common";
import { getFontSizes } from "@lib/theme/fonts";
import { content, ContentColors } from "@lib/theme/colors";
import { media } from "@lib/theme/media";

export const Header = withIndentStyles(styled.h1``);

export const SubHeader = withIndentStyles(styled.h2``);
export const ItemTitle = withIndentStyles(styled.h3``);

export const Paragraph = withIndentStyles(styled.p`
  ${media.medium`
  font-size: 12px;
  `}
`);

export const Bold = withIndentStyles(
  styled.b<{ $size?: FontSize; $color?: ContentColors; $display?: string }>(
    ({ $size, $color, $display }) => `
    ${getFontSizes($size || "default")}
    font-weight: 600;
    color: ${content[$color || "primary"]};
    display: ${$display || "inline-block"}
  `,
  ),
);

export const Text = withIndentStyles(
  styled.div<{ $size?: FontSize; $color?: ContentColors }>(
    ({ $size, $color }) => `
    ${getFontSizes($size || "default")}
    color: ${content[$color || "primary"]};
  `,
  ),
);
