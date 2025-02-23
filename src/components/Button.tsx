import { FC, PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { FontSize } from '@type/common';

type ButtonSize = 'small' | 'medium' | 'large' | 'full' | 'fit';

interface ButtonProps extends PropsWithChildren {
  openEditing?: VoidFunction;
  size?: ButtonSize;
  style?: CSSProperties;
  textSize?: FontSize;
}

const StyledButton = styled.button<{
  $size: ButtonSize;
}>`
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  background-color: #fff;
  span {
    color: #641aee;
  }
`;

const Button: FC<ButtonProps> = ({
  children,
  openEditing,
  style,
  size = 'full',
}) => {
  return (
    <StyledButton style={style} $size={size} onClick={openEditing}>
      {children}
    </StyledButton>
  );
};

export default Button;
