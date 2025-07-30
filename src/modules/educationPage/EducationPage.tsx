import Flex from '@components/Flex';
import styled from 'styled-components';
import ShiftModule from './shifts/ShiftModule';
import ProfileModule from './profiles/ProfileModule';
import TeacherModule from './teachers/TeacherModule';
import GroupModule from './groups/GroupModule';
import SubjectModule from './subjects/SubjectModule';
import RoomModule from './rooms/RoomModule';
import LessonTimeModule from './lessonTime/LessonTimeModule';
import DisciplineModule from './disciplines/DisciplineModule';
import { uiSelectors } from '@store/ui';
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
  const activeTab = useSelector(uiSelectors.getActiveTabs);

  return (
    <>
      <Flex gap="20px">
        <InstitutionNavigation />
        <Wrapper style={{ flex: 1 }}>
          <Modal modalName="GenerateModal">
            <GenerateModal />
          </Modal>
          {modules[activeTab]}
        </Wrapper>
      </Flex>
    </>
  );
  // </Wrapper>
};

export default EducationPage;
