import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddDepartment,
  fetchRemoveDepartment,
  fetchUpdateDepartment,
} from '@store/institution/thunks';
import { validateDepartment } from './helpers';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';
import Input from '@components/input/Input';
import { Text } from '@components/Typography';
import Dropdown from '@components/Dropdown';

export const MODAL_NAME = 'addDepartment';

const ITEM_INIT_DATA: Department = {
  name: '',
  faculty_id: -1,
};

export const AddingDepartmentModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const departments = useSelector(institutionSelectors.getDepartments);
  const faculties = useSelector(institutionSelectors.getFaculties);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Department>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const validateError = validateDepartment(newItem, departments);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateDepartment(newItem, getId(currentModal.value) as number),
      );
    dispatch(fetchAddDepartment(newItem));
  };

  return (
    <>
      <StyledModalTitle $top="xsmall">
        {currentModal.isEditing ? 'Изменить кафедру' : 'Новая кафедра'}
      </StyledModalTitle>
      <Flex $top="medium" direction="column" gap="20px">
        <Input
          style={{ width: '100%' }}
          label="Название"
          placeholder="Введите значение..."
          onChange={(e) =>
            setNewItem((prev) => ({
              ...prev,
              name: e,
            }))
          }
          value={newItem.name}
        />
        <Flex direction="column" gap="5px">
          <Text>Факультет</Text>
          <Dropdown
            options={faculties.map((el) => ({ id: el.id!, name: el.name }))}
            selectedOption={newItem.faculty_id}
            setSelectedOption={(option) =>
              setNewItem((prev) => ({ ...prev, faculty_id: +option }))
            }
          />
        </Flex>
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
                    fetchRemoveDepartment(getId(currentModal.value) as number),
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
