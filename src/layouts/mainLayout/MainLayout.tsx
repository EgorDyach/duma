import Flex from "@components/Flex";
import { Text } from "@components/Typography";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

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

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainWrapper direction="column">
      <Header align="center" gap="8px">
        <HeaderAvatar />
        <Flex align="start" direction="column" gap="2px">
          <Text $color="#fff" $size="medium">
            Черненко Марина Владимировна
          </Text>
          <Text $color="#FFFFFF59" $size="small">
            администратор
          </Text>
        </Flex>
      </Header>
      {children || <Outlet />}
    </MainWrapper>
  );
};
