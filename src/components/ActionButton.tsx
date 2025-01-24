import { FC, ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';
import PlusIcon from './icons/PlusIcon';

const actionButtonSizes: Record<ActionButtonSize, string> = {
  small: '86px',
  medium: '180px',
  large: '240px',
};

type ActionButtonSize = 'small' | 'medium' | 'large';

interface ActionButtonProps {
  handleClick: VoidFunction;
  size?: ActionButtonSize;
  icon?: ReactNode;
  style?: CSSProperties;
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
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => actionButtonSizes[props.$size]};
  color: #641aee;
`;

const ActionButton: FC<ActionButtonProps> = ({
  handleClick,
  style,
  size = 'medium',
  icon = <PlusIcon size={12} />,
}) => {
  return (
    <StyledButton style={style} onClick={handleClick} $size={size}>
      {icon}
    </StyledButton>
  );
};

export default ActionButton;
