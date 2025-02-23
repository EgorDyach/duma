import React, { useState } from 'react';
import Flex from '@components/Flex';
import {
  StyledModalTitle,
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
import styled from 'styled-components';
import { institutionSelectors } from '@store/institution';
import { getId } from '@store/institution/store';
import { StyledInput } from '@components/input/InputStyles';
import Input from '@components/input/Input';
import { validateGroup } from './helpers';
import { showErrorNotification } from '@lib/utils/notification';
import MultiDatePicker from '@components/MultiDatepicker';

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
  overflow-x: auto;
  padding: 10px 0;
  list-style: none;
  margin: 0;
  flex-wrap: wrap;

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
  const groups = useSelector(institutionSelectors.getGroups);
  const profiles = useSelector(institutionSelectors.getProfiles);
  const [newItem, setNewItem] = useState<Group>(
    currentModal.value || ITEM_INIT_DATA,
  );

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
    const validateError = validateGroup(newItem, groups);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing) {
      return dispatch(
        fetchUpdateGroup(
          newItemWithHolidays,
          getId(currentModal.value) as number,
        ),
      );
    }
    dispatch(fetchAddGroup(newItemWithHolidays));
  };

  return (
    <>
      <StyledModalTitle>
        {currentModal.isEditing ? 'Изменить группу' : 'Новая группа'}
      </StyledModalTitle>
      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Название "
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
      <Flex $top="medium" direction="column">
        <Text>Количество учеников</Text>
        <StyledInput
          $top="small"
          min={0}
          value={String(newItem.studentscount)}
          onChange={(e) =>
            setNewItem({ ...newItem, studentscount: Number(e.target.value) })
          }
          type="number"
        />
      </Flex>
      <Flex $top="small" direction="column">
        <Text>Смена</Text>
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
      <Flex $top="small" direction="column">
        <Text>Профиль</Text>
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
        <Text>Выходные и каникулы</Text>

        <MultiDatePicker value={holidays} onChange={setHolidays} />
      </Flex>

      <Flex $top="medium" justify="flex-end">
        <StyledModalAdd onClick={handleAdd}>
          <Text $size="small">
            {' '}
            {currentModal.isEditing ? 'Изменить' : 'Добавить'}
          </Text>
        </StyledModalAdd>
        {currentModal.isEditing && currentModal.value && (
          <StyledModalAdd
            onClick={() =>
              dispatch(fetchRemoveGroup(getId(currentModal.value) as number))
            }
          >
            <Text $size="small">Удалить</Text>
          </StyledModalAdd>
        )}
      </Flex>
    </>
  );
};
