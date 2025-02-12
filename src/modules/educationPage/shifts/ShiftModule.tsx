import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import TextButton from '@components/TextButton';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingShiftModal } from './AddingShiftModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllShifts } from '@store/institution/thunks';

export const MODAL_NAME = 'addShift';

const ShiftModule = () => {
  const shifts = useSelector(institutionSelectors.getShifts);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllShifts());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingShiftModal />
      </Modal>
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: 'addShift',
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Номер смены
      </Title>
      {requests['shifts'] === 'pending' && <ContentLoader size={32} />}
      {requests['shifts'] !== 'pending' && (
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
          {shifts
            // .sort((a, b) => a.number - b.number)
            .map((item) => {
              return (
                <TextButton
                  key={item.id}
                  text={String(item.number)}
                  size="small"
                  openEditing={() =>
                    dispatch(
                      uiActions.openModal({
                        modalName: 'addShift',
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

export default ShiftModule;
