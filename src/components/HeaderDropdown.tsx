import { isDescendant } from '@lib/utils/isDescendant';
import React, { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.ul`
  position: absolute;
  top: 48px;
  right: -22px;
  margin: 0;
  border-radius: 10px;
  list-style: none;
  background: #fff;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
`;

interface DropdownProps {
  options: ReactNode[];
  children: ReactNode;
  onSelect?: VoidFunction;
}

const HeaderDropdown: React.FC<DropdownProps> = ({
  options = [],
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef<HTMLUListElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !isDescendant(dropdownRef.current?.parentElement, e.target as HTMLElement)
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
      <div
        onClick={() => {
          toggleDropdown();
        }}
      >
        {children}
      </div>
      {isOpen && <StyledDropdown ref={dropdownRef}>{options}</StyledDropdown>}
    </div>
  );
};

export default HeaderDropdown;
