import React, { useState, useEffect, useRef, FC } from "react";
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
  setText: (n: string) => void;
  size?: TextButtonSize;
  initIsActive?: boolean;
  onSave: (newText: string) => void; // Добавлено
}

const StyledButton = styled.button<{
  $active: boolean;
  $isEditing?: boolean;
  $size: TextButtonSize;
}>`
  background-color: ${(props) => (props.$active ? "#9813D7" : "#fff")};
  width: 100%;
  padding: ${(props) => (props.$isEditing ? "7px 11px" : "11px")};
  border-radius: 9px;
  border: 1.2px solid #9813d7;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => textButtonSizes[props.$size]};
  color: ${(props) => (props.$active ? "#fff" : "#9813D7")};
`;

const StyledInput = styled.input<{ $active: boolean; $isEditing: boolean }>`
  background-color: ${(props) => (props.$active ? "#9813D7" : "#fff")};
  width: calc(100% - 20px);
  padding: 4px;
  border: none;
  border-bottom: 1.2px solid ${(props) => (props.$active ? "#fff" : "#9813D7")};
  outline: none;
  transition: 0.2s ease-in-out;
  height: ${(props) => (props.$isEditing ? "100%" : 0)};
  padding: ${(props) => (props.$isEditing ? 11 : 0)};
  border-bottom-width: ${(props) => (props.$isEditing ? 1.2 : 0)};
  color: ${(props) => (props.$active ? "#fff" : "#9813D7")};
`;

const TextButton: FC<TextButtonProps> = ({
  text,
  setText,
  size = "medium",
  initIsActive = false,
  onSave, // Добавлено
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(initIsActive);
  const [tempText, setTempText] = useState(
    typeof text === "string" ? text : ""
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isEditing) return;
    setIsActive((prevColor) => !prevColor);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempText(text);
    if (!isEditing) setIsActive(!isActive);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(tempText); // Сохранение нового текста
      setText(tempText);
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTempText(text);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      onSave(tempText); // Сохранение нового текста
      setText(tempText);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, tempText]);

  return (
    <StyledButton
      onClick={handleClick}
      $active={isActive}
      $size={size}
      $isEditing={isEditing}
      ref={containerRef}
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
        <Text $color={isActive ? "#fff" : "#9813D7"}>{text}</Text>
      )}
    </StyledButton>
  );
};

export default TextButton;
