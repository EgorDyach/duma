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
import { MODAL_NAME } from './ShiftModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddShift,
  fetchRemoveShift,
  fetchUpdateShift,
} from '@store/institution/thunks';

const ITEM_INIT_DATA: Shift = {
  number: 0,
};

export const AddingShiftModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Shift>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateShift(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddShift(newItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить смену' : 'Новая смена'}
          </StyledModalTitle>
          <StyledModalInput
            type="number"
            min={0}
            placeholder="Введите значение..."
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                number: Number(e.target.value),
              }))
            }
            value={newItem.number}
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
                    fetchRemoveShift(getId(currentModal.value) as number),
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
