import React from 'react';
import styled from 'styled-components';
import Input from '@components/input/Input';
import CloseIcon from './icons/CloseIcon';
import { Text } from './Typography';
import { showErrorNotification } from '@lib/utils/notification';
import PlusIcon from './icons/PlusIcon';
import Flex from './Flex';

interface TagGeneratorProps {
  tags: string[];
  setTags: (n: string[]) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  tagDuplicationText?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  max-height: 155px;
  overflow-y: scroll;
`;

const TagItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1.2px solid #641aee;
  border-radius: 22px;
  padding: 8px;
  padding-left: 12px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  align-items: center;
  display: flex;
  &:hover {
    background: transparent;
  }
`;
const StyledIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
`;

const TagGenerator: React.FC<TagGeneratorProps> = ({
  tags,
  setTags,
  className = '',
  label = 'Добавить тег',
  placeholder = 'Название тега...',
  tagDuplicationText = 'Данный тег существует!',
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    } else showErrorNotification(tagDuplicationText);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Container className={className}>
      <InputContainer>
        <Input
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          placeholder={placeholder}
          name={''}
        />
        <Flex align="center" justify="center" style={{ paddingBottom:  12 }} onClick={addTag}>
          <StyledPlusIcon color="#641AEE" size={24} />
        </Flex>
      </InputContainer>
      <TagList>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <Text>{tag}</Text>
            <IconButton onClick={() => removeTag(index)}>
              <StyledIcon size={24} color="#ef4444" />
            </IconButton>
          </TagItem>
        ))}
      </TagList>
    </Container>
  );
};

export default TagGenerator;
