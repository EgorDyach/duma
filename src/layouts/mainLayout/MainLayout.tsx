import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import { FC, PropsWithChildren } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainWrapper = styled(Flex)`
  max-width: 1040px;
  margin: 0 auto;
`;

const Header = styled(Flex)`
  background-color: #641aee;
  border-radius: 0 0 10px 10px;
  padding: 22px;
  margin-bottom: 20px;
`;

const HeaderAvatar = styled(Flex)`
  background-color: #d9d9d9;
  border-radius: 50px;
  width: 36px;
  height: 36px;
`;
const ExitButton = styled.button`
  width: 100px;
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: red;
  color: white; /* Цвет текста, если вы добавите текст */
  cursor: pointer;
  font-size: 12px; /* Размер шрифта, если вы добавите текст */
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    transform 0.2s;

  &:hover {
    background-color: #9b0c0c; /* Цвет при наведении */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <MainWrapper direction="column">
      <Header justify="space-between" align="center">
        <Flex gap="8px" align="center">
          <HeaderAvatar />
          <Flex align="start" direction="column" gap="2px">
            <Text $color="#fff" $size="medium">
              Черненко Марина Владимировна
            </Text>
            <Text $color="#FFFFFF59" $size="small">
              администратор
            </Text>
          </Flex>
        </Flex>
        <ExitButton
          onClick={() => {
            sessionStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Выйти
        </ExitButton>
      </Header>
      {children || <Outlet />}
    </MainWrapper>
  );
};
