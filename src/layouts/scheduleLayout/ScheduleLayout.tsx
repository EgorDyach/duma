import Flex from '@components/Flex';
import HeaderDropdown from '@components/HeaderDropdown';
import { Text } from '@components/Typography';
import BurgerIcon from '@components/icons/BurgerIcon';
import CalendarIcon from '@components/icons/CalendarIcon';
import CloseIcon from '@components/icons/CloseIcon';
import MailIcon from '@components/icons/MailIcon';
import SearchIcon from '@components/icons/SearchIcon';
import { uiSelectors } from '@store/ui';
import { FC, PropsWithChildren, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainWrapper = styled(Flex)`
  max-width: 1440px;
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

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px #fff solid;
  color: #fff;
  font-size: 18px;

  &:focus {
    outline: none;
  }
`;

const MenuElementWrapper = styled.div`
  margin-inline: 64px;
  border-top: 1px #ccc solid;
  width: 184px;
  padding-block: 18px;

  &:first-child {
    border-bottom: none;
  }
`;

const ExitButton = styled.div`
  cursor: pointer;
  background-color: #faebeb;
  border: 1px #e85757 solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 18px;
  color: #e85757;
  padding-block: 18px;
  width: 100%;
`;

type MenuElementProps = {
  text?: string;
};

const MenuElement: React.FC<MenuElementProps> = ({ text }) => (
  <MenuElementWrapper>
    <Text>{text}</Text>
  </MenuElementWrapper>
);

export const ScheduleLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(uiSelectors.getUser);
  const [burgerOpened, setBurgerOpened] = useState(false);

  return (
    <MainWrapper direction="column">
      <Header justify="space-between" align="center">
        <Flex gap="12px" align="center">
          <HeaderAvatar />
          <Flex align="start" direction="column" gap="2px">
            <Text $color="#fff" $size="medium">
              {user && 'institution_id' in user ? user.fullname : ''}
            </Text>
            <Text $color="#FFFFFF59" $size="small">
              {/* {user && isAdmin(user) ? 'Администратор Думы' : 'администратор'} */}
              студент
            </Text>
          </Flex>
          <Flex
            align="center"
            gap="12px"
            $left="xxlarge"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/schedule')}
          >
            <CalendarIcon />
            <Text $color="#fff">Расписание</Text>
          </Flex>
          <Flex
            align="center"
            gap="12px"
            $left="medium"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/schedule')}
          >
            <MailIcon />
            <Text $color="#fff">Почта</Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex gap="17px" style={{ marginRight: 50 }}>
            <StyledInput />
            <SearchIcon />
          </Flex>
          <HeaderDropdown
            options={[
              <MenuElement text="Успеваемость" />,
              <MenuElement text="Домашнее задание" />,
              <MenuElement text="Доп. образование" />,
              <MenuElement text="Видеозвонки" />,
              <MenuElement text="Администрация" />,
              <MenuElement text="Отзыв о приложении" />,
              <ExitButton>Выход</ExitButton>,
            ]}
            onSelect={() => setBurgerOpened(!burgerOpened)}
          >
            {burgerOpened ? (
              <CloseIcon width="31px" height="31px" color="#641aee" />
            ) : (
              <BurgerIcon />
            )}
          </HeaderDropdown>
        </Flex>
      </Header>
      {children || <Outlet />}
    </MainWrapper>
  );
};
