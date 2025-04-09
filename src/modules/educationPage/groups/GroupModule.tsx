import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingGroupModal } from './AddingGroupModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllGroups, fetchAllProfiles, fetchAllShifts } from '@store/institution/thunks';
import {
  StyledCell,
  StyledHeaderCell,
  StyledRow,
  StyledTable,
} from '@components/Table/TableStyles';
import { Text } from '@components/Typography';
import PenIcon from '@components/icons/PenIcon';
import Button from '@components/Button';
import PopupCalendar from '@components/PopupCalendar';

export const MODAL_NAME = 'addGroup';

const GroupModule = () => {
  const groups = useSelector(institutionSelectors.getGroups);
  const shifts = useSelector(institutionSelectors.getShifts);
  const profiles = useSelector(institutionSelectors.getProfiles);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchAllGroups());
    dispatch(fetchAllProfiles());
    dispatch(fetchAllShifts());
  });
  return (
    <Flex flex="2" direction="column" gap="8px" align="start">
      <Modal modalName={MODAL_NAME}>
        <AddingGroupModal />
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
        Группы
      </Title>
      {requests['groups'] === 'pending' && <ContentLoader size={32} />}
      {requests['groups'] !== 'pending' && (
        <Flex wrap="wrap" gap="11px" style={{ width: '100%' }}>
          <StyledTable>
            <thead>
              <StyledHeaderCell />
              <StyledHeaderCell>Название</StyledHeaderCell>
              <StyledHeaderCell>Количество студентов</StyledHeaderCell>
              <StyledHeaderCell>Смена</StyledHeaderCell>
              <StyledHeaderCell>Профиль</StyledHeaderCell>
              <StyledHeaderCell>Выходные и каникулы</StyledHeaderCell>
            </thead>
            <tbody>
              {[...groups]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => {
                  return (
                    <StyledRow>
                      <StyledCell>
                        <Button
                          key={item.id}
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
                      <StyledCell>
                        <Flex gap="10px" align="center">
                          <Text>{item.name}</Text>
                        </Flex>
                      </StyledCell>
                      <StyledCell>{item.studentscount}</StyledCell>
                      <StyledCell>
                        {
                          shifts.find((shift) => shift.id === item.shift_id)
                            ?.number
                        }
                      </StyledCell>
                      <StyledCell>
                        {profiles.find(
                          (profile) => profile.id === item.profile_id,
                        )?.name || 'Не указано'}
                      </StyledCell>
                      <StyledCell>
                        <PopupCalendar value={item.holidays?.map((holiday) => new Date(holiday.date))}/>
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

export default GroupModule;
