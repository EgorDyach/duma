import Flex from '@components/Flex';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import ShiftModule from './shifts/ShiftModule';
import ProfileModule from './profiles/ProfileModule';
import TeacherModule from './teachers/TeacherModule';
import GroupModule from './groups/GroupModule';
import SubjectModule from './subjects/SubjectModule';
import RoomModule from './rooms/RoomModule';
import LessonTimeModule from './lessonTime/LessonTimeModule';
import DisciplineModule from './disciplines/DisciplineModule';
import axios from 'axios';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { uiActions, uiSelectors } from '@store/ui';
import { Modal } from '@components/Modal/Modal';
import { GenerateModal } from '@components/Modal/ModalViews/GenerateModal';
import { useSelector } from 'react-redux';
import { showErrorNotification } from '@lib/utils/notification';

const Wrapper = styled(Flex)`
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 35px;
`;

export const StyledButton = styled.button<{
  $isActive?: boolean;
}>`
  background: ${(props) => (props.$isActive ? '#8348F1' : '#641aee')};
  border: 2px solid ${(props) => (props.$isActive ? '#8348F1' : '#641aee')};
  color: #fff;
  padding: 10px 47px;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
`;

const EducationPage: React.FC = () => {
  const [isServerLive, setIsServerLive] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector(uiSelectors.getUser);
  useEffect(() => {
    (async () => {
      try {
        await axios.get('https://puzzlesignlanguage.online/status');
        setIsServerLive(true);
      } catch {
        if (isServerLive) setIsServerLive(false);
      }
    })();
    const interval = setInterval(async () => {
      try {
        await axios.get('https://puzzlesignlanguage.online/status');
        setIsServerLive(true);
      } catch {
        if (isServerLive) setIsServerLive(false);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Modal modalName="GenerateModal">
        <GenerateModal />
      </Modal>
      <ShiftModule />
      <ProfileModule />
      <TeacherModule />
      <GroupModule />
      <SubjectModule />
      <RoomModule />
      <LessonTimeModule />
      <DisciplineModule />
      <Flex gap="16px" justify="end" align="center" $top="large">
        <StyledButton
          $isActive
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          onClick={async () => {
            if (!user || !('institution_id' in user))
              return showErrorNotification('Не удалось скачать!');
            try {
              await axios
                .get('https://puzzlesignlanguage.online/schedule/excel', {
                  data: { body: {}, institution_id: user.institution_id },
                })
                .then((resp) =>
                  resp.status === 200
                    ? resp.data.blob()
                    : Promise.reject('Возникла неизвестная ошибка...'),
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
                .catch(() => toast.error('Не удалось скачать!'));
            } catch (error) {
              toast.error('Не удалось скачать ' + `(${error})`);
            }
          }}
        >
          Скачать
        </StyledButton>
        <StyledButton
          disabled={!isServerLive}
          style={
            isServerLive
              ? { backgroundColor: '#35c452', borderColor: '#35c452' }
              : {
                  backgroundColor: '#f0414c',
                  borderColor: '#f0414c',
                  cursor: 'default',
                }
          }
          $isActive
          onClick={() =>
            dispatch(
              uiActions.openModal({
                modalName: 'GenerateModal',
                value: null,
                isEditing: false,
              }),
            )
          }
        >
          Сгенерировать
        </StyledButton>
      </Flex>
    </Wrapper>
  );
  // </Wrapper>
};

export default EducationPage;
