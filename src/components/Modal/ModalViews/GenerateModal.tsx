import Flex from '@components/Flex';
import CloseIcon from '@components/icons/CloseIcon';
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalAdd,
} from '../ModalStyles';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { uiActions, uiSelectors } from '@store/ui';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showErrorNotification } from '@lib/utils/notification';

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid #641aee;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  input {
    border: 2px solid #641aee;
    background: #fff;
  }
`;

export const GenerateModal = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const user = useSelector(uiSelectors.getUser);
  if (!user || !('institution_id' in user)) {
    showErrorNotification('Невозможно сгенерировать расписание!');
    dispatch(uiActions.closeModals());
    return <></>;
  }
  return (
    <StyledModalWrap $size={'default'}>
      <StyledModalContent>
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              Сгенерировать расписание
            </StyledModalTitle>
          </Flex>

          <CloseIcon
            color={'#641AEE'}
            onClick={() => dispatch(uiActions.closeModals())}
            size={28}
          />
        </Flex>

        <Flex direction="column">
          <Flex $top="medium" gap="16px">
            <StyledDatePicker
              placeholderText="Начальная дата..."
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
            />

            <StyledDatePicker
              placeholderText="Конечная дата..."
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
            />
          </Flex>
          <Flex gap="16px" $top="large" justify="start">
            <StyledModalAdd
              onClick={() =>
                axios.post(
                  `https://puzzlesignlanguage.online/schedule/generate?institution_id=${user.institution_id}&start_date=${startDate?.toISOString()}&end_date=${endDate?.toISOString()}`,
                )
              }
            >
              Сгенерировать
            </StyledModalAdd>
            <StyledModalAdd onClick={() => dispatch(uiActions.closeModals())}>
              Отмена
            </StyledModalAdd>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
