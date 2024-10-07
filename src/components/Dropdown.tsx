import { AccountItem } from "@modules/rootPage/RootPage";
import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #fff;
  padding: 6px;
  border-radius: 9px;
  border: 1.2px solid #9813d7;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: 120px;
  width: 100%;
  color: #9813d7;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  padding: 9px;
  bottom: -12px;
  max-height: 60px;
  height: 100%;
  transform: translateY(50%);
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: scroll;
  max-width: 120px;
  width: 100%;
  text-align: center;
  z-index: 1000;
`;

interface DropdownProps {
  options: AccountItem[];
  selectedOption: AccountItem | null;
  setSelectedOption: (n: AccountItem) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: AccountItem) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledButton onClick={toggleDropdown}>
        {selectedOption?.name || "Выберите профиль"}
      </StyledButton>
      {isOpen && (
        <StyledDropdown>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              style={{
                cursor: "pointer",
                padding: 5,
                fontSize: 12,
              }}
            >
              {option.name}{" "}
            </li>
          ))}
        </StyledDropdown>
      )}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default Dropdown;
