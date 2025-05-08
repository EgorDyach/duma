import { Text } from '@components/Typography';
import ChevronIcon from '@components/icons/ChevronIcon';
import { useState } from 'react';
import Flex from '@components/Flex';
import styled from 'styled-components';
import TreeNode from './TreeNode';

type TreeNode = {
  label: string;
  nodes?: TreeNode[];
  isSelected?: boolean;
  onSelect?: VoidFunction;
};

export const ChevronSign = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transform: rotate(${(props) => (+props.$isOpen ? 0 : -90)}deg);
  transition: all 0.1s;
`;

const TreeFolder: React.FC<TreeNode> = ({
  label,
  nodes,
  isSelected = false,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(isSelected);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);

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
        onClick={() => (onSelect ? onSelect() : setIsOpen(!isOpen))}
        style={{
          padding: 10,
          borderRadius: 10,
        }}
      >
        {nodes && (
          <ChevronSign
            stroke="#641aee"
            width="16px"
            height="16px"
            $isOpen={onSelect ? isSelected : isOpen}
          />
        )}
        <Text>{label}</Text>
      </Flex>
      {(onSelect ? isSelected : isOpen) && (
        <div style={{ marginLeft: 25 }}>
          {nodes?.map((el, index) =>
            el.nodes ? (
              <TreeFolder
                label={el.label}
                nodes={el.nodes}
                isSelected={selectedChild === index}
                onSelect={() =>
                  setSelectedChild(index === selectedChild ? null : index)
                }
                key={index}
              />
            ) : (
              <TreeNode
                label={el.label}
                isSelected={selectedChild === index}
                onSelect={() =>
                  setSelectedChild(index === selectedChild ? null : index)
                }
                key={index}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default TreeFolder;
