import { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { Text } from "./Typography";
import { FontSize } from "@type/common";

const textButtonSizes: Record<TextButtonSize, string> = {
  small: "86px",
  medium: "180px",
  large: "240px",
  fullSize: "100%",
  fit: "fit-content",
};

type TextButtonSize = "small" | "medium" | "large" | "fullSize" | "fit";

interface TextButtonProps {
  text: string;
  openEditing: VoidFunction;
  size?: TextButtonSize;
  style?: CSSProperties;
  textSize?: FontSize;
}

const StyledButton = styled.button<{
  $size: TextButtonSize;
}>`
  background-color: #fff;
  width: 100%;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => textButtonSizes[props.$size]};
  color: #fff;
`;

const TextButton: FC<TextButtonProps> = ({
  text,
  openEditing,
  style,
  textSize = "default",
  size = "fullSize",
}) => {
  return (
    <StyledButton style={style} $size={size} onDoubleClick={openEditing}>
      <Text $size={textSize} $color={"#641AEE"}>
        {text}
      </Text>
    </StyledButton>
  );
};

export default TextButton;
