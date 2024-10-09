import { FC } from "react";
import styled from "styled-components";
import { Text } from "./Typography";

const textButtonSizes: Record<TextButtonSize, string> = {
  small: "86px",
  medium: "180px",
  large: "240px",
  fullSize: "100%",
};

type TextButtonSize = "small" | "medium" | "large" | "fullSize";

interface TextButtonProps {
  text: string;
  openEditing: VoidFunction;
  size?: TextButtonSize;
}

const StyledButton = styled.button<{
  $size: TextButtonSize;
}>`
  background-color: #fff;
  width: 100%;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #9813d7;
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
  size = "fullSize",
}) => {
  return (
    <StyledButton $size={size} onDoubleClick={openEditing}>
      <Text $color={"#9813D7"}>{text}</Text>
    </StyledButton>
  );
};

export default TextButton;
