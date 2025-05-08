import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddFaculty,
  fetchRemoveFaculty,
  fetchUpdateFaculty,
} from '@store/institution/thunks';
import { validateFaculty } from './helpers';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addFaculty';

const ITEM_INIT_DATA: Faculty = {
  name: '',
};

export const AddingFacultyModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const faculties = useSelector(institutionSelectors.getFaculties);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Faculty>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const validateError = validateFaculty(newItem, faculties);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateFaculty(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddFaculty(newItem));
  };

  return (
    <>
      <StyledModalTitle $top="xsmall">
        {currentModal.isEditing ? 'Изменить факультет' : 'Новый факультет'}
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
                    fetchRemoveFaculty(getId(currentModal.value) as number),
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
