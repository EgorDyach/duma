import { Text } from '@components/Typography';
import ChevronIcon from '@components/icons/ChevronIcon';
import { ReactNode, useState } from 'react';
import Flex from '@components/Flex';
import styled from 'styled-components';

type TreeNavProps = {
  label?: string;
  children?: ReactNode;
  onSelect?: VoidFunction;
  selected?: boolean;
};

export const ChevronSign = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transform: rotate(${(props) => (+props.$isOpen ? 0 : -90)}deg);
  transition: all 0.1s;
`;

const TreeNav: React.FC<TreeNavProps> = ({
  label,
  children,
  onSelect,
  selected
}) => {
  const [isOpen, setIsOpen] = useState(selected);

  return (
    <div
      style={{
        padding: 5,
        borderRadius: 10,
        cursor: 'pointer',
      }}
    >
      <Flex
        gap="5px"
        onClick={() => {
          setIsOpen(!isOpen);
          onSelect && onSelect();
        }}
        style={{
          backgroundColor: isOpen && !children ? '#f5eefe' : 'transparent',
          padding: 10,
          borderRadius: 10,
        }}
      >
        {children && (
          <ChevronSign
            stroke="#641aee"
            width="16px"
            height="16px"
            $isOpen={(children ? isOpen : selected) as boolean}
          />
        )}
        <Text>{label}</Text>
      </Flex>
      {isOpen && <div style={{ marginLeft: 25 }}>{children}</div>}
    </div>
  );
};

export default TreeNav;
