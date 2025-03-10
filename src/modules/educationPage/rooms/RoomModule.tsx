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
import { useEffect } from 'react';
import { StyledTable, StyledHeaderCell, StyledRow, StyledCell } from '@components/Table/TableStyles';
import PenIcon from '@components/icons/PenIcon';
import { roomLabels, roomTaints } from './constants';

export const MODAL_NAME = 'addRoom';

const RoomModule = () => {
  const rooms = useSelector(institutionSelectors.getRooms);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchAllRooms());
  });

  useEffect(() => {
    console.log('room0: ', rooms[0]);
  }, [rooms]);

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
              <StyledHeaderCell>Метки</StyledHeaderCell>
              <StyledHeaderCell>Ограничения</StyledHeaderCell>
            </thead>
            <tbody>
          {[...rooms]
            .sort((a, b) => a.room.name.localeCompare(b.room.name))
            .map((item, index) => {
              return (
                // <Button
                //   key={index}
                //   size="large"
                //   onClick={() =>
                //     dispatch(
                //       uiActions.openModal({
                //         modalName: MODAL_NAME,
                //         isEditing: true,
                //         value: item,
                //       }),
                //     )
                //   }
                // >
                //   <Text>
                //     {item.room.name}
                //   </Text>
                // </Button>
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
                    {item.roomlabels
                      .map((label) =>
                        roomLabels.find((val) => val.id === label.label_value),
                      )
                      .map((val) => val?.name)
                      .join(', ')}
                  </StyledCell>
                  <StyledCell>
                    {item.roomtaints
                      .map((taint) =>
                        roomTaints.find((val) => val.id === taint.taint_value),
                      )
                      .map((val) => val?.name)
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
