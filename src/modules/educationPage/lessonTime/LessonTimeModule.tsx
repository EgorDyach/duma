import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingLessonTimeModal } from './AddingLessonTimeModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllLessonTimes } from '@store/institution/thunks';

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
          {lessonTimes.map((item) => {
            return (
              <TextButton
                key={item.id}
                text={`${item.starttime.slice(11, 16)} - ${item.endtime.slice(11, 16)}`}
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
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default LessonTimeModule;
