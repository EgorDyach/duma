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
import { fetchAllDisciplines } from '@store/institution/thunks';
import { Text } from '@components/Typography';

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
        <Flex
          wrap="wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            alignContent: 'start',
            width: '100%',
          }}
          justify="start"
          basis="24%"
          gap="11px"
        >
          {disciplines.map((item) => {
            return (
              <Flex
                direction="column"
                key={item.id}
                style={{ marginBottom: 24 }}
              >
                <Text>
                  {String(
                    subjects.find((el) => el.id === item.subject_id)?.name ??
                      'Не указано',
                  )}
                  {item.discipline_type ? ` – ${item.discipline_type}` : ''} (
                  {item.hours} ч.)
                </Text>

                <Text $top="small">Группы</Text>
                {item.groups && item.groups.map((el) => <Text>{el.name}</Text>)}
                <Text $top="small">Учителя</Text>
                {courses
                  .filter((el) => el.discipline_id === item.id)
                  .map(
                    (el) =>
                      teachers.find((t) => t.id === el.teacher_id)?.fullname,
                  )}
                {/* <TextButton
                  text={}
                  size="full"
                  openEditing={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: 'addDiscipline',
                        isEditing: true,
                        value: item,
                      }),
                    )
                  }
                /> */}
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default DisciplineModule;
