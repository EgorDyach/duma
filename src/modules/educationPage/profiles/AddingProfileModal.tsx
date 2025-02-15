import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './ProfileModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddProfile,
  fetchRemoveProfile,
  fetchUpdateProfile,
} from '@store/institution/thunks';

const ITEM_INIT_DATA: Profile = {
  name: '',
};

export const AddingProfileModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Profile>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateProfile(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddProfile(newItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить профиль' : 'Новый профиль'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите значение..."
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
                    fetchRemoveProfile(getId(currentModal.value) as number),
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
