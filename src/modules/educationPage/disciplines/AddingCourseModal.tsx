import Flex from '@components/Flex';
import { useEffect, useMemo, useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiActions, uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { fetchAddCourse } from '@store/institution/thunks';
import { Text } from '@components/Typography';
import { ShiftsList } from '../groups/AddingGroupModal';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';

export const MODAL_NAME = 'addCourse';

const ITEM_INIT_DATA: Course = {
  discipline_id: -1,
  teacher_id: 0,
};

export const AddingCourseModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const teachers = useSelector(institutionSelectors.getTeachers);
  const disciplines = useSelector(institutionSelectors.getDisciplines);
  const subjects = useSelector(institutionSelectors.getSubjects);
  const courses = useSelector(institutionSelectors.getCourses);
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Course>(
    currentModal.value || ITEM_INIT_DATA,
  );
  const currentDiscipline = useMemo(
    () => disciplines.find((el) => el.id === newItem.discipline_id),
    [disciplines, newItem.discipline_id],
  );

  const handleAdd = () => {
    // if (currentModal.isEditing)
    //   return dispatch(
    //     fetchUpdateCourse(newItem, getId(currentModal.value) as number),
    //   );
    dispatch(fetchAddCourse(newItem));
  };

  if (!currentDiscipline) {
    console.log(disciplines);
    dispatch(uiActions.closeModals());
    showErrorNotification('Не удалось открыть дисциплину!');
    return <></>;
  }

  const currentSubject = useMemo(
    () => subjects.find((el) => el.id === currentDiscipline?.subject_id),
    [subjects, currentDiscipline?.subject_id],
  );

  useEffect(() => {
    console.log(
      'ababa',
      currentSubject,
      currentDiscipline,
      disciplines,
      newItem,
      subjects,
    );
  }, [
    disciplines,
    newItem.discipline_id,
    subjects,
    currentDiscipline?.subject_id,
  ]);

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            Преподаватель для{' '}
            {currentSubject?.name
              ? `${currentSubject.name} (${currentDiscipline?.discipline_type})`
              : 'Неизвестный предмет'}
          </StyledModalTitle>
        </Flex>
      </Flex>

      <Flex $top="medium" direction="column">
        <Text>Выбрать учителя</Text>
        <ShiftsList>
          {teachers
            .filter(
              (el) =>
                !courses.map((q) => q.teacher_id).includes(el.id as number),
            )
            .map((el) => (
              <li
                key={el.id}
                style={{
                  backgroundColor:
                    newItem.teacher_id === el.id ? '#641aee' : '#fff',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    color: newItem.teacher_id === el.id ? '#fff' : '#641aee',
                  }}
                  onClick={() => {
                    setNewItem((prev) => ({
                      ...prev,
                      teacher_id: el.id || -1,
                    }));
                  }}
                >
                  {el.fullname}
                </button>
              </li>
            ))}
        </ShiftsList>
      </Flex>

      <Flex justify="flex-end">
        <Flex direction="column">
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd onClick={handleAdd}>Добавить</StyledModalAdd>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
