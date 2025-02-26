import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingShiftModal } from './AddingShiftModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllShifts } from '@store/institution/thunks';
import { Text } from '@components/Typography';

export const MODAL_NAME = 'addShift';

const ShiftModule = () => {
  const shifts = useSelector(institutionSelectors.getShifts);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchAllShifts());
  });

  const handleEdit = (item: Shift) =>
    dispatch(
      uiActions.openModal({
        modalName: 'addShift',
        isEditing: true,
        value: item,
      }),
    );

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
        <Flex wrap="wrap" gap="11px">
          {[...shifts]
            .sort((a, b) => String(a.number).localeCompare(String(b.number)))
            .map((item) => (
              <Button
                key={item.id}
                size="small"
                onClick={() => handleEdit(item)}
              >
                <Text>{item.number}</Text>
              </Button>
            ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ShiftModule;
