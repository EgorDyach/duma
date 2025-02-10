import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingRoomModal } from './AddingRoomModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllRooms } from '@store/institution/thunks';

export const MODAL_NAME = 'addRoom';

const RoomModule = () => {
  const rooms = useSelector(institutionSelectors.getRooms);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllRooms());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingRoomModal />
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
        Аудитории
      </Title>
      {requests['rooms'] === 'pending' && <ContentLoader size={32} />}
      {requests['rooms'] !== 'pending' && (
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
          {rooms.map((item) => {
            return (
              <TextButton
                key={item.id}
                text={String(item.name)}
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

export default RoomModule;
