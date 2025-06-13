import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import CloseIcon from '@components/icons/CloseIcon';
import styled from 'styled-components';

const NotificationHead = styled.div`
  background-color: #641aee;
  border-radius: 10px;
  padding: 13px;
  width: 100%;
`;

const NotificationCard = () => {
  return (
    <NotificationHead>
      <Flex align="center" justify="space-between">
        <Flex direction="column" align="left">
          <Text $color="#aaa" $size="small">
            14 февраля
          </Text>
          <Text $color="#fff">Домашнее задание</Text>
        </Flex>
        <CloseIcon width="14px" height="14px" />
      </Flex>
    </NotificationHead>
  );
};

export default NotificationCard;
