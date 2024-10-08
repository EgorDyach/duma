import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import styled from "styled-components";
import { Text } from "./Typography";
import Flex from "./Flex";

const txextButtonWithLabelSizes: Record<TextButtonWithLabelSize, string> = {
  small: "86px",
  medium: "180px",
  large: "240px",
  fullSize: "100%",
};

type TextButtonWithLabelSize = "small" | "medium" | "large" | "fullSize";

interface TextButtonWithLabelProps {
  text: string;
  setText: (n: string) => void;
  size?: TextButtonWithLabelSize;
  isActive: boolean;
  setIsActive: VoidFunction;
  label?: ReactNode;
}

const StyledButton = styled.button<{
  $active: boolean;
  $isEditing?: boolean;
  $size: TextButtonWithLabelSize;
}>`
  background-color: ${(props) => (props.$active ? "#9813D7" : "#fff")};
  width: 86px;
  padding: ${(props) => (props.$isEditing ? "7px 11px" : "11px")};
  border-radius: 9px;
  border: 1.2px solid #9813d7;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => txextButtonWithLabelSizes[props.$size]};
  color: ${(props) => (props.$active ? "#fff" : "#9813D7")};
`;

const StyledInput = styled.input<{ $active: boolean; $isEditing: boolean }>`
  background-color: ${(props) => (props.$active ? "#9813D7" : "#fff")};
  width: calc(100% - 31px);
  padding: 4px;
  border: none;
  outline: none;
  font-size: 14px;
  transition: 0.2s ease-in-out;
  height: ${(props) => (props.$isEditing ? "100%" : 0)};
  padding: ${(props) => (props.$isEditing ? 11 : 0)};
  border-bottom-width: ${(props) => (props.$isEditing ? 1.2 : 0)};
  color: ${(props) => (props.$active ? "#fff" : "#9813D7")};
`;

const TextButtonWithLabel: FC<TextButtonWithLabelProps> = ({
  text,
  setText,
  size = "medium",
  isActive,
  setIsActive,
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(
    typeof text === "string" ? text : ""
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isEditing) return;
    setIsActive();
    console.log(isActive);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempText(text);
    if (!isEditing) setIsActive();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setText(tempText);
      setIsEditing(false);
    } else if (e.key === "Escape") {
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
      <Flex justify="center" align="center" gap="3px">
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
          <Text $size="small" $color={isActive ? "#fff" : "#9813D7"}>
            {text}
          </Text>
        )}
        <span>{label}</span>
      </Flex>
    </StyledButton>
  );
};

export default TextButtonWithLabel;
