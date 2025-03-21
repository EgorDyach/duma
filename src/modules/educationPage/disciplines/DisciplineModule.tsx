import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingDisciplineModal } from './AddingDisciplineModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import {
  fetchAllDisciplines,
  fetchAllGroups,
  fetchAllSubjects,
  fetchRemoveCourse,
} from '@store/institution/thunks';
import { SubHeader, Text } from '@components/Typography';
import styled from 'styled-components';
import {
  AddingCourseModal,
  MODAL_NAME as MODAL_COURSE_NAME,
} from './AddingCourseModal';
import Button from '@components/Button';
import CloseIcon from '@components/icons/CloseIcon';
import MultiDropdown from '@components/MultiDropdown';
import { useEffect, useState } from 'react';
import { displayFilteredDisciplines } from './helpers';

const StyledFlex = styled(Flex)`
  padding: 11px;
  /* width: 100%; */
  color: #641aee;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
`;

const StyledIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const EditText = styled(Button)`
  color: #641aee;
  cursor: pointer;
  margin-left: 32px;
`;

export const MODAL_NAME = 'addDiscipline';

export type Filters = {
  group: number[];
  subject: number[];
};

const DisciplineModule = () => {
  const disciplines = useSelector(institutionSelectors.getDisciplines);
  const subjects = useSelector(institutionSelectors.getSubjects);
  const courses = useSelector(institutionSelectors.getCourses);
  const groups = useSelector(institutionSelectors.getGroups);
  const teachers = useSelector(institutionSelectors.getTeachers);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<Filters>({
    group: [],
    subject: [],
  });
  const [displayedDisciplines, setDisplayedDisciplines] = useState(disciplines);

  useEffectOnce(() => {
    dispatch(fetchAllSubjects());
    dispatch(fetchAllDisciplines());
    dispatch(fetchAllGroups());
  });

  const setFilterField = (field: keyof Filters, value: (string | number)[]) => {
    // const newFilters = { ...filters };
    // if (filters[field]?.includes(value)) {
    //   newFilters[field] = filters[field]?.filter((el) => el !== value) || null;
    // } else {
    //   newFilters[field]?.push(value);
    // }
    // setFilters(newFilters);
    setFilters((prev) => ({...prev, [field]: value}))
  };

  useEffect(() => {
    setDisplayedDisciplines(displayFilteredDisciplines(filters, disciplines));
    console.log('filters updated');
  }, [filters, disciplines]);

  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingDisciplineModal />
      </Modal>
      <Modal modalName={MODAL_COURSE_NAME}>
        <AddingCourseModal />
      </Modal>
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: 'addDiscipline',
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Дисциплины
      </Title>
      <Flex gap="10px" align="center">
        <Button
          onClick={() =>
            setFilters({
              group: [],
              subject: [],
            })
          }
        >
          <Text>Сбросить фильтры</Text>
        </Button>
        <Text>Настроить фильтры:</Text>
        <MultiDropdown
          options={subjects.map((subject) => ({
            id: +subject.id!,
            name: subject.name,
          }))}
          selectedOptions={filters.subject}
          setSelectedOptions={(index) => {
            setFilterField('subject' as keyof Filters, index);
          }}
          label="Предметы"
        />
        <MultiDropdown
          options={groups.map((group) => ({
            id: +group.id!,
            name: group.name,
          }))}
          selectedOptions={filters.group}
          setSelectedOptions={(index) => {
            setFilterField('group' as keyof Filters, index);
          }}
          label="Группы"
        />
      </Flex>
      {requests['disciplines'] === 'pending' && <ContentLoader size={32} />}
      {requests['disciplines'] !== 'pending' && (
        <Flex
          style={{ width: '100%' }}
          wrap="wrap"
          gap="11px"
          direction="column"
        >
          {[...displayedDisciplines]
            .sort((a, b) => a.hours - b.hours)
            .sort((a, b) =>
              (
                subjects.find((el) => el.id === a?.subject_id) || {
                  name: '1',
                }
              ).name.localeCompare(
                subjects.find((el) => el.id === b?.subject_id)?.name || '1',
              ),
            )
            .map((item) => {
              return (
                <StyledFlex
                  direction="column"
                  key={item.id}
                  style={{ marginBottom: 10 }}
                >
                  <Flex align="center" justify="space-between">
                    <Text
                      $color="#641aee"
                      $size="subheader"
                      style={{ fontSize: 20 }}
                    >
                      {String(
                        subjects.find((el) => el.id === item.subject_id)
                          ?.name ?? 'Не указано',
                      )}
                      {item.discipline_type ? ` – ${item.discipline_type}` : ''}{' '}
                      ({item.hours} ч.)
                    </Text>
                    <EditText
                      onClick={() =>
                        dispatch(
                          uiActions.openModal({
                            modalName: 'addDiscipline',
                            value: item,
                            isEditing: true,
                          }),
                        )
                      }
                    >
                      <Text $size="small">Изменить</Text>
                    </EditText>
                  </Flex>

                  <SubHeader $top="small">Группы</SubHeader>
                  <Flex $top="small" gap="10px">
                    {item.groups &&
                      item.groups.map((el) => (
                        <Button>
                          <Text>{el.name}</Text>
                        </Button>
                      ))}
                  </Flex>
                  <Title
                    action={() => {
                      dispatch(
                        uiActions.openModal({
                          isEditing: true,
                          value: {
                            discipline_id: item.id as number,
                            teacher_id: -1,
                          },
                          modalName: 'addCourse',
                        }),
                      );
                    }}
                  >
                    Учителя
                  </Title>
                  <Flex wrap="wrap" gap="11px">
                    {courses
                      .filter((el) => el.discipline_id === item.id)
                      .map((el) => {
                        const teacher = teachers.find(
                          (t) => t.id === el.teacher_id,
                        );
                        return teacher ? (
                          <Button>
                            <Flex gap="12px">
                              <Text>{teacher.fullname}</Text>
                              <StyledIcon
                                color="red"
                                width="20px"
                                height="20px"
                                onClick={() =>
                                  dispatch(fetchRemoveCourse(el.id as number))
                                }
                              />
                            </Flex>
                          </Button>
                        ) : (
                          ''
                        );
                      })}
                  </Flex>
                  {/* <TextButton
                  text={}
                  size="full"
                  onClick={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: 'addDiscipline',
                        isEditing: true,
                        value: item,
                      }),
                    )
                  }
                /> */}
                </StyledFlex>
              );
            })}
        </Flex>
      )}
    </Flex>
  );
};

export default DisciplineModule;
