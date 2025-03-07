import { Text } from '@components/Typography';
import ChevronIcon from '@components/icons/ChevronIcon';
import { ReactNode, useState } from 'react';
import Flex from '@components/Flex';
import styled from 'styled-components';

type TreeNavProps = {
  label?: string;
  children?: ReactNode;
  onSelect?: VoidFunction;
};

const ChevronSign = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transform: rotate(${(props) => (+props.$isOpen ? 0 : -90)}deg);
  transition: all 0.1s;
`;

const TreeNav: React.FC<TreeNavProps> = ({
  label,
  children,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        padding: 5,
        borderRadius: 10,
        cursor: 'pointer',
        backgroundColor: '#f5eefe',
      }}
    >
      <Flex
        gap="5px"
        onClick={() => {
          setIsOpen(!isOpen);
          onSelect && onSelect();
        }}
        style={{
          backgroundColor: isOpen && !children ? '#fff' : 'transparent',
          padding: 10,
        borderRadius: 10
        }}
      >
        {children && (
          <ChevronSign
            stroke="#641aee"
            width="16px"
            height="16px"
            $isOpen={isOpen}
          />
        )}
        <Text>{label}</Text>
      </Flex>
      {isOpen && <div style={{ marginLeft: 15 }}>{children}</div>}
    </div>
  );
};

export default TreeNav;
