import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Text } from './Typography';
import { FontSize } from '@type/common';

const textButtonSizes: Record<TextButtonSize, string> = {
  small: '86px',
  medium: '180px',
  large: '240px',
  full: '100%',
  fit: 'fit-content',
};

type TextButtonSize = 'small' | 'medium' | 'large' | 'full' | 'fit';

interface TextButtonProps {
  text: string;
  openEditing: VoidFunction;
  size?: TextButtonSize;
  style?: CSSProperties;
  isActive?: boolean;
  textSize?: FontSize;
}

const StyledButton = styled.button<{
  $size: TextButtonSize;
  $isActive: boolean;
}>`
  width: 100%;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => textButtonSizes[props.$size]};
  background-color: ${(props) => (props.$isActive ? '#641AEE' : '#fff')};
  color: ${(props) => (props.$isActive ? '#fff' : '#641AEE')};
`;

const TextButton: FC<TextButtonProps> = ({
  text,
  isActive = false,
  openEditing,
  style,
  textSize = 'default',
  size = 'full',
}) => {
  return (
    <StyledButton
      $isActive={isActive}
      style={style}
      $size={size}
      onDoubleClick={openEditing}
    >
      <Text $size={textSize} $color={isActive ? '#fff' : '#641AEE'}>
        {text}
      </Text>
    </StyledButton>
  );
};

export default TextButton;
