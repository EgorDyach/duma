import { isDescendant } from '@lib/utils/isDescendant';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import { ChevronSign } from './TreeNavigator/TreeNavigator';
import { Text } from './Typography';
import Input from './input/Input';

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
  padding-top: 60px;
  top: 48px;
  max-height: 180px;
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: auto;
  width: 280px;
  z-index: 1000;
`;

const InputWrapper = styled.div`
  margin-top: -60px;
  margin-inline: -6px;
  background-color: rgb(240, 240, 247);
  padding: 6px;
  position: fixed;
  width: 280px;
  border-radius: 10px;
`;

interface DropdownProps<T> {
  options: { id: T; name: string }[];
  selectedOption: T | null;
  setSelectedOption: (n: T) => void;
  label?: string;
  placeholder?: string;
}

const SearchableDropdown: React.FC<DropdownProps<string | number>> = ({
  options = [],
  selectedOption,
  setSelectedOption,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchValue('');
  };
  const handleOptionClick = (option: { id: string | number; name: string }) => {
    setSelectedOption(option.id);
    setSearchValue('');
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLUListElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !isDescendant(dropdownRef.current?.parentElement, e.target as HTMLElement)
    ) {
      setIsOpen(false);
      setSearchValue('');
    }
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
          <InputWrapper>
            <Input
              value={searchValue}
              onChange={setSearchValue}
              placeholder={placeholder}
            />
          </InputWrapper>
          {options
            .filter((el) =>
              el.name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()),
            )
            .map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
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

export default SearchableDropdown;
