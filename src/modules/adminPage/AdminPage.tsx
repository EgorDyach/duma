// import Flex from '@components/Flex';
// import { Backdrop } from '@components/Modal/ModalStyles';
// import { AddingSchoolModal } from '@components/Modal/ModalViews/AddingSchoolModal';
// import { AddingSuzModal } from '@components/Modal/ModalViews/AddingSuzModal';
// import { AddingVuzModal } from '@components/Modal/ModalViews/AddingVuzModal';
// import Portal from '@components/Portal';
// import TextButton from '@components/TextButton';
// import { Title } from '@components/Title';

import Flex from '@components/Flex';
import styled from 'styled-components';
import SchoolModule from './school/SchoolModule';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { fetchEducations } from '@store/admin/thunks';
import UniversityModule from './university/UniversityModule';
import SecondaryModule from './secondary/SecondaryModule';

const Wrapper = styled(Flex)`
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 35px;
`;

const AdminPage = () => {
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchEducations());
  });
  return (
    <Wrapper>
      <SchoolModule />
      <UniversityModule />
      <SecondaryModule />
    </Wrapper>
  );
};

export default AdminPage;
