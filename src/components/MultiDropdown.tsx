import { AnyObject } from "@type/common";
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
  max-width: 170px;
  width: 100%;
  color: #9813d7;
`;

const StyledMultiDropdown = styled.ul`
  position: absolute;
  padding: 6px;
  bottom: -33px;
  height: 70px;
  transform: translateY(50%);
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: scroll;
  max-width: 170px;
  width: 100%;
  text-align: center;
  z-index: 1000;
`;

interface MultiDropdownProps<T> {
  options: T[];
  selectedOptions: T[];
  setSelectedOptions: (n: T[]) => void;
}

const MultiDropdown: React.FC<
  MultiDropdownProps<AnyObject & { id: number; name: string }>
> = ({ options = [], selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMultiDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (
    option: AnyObject & { id: number; name: string }
  ) => {
    if (selectedOptions.some((selected) => selected.id === option.id)) {
      setSelectedOptions(
        selectedOptions.filter((selected) => selected.id !== option.id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledButton onClick={toggleMultiDropdown}>
        {selectedOptions.length
          ? selectedOptions.map((el) => el.name).join(", ")
          : "Выберите профили"}
      </StyledButton>
      {isOpen && (
        <StyledMultiDropdown>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              style={{
                cursor: "pointer",
                padding: 5,
                fontSize: 14,
              }}
            >
              {option.name}{" "}
            </li>
          ))}
        </StyledMultiDropdown>
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

export default MultiDropdown;
