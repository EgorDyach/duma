import Flex from '@components/Flex';
import styled from 'styled-components';
import SchoolModule from './school/SchoolModule';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { fetchInstitutions } from '@store/admin/thunks';
import UniversityModule from './university/UniversityModule';
import SecondaryModule from './secondary/SecondaryModule';
import AdminManagementModule from './adminManagementPage/AdminManagementModule';

const Wrapper = styled(Flex)`
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  padding: 40px 35px;
`;

const AdminPage = () => {
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(fetchInstitutions());
  });

  return (
    <Wrapper>
      <SchoolModule />
      <UniversityModule />
      <SecondaryModule />
      <AdminManagementModule />
    </Wrapper>
  );
};

export default AdminPage;
