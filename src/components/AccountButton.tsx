import React, { useState, useEffect, useRef, FC } from "react";
import styled from "styled-components";
import { Text } from "./Typography";
import Flex from "./Flex";

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
  handleDelete: VoidFunction;
}

const StyledDeleteButton = styled.button`
  background-color: #fff;
  color: red;
  outline: none;
  padding: 5px;
  width: 32px;
  cursor: pointer;
  height: 32px;
  border-radius: 5px;
`;

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
  handleDelete,
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
        <Flex gap="8px">
          <StyledInput
            $isEditing={isEditing}
            ref={inputRef}
            type="text"
            value={tempText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <StyledDeleteButton onClick={handleDelete}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0C5.89543 0 5 0.89543 5 2V3H3H1C0.447715 3 0 3.44772 0 4C0 4.55228 0.447715 5 1 5H2V19C2 20.6569 3.34315 22 5 22H15C16.6569 22 18 20.6569 18 19V5H19C19.5523 5 20 4.55228 20 4C20 3.44772 19.5523 3 19 3H17H15V2C15 0.895431 14.1046 0 13 0H7ZM13 3H7V2H13V3ZM6 5H14H16V19C16 19.5523 15.5523 20 15 20H5C4.44772 20 4 19.5523 4 19V5H6ZM9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44771 7 10V15C7 15.5523 7.44771 16 8 16C8.55228 16 9 15.5523 9 15V10ZM12 9C12.5523 9 13 9.44772 13 10V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V10C11 9.44771 11.4477 9 12 9Z"
                fill="currentColor"
              />
            </svg>
          </StyledDeleteButton>
        </Flex>
      ) : (
        <Text $color={"#fff"}>{text}</Text>
      )}
    </StyledButton>
  );
};

export default AccountButton;
