import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { MODAL_NAME } from './DisciplineModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddDiscipline,
  fetchRemoveDiscipline,
  fetchUpdateDiscipline,
} from '@store/institution/thunks';
import { Text } from '@components/Typography';
import { StyledInput } from '@components/input/InputStyles';
import { ShiftsList } from '../groups/AddingGroupModal';
import { institutionSelectors } from '@store/institution';
import { validateDiscipline } from './helpers';
import { showErrorNotification } from '@lib/utils/notification';
import Button from '@components/Button';

const ITEM_INIT_DATA: Discipline = {
  groups: [],
  hours: 0,
  discipline_type: '',
  subject_id: -1,
};

const activeStyle = {
  background: '#641aee',
  color: '#fff',
};

export const AddingDisciplineModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const groups = useSelector(institutionSelectors.getGroups);
  const subjects = useSelector(institutionSelectors.getSubjects);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Discipline>(
    currentModal.value || ITEM_INIT_DATA,
  );
  const [groupsChoosed, setGroupsChoosed] = useState(
    currentModal.value?.groups || [],
  );
  const [typeOfDiscipline, setTypeOfDiscipline] = useState<string>(
    currentModal.value?.discipline_type || 'Лекция',
  );
  const handleAdd = () => {
    const formattedDiscipline = {
      ...newItem,
      groups: groupsChoosed,
      discipline_type: typeOfDiscipline,
    };

    const validateError = validateDiscipline(formattedDiscipline);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing)
      return dispatch(
        fetchUpdateDiscipline(
          formattedDiscipline,
          getId(currentModal.value) as number,
        ),
      );
    dispatch(fetchAddDiscipline(formattedDiscipline));
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing
              ? 'Изменить дисциплину'
              : 'Новая дисциплина'}
          </StyledModalTitle>
        </Flex>
      </Flex>

      <Flex $top="medium" direction="column">
        <Text>Выбрать предмет</Text>
        <ShiftsList>
          {[...subjects]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((el) => (
              <li
                key={el.id}
                style={{
                  backgroundColor:
                    newItem.subject_id === el.id ? '#641aee' : '#fff',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    color: newItem.subject_id === el.id ? '#fff' : '#641aee',
                  }}
                  onClick={() => {
                    setNewItem((prev) => ({
                      ...prev,
                      subject_id: el.id || -1,
                    }));
                  }}
                >
                  {el.name}
                </button>
              </li>
            ))}
        </ShiftsList>
      </Flex>
      <Flex $top="medium" direction="column">
        <Text>Выбрать группы</Text>
        <ShiftsList>
          {[...groups]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((el) => (
              <li
                key={el.id}
                style={{
                  backgroundColor: groupsChoosed
                    .map((q) => q.id)
                    .includes(el.id || -1)
                    ? '#641aee'
                    : '#fff',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    color: groupsChoosed.map((q) => q.id).includes(el.id || -1)
                      ? '#fff'
                      : '#641aee',
                  }}
                  onClick={() => {
                    setGroupsChoosed((prev) =>
                      prev.map((q) => q.id).includes(el.id || -1)
                        ? prev.filter((q) => q.id !== el.id)
                        : [...prev, el],
                    );
                  }}
                >
                  {el.name}
                </button>
              </li>
            ))}
        </ShiftsList>
      </Flex>
      <Flex $top="medium" direction="column">
        <Text>Количество часов</Text>

        <StyledInput
          style={{ marginTop: 6 }}
          min={0}
          value={String(newItem.hours)}
          onChange={(e) =>
            setNewItem({ ...newItem, hours: Number(e.target.value) })
          }
          onWheel={(e) => e.currentTarget.blur()}
          type="number"
        />
      </Flex>
      <Flex $top="medium" direction="column">
        <Text>Тип дисциплины</Text>
        <Flex $top="small" gap="8px">
          <Button
            style={
              typeOfDiscipline === 'Семинар'
                ? activeStyle
                : { color: '#641aee' }
            }
            onClick={() => setTypeOfDiscipline('Семинар')}
          >
            Семинар
          </Button>
          <Button
            style={
              typeOfDiscipline === 'Лекция' ? activeStyle : { color: '#641aee' }
            }
            onClick={() => setTypeOfDiscipline('Лекция')}
          >
            Лекция
          </Button>
          <Button
            style={
              typeOfDiscipline !== 'Семинар' && typeOfDiscipline !== 'Лекция'
                ? activeStyle
                : { color: '#641aee' }
            }
            onClick={() => setTypeOfDiscipline('')}
          >
            Другое
          </Button>
        </Flex>
        {typeOfDiscipline !== 'Семинар' && typeOfDiscipline !== 'Лекция' && (
          <StyledInput
            placeholder="Введите тип дисциплины..."
            style={{ marginTop: 6 }}
            value={typeOfDiscipline}
            onChange={(e) => setTypeOfDiscipline(e.target.value)}
          />
        )}
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
                    fetchRemoveDiscipline(getId(currentModal.value) as number),
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
