import Flex from '@components/Flex';
import { useEffect, useMemo, useState } from 'react';
import {
  StyledModalTitle,
  StyledModalAdd,
} from '@components/Modal/ModalStyles';
import { useSelector } from 'react-redux';
import { uiActions, uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import {
  fetchAddCourse,
  fetchRemoveCourse,
  fetchUpdateCourse,
} from '@store/institution/thunks';
import { Text } from '@components/Typography';
import { institutionSelectors } from '@store/institution';
import { showErrorNotification } from '@lib/utils/notification';
import { validateCourse } from './helpers';
import Tags from '@components/Tags';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import styled from 'styled-components';
import { getId } from '@store/institution/store';

export const MODAL_NAME = 'addCourse';

const RoomAffinityContainer = styled.div`
  padding: 16px;
  border-radius: 10px;
  border: 1.2px solid #641aee;
`;

const ITEM_INIT_DATA: Course = {
  courseaffinity: [],
  coursetoleration: [],
  course: {
    discipline_id: -1,
    teacher_id: -1,
  },
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
    () => disciplines.find((el) => el.id === newItem.course.discipline_id),
    [disciplines, newItem.course.discipline_id],
  );

  useEffect(() => console.log(newItem.course.teacher_id), []);

  const handleAdd = () => {
    const validateError = validateCourse(newItem);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal.isEditing) {
      console.log('updated course');
      fetchUpdateCourse(newItem, getId(currentModal.value) as number);
    }

    dispatch(fetchAddCourse(newItem));
  };

  if (!currentDiscipline) {
    dispatch(uiActions.closeModals());
    showErrorNotification('Не удалось открыть дисциплину!');
    return <></>;
  }

  const currentSubject = useMemo(
    () => subjects.find((el) => el.id === currentDiscipline?.subject_id),
    [subjects, currentDiscipline?.subject_id],
  );

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить курс для ' : 'Новый курс для '}
            {currentSubject?.name
              ? `${currentSubject.name} ${currentDiscipline?.discipline_type ? `(${currentDiscipline?.discipline_type})` : ''}`
              : 'Неизвестный предмет'}
          </StyledModalTitle>
        </Flex>
      </Flex>

      <Flex $top="medium" direction="column" gap="8px">
        <Text>Выбрать учителя:</Text>
        {/* <ShiftsList>
          {teachers
            .filter(
              (el) =>
                !courses
                  .filter(
                    (q) => q.course.discipline_id === currentDiscipline.id,
                  )
                  .map((q) => q.course.teacher_id)
                  .includes(el.id as number),
            )
            .sort((a, b) => a.fullname.localeCompare(b.fullname))
            .map((el) => (
              <li
                key={el.id}
                style={{
                  backgroundColor:
                    newItem.course.teacher_id === el.id ? '#641aee' : '#fff',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    color:
                      newItem.course.teacher_id === el.id ? '#fff' : '#641aee',
                  }}
                  onClick={() => {
                    setNewItem((prev) => ({
                      ...prev,
                      course: {
                        discipline_id: newItem.course.discipline_id,
                        teacher_id: el.id || -1,
                      },
                    }));
                  }}
                >
                  {el.fullname}
                </button>
              </li>
            ))}
        </ShiftsList> */}
        {/* TODO: сделать searchable dropdown*/}
        <Dropdown
          options={[...teachers]
            .filter(
              (el) =>
                el.id !== newItem.course.teacher_id ?
                !courses
                  .filter(
                    (q) => q.course.discipline_id === currentDiscipline.id,
                  )
                  .map((q) => q.course.teacher_id)
                  .includes(el.id as number) : true
            )
            .sort((a, b) => a.fullname.localeCompare(b.fullname))
            .map((teacher) => {
              const name = `${teacher.fullname.split(' ')[0]} ${teacher.fullname.split(' ')[1][0]}. ${teacher.fullname.split(' ')[2][0]}.`;
              return {
                id: +(teacher.id || -1),
                name,
              };
            })}
          selectedOption={newItem.course.teacher_id}
          setSelectedOption={(id) => {
            console.log('id', +id);
            setNewItem((prev) => ({
              ...prev,
              course: {
                teacher_id: +id,
                discipline_id: prev.course.discipline_id,
              },
            }));
          }}
        />

        <Text>Параметры аудитории:</Text>
        <RoomAffinityContainer>
          <Tags
            label="Добавить требования курса"
            placeholder="Требование..."
            tagDuplicationText="Такое требование уже есть!"
            setTags={(n) => {
              setNewItem((prev) => ({
                ...prev,
                courseaffinity: [
                  ...prev.courseaffinity.filter((el) => !el.should_exist),
                  ...n.map((el) => ({ entity: el, should_exist: true })),
                ],
              }));
            }}
            tags={
              newItem.courseaffinity
                .filter((el) => el.should_exist)
                .map((aff) => aff.entity) || []
            }
          />
          <Tags
            label="Добавить ограничения курса"
            placeholder="Ограничение..."
            tagDuplicationText="Такое ограничение уже есть!"
            setTags={(n) => {
              setNewItem((prev) => ({
                ...prev,
                courseaffinity: [
                  ...prev.courseaffinity.filter((el) => el.should_exist),
                  ...n.map((el) => ({
                    entity: el,
                    should_exist: false,
                  })),
                ],
              }));
            }}
            tags={
              newItem.courseaffinity
                .filter((el) => !el.should_exist)
                .map((aff) => aff.entity) || []
            }
          />
        </RoomAffinityContainer>
      </Flex>
      <Flex justify="flex-end">
        <Flex direction="column">
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd onClick={handleAdd}>
              <Text $size="small">
                {currentModal.isEditing ? 'Изменить' : 'Добавить'}
              </Text>
            </StyledModalAdd>
            {currentModal.isEditing && (
              <Button
                onClick={() =>
                  dispatch(fetchRemoveCourse(newItem.course.id as number))
                }
              >
                <Text $size="small">Удалить</Text>
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
