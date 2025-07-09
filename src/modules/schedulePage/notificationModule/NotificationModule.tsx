import { Text } from '@components/Typography';
import styled from 'styled-components';
import NotificationCard from './NotificationCard';
import Flex from '@components/Flex';
import { useState } from 'react';

const NotificationWrapper = styled.div`
  background-color: #3c3f4c;
  border-radius: 10px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 1250px) {
    display: none;
  }
`;

const initialHomeworkNotifications = [
  {
    date: '2025-06-12',
    name: 'Напоминание о домашнем задании',
    title: 'Математика',
    text: 'Не забудьте выполнить задание на странице 45, упражнения 1-10.',
  },
  {
    date: '2025-06-13',
    name: 'Новое домашнее задание',
    title: 'История',
    text: 'Подготовьте доклад о Второй мировой войне к следующему понедельнику.',
  },
  {
    date: '2025-06-14',
    name: 'Срок сдачи домашнего задания',
    title: 'Физика',
    text: 'Сдайте лабораторную работу по механике до конца недели.',
  },
  {
    date: '2025-06-15',
    name: 'Обновление по домашнему заданию',
    title: 'Литература',
    text: 'Прочитайте главу 5 и подготовьте вопросы для обсуждения на уроке.',
  },
];

const NotificationModule = () => {
  const [homeworkNotifications, setHomeworkNotifications] = useState(
    initialHomeworkNotifications,
  );

  return (
    <NotificationWrapper>
      <Flex justify="center">
        <Text $color="#8a8c94" $size="subheader">
          Уведомления
        </Text>
      </Flex>
      <Flex direction="column" gap="10px" style={{ marginTop: 37 }}>
        {homeworkNotifications.map((el, index) => (
          <NotificationCard
            key={index}
            name={el.name}
            date={el.date}
            title={el.title}
            text={el.text}
            onDelete={() =>
              setHomeworkNotifications(
                homeworkNotifications.filter((_, idx) => idx !== index),
              )
            }
          />
        ))}
      </Flex>
    </NotificationWrapper>
  );
};

export default NotificationModule;
