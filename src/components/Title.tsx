import { FC, PropsWithChildren } from 'react';
import Flex from './Flex';
import { SubHeader } from './Typography';
import PlusIcon from './icons/PlusIcon';
import styled from 'styled-components';

interface TitleProps extends PropsWithChildren {
  action?: VoidFunction;
}

const StyledIcon = styled(PlusIcon)`
  cursor: pointer;
`;

export const Title: FC<TitleProps> = ({ children, action }) => {
  return (
    <Flex align="center" gap="9px">
      <SubHeader>{children}</SubHeader>
      {action && <StyledIcon color="#641AEE" onClick={action} size={16} />}
    </Flex>
  );
};
