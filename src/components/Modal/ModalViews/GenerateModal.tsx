import Flex from '@components/Flex';
import CloseIcon from '@components/icons/CloseIcon';
import {
  StyledModalWrap,
  StyledModalContent,
  StyledModalTitle,
  StyledModalAdd,
} from '../ModalStyles';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

interface GenerateModalProps {
  handleGenerate: (startDate: Date | null, endDate: Date | null) => void;
  hideModal: VoidFunction;
}

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

export const GenerateModal: FC<GenerateModalProps> = ({
  hideModal,
  handleGenerate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <StyledModalWrap $size={'default'}>
      <StyledModalContent>
        <Flex gap="30px" justify="space-between">
          <Flex gap="10px">
            <StyledModalTitle $top="xsmall">
              Сгенерировать расписание
            </StyledModalTitle>
          </Flex>

          <CloseIcon color={'#641AEE'} onClick={hideModal} size={28} />
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
            <StyledModalAdd onClick={() => handleGenerate(startDate, endDate)}>
              Сгенерировать
            </StyledModalAdd>
            <StyledModalAdd onClick={hideModal}>Отмена</StyledModalAdd>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
