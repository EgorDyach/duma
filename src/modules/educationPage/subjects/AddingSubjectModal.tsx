import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './SubjectModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddSubject,
  fetchRemoveSubject,
  fetchUpdateSubject,
} from '@store/institution/thunks';
import Tags from '@components/Tags';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Subject = {
  name: '',
  tags: [],
};

export const AddingSubjectModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Subject>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateSubject(newItem, currentModal.value!.id as number),
      );
    dispatch(fetchAddSubject(newItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить предмет' : 'Новый предмет'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите название..."
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={newItem.name}
          />
        </Flex>
      </Flex>
      <Flex direction="column">
        <Text>Теги</Text>
        <Tags
          setTags={(n) => setNewItem((prev) => ({ ...prev, tags: n }))}
          tags={newItem.tags ?? []}
        />
      </Flex>
      <Flex justify="flex-end">
        <Flex direction="column">
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd onClick={handleAdd}>
              {currentModal.isEditing ? 'Изменить' : 'Добавить'}
            </StyledModalAdd>
            {currentModal.isEditing && currentModal.value && (
              <StyledModalAdd
                onClick={() => {
                  dispatch(
                    fetchRemoveSubject(currentModal.value!.id as number),
                  );
                }}
              >
                Удалить
              </StyledModalAdd>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
