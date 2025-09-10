import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
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
import { validateShift } from './helpers';
import { institutionSelectors } from '@store/institution';
import {
  showErrorNotification,
} from '@lib/utils/notification';
import Input from '@components/input/Input';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: Shift = {
  number: 0,
};

export const AddingShiftModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const shifts = useSelector(institutionSelectors.getShifts);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Shift>(
    currentModal.value || ITEM_INIT_DATA,
  );
  

  const handleAdd = () => {
    const validateError = validateShift(newItem, shifts);
    if (validateError) return showErrorNotification(validateError);

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
        </Flex>
      </Flex>
      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Номер смены"
          type="number"
          onWheel={(e) => e.currentTarget.blur()}
          min={0}
          placeholder="Введите значение..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              number: Number(e),
            }))
          }
          value={String(newItem.number)}
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
                    fetchRemoveShift(getId(currentModal.value) as number),
                  );
                }}
              >
                <Text $size="small">Удалить</Text>
              </StyledModalAdd>
            )}
            {/* <Flex wrap="wrap" gap="11px" style={{ width: '100%' }}>
              <StyledTable>
                <thead>
                  <StyledHeaderCell />
                  <StyledHeaderCell>Название</StyledHeaderCell>
                  <StyledHeaderCell>Вместимость</StyledHeaderCell>
                  <StyledHeaderCell>Назначение</StyledHeaderCell>
                  <StyledHeaderCell>Особенности</StyledHeaderCell>
                </thead>
                <tbody>
                  {[...rooms]
                    .sort((a, b) => a.room.name.localeCompare(b.room.name))
                    .map((item, index) => {
                      return (
                        <StyledRow>
                          <StyledCell>
                            <Button
                              key={index}
                              size="large"
                              onClick={() =>
                                dispatch(
                                  uiActions.openModal({
                                    modalName: MODAL_NAME,
                                    isEditing: true,
                                    value: item,
                                  }),
                                )
                              }
                            >
                              <PenIcon
                                width="16px"
                                height="16px"
                                fill="#641aee"
                              />
                            </Button>
                          </StyledCell>
                          <StyledCell>{item.room.name}</StyledCell>
                          <StyledCell>{item.room.capacity}</StyledCell>
                          <StyledCell>
                            {item.room_labels
                              .map((val) => val.label_value)
                              .join(', ')}
                          </StyledCell>
                          <StyledCell>
                            {item.room_taints
                              .map((val) => val.taint_value)
                              .join(', ')}
                          </StyledCell>
                        </StyledRow>
                      );
                    })}
                </tbody>
              </StyledTable>
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
