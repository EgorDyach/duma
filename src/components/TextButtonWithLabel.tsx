import React, { useState, useEffect, useRef, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from './Typography';
import Flex from './Flex';

const txextButtonWithLabelSizes: Record<TextButtonWithLabelSize, string> = {
  small: '86px',
  medium: '180px',
  large: '240px',
  fullSize: '100%',
};

type TextButtonWithLabelSize = 'small' | 'medium' | 'large' | 'fullSize';

interface TextButtonWithLabelProps {
  text: string;
  setText: (n: string) => void;
  size?: TextButtonWithLabelSize;
  label?: ReactNode;
  id?: number;
}

const StyledButton = styled.button<{
  $isEditing?: boolean;
  $size: TextButtonWithLabelSize;
}>`
  /* background-color: ${(props) => (props.$isEditing ? '#fff' : '#641AEE')}; */
  /* color: ${(props) => (props.$isEditing ? '#641AEE' : '#fff')}; */
  background-color: #fff;
  width: 86px;
  padding: ${(props) => (props.$isEditing ? '7px 11px' : '11px')};
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => txextButtonWithLabelSizes[props.$size]};
  color: #641aee;
  flex: 1;
`;

const StyledInput = styled.input<{ $isEditing: boolean }>`
  background-color: transparent;
  width: calc(100% - 31px);
  padding: 4px;
  border: none;
  outline: none;
  font-size: 14px;
  transition: 0.2s ease-in-out;
  height: ${(props) => (props.$isEditing ? '100%' : 0)};
  padding: ${(props) => (props.$isEditing ? 11 : 0)};
  border-bottom-width: ${(props) => (props.$isEditing ? 1.2 : 0)};
  color: ${(props) => (props.$isEditing ? '#641AEE' : '#fff')};
`;

const TextButtonWithLabel: FC<TextButtonWithLabelProps> = ({
  text,
  id,
  setText,
  size = 'medium',
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(
    typeof text === 'string' ? text : '',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempText(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setText(tempText);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempText(text);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      isEditing &&
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setText(tempText);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, tempText]);

  return (
    <StyledButton
      $size={size}
      $isEditing={isEditing}
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
      id={id + ''}
    >
      <Flex justify="center" align="center" gap="3px">
        {isEditing ? (
          <StyledInput
            $isEditing={isEditing}
            ref={inputRef}
            type="text"
            value={tempText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Text $size="small" $color="#641aee">
            {text}
          </Text>
        )}
        <span>{label}</span>
      </Flex>
    </StyledButton>
  );
};

export default TextButtonWithLabel;
