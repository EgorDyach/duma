import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Checkbox from './Checkbox';

const StyledButton = styled.button`
  background-color: #fff;
  padding: 11px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  /* max-width: 170px; */
  width: 100%;
  color: #641aee;
  font-size: 18px;
`;

const StyledMultiDropdown = styled.ul`
  position: absolute;
  padding: 6px;
  top: 48px;
  /* bottom: -82px; */
  /* height: 180px; */
  /* transform: translateY(50%); */
  left: 0;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #f0f0f7;
  overflow-y: auto;
  /* max-width: 280px; */
  /* width: 230px; */
  text-align: center;
  z-index: 1000;
  color: #000;
`;

interface MultiDropdownProps<T> {
  options: { id: T; name: string }[];
  selectedOptions: T[] | null;
  setSelectedOptions: (n: T) => void;
  label?: string;
}

const MultiDropdown: React.FC<MultiDropdownProps<string | number>> = ({
  options = [],
  selectedOptions,
  setSelectedOptions,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMultiDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (id: string | number) => {
    // if (selectedOptions) {
    //   if (selectedOptions.some((selected) => selected === id)) {
    //     setSelectedOptions(
    //       selectedOptions.filter((selected) => selected !== id),
    //     );
    //   } else {
    //     setSelectedOptions([...selectedOptions, id]);
    //   }
    // } else setSelectedOptions([id]);
    console.log(selectedOptions, id);
    setSelectedOptions(id);
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
      <StyledButton onClick={toggleMultiDropdown}>
        {label || 'Выбрать...'}
      </StyledButton>
      {isOpen && (
        <StyledMultiDropdown ref={dropdownRef}>
          {options.map((option) => (
            <Flex key={option.id}>
              <Checkbox
                checked={
                  selectedOptions ? selectedOptions.includes(option.id) : false
                }
                setChecked={() => handleOptionClick(option.id)}
              />
              <li
                onClick={() => handleOptionClick(option.id)}
                style={{
                  cursor: 'pointer',
                  padding: 5,
                  fontSize: 18,
                  textWrap: 'nowrap',
                }}
              >
                {option.name}{' '}
              </li>
            </Flex>
          ))}
        </StyledMultiDropdown>
      )}
    </div>
  );
};

export default MultiDropdown;
