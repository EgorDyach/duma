import Flex from "@components/Flex";
import { Header } from "@layouts/shared/header/Header";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainWrapper = styled(Flex)`
  max-width: 1280px;
  margin: 0 auto;
`;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainWrapper direction="column">
      <Header />
      {children || <Outlet />}
    </MainWrapper>
  );
};
