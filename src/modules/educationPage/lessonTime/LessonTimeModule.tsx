import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingLessonTimeModal } from './AddingLessonTimeModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllLessonTimes } from '@store/institution/thunks';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addLessonTime';

const LessonTimeModule = () => {
  const lessonTimes = useSelector(institutionSelectors.getLessonTimes);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllLessonTimes());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingLessonTimeModal />
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
        Время урока
      </Title>
      {requests['lessonTime'] === 'pending' && <ContentLoader size={32} />}
      {requests['lessonTime'] !== 'pending' && (
        <Flex wrap="wrap" gap="11px">
          {lessonTimes.map((item) => {
            return (
              <Button
                key={item.id}
                size="large"
                openEditing={() =>
                  dispatch(
                    uiActions.openModal({
                      modalName: MODAL_NAME,
                      isEditing: true,
                      value: item,
                    }),
                  )
                }
              >
                <Text>
                  {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
                </Text>
              </Button>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default LessonTimeModule;
