import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
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
import { validateRoom } from './helpers';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import Tags from '@components/Tags';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Room = {
  name: '',
  capacity: 0,
  tags: [],
};

export const AddingRoomModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const rooms = useSelector(institutionSelectors.getRooms);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Room>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const validateError = validateRoom(newItem, rooms);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateRoom(newItem, getId(currentModal.value) as number),
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
      <Flex gap="16px" direction="column" $top="medium">
        <Input
          name=""
          label="Название"
          placeholder="Введите название..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              name: e,
            }))
          }
          value={newItem.name}
        />
        <Input
          onWheel={(e) => e.currentTarget.blur()}
          name=""
          type="number"
          min={0}
          label="Вместимость"
          placeholder="Введите значение вместимости..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              capacity: Number(e),
            }))
          }
          value={String(newItem.capacity)}
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
                {currentModal.isEditing ? 'Изменить' : 'Добавить'}
              </Text>
            </StyledModalAdd>
            {currentModal.isEditing && currentModal.value && (
              <StyledModalAdd
                onClick={() => {
                  dispatch(
                    fetchRemoveRoom(getId(currentModal.value) as number),
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
