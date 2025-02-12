import React, { useState } from 'react';
import Flex from '@components/Flex';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './GroupModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddGroup,
  fetchRemoveGroup,
  fetchUpdateGroup,
} from '@store/institution/thunks';
import { Text } from '@components/Typography';
import MultiDatePicker from '@components/MultiDatepicker';
import styled from 'styled-components';
import { institutionSelectors } from '@store/institution';
import { getId } from '@store/institution/store';
import { StyledInput } from '@components/input/InputStyles';

const ITEM_INIT_DATA: Group = {
  holidays: [],
  name: '',
  studentscount: 0,
  shift_id: -1,
  profile_id: -1,
};

export const ShiftsList = styled.ul`
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

export const AddingGroupModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const shifts = useSelector(institutionSelectors.getShifts);
  const profiles = useSelector(institutionSelectors.getProfiles);
  const [newItem, setNewItem] = useState<Group>(
    currentModal.value || ITEM_INIT_DATA,
  );

  // Состояние выбранных дат, полученное из MultiDatePicker
  const [holidays, setHolidays] = useState<Date[]>(
    newItem.holidays?.map((el) => new Date(el.date)) || [],
  );

  const handleAdd = () => {
    const newItemWithHolidays = {
      ...newItem,
      holidays: holidays.map((el) => ({ date: el.toISOString() })),
    };
    if (newItemWithHolidays.profile_id === -1)
      delete newItemWithHolidays.profile_id;
    if (currentModal.isEditing) {
      return dispatch(
        fetchUpdateGroup(newItemWithHolidays, currentModal.value!.id as number),
      );
    }
    dispatch(fetchAddGroup(newItemWithHolidays));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle>
            {currentModal.isEditing ? 'Изменить группу' : 'Новая группа'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите название группы..."
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            value={newItem.name}
          />
        </Flex>
      </Flex>

      <Flex direction="column">
        <Text>Количество учеников</Text>
        <StyledInput
          min={0}
          value={String(newItem.studentscount)}
          onChange={(e) =>
            setNewItem({ ...newItem, studentscount: Number(e.target.value) })
          }
          type="number"
        />
      </Flex>
      <Flex direction="column">
        <Text>
          {currentModal.isEditing ? 'Изменить смену' : 'Добавить смену'}
        </Text>
        <ShiftsList>
          {shifts.map((el) => (
            <li
              style={{
                backgroundColor:
                  el.id === newItem.shift_id ? '#641aee' : '#fff',
              }}
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
      </Flex>
      <Flex direction="column">
        <Text>
          {currentModal.isEditing ? 'Изменить профиль' : 'Добавить профиль'}
        </Text>
        <ShiftsList>
          <li
            style={{
              backgroundColor: newItem.profile_id === -1 ? '#641aee' : '#fff',
            }}
          >
            <button
              style={{
                width: '100%',
                height: '100%',
                color: newItem.profile_id === -1 ? '#fff' : '#641aee',
              }}
              onClick={() => {
                setNewItem((prev) => ({ ...prev, profile_id: -1 }));
              }}
            >
              Не указано
            </button>
          </li>
          {profiles.map((el) => (
            <li
              style={{
                backgroundColor:
                  getId(el) === newItem.profile_id ? '#641aee' : '#fff',
              }}
            >
              <button
                style={{
                  width: '100%',
                  height: '100%',
                  color: getId(el) === newItem.profile_id ? '#fff' : '#641aee',
                }}
                onClick={() => {
                  console.log(Number(getId(el)) || -1, newItem);
                  setNewItem((prev) => ({
                    ...prev,
                    profile_id: Number(getId(el)) || -1,
                  }));
                }}
              >
                {el.name}
              </button>
            </li>
          ))}
        </ShiftsList>
      </Flex>
      <Flex gap="10px" direction="column">
        <Text>
          {currentModal.isEditing ? 'Изменить выходные' : 'Добавить выходные'}
        </Text>

        <MultiDatePicker value={holidays} onChange={setHolidays} />
      </Flex>

      <Flex justify="flex-end">
        <StyledModalAdd onClick={handleAdd}>
          {currentModal.isEditing ? 'Изменить' : 'Добавить'}
        </StyledModalAdd>
        {currentModal.isEditing && currentModal.value && (
          <StyledModalAdd
            onClick={() =>
              dispatch(fetchRemoveGroup(currentModal.value!.id as number))
            }
          >
            Удалить
          </StyledModalAdd>
        )}
      </Flex>
    </>
  );
};
