import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { Institution } from '@type/user';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './UniversityModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddInstitution,
  fetchDeleteInstitution,
  fetchEditInstitution,
} from '@store/admin/thunks';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Institution = {
  institution_type: 'University',
  name: '',
};

export const AddingUniversityModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Institution>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const addingItem = {
      ...newItem,
      id: newItem.id || new Date().getTime(),
    };
    if (currentModal.isEditing)
      return dispatch(fetchEditInstitution(addingItem));
    dispatch(fetchAddInstitution(addingItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing
              ? 'Изменить университет'
              : 'Новый университет'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите название..."
            onChange={(e) =>
              // @ts-ignore
              setNewItem((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={newItem?.name}
          />
        </Flex>
      </Flex>
      <Flex justify="flex-end">
        <Flex direction="column">
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd onClick={handleAdd}>
              <Text $size="small">
                {currentModal.isEditing ? 'Изменить' : 'Добавить'}
              </Text>
            </StyledModalAdd>
            {currentModal.isEditing && currentModal.value && (
              <StyledModalAdd
                onClick={() => {
                  dispatch(fetchDeleteInstitution(currentModal.value!.id!));
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
