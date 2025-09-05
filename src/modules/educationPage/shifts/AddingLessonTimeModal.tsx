import { getId } from '@store/institution/store';
import Flex from '@components/Flex';
import { useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';
import { LESSON_TIME_MODAL_NAME as MODAL_NAME } from './ShiftModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddLessonTime,
  fetchRemoveLessonTime,
  fetchUpdateLessonTime,
} from '@store/institution/thunks';
import styled from 'styled-components';
import { institutionSelectors } from '@store/institution';
import { validateLessonTime } from './helpers';
import { showErrorNotification } from '@lib/utils/notification';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { Text } from '@components/Typography';
import moment from 'moment';

const ShiftsList = styled.ul`
  display: flex;
  gap: 10px;
  max-width: 450px;
  flex-wrap: nowrap;
  overflow-x: auto;
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

const ITEM_INIT_DATA: LessonTime = {
  start_time: '00:00',
  end_time: '00:00',
  shift_id: -1,
};

export const AddingLessonTimeModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const shifts = useSelector(institutionSelectors.getShifts);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<LessonTime>(
    currentModal.value || ITEM_INIT_DATA,
  );

  const handleAdd = () => {
    const item = {
      ...newItem,
    };
    const validateError = validateLessonTime(newItem);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing) {
      return dispatch(
        fetchUpdateLessonTime(item, getId(currentModal.value) as number),
      );
    } else {
      dispatch(fetchAddLessonTime(item));
    }
  };

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing
              ? 'Изменить время урока'
              : 'Новое время урока'}
          </StyledModalTitle>
        </Flex>
      </Flex>
      <ShiftsList>
        {shifts.map((el) => (
          <li
            style={{
              backgroundColor: el.id === newItem.shift_id ? '#641aee' : '#fff',
            }}
            key={el.number}
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
      <Flex direction="column">
        <Text>Начало урока</Text>
        <TimePicker
          // @ts-ignore
          style={{ width: 113, marginTop: 4 }}
          defaultValue={moment(newItem.start_time, 'HH:mm')}
          showSecond={false}
          className="xxx"
          onChange={(el) =>
            setNewItem((prev) => ({
              ...prev,
              start_time: el ? el.format('HH:mm') : '',
            }))
          }
        />
      </Flex>
      <Flex $top="medium" direction="column">
        <Text>Окончание урока</Text>
        <TimePicker
          defaultValue={moment(newItem.end_time, 'HH:mm')}
          // @ts-ignore
          style={{ width: 113, marginTop: 4 }}
          showSecond={false}
          className="xxx"
          onChange={(el) =>
            setNewItem((prev) => ({
              ...prev,
              end_time: el ? el.format('HH:mm') : '',
            }))
          }
        />
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
                    fetchRemoveLessonTime(getId(currentModal.value) as number),
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
