import Flex from '@components/Flex';
import CloseIcon from '@components/icons/CloseIcon';
import { StyledModalTitle } from '../ModalStyles';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { uiActions, uiSelectors } from '@store/ui';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@lib/utils/notification';
import Button from '@components/Button';
import toast from 'react-hot-toast';
import { Text } from '@components/Typography';
import { validateGeneration } from './helpers';

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

const StyledIcon = styled(CloseIcon)`
  cursor: pointer;
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
    <>
      <Flex gap="30px" justify="space-between">
        <Flex gap="10px">
          <StyledModalTitle $top="xsmall">
            Сгенерировать расписание
          </StyledModalTitle>
        </Flex>

        <StyledIcon
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
          <Button
            onClick={async () => {
              const error = validateGeneration(startDate, endDate);
              if (error) return showErrorNotification(error);
              try {
                await axios.post(
                  `https://puzzlesignlanguage.online/schedule/generate?institution_id=${user.institution_id}&start_date=${startDate?.toISOString()}&end_date=${endDate?.toISOString()}`,
                );
                try {
                  await fetch(
                    // @ts-ignore
                    `https://puzzlesignlanguage.online/schedule/get/excel?institution_id=${user.institution_id}`,
                    {},
                  )
                    .then((resp) =>
                      resp.status === 200
                        ? resp.blob()
                        : Promise.reject(
                            'Не удалось скачать, попробуйте еще раз!',
                          ),
                    )
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      a.download = 'Расписание.xlsx';
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      toast.success('Файл успешно скачен!');
                    })
                    .catch((error) =>
                      toast.error('Не удалось скачать ' + `(${error})`),
                    );
                } catch (error) {
                  toast.error('Не удалось скачать ' + `(${error})`);
                }
                showSuccessNotification('Расписание сгенерировано!');
              } catch (e) {
                showErrorNotification(
                  'Не удалось сгенерировать расписание, попробуйте снова!',
                );
              }
            }}
          >
            <Text $size="small">Сгенерировать</Text>
          </Button>
          <Button onClick={() => dispatch(uiActions.closeModals())}>
            <Text $size="small">Отмена</Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
