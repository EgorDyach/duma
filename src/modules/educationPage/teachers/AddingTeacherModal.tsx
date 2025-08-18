import React, { useEffect, useState } from 'react';
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
  fetchUpdateTeacherAccount,
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
  email: '',
  password: '',
};

export const AddingTeacherModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const departments = useSelector(institutionSelectors.getDepartments);
  const user = useSelector(uiSelectors.getUser);
  const currentModal = modals[MODAL_NAME];
  const [isEdit, setIsEdit] = useState(false)


  const [newItem, setNewItem] = useState<Teacher>(
    currentModal.value || ITEM_INIT_DATA,
  );

  // Autofill email when открываем модалку редактирования: email приходит из связанного account
  useEffect(() => {
    if (currentModal.isEditing && currentModal.value) {
      const accEmail = (currentModal.value as any)?.account?.email;
      if (accEmail) {
        setNewItem((prev) => ({ ...prev, email: accEmail } as any));
      }
    }
  }, [currentModal.isEditing, currentModal.value]);
  const [holidays, setHolidays] = useState<Date[]>(
    newItem.holidays?.map((el) => new Date(el.date)) || [],
  );
  const handleAdd = async () => {
    const newItemWithHolidays = {
      ...newItem,
      holidays: holidays.map((el) => ({ date: el.toISOString() })),
    };

    const validateError = validateTeacher(newItem, currentModal.isEditing);
    if (validateError) return showErrorNotification(validateError);

    // Prepare account payload for auth service
    const teacherAccountPayload = {
      email: newItem.email,
      // send password only if provided (on edit it may be empty)
      ...(newItem.password ? { password: newItem.password } : {}),
      fullname: newItem.fullname,
      institution_id:
        user && 'institution_id' in user ? (user as any).institution_id : undefined,
    } as any;

    if (currentModal.isEditing) {
      // Update account first (email/password changes)
      await dispatch(fetchUpdateTeacherAccount(teacherAccountPayload) as any);
      return await dispatch(
        fetchUpdateTeacher(
          newItemWithHolidays,
          getId(currentModal.value) as number,
        ) as any,
      );
    }
    // Create account first, then entity
    // await dispatch(fetchCreateTeacherAccount(teacherAccountPayload) as any);
    await dispatch(fetchAddTeacher(newItemWithHolidays) as any);
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

      <Flex $top="medium">
        <Input
        disabled={!isEdit}
        setIsEdit={setIsEdit}
        suffix={"Изменить"}
          style={{ width: '100%' }}
          label="Email"
          placeholder="Введите email..."
          type="email"
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              email: e,
            }))
          }
          value={newItem.email}
        />
      </Flex>

      {isEdit && <Flex $top="medium">
        <Input
          style={{ width: '100%' }}
          label="Пароль"
          placeholder={currentModal.isEditing ? "Оставьте пустым, если не хотите менять пароль" : "Введите пароль..."}
          type="password"
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              password: e,
            }))
          }
          value={newItem.password}
        />
      </Flex>}

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
