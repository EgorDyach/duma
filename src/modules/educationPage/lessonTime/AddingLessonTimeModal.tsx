import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './LessonTimeModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddLessonTime,
  fetchRemoveProfile,
  fetchUpdateLessonTime,
} from '@store/institution/thunks';
import styled from 'styled-components';
import { institutionSelectors } from '@store/institution';

const ShiftsList = styled.ul`
  display: flex;
  gap: 10px;
  max-width: 450px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 10px 0;
  list-style: none;
  margin: 0;

  li {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  button {
    border: none;
    padding: 8px 12px;
    background-color: transparent;
    cursor: pointer;
  }
`;

const ITEM_INIT_DATA: LessonTime = {
  starttime: '',
  endtime: '',
  shift_id: 0,
};

export const AddingLessonTimeModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const shifts = useSelector(institutionSelectors.getShifts);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<LessonTime>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const item = {
      ...newItem,
      starttime: `2025-02-02T${newItem.starttime.replace('-', ':')}:00Z`,
      endtime: `2025-02-02T${newItem.endtime.replace('-', ':')}:00Z`,
    };
    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateLessonTime(item, currentModal.value!.id as number),
      );
    dispatch(fetchAddLessonTime(item));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing
              ? 'Изменить время урока'
              : 'Новое время урока'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите значение..."
            type="time"
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                starttime: e.target.value,
              }))
            }
            value={newItem.starttime}
          />
          <StyledModalInput
            placeholder="Введите значение..."
            type="time"
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                endtime: e.target.value,
              }))
            }
            value={newItem.endtime}
          />
        </Flex>
      </Flex>
      <ShiftsList>
        {shifts.map((el) => (
          <li
            style={{
              backgroundColor: el.id === newItem.shift_id ? '#641aee' : '#fff',
            }}
            key={el.number}
          >
            <button
              style={{
                width: '100%',
                height: '100%',
                color: el.id === newItem.shift_id ? '#fff' : '#641aee',
              }}
              onClick={() => {
                setNewItem((prev) => ({ ...prev, shift_id: el.id || -1 }));
              }}
            >
              {el.number}
            </button>
          </li>
        ))}
      </ShiftsList>

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
                    fetchRemoveProfile(currentModal.value!.id as number),
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
