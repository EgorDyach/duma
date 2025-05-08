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
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import styled from 'styled-components';
import { getId } from '@store/institution/store';
import Checkbox from '@components/Checkbox';

export const MODAL_NAME = 'addCourse';

const RoomAffinityContainer = styled(Flex)`
  padding: 16px;
  border-radius: 10px;
  border: 1.2px solid #641aee;
`;

const TagsContainer = styled(Flex)`
  border: 0.7px #d2d2d2 solid;
  border-radius: 6px;
  background-color: #f0f0f7;
  padding: 10px;
  height: 100%;
  max-height: 155px;
  overflow-y: scroll;
`;

const ITEM_INIT_DATA: Course = {
  course_affinity: [],
  course_toleration: [],
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
  const rooms = useSelector(institutionSelectors.getRooms);
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
      return dispatch(
        fetchUpdateCourse(newItem, getId(currentModal.value) as number),
      );
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

  const checkAffinity = (newAffinity: string) => {
    if (newItem.course_affinity.find((el) => el.entity === newAffinity)) {
      setNewItem((prev) => ({
        ...prev,
        course_affinity: prev.course_affinity.filter(
          (affinity) => affinity.entity !== newAffinity,
        ),
      }));
    } else {
      setNewItem((prev) => ({
        ...prev,
        course_affinity: [
          ...prev.course_affinity,
          { entity: newAffinity, should_exist: true },
        ],
      }));
    }
  };

  const checkToleration = (newToleration: string) => {
    if (
      newItem.course_toleration.find(
        (el) => el.toleration_value === newToleration,
      )
    ) {
      setNewItem((prev) => ({
        ...prev,
        course_toleration: prev.course_toleration.filter(
          (toleration) => toleration.toleration_value !== newToleration,
        ),
      }));
    } else {
      setNewItem((prev) => ({
        ...prev,
        course_toleration: [
          ...prev.course_toleration,
          { toleration_value: newToleration },
        ],
      }));
    }
  };

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
        {/* TODO: сделать searchable dropdown*/}
        <Dropdown
          options={[...teachers]
            .filter((el) =>
              el.id !== newItem.course.teacher_id
                ? !courses
                    .filter(
                      (q) => q.course.discipline_id === currentDiscipline.id,
                    )
                    .map((q) => q.course.teacher_id)
                    .includes(el.id as number)
                : true,
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
        <RoomAffinityContainer direction="row" gap="10px">
          <Flex direction="column" gap="10px">
            <Text>Добавить особенность аудитории:</Text>
            <TagsContainer direction="column" gap="8px">
              {rooms.map((room) => {
                return room.room_taints.map((taint) => (
                  <Flex gap="8px" align="center">
                    <Checkbox
                      setChecked={() => checkToleration(taint.taint_value)}
                      checked={
                        !!newItem.course_toleration.find(
                          (el) => el.toleration_value === taint.taint_value,
                        )
                      }
                    />
                    <Text>{taint.taint_value}</Text>
                  </Flex>
                ));
              })}
            </TagsContainer>
          </Flex>
          <Flex direction="column" gap="10px">
            <Text>Добавить определенную аудиторию:</Text>
            <TagsContainer direction="column" gap="8px">
              {rooms.map((room) => {
                return room.room_labels.map((label) => (
                  <Flex gap="8px" align="center">
                    <Checkbox
                      setChecked={() => checkAffinity(label.label_value)}
                      checked={
                        !!newItem.course_affinity.find(
                          (el) => el.entity === label.label_value,
                        )
                      }
                    />
                    <Text>{label.label_value}</Text>
                  </Flex>
                ));
              })}
            </TagsContainer>
          </Flex>
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
