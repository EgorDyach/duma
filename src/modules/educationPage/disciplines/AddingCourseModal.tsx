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
import { fetchAllFaculty } from '@store/institution/thunks';
import { useEffectOnce } from '@hooks/useEffectOnce';

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
  discipline_id: -1,
  course: {
    teacher_id: -1,
  },
};

export const AddingCourseModal = () => {
  const dispatch = useAppDispatch();
  const modals = useSelector(uiSelectors.getModals);
  const teachers = useSelector(institutionSelectors.getTeachers) || [];
  const disciplines = useSelector(institutionSelectors.getDisciplines) || [];
  const subjects = useSelector(institutionSelectors.getSubjects) || [];
  const courses = useSelector(institutionSelectors.getCourses) || [];
  const rooms = useSelector(institutionSelectors.getRooms) || [];
    const faculties = useSelector(institutionSelectors.getFaculties)
  const currentModal = modals[MODAL_NAME];
  const [newItem, setNewItem] = useState<Course>(
    currentModal?.value || ITEM_INIT_DATA,
  );
console.log(newItem, '2');

  const currentDiscipline = disciplines.find((el) => el.id === newItem.discipline_id)
  console.log(currentDiscipline, "curr");
  
  const allTeachers = (faculties || []).flatMap((faculty: any) => 
  (faculty.departments || []).flatMap((department: any) => 
    department.teachers || []
  )
);

useEffectOnce(() => {
    dispatch(fetchAllFaculty());
  });

console.log(allTeachers, "2224");


  useEffect(() => {
    if (!currentDiscipline && disciplines.length > 0) {
      dispatch(uiActions.closeModals());
      showErrorNotification('Не удалось открыть дисциплину!');
    }
  }, [currentDiscipline, disciplines, dispatch]);

  const handleAdd = () => {
    const validateError = validateCourse(newItem);
    if (validateError) return showErrorNotification(validateError);

    if (currentModal?.isEditing) {
      return dispatch(
        fetchUpdateCourse(newItem, getId(currentModal.value) as number),
      );
    }
    dispatch(fetchAddCourse(newItem));
  };

  const formatTeacherName = (fullname: string = '') => {
    const parts = fullname.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 3) return fullname;
    
    return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
  };

  console.log(newItem, "78878787878 ");
  

  const checkAffinity = (newAffinity: string) => {
    setNewItem(prev => ({
      ...prev,
      course_affinity: prev.course_affinity.some(a => a.entity === newAffinity)
        ? prev.course_affinity.filter(a => a.entity !== newAffinity)
        : [...prev.course_affinity, { entity: newAffinity, should_exist: true }]
    }));
  };

  const checkToleration = (newToleration: string) => {
    setNewItem(prev => ({
      ...prev,
      course_toleration: prev.course_toleration.some(t => t.toleration_value === newToleration)
        ? prev.course_toleration.filter(t => t.toleration_value !== newToleration)
        : [...prev.course_toleration, { toleration_value: newToleration }]
    }));
  };

  const currentSubject = useMemo(
    () => subjects.find(el => el.id === currentDiscipline?.subject_id),
    [subjects, currentDiscipline?.subject_id]
  );

  if (!currentDiscipline || !currentModal) {
    return null;
  }

  return (
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            {currentModal.isEditing ? 'Изменить курс для ' : 'Новый курс для '}
            {currentSubject?.name || 'Неизвестный предмет'}
            {currentDiscipline.discipline_type && ` (${currentDiscipline.discipline_type})`}
          </StyledModalTitle>
        </Flex>
      </Flex>

      <Flex $top="medium" direction="column" gap="8px">
        <Text>Выбрать учителя:</Text>
        <Dropdown
          options={allTeachers
            .filter(teacher => 
              teacher.ID !== newItem.course.teacher_id
                ? !courses
                    .filter(c => c.discipline_id === currentDiscipline.id)
                    .some(c => c.teacher_id === teacher.id)
                : true
            )
            .sort((a, b) => (a.fullname || '').localeCompare(b.fullname || ''))
            .map(teacher => ({
              id: Number(teacher.id) || -1,
              name: formatTeacherName(teacher.fullname)
            }))}
          selectedOption={newItem.course.teacher_id}
          setSelectedOption={id => setNewItem(prev => ({
            ...prev,
            course: {
              ...prev.course,
              teacher_id: Number(id)
            }
          }))}
        />

        <Text>Параметры аудитории:</Text>
        <RoomAffinityContainer direction="row" gap="10px">
          <Flex direction="column" gap="10px">
            <Text>Добавить особенность аудитории:</Text>
            <TagsContainer direction="column" gap="8px">
              {rooms.flatMap(room => 
                room.room_taints?.map((taint, i) => (
                  <Flex key={`tol-${room.id}-${i}`} gap="8px" align="center">
                    <Checkbox
                      setChecked={() => checkToleration(taint.taint_value)}
                      checked={newItem.course_toleration.some(
                        t => t.toleration_value === taint.taint_value
                      )}
                    />
                    <Text>{taint.taint_value}</Text>
                  </Flex>
                )) || []
              )}
            </TagsContainer>
          </Flex>
          <Flex direction="column" gap="10px">
            <Text>Добавить определенную аудиторию:</Text>
            <TagsContainer direction="column" gap="8px">
              {rooms.flatMap(room =>
                room.room_labels?.map((label, i) => (
                  <Flex key={`aff-${room.id}-${i}`} gap="8px" align="center">
                    <Checkbox
                      setChecked={() => checkAffinity(label.label_value)}
                      checked={newItem.course_affinity.some(
                        a => a.entity === label.label_value
                      )}
                    />
                    <Text>{label.label_value}</Text>
                  </Flex>
                )) || []
              )}
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
                  dispatch(fetchRemoveCourse(Number(newItem.course.id)))
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