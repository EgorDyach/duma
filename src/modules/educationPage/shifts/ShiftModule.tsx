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
import { fetchAllLessonTimes, fetchAllShifts } from '@store/institution/thunks';
import { Text } from '@components/Typography';
import { AddingLessonTimeModal } from './AddingLessonTimeModal';
import { StyledHeaderCell, StyledTable, StyledRow, StyledCell } from '@components/Table/TableStyles';

export const MODAL_NAME = 'addShift';
export const LESSON_TIME_MODAL_NAME = 'addLessonTime';

const ShiftModule = () => {
  const shifts = useSelector(institutionSelectors.getShifts);
  const lessonTimes = useSelector(institutionSelectors.getLessonTimes);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchAllShifts());
    dispatch(fetchAllLessonTimes());
  });

  const handleEdit = (item) =>
    dispatch(
      uiActions.openModal({
        modalName: 'addShift',
        isEditing: true,
        value: item,
      }),
    );

  const sortedShifts = [...shifts].sort((a, b) => a.number - b.number);

  const sortedLessonTimes = [...lessonTimes].sort((a, b) => {
    if (a.shift_id !== b.shift_id) {
      return a.shift_id - b.shift_id;
    }
    return a.start_time.localeCompare(b.start_time);
  });

  const lessonTimesByShift = {};
  sortedShifts.forEach(shift => {
    lessonTimesByShift[shift.id] = sortedLessonTimes.filter(lt => lt.shift_id === shift.id);
  });

  const maxLessonCount = Math.max(...Object.values(lessonTimesByShift).map(lt => lt.length), 0);

  return (
    <Flex flex="2" direction="column" gap="8px" align="start" style={{padding: '8px'}}>
      <Modal modalName={MODAL_NAME}>
        <AddingShiftModal />
      </Modal>
      <Modal modalName={LESSON_TIME_MODAL_NAME}>
        <AddingLessonTimeModal />
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
          {sortedShifts.map((item) => (
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
      
      <Title
        action={() =>
          dispatch(
            uiActions.openModal({
              modalName: LESSON_TIME_MODAL_NAME,
              isEditing: false,
              value: null,
            }),
          )
        }
      >
        Время уроков по сменам
      </Title>
      
      {requests['lessonTime'] === 'pending' && <ContentLoader size={32} />}
      {requests['lessonTime'] !== 'pending' && (
        <Flex direction="column" gap="11px" style={{ width: '100%', overflowX: 'auto' }}>
          <StyledTable>
            <thead>
              <StyledRow>
                {sortedShifts.map((shift) => (
                  <StyledHeaderCell key={shift.id}>
                    Смена {shift.number}
                  </StyledHeaderCell>
                ))}
              </StyledRow>
            </thead>
            <tbody>
              {Array.from({ length: maxLessonCount }).map((_, index) => (
                <StyledRow key={index}>
                  {sortedShifts.map((shift) => {
                    const lessonTime = lessonTimesByShift[shift.id][index];
                    
                    return (
                      <StyledCell key={shift.id}>
                        {lessonTime ? (
                          <Button
                            size="small"
                            variant="ghost"
                            onClick={() =>
                              dispatch(
                                uiActions.openModal({
                                  modalName: LESSON_TIME_MODAL_NAME,
                                  isEditing: true,
                                  value: lessonTime,
                                }),
                              )
                            }
                            style={{ width: '100%' }}
                          >
                            <Text>
                              {lessonTime.start_time.slice(0, 5)} - {lessonTime.end_time.slice(0, 5)}
                            </Text>
                          </Button>
                        ) : (
                          <Text style={{ color: '#999' }}>-</Text>
                        )}
                      </StyledCell>
                    );
                  })}
                </StyledRow>
              ))}
            </tbody>
          </StyledTable>
        </Flex>
      )}
    </Flex>
  );
};

export default ShiftModule;