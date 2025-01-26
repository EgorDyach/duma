import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalInput,
  StyledItemTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import Input from '@components/input/Input';
import { UserEducation } from '@type/user';
import { useSelector } from 'react-redux';
import { uiActions, uiSelectors } from '@store/ui';
import { MODAL_NAME } from './SecondaryModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddEducation,
  fetchDeleteEducation,
  fetchEditEducation,
} from '@store/admin/thunks';
import { generatePassword } from './helpers';

const ITEM_INIT_DATA: UserEducation = {
  ID: new Date().getTime(),
  email: '',
  fullname: '',
  Education: {
    type: 'secondary',
    name: '',
  },
};

export const AddingSecondaryModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<UserEducation>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const addingItem = {
      ...newItem,
      ID: newItem.ID || new Date().getTime(),
    };
    if (currentModal.isEditing) return dispatch(fetchEditEducation(addingItem));
    dispatch(fetchAddEducation(addingItem));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить ССУЗ' : 'Новый ССУЗ'}
          </StyledModalTitle>
          <StyledModalInput
            placeholder="Введите название..."
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                Education: {
                  ...prev.Education,
                  name: e.target.value,
                },
              }))
            }
            value={newItem.Education.name}
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
              {currentModal.isEditing ? 'Изменить' : 'Добавить'}
            </StyledModalAdd>
            {currentModal.isEditing && currentModal.value && (
              <StyledModalAdd
                onClick={() => {
                  dispatch(fetchDeleteEducation(currentModal.value!.email));
                  dispatch(uiActions.closeModals());
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
