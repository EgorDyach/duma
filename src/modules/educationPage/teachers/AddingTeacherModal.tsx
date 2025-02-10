import React, { useState } from 'react';
import Flex from '@components/Flex';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './TeacherModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddTeacher,
  fetchRemoveTeacher,
  fetchUpdateTeacher,
} from '@store/institution/thunks';
import { Text } from '@components/Typography';
import MultiDatePicker from '@components/MultiDatepicker'; // Импорт компонента

const ITEM_INIT_DATA: Teacher = {
  fullname: '',
  holidays: [],
};

export const AddingTeacherModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];

  const [newItem, setNewItem] = useState<Teacher>(
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
    if (currentModal.isEditing) {
      return dispatch(
        fetchUpdateTeacher(
          newItemWithHolidays,
          currentModal.value!.id as number,
        ),
      );
    }
    dispatch(fetchAddTeacher(newItemWithHolidays));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle>
            {currentModal.isEditing ? 'Изменить учителя' : 'Новый учитель'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите полное ФИО..."
            onChange={(e) =>
              setNewItem({ ...newItem, fullname: e.target.value })
            }
            value={newItem.fullname}
          />
        </Flex>
      </Flex>

      <Flex gap="10px" direction="column">
        <Text>
          {currentModal.isEditing ? 'Изменить выходные' : 'Добавить выходные'}
        </Text>

        {/* Используем MultiDatePicker и получаем выбранные даты через onChange */}
        <MultiDatePicker value={holidays} onChange={setHolidays} />
      </Flex>

      <Flex justify="flex-end">
        <StyledModalAdd onClick={handleAdd}>
          {currentModal.isEditing ? 'Изменить' : 'Добавить'}
        </StyledModalAdd>
        {currentModal.isEditing && currentModal.value && (
          <StyledModalAdd
            onClick={() =>
              dispatch(fetchRemoveTeacher(currentModal.value!.id as number))
            }
          >
            Удалить
          </StyledModalAdd>
        )}
      </Flex>
    </>
  );
};
