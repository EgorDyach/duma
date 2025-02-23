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

const EditText = styled(Text)`
  color: #641aee;
  cursor: pointer;
  margin-left: 32px;
`;

export const MODAL_NAME = 'addDiscipline';

const DisciplineModule = () => {
  const disciplines = useSelector(institutionSelectors.getDisciplines);
  const subjects = useSelector(institutionSelectors.getSubjects);
  const courses = useSelector(institutionSelectors.getCourses);
  const teachers = useSelector(institutionSelectors.getTeachers);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllDisciplines());
  });

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
      {requests['disciplines'] === 'pending' && <ContentLoader size={32} />}
      {requests['disciplines'] !== 'pending' && (
        <Flex style={{ width: '100%' }} wrap="wrap" gap="11px">
          {disciplines.map((item) => {
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
                      subjects.find((el) => el.id === item.subject_id)?.name ??
                        'Не указано',
                    )}
                    {item.discipline_type ? ` – ${item.discipline_type}` : ''} (
                    {item.hours} ч.)
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
                    Изменить
                  </EditText>
                </Flex>

                <SubHeader $top="small">Группы</SubHeader>
                <Flex $top="small">
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
