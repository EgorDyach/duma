import ContentLoader from '@components/ContentLoader';
import Flex from '@components/Flex';
import { Modal } from '@components/Modal/Modal';
// import Button from '@components/Button';
import { Title } from '@components/Title';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiActions, uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import { AddingTeacherModal } from './AddingTeacherModal';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { fetchAllTeachers } from '@store/institution/thunks';
import { Text } from '@components/Typography';
import {
  StyledCell,
  StyledHeaderCell,
  StyledRow,
  StyledTable,
} from '@components/Table/TableStyles';
import BoxElement from '@components/TreeNavigator/TreeNavigator';
import { useState } from 'react';
import PenIcon from '@components/icons/PenIcon';
import Button from '@components/Button';
// import Calendar from 'react-calendar';

export const MODAL_NAME = 'addTeacher';

const TeacherModule = () => {
  const teachers = useSelector(institutionSelectors.getTeachers);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  const [displayedTeachers, setDisplauyedTeachers] = useState(false);

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
        <Flex wrap="nowrap" gap="10px" style={{ width: '100%' }}>
          <BoxElement label="Организация">
            <BoxElement
              label="Кафедра"
              onSelect={() => setDisplauyedTeachers(true)}
            />
          </BoxElement>
          <div style={{ width: '100%' }}>
            <StyledTable>
              <thead>
                <tr>
                  <StyledHeaderCell style={{ width: 500 }}>
                    Учитель
                  </StyledHeaderCell>
                  <StyledHeaderCell>Выходные и отпуска</StyledHeaderCell>
                </tr>
              </thead>
              {displayedTeachers && (
                <tbody>
                  {[...teachers]
                    .sort((a, b) => a.fullname.localeCompare(b.fullname))
                    .map((item) => {
                      return (
                        <StyledRow style={{ maxHeight: 60 }} key={item.id}>
                          <StyledCell>
                            <Flex gap="10px" align="center">
                            <Button
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
                              <PenIcon
                                width="16px"
                                height="16px"
                                fill="#641aee"
                              />
                            </Button>
                              <Text>{item.fullname}</Text>
                            </Flex>
                          </StyledCell>
                          <StyledCell
                            style={{ overflow: 'scroll', padding: 0 }}
                          >
                            <Flex direction="column" style={{ padding: 0 }}>
                              {/* {item.holidays?.map((holiday) => (
                                <Text>{holiday.date.slice(0, 10)}, </Text>
                              ))} */}
                              {/* <Calendar /> */}
                            </Flex>
                          </StyledCell>
                        </StyledRow>
                      );
                    })}
                </tbody>
              )}
            </StyledTable>
          </div>
        </Flex>
      )}
    </Flex>
  );
};

export default TeacherModule;
