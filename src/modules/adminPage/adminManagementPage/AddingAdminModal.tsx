import Flex from '@components/Flex';
import { useEffect, useState } from 'react';
import {
  StyledModalTitle,
  StyledItemTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import Input from '@components/input/Input';
import { InstitutionType, InstitutionsAdmin } from '@type/user';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddInstitutionAdmin,
  fetchDeleteInstitutionAdmin,
  fetchEditInstitutionAdmin,
} from '@store/admin/thunks';
import { generatePassword } from '../school/helpers';
import { Text } from '@components/Typography';
import { adminSelectors } from '@store/admin';
import Dropdown from '@components/Dropdown';
import SearchableDropdown from '@components/SearchableDropdown';
import { MODAL_NAME } from './AdminManagementModule';

const ITEM_INIT_DATA: InstitutionsAdmin = {
  id: new Date().getTime(),
  email: '',
  fullname: '',
  level: 1,
  institution_id: -1,
};

export const AddingAdminModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const schools = useSelector(adminSelectors.getSchools);
  const universities = useSelector(adminSelectors.getUniversities);
  const secondaries = useSelector(adminSelectors.getSecondaries);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<InstitutionsAdmin>(
    currentModal.value || ITEM_INIT_DATA,
  );
  const [institutionType, setInstitutionType] = useState<InstitutionType>(
    newItem.institution?.institution_type || 'School',
  );

  const handleAdd = () => {
    if (currentModal.isEditing)
      return dispatch(fetchEditInstitutionAdmin(newItem));
    dispatch(fetchAddInstitutionAdmin(newItem));
  };

  useEffect(() => console.log(newItem.institution_id), []);

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing
              ? 'Изменить администратора'
              : 'Новый администратор'}
          </StyledModalTitle>
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

      <Flex direction="column" gap="10px" $top="medium">
        <Text>Учебное заведение</Text>
        <Flex gap="10px">
          <Dropdown
            selectedOption={institutionType}
            setSelectedOption={setInstitutionType}
            options={[
              { id: 'School', name: 'Школа' },
              { id: 'University', name: 'Университет' },
              { id: 'Secondary', name: 'ССУЗ' },
            ]}
          />
          <SearchableDropdown
            selectedOption={newItem.institution_id}
            setSelectedOption={(id) =>
              setNewItem({ ...newItem, institution_id: +id })
            }
            options={{
              School: schools,
              University: universities,
              Secondary: secondaries,
            }[institutionType]?.map((el) => ({
              id: el.id!,
              name: el.name,
            }))}
          />
        </Flex>
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
                  dispatch(
                    fetchDeleteInstitutionAdmin(currentModal.value!.email),
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
