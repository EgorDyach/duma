import React, { useState, useEffect, useRef, FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Text } from './Typography';
import { FontSize } from '@type/common';

const studyPlanButtonSizes: Record<StudyPlanButtonSize, string> = {
  small: '86px',
  medium: '180px',
  large: '240px',
  fullSize: '100%',
  fit: 'fit-content',
};

type StudyPlanButtonSize = 'small' | 'medium' | 'large' | 'fullSize' | 'fit';

interface StudyPlanButtonProps {
  text: string;
  setText?: (n: string) => void;
  size?: StudyPlanButtonSize;
  isActive: boolean;
  setIsActive?: VoidFunction;
  style?: CSSProperties;
  textSize?: FontSize;
}

const StyledButton = styled.button<{
  $active: boolean;
  $isEditing?: boolean;
  $size: StudyPlanButtonSize;
}>`
  background-color: ${(props) => (props.$active ? '#641AEE' : '#fff')};
  width: 248px;
  padding: ${(props) => (props.$isEditing ? '7px 11px' : '11px')};
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => studyPlanButtonSizes[props.$size]};
  color: ${(props) => (props.$active ? '#fff' : '#641AEE')};
  flex: 10;
`;

const StyledInput = styled.input<{ $active: boolean; $isEditing: boolean }>`
  background-color: ${(props) => (props.$active ? '#641AEE' : '#fff')};
  width: calc(100% - 20px);
  padding: 4px;
  border: none;
  border-bottom: 1.2px solid ${(props) => (props.$active ? '#fff' : '#641AEE')};
  outline: none;
  transition: 0.2s ease-in-out;
  height: ${(props) => (props.$isEditing ? '100%' : 0)};
  padding: ${(props) => (props.$isEditing ? 11 : 0)};
  border-bottom-width: ${(props) => (props.$isEditing ? 1.2 : 0)};
  color: ${(props) => (props.$active ? '#fff' : '#641AEE')};
`;

const StudyPlanButton: FC<StudyPlanButtonProps> = ({
  text,
  setText,
  style,
  size = 'medium',
  isActive,
  setIsActive,
  textSize = 'default',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(
    typeof text === 'string' ? text : '',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isEditing || !setIsActive) return;
    setIsActive();
  };

  const handleDoubleClick = () => {
    if (!setIsActive) return;
    setIsEditing(true);
    setTempText(text);
    if (!isEditing) setIsActive();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && setText) {
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
      setText &&
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
      onClick={handleClick}
      $active={isActive}
      $size={size}
      $isEditing={isEditing}
      ref={containerRef}
      style={style}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <StyledInput
          $active={isActive}
          $isEditing={isEditing}
          ref={inputRef}
          type="text"
          value={tempText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Text $size={textSize} $color={isActive ? '#fff' : '#641AEE'}>
          {text}
        </Text>
      )}
    </StyledButton>
  );
};

export default StudyPlanButton;
