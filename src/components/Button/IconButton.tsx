import { FC } from "react";
import { withIndentStyles } from "@hocs/withIndentStyles";
import { ButtonProps } from "@components/Button/types";
import styled from "styled-components";

type IconButtonProps = Omit<ButtonProps, "children">;

const StyledIconButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const RawButton: FC<IconButtonProps> = ({ onClick, disabled, icon }) => {
  return (
    <StyledIconButton onClick={onClick} disabled={disabled}>
      {icon}
    </StyledIconButton>
  );
};

const IconButton = withIndentStyles(RawButton);

export default IconButton;
