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
import InstitutionNavigation from './navigation/InstitutionNavigation';

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

const modules = {
  shifts: <ShiftModule key="shifts" />,
  profiles: <ProfileModule key="profiles" />,
  teachers: <TeacherModule key="teachers" />,
  groups: <GroupModule key="groups" />,
  subjects: <SubjectModule key="subjects" />,
  rooms: <RoomModule key="rooms" />,
  lessonTime: <LessonTimeModule key="lessonTime" />,
  disciplines: <DisciplineModule key="disciplines" />,
};

const EducationPage: React.FC = () => {
  const [isServerLive, setIsServerLive] = useState(true);
  const dispatch = useAppDispatch();
  const user = useSelector(uiSelectors.getUser);
  const activeTab = useSelector(uiSelectors.getActiveTabs);

  useEffect(() => {
    (async () => {
      try {
        await axios.get('https://puzzlesignlanguage.online/status');
        setIsServerLive(true);
      } catch {
        if (isServerLive) setIsServerLive(true);
      }
    })();
    const interval = setInterval(async () => {
      try {
        await axios.get('https://puzzlesignlanguage.online/status');
        setIsServerLive(true);
      } catch {
        if (isServerLive) setIsServerLive(true);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Flex gap="20px">
        <InstitutionNavigation />
        <Wrapper style={{ flex: 1 }}>
          <Modal modalName="GenerateModal">
            <GenerateModal />
          </Modal>
          {modules[activeTab]}
          <Flex gap="16px" justify="start" align="center" $top="large">
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
                    isEditing: true,
                  }),
                )
              }
            >
              Сгенерировать
            </StyledButton>
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
              }}
            >
              Скачать
            </StyledButton>
          </Flex>
        </Wrapper>
      </Flex>
    </>
  );
  // </Wrapper>
};

export default EducationPage;
