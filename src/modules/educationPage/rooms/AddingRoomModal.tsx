import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './RoomModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddRoom,
  fetchRemoveRoom,
  fetchUpdateRoom,
} from '@store/institution/thunks';

const ITEM_INIT_DATA: Room = {
  name: '',
  capacity: 0,
};

export const AddingRoomModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Room>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateRoom(newItem, currentModal.value!.id as number),
      );
    dispatch(fetchAddRoom(newItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить аудиторию' : 'Новая аудитория'}
          </StyledModalTitle>
        </Flex>
      </Flex>
      <Flex gap='30px' $top='xlarge'>
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
        <StyledModalInput
          type="number"
          min={0}
          placeholder="Введите значение вместимости..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              capacity: Number(e.target.value),
            }))
          }
          value={newItem.capacity}
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
                    fetchRemoveRoom(currentModal.value!.id as number),
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
