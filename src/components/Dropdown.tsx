import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #fff;
  padding: 6px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: 120px;
  width: 100%;
  color: #641aee;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  padding: 9px;
  bottom: -90px;
  max-height: 180px;
  height: 180px;
  transform: translateY(50%);
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: auto;
  max-width: 280px;
  width: 230px;
  text-align: center;
  z-index: 1000;
`;

interface DropdownProps<T> {
  options: T[];
  selectedOption: T | null;
  setSelectedOption: (n: T) => void;
}

const Dropdown = <T extends { id: number; name: string }>({
  options = [],
  selectedOption,
  setSelectedOption,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLUListElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
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
        {selectedOption?.name || 'Выбрать'}
      </StyledButton>
      {isOpen && (
        <StyledDropdown ref={dropdownRef}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              style={{
                cursor: 'pointer',
                padding: 5,
                fontSize: 18,
              }}
            >
              {option.name}{' '}
            </li>
          ))}
        </StyledDropdown>
      )}
    </div>
  );
};

export default Dropdown;
