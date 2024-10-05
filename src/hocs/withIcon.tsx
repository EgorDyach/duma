import styled from "styled-components";
import { FC } from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

export type IconWrapperProps = Omit<SVGProps, "height" | "width"> & {
  size?: number;
  height?: string;
  width?: string;
};

export const IconWrapper = styled.div<{
  $size?: number;
  $height?: string;
  $width?: string;
}>`
  fill: currentColor;
  height: ${({ $size, $height }) =>
    $height ? $height : $size ? `${$size}px` : ""};
  width: ${({ $size, $height, $width }) =>
    $width || (!$height && $size ? `${$size}px` : "")};
  line-height: ${({ $size, $height }) =>
    !$height && $size ? `${$size}px` : ""};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const withIcon: (
  Component: React.ComponentType<IconWrapperProps>,
) => FC<IconWrapperProps> = (Component) => (props) => (
  <IconWrapper $size={props.size} $height={props.height} $width={props.width}>
    <Component {...props} />
  </IconWrapper>
);

// eslint-disable-next-line react-refresh/only-export-components
export default withIcon;
