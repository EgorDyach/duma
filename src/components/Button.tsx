import { FC, PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { FontSize } from '@type/common';
import { LoaderIcon } from 'react-hot-toast';

type ButtonSize = 'small' | 'medium' | 'large' | 'full' | 'fit';

interface ButtonProps extends PropsWithChildren {
  onClick?: VoidFunction;
  size?: ButtonSize;
  style?: CSSProperties;
  textSize?: FontSize;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<{
  $size: ButtonSize;
  onClick?: VoidFunction;
}>`
  display: flex;
  align-items: center;
  gap: 4px;
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

  &:disabled {
    color: #999;
    border-color: #999;
    * {
      color: #999;
    }
    &:hover {
      box-shadow: 0px 0px 10px #999;
      transform: scale(1.025);
    }
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
  isLoading,
  className,
  disabled,
  size = 'full',
}) => {
  return (
    <StyledButton
      className={className}
      style={style}
      $size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <LoaderIcon style={{ borderRightColor: '#641aee' }} />}
      {children}
    </StyledButton>
  );
};

export default Button;
