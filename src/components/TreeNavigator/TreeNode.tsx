import { Text } from '@components/Typography';
import Flex from '@components/Flex';

type TreeNodeProps = {
  label?: string;
  isSelected?: boolean;
  onSelect?: VoidFunction;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  label,
  isSelected = false,
  onSelect,
}) => {
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
        onClick={onSelect}
        style={{
          backgroundColor: isSelected ? '#f5eefe' : 'transparent',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>{label}</Text>
      </Flex>
    </div>
  );
};

export default TreeNode;
