import React from 'react';
import styled from 'styled-components';
import Input from '@components/input/Input';
import Button from '@modules/authPage/Button';
import CloseIcon from './icons/CloseIcon';
import { Text } from './Typography';
import { showErrorNotification } from '@lib/utils/notification';

interface TagGeneratorProps {
  tags: string[];
  setTags: (n: string[]) => void;
  className?: string;
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
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e5e7eb;
  border-radius: 16px;
  padding: 8px 12px;
`;

const SubmitButton = styled(Button)`
  width: auto;
  height: auto;
  padding: 4px 12px;
  height: 42px !important;
  &:focus {
    box-shadow: none;
    outline: none;
  }
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

const TagGenerator: React.FC<TagGeneratorProps> = ({
  tags,
  setTags,
  className = '',
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    } else showErrorNotification('Данный тег существует!');
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Container className={className}>
      <InputContainer>
        <Input
          label="Название тега"
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          placeholder="Название тега..."
          name={''}
        />
        <SubmitButton onClick={addTag} isLoading={false}>
          Добавить
        </SubmitButton>
      </InputContainer>
      <TagList>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <Text>{tag}</Text>
            <IconButton onClick={() => removeTag(index)}>
              <CloseIcon width="16px" height="16px" color="#ef4444" />
            </IconButton>
          </TagItem>
        ))}
      </TagList>
    </Container>
  );
};

export default TagGenerator;
