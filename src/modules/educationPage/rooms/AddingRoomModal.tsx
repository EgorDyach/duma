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
import { Text } from '@components/Typography';
import Tags from '@components/Tags';

const ITEM_INIT_DATA: Room = {
  room: {
    name: '',
    capacity: 0,
  },
  room_labels: [],
  room_taints: [],
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
    console.log(newItem);
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
      <Flex gap="16px" direction="row" $top="medium">
        <Input
          name=""
          label="Название"
          placeholder="Введите название..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              room: {
                id: prev.room.id,
                capacity: newItem.room.capacity,
                name: e,
              },
            }))
          }
          value={newItem.room.name}
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
              room: {
                id: prev.room.id,
                name: prev.room.name,
                capacity: Number(e),
              },
            }))
          }
          value={String(newItem.room.capacity)}
        />
      </Flex>
      <Flex $top="medium" direction="row" gap="10px">
        <Tags
          label="Особенность комнаты"
          placeholder="Особенность..."
          tagDuplicationText="Такая особенность уже существует!"
          setTags={(n) =>
            setNewItem((prev) => ({
              ...prev,
              room_taints: n.map((el) => ({ taint_value: el })),
            }))
          }
          tags={newItem.room_taints.map((taint) => taint.taint_value) || []}
        />
        <Tags
          label="Назначение комнаты"
          placeholder="Назначение..."
          tagDuplicationText="Такое назначение уже существует!"
          setTags={(n) =>
            setNewItem((prev) => ({
              ...prev,
              room_labels: n.map((el) => ({ label_value: el })),
            }))
          }
          tags={newItem.room_labels.map((label) => label.label_value) || []}
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
