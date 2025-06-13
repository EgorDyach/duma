import { Text } from '@components/Typography';
import styled from 'styled-components';
import NotificationCard from './NotificationCard';

const NotificationWrapper = styled.div`
  background-color: #3c3f4c;
  border-radius: 10px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const NotificationModule = () => {
  return (
    <NotificationWrapper>
      <Text $color="#8a8c94" $size="subheader">
        Уведомления
      </Text>
      <NotificationCard />
    </NotificationWrapper>
  );
};

export default NotificationModule;
