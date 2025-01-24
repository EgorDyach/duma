import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContent, AuthWrapper } from './AuthLayoutStyles';
import Flex from '@components/Flex';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthWrapper>
      <AuthContent>
        <Flex $top="xlarge">{children || <Outlet />}</Flex>
      </AuthContent>
    </AuthWrapper>
  );
};

export default AuthLayout;
