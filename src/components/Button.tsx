import { FC, PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { FontSize } from '@type/common';

type ButtonSize = 'small' | 'medium' | 'large' | 'full' | 'fit';

interface ButtonProps extends PropsWithChildren {
  onClick?: VoidFunction;
  size?: ButtonSize;
  style?: CSSProperties;
  textSize?: FontSize;
}

const StyledButton = styled.button<{
  $size: ButtonSize;
  onClick?: VoidFunction;
}>`
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  background-color: #fff;
  * {
    color: #641aee;
  }
  ${({ onClick }) =>
    onClick
      ? `
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 10px #b39ddc;
      transform: scale(1.025);
    }
    &:active {
      transform: scale(0.9);
    }
  `
      : ''}
`;

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  style,
  size = 'full',
}) => {
  return (
    <StyledButton style={style} $size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
