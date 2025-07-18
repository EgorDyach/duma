import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledItemTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import Input from '@components/input/Input';
import { InstitutionsAdmin } from '@type/user';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './SchoolModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddInstitution,
  fetchDeleteInstitution,
  fetchEditInstitution,
} from '@store/admin/thunks';
import { generatePassword } from './helpers';
import { Text } from '@components/Typography';

const ITEM_INIT_DATA: InstitutionsAdmin = {
  id: new Date().getTime(),
  email: '',
  fullname: '',
  level: 1,
  institution: {
    institution_type: 'School',
    name: '',
  },
};

export const AddingSchoolModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<InstitutionsAdmin>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    if (currentModal.isEditing) return dispatch(fetchEditInstitution(newItem));
    dispatch(fetchAddInstitution(newItem));
    // dispatch(fetchAddFaculty({ name: 'Младшая школа' }));
    // dispatch(fetchAddFaculty({ name: 'Средняя школа' }));
    // dispatch(fetchAddFaculty({ name: 'Старшая школа' }));
    // requestCreateFaculty({ name: 'Младшая школа' });
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить школу' : 'Новая школа'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите название..."
            onChange={(e) =>
              // @ts-ignore
              setNewItem((prev) => ({
                ...prev,
                institution: {
                  ...prev.institution,
                  name: e.target.value,
                },
              }))
            }
            value={newItem.institution?.name}
          />
        </Flex>
      </Flex>
      <Flex direction="column" $top="medium" gap="16px">
        <StyledItemTitle>
          <span>*</span>Имя администратора
          <Input
            value={newItem.fullname}
            onChange={(newVal) =>
              setNewItem((prev) => ({
                ...prev,
                fullname: newVal,
              }))
            }
            name={''}
          />
        </StyledItemTitle>
      </Flex>
      <Flex direction="column" $top="medium" gap="16px">
        <StyledItemTitle>
          <span>*</span> Email администратора
          <Flex gap="10px" align="end">
            <Input
              disabled={currentModal.isEditing}
              // @ts-ignore
              style={{ flex: 10, width: '100%' }}
              value={newItem.email}
              onChange={(newVal) =>
                setNewItem((prev) => ({
                  ...prev,
                  email: currentModal.isEditing ? prev.email : newVal,
                }))
              }
              name={''}
            />
          </Flex>
        </StyledItemTitle>
      </Flex>
      <Flex direction="column" $top="medium" gap="16px">
        <StyledItemTitle>
          {currentModal.isEditing ? (
            'Новый пароль'
          ) : (
            <>
              <span>*</span> Создать пароль
            </>
          )}
          <Flex gap="10px" align="end">
            <Input
              // @ts-ignore
              style={{ flex: 10, width: '100%' }}
              value={newItem.password || ''}
              onChange={(newVal) =>
                setNewItem((prev) => ({
                  ...prev,
                  password: newVal,
                }))
              }
              name={''}
            />
            <button
              style={{
                flex: 1,
                height: 44.5,
                border: 'none',
                borderRadius: 10,
                backgroundColor: '#5727ec',
                color: 'white',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                padding: '12px ',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() =>
                setNewItem({ ...newItem, password: generatePassword() })
              }
            >
              Сгенерировать
            </button>
          </Flex>
        </StyledItemTitle>
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
                  dispatch(fetchDeleteInstitution(currentModal.value!.email));
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
