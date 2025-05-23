import React, { useState } from 'react';
import Flex from '@components/Flex';
import {
  StyledModalTitle,
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
import { getId } from '@store/institution/store';
import { validateTeacher } from './helpers';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import MultiDatePicker from '@components/MultiDatepicker';
import { Text } from '@components/Typography';
import Dropdown from '@components/Dropdown';
import { institutionSelectors } from '@store/institution';

const ITEM_INIT_DATA: Teacher = {
  fullname: '',
  holidays: [],
  department_id: -1,
};

export const AddingTeacherModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const departments = useSelector(institutionSelectors.getDepartments);
  const currentModal = modals[MODAL_NAME];

  const [newItem, setNewItem] = useState<Teacher>(
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

    const validateError = validateTeacher(newItem);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing) {
      return dispatch(
        fetchUpdateTeacher(
          newItemWithHolidays,
          getId(currentModal.value) as number,
        ),
      );
    }
    dispatch(fetchAddTeacher(newItemWithHolidays));
  };

  return (
    <>
      <StyledModalTitle>
        {currentModal.isEditing ? 'Изменить учителя' : 'Новый учитель'}
      </StyledModalTitle>

      <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Фамилия Имя Отчество"
          placeholder="Введите ФИО..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              fullname: e,
            }))
          }
          value={newItem.fullname}
        />
      </Flex>

      <Flex $top="medium" gap="10px" direction="column">
        <Text>Выходные и отпуска</Text>

        <MultiDatePicker value={holidays} onChange={setHolidays} />
      </Flex>

      <Dropdown
        options={departments.map((el) => ({ id: el.id!, name: el.name }))}
        selectedOption={newItem.department_id}
        setSelectedOption={(option) =>
          setNewItem((prev) => ({ ...prev, department_id: +option }))
        }
      />

      <Flex gap="16px" $top="medium" justify="flex-end">
        <StyledModalAdd onClick={handleAdd}>
          <Text $size="small">
            {' '}
            {currentModal.isEditing ? 'Изменить' : 'Добавить'}
          </Text>
        </StyledModalAdd>
        {currentModal.isEditing && currentModal.value && (
          <StyledModalAdd
            onClick={() =>
              dispatch(fetchRemoveTeacher(getId(currentModal.value) as number))
            }
          >
            <Text $size="small">Удалить</Text>
          </StyledModalAdd>
        )}
      </Flex>
    </>
  );
};
