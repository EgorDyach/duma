import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
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
import Input from '@components/input/Input';
import { validateSubject } from './helpers';
import { showErrorNotification } from '@lib/utils/notification';
import { institutionSelectors } from '@store/institution';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Subject = {
  name: '',
  tags: [],
};

export const AddingSubjectModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const subjects = useSelector(institutionSelectors.getSubjects);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Subject>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const validateError = validateSubject(newItem, subjects);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateSubject(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddSubject(newItem));
  };

  return (
    <>
      <StyledModalTitle $top="xsmall">
        {currentModal.isEditing ? 'Изменить предмет' : 'Новый предмет'}
      </StyledModalTitle>

      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Название"
          placeholder="Введите значение..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              name: e,
            }))
          }
          value={newItem.name}
        />
      </Flex>

      <Flex $top="medium" direction="column">
        <Tags
          setTags={(n) => setNewItem((prev) => ({ ...prev, tags: n }))}
          tags={newItem.tags ?? []}
        />
      </Flex>
      <Flex justify="flex-end">
        <Flex direction="column">
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd onClick={handleAdd}>
              <Text $size="small">
                {' '}
                {currentModal.isEditing ? 'Изменить' : 'Добавить'}
              </Text>
            </StyledModalAdd>
            {currentModal.isEditing && currentModal.value && (
              <StyledModalAdd
                onClick={() => {
                  dispatch(
                    fetchRemoveSubject(getId(currentModal.value) as number),
                  );
                }}
              >
                <Text $size="small">Удалить</Text>
              </StyledModalAdd>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
