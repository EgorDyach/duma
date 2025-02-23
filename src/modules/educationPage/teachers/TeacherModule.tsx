import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingTeacherModal } from './AddingTeacherModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllTeachers } from '@store/institution/thunks';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addTeacher';

const TeacherModule = () => {
  const teachers = useSelector(institutionSelectors.getTeachers);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllTeachers());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingTeacherModal />
      </Modal>
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: MODAL_NAME,
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Учителя
      </Title>
      {requests['teachers'] === 'pending' && <ContentLoader size={32} />}
      {requests['teachers'] !== 'pending' && (
        <Flex wrap="wrap" gap="11px">
          {teachers.map((item) => {
            return (
              <Button
                key={item.id}
                size="large"
                onClick={() =>
                  dispatch(
                    uiActions.openModal({
                      modalName: MODAL_NAME,
                      isEditing: true,
                      value: item,
                    }),
                  )
                }
              >
                <Text>{item.fullname}</Text>
              </Button>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default TeacherModule;
