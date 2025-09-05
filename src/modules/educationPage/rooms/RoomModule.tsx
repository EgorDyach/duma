import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingRoomModal } from './AddingRoomModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllRooms } from '@store/institution/thunks';
import {
  StyledTable,
  StyledHeaderCell,
  StyledRow,
  StyledCell,
} from '@components/Table/TableStyles';
import PenIcon from '@components/icons/PenIcon';

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
        <Flex wrap="wrap" gap="11px" style={{ width: '100%' }}>
          <StyledTable>
            <thead>
              <StyledHeaderCell />
              <StyledHeaderCell>Название</StyledHeaderCell>
              <StyledHeaderCell>Вместимость</StyledHeaderCell>
              <StyledHeaderCell>Назначение</StyledHeaderCell>
              <StyledHeaderCell>Особенности</StyledHeaderCell>
            </thead>
            <tbody>
              {[...rooms]
                .sort((a, b) => a.room?.name.localeCompare(b.room.name))
                .map((item, index) => {
                  return (
                    <StyledRow>
                      <StyledCell>
                        <Button
                          key={index}
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
                          <PenIcon width="16px" height="16px" fill="#641aee" />
                        </Button>
                      </StyledCell>
                      <StyledCell>{item.room.name}</StyledCell>
                      <StyledCell>{item.room.capacity}</StyledCell>
                      <StyledCell>
                        {item.room_labels
                          .map((val) => val.label_value)
                          .join(', ')}
                      </StyledCell>
                      <StyledCell>
                        {item.room_taints
                          .map((val) => val.taint_value)
                          .join(', ')}
                      </StyledCell>
                    </StyledRow>
                  );
                })}
            </tbody>
          </StyledTable>
        </Flex>
      )}
    </Flex>
  );
};

export default RoomModule;
