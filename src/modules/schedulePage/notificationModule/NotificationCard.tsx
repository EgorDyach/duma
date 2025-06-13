import Button from '@components/Button';
import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import ChevronIcon from '@components/icons/ChevronIcon';
import CloseIcon from '@components/icons/CloseIcon';
import React, { useState } from 'react';
import styled from 'styled-components';

const NotificationHead = styled.div`
  background-color: #641aee;
  border-radius: 10px;
  padding: 13px;
  width: 100%;
  flex-grow: 1;
`;

const NotificationBody = styled.div<{ $isOpen: boolean }>`
  background-color: #5c6070;
  border-radius: 11px;
  width: 100%;
  max-height: ${(props) => (props.$isOpen ? '240px' : '63px')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const StyledIcon = styled(CloseIcon)<{ $iOpen?: boolean }>`
  cursor: pointer;
  color: transparent;
  transform: rotate(${(props) => (props.$iOpen ? '180deg' : '0deg')});
  transition: all 0.3 ease;
`;

const StyledChevronIcon = styled(ChevronIcon)<{ $iOpen?: boolean }>`
  cursor: pointer;
  transform: rotate(${(props) => (props.$iOpen ? '180deg' : '0deg')});
  transition: all 0.3s;
`;

const DarkButton = styled(Button)`
  background-color: #641aee;
  padding: 7px 16px;
  font-size: 11px;
  color: #fff;
`;

const LightButton = styled(DarkButton)`
  background-color: transparent;
  border: 1px #fff solid;
`;

type CardProps = {
  onDelete: VoidFunction;
  date?: string;
  name?: string;
  title?: string;
  text?: string;
};

const NotificationCard: React.FC<CardProps> = ({
  onDelete,
  date,
  name,
  title,
  text,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <NotificationBody $isOpen={isOpened}>
      <NotificationHead>
        <Flex align="center" justify="space-between">
          <Flex
            direction="column"
            align="left"
            onClick={() => setIsOpened(!isOpened)}
            style={{ cursor: 'pointer' }}
          >
            <Text $color="#aaa" $size="small">
              {date}
            </Text>
            <Flex gap="5px">
              <StyledChevronIcon
                fill="#fff"
                width="16px"
                height="16px"
                $iOpen={isOpened}
              />
              <Text
                $color="#fff"
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '250px',
                }}
              >
                {name}
              </Text>
            </Flex>
          </Flex>
          <StyledIcon width="20px" height="20px" onClick={onDelete} />
        </Flex>
      </NotificationHead>
      <Flex
        direction="column"
        style={{
          padding: 13,
        }}
      >
        <Text $color="#fff" $size="medium">
          {title}
        </Text>
        <Text
          $color="#aeb0b8"
          $size="small"
          style={{
            display: 'inline-block',
            maxWidth: 305,
            maxHeight: 100,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </Text>
        <Flex gap="7px" $top="medium" justify="space-between">
          <DarkButton>Учебник</DarkButton>
          <DarkButton>Презентация</DarkButton>
          <LightButton>Сдать ДЗ</LightButton>
        </Flex>
      </Flex>
    </NotificationBody>
  );
};

export default NotificationCard;
