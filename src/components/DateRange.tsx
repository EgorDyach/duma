import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Flex from './Flex';

const StyledRange = styled(Flex)`
  padding: 13px 30px;
  border-radius: 10px;
  background-color: #f0f0f7;
`;

export const DateRange: FC<PropsWithChildren> = ({ children }) => (
  <StyledRange align="center" justify="center">
    {children}
  </StyledRange>
);
