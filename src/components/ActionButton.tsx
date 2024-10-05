import { FC, ReactNode } from "react";
import styled from "styled-components";
import PlusIcon from "./icons/PlusIcon";

const actionButtonSizes: Record<ActionButtonSize, string> = {
  small: "86px",
  medium: "180px",
  large: "240px",
};

type ActionButtonSize = "small" | "medium" | "large";

interface ActionButtonProps {
  handleClick: VoidFunction;
  size?: ActionButtonSize;
  icon?: ReactNode;
}

const StyledButton = styled.button<{
  $size: ActionButtonSize;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #9813d7;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => actionButtonSizes[props.$size]};
  color: #9813d7;
`;

const ActionButton: FC<ActionButtonProps> = ({
  handleClick,
  size = "medium",
  icon = <PlusIcon size={12} />,
}) => {
  return (
    <StyledButton onClick={handleClick} $size={size}>
      {icon}
    </StyledButton>
  );
};

export default ActionButton;
