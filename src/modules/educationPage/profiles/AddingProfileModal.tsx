import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
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
import { validateProfile } from './helpers';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Profile = {
  name: '',
};

export const AddingProfileModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const profiles = useSelector(institutionSelectors.getProfiles);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Profile>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const validateError = validateProfile(newItem, profiles);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateProfile(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddProfile(newItem));
  };

  return (
    <>
      <StyledModalTitle $top="xsmall">
        {currentModal.isEditing ? 'Изменить профиль' : 'Новый профиль'}
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
                    fetchRemoveProfile(getId(currentModal.value) as number),
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
