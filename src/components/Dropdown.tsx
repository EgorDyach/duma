import { isDescendant } from '@lib/utils/isDescendant';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import { ChevronSign } from './TreeNavigator/TreeNavigator';
import { Text } from './Typography';

const StyledButton = styled.button`
  background-color: #fff;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  color: #641aee;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  padding: 6px;
  top: 48px;
  max-height: 180px;
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: auto;
  max-width: 280px;
  z-index: 1000;
`;

interface DropdownProps<T> {
  options: { id: T; name: string }[];
  selectedOption: T | null;
  setSelectedOption: (n: any) => void;
  label?: string;
}

const Dropdown: React.FC<DropdownProps<string | number>> = ({
  options = [],
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (id: string | number) => {
    setSelectedOption(id);
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLUListElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !isDescendant(dropdownRef.current?.parentElement, e.target as HTMLElement)
    )
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <StyledButton onClick={toggleDropdown}>
        <Flex gap="5px">
          <ChevronSign
            stroke="#641aee"
            width="16px"
            height="16px"
            $isOpen={isOpen}
          />
          <Text $color="#641aee">
            {options.find((option) => option.id === selectedOption)?.name ||
              'Выбрать'}
          </Text>
        </Flex>
      </StyledButton>
      {isOpen && (
        <StyledDropdown ref={dropdownRef}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              style={{
                cursor: 'pointer',
                padding: 5,
                fontSize: 18,
              }}
            >
              {option.name}
            </li>
          ))}
        </StyledDropdown>
      )}
    </div>
  );
};

export default Dropdown;
