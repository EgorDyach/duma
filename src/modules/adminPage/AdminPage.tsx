import Flex from '@components/Flex';
import styled from 'styled-components';
import SchoolModule from './school/SchoolModule';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { fetchEducations } from '@store/admin/thunks';
import UniversityModule from './university/UniversityModule';
import SecondaryModule from './secondary/SecondaryModule';
import { StyledButton } from '@modules/educationPage/EducationPage';

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
      <Flex gap="16px" align="center">
        <button
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            background: 'white',
            borderRadius: 8,
            width: 56,
            height: 32,
            cursor: 'pointer',
            border: 'none',
          }}
        ></button>
        <StyledButton
          // @ts-ignore
          size="full"
          style={{ width: '100%' }}
          openEditing={() => {}}
        >
          Название
        </StyledButton>
        <StyledButton
          // @ts-ignore
          size="full"
          style={{ width: '100%' }}
          openEditing={() => {}}
        >
          Администратор
        </StyledButton>
      </Flex>
      <SchoolModule />
      <UniversityModule />
      <SecondaryModule />
    </Wrapper>
  );
};

export default AdminPage;
