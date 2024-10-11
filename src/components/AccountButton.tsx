import React, { useState, useEffect, useRef, FC } from "react";
import styled from "styled-components";
import { Text } from "./Typography";

const accountButtonSizes: Record<AccountButtonSize, string> = {
  small: "86px",
  medium: "180px",
  large: "240px",
  fullSize: "100%",
};

type AccountButtonSize = "small" | "medium" | "large" | "fullSize";

interface AccountButtonProps {
  text: string;
  setText: (n: string) => void;
  size?: AccountButtonSize;
}

const StyledButton = styled.button<{
  $isEditing?: boolean;
  $size: AccountButtonSize;
}>`
  background-color: #641aee;
  width: 100%;
  padding: ${(props) => (props.$isEditing ? "7px 11px" : "11px")};
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: ${(props) => accountButtonSizes[props.$size]};
  color: #fff;
  flex: 1;
`;

const StyledInput = styled.input<{ $isEditing: boolean }>`
  background-color: #641aee;
  width: calc(100% - 20px);
  padding: 4px;
  border: none;
  border-bottom: 1.2px solid #fff;
  outline: none;
  transition: 0.2s ease-in-out;
  height: ${(props) => (props.$isEditing ? "100%" : 0)};
  padding: ${(props) => (props.$isEditing ? 11 : 0)};
  border-bottom-width: ${(props) => (props.$isEditing ? 1.2 : 0)};
  color: #fff;
`;

const AccountButton: FC<AccountButtonProps> = ({
  text,
  setText,
  size = "medium",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(
    typeof text === "string" ? text : ""
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
      $size={size}
      $isEditing={isEditing}
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
    >
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
        <Text $color={"#fff"}>{text}</Text>
      )}
    </StyledButton>
  );
};

export default AccountButton;
