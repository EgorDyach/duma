import ScheduleCard, { Schedule } from './scheduleCard/ScheduleCard';
import styled from 'styled-components';
import { Text } from '@components/Typography';
import Flex from '@components/Flex';
import NotificationModule from './notificationModule/NotificationModule';

const schedule: Schedule[] = [
  {
    day: 'Понедельник',
    date: new Date('2025-12-12'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 52',
        name: 'Математика',
        homework: 'Параграф 5, вопросы 1-3',
        mark: Math.floor(Math.random() * 6), // случайная оценка от 0 до 5
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 53',
        name: 'Физика',
        homework: 'Лабораторная работа',
      },
    ],
  },
  {
    day: 'Вторник',
    date: new Date('2025-12-13'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 54',
        name: 'Химия',
        homework: 'Сделать презентацию',
        mark: Math.floor(Math.random() * 6),
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 55',
        name: 'История',
        homework: 'Читать главы 3 и 4',
      },
    ],
  },
  {
    day: 'Среда',
    date: new Date('2025-12-14'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 56',
        name: 'Литература',
        homework: 'Написать эссе',
        mark: Math.floor(Math.random() * 6),
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 57',
        name: 'География',
        homework: 'Подготовить доклад',
      },
    ],
  },
  {
    day: 'Четверг',
    date: new Date('2025-12-15'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 58',
        name: 'Информатика',
        homework: 'Создать проект',
        mark: Math.floor(Math.random() * 6),
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 59',
        name: 'Музыка',
        homework: 'Выучить песню',
      },
    ],
  },
  {
    day: 'Пятница',
    date: new Date('2025-12-16'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 60',
        name: 'Физкультура',
        homework: 'Подготовиться к соревнованиям',
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 61',
        name: 'Иностранный язык',
        homework: 'Прочитать текст',
        mark: Math.floor(Math.random() * 6),
      },
    ],
  },
  {
    day: 'Суббота',
    date: new Date('2025-12-17'),
    lessons: [
      {
        timeStart: '9:00',
        timeEnd: '10:30',
        location: 'K 62',
        name: 'Экономика',
        homework: 'Подготовить отчет',
        mark: Math.floor(Math.random() * 6),
      },
      {
        timeStart: '11:00',
        timeEnd: '12:30',
        location: 'K 63',
        name: 'Технология',
        homework: 'Сделать проект',
      },
    ],
  },
];

const ScheduleHead = styled.div`
  background-color: #3c3f4c;
  padding: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ScheduleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-auto-flow: column;

  @media (max-width: 1000px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SchedulePage = () => {
  return (
    <>
      <Flex gap="20px">
        <div>
          <ScheduleHead>
            <Text $color="#8a8c94" $size="subheader">
              Текущая неделя
            </Text>
          </ScheduleHead>
          <ScheduleContainer>
            {schedule.map((el, index) => (
              <ScheduleCard
                lessonsOnDay={6}
                key={index}
                day={el.day}
                date={el.date}
                lessons={el.lessons}
              />
            ))}
          </ScheduleContainer>
        </div>
        <NotificationModule />
      </Flex>
    </>
  );
};

export default SchedulePage;
