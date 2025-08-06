import ScheduleCard from './scheduleCard/ScheduleCard';
import styled from 'styled-components';
import { Text } from '@components/Typography';
import Flex from '@components/Flex';
import NotificationModule from './notificationModule/NotificationModule';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { institutionSelectors } from '@store/institution';
import { uiSelectors } from '@store/ui';
import { useSelector } from 'react-redux';
import ContentLoader from '@components/ContentLoader';
import {
  fetchAllCourses,
  fetchAllLessonTimes,
  fetchAllLessons,
  fetchAllRooms,
  fetchAllSubjects,
} from '@store/institution/thunks';
import { useEffectOnce } from '@hooks/useEffectOnce';

function getDayOfWeekInRussian(date: Date) {
  const daysOfWeek = [
    'Воскресенье', // 0
    'Понедельник', // 1
    'Вторник', // 2
    'Среда', // 3
    'Четверг', // 4
    'Пятница', // 5
    'Суббота', // 6
  ];
  return daysOfWeek[date.getDay()];
}

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

  @media (max-width: 900px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const currentWeekLessons = (lessons: Lesson[]): Lesson[][] => {
  const today = new Date();
  const firstDay = new Date(today);
  const lastDay = new Date(today);

  firstDay.setDate(today.getDate() - today.getDay() + 1);
  lastDay.setDate(firstDay.getDate() + 6);

  const weekLessons = [...lessons].filter(
    (el) => new Date(el.date) >= firstDay ?? new Date(el.date) <= lastDay,
  );

  const daysLessons: Lesson[][] = [[], [], [], [], [], []];

  weekLessons.forEach((el) => {
    const day = new Date(el.date).getDay() - 1;
    if (day < 0) return;
    daysLessons[day].push(el);
  });

  console.log(daysLessons);

  return daysLessons;
};

const SchedulePage = () => {
  const lessons = useSelector(institutionSelectors.getLessons);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchAllLessons());
    dispatch(fetchAllRooms());
    dispatch(fetchAllSubjects());
    dispatch(fetchAllCourses());
    dispatch(fetchAllLessonTimes());
  });

  const currentLessons = currentWeekLessons(lessons);

  return (
    <>
      <Flex gap="20px">
        <div style={{ width: '100%' }}>
          <ScheduleHead>
            <Text $color="#8a8c94" $size="subheader">
              Текущая неделя
            </Text>
          </ScheduleHead>
          {requests['lessons'] === 'pending' && <ContentLoader size={32} />}
          {requests['lessons'] !== 'pending' && (
            <ScheduleContainer>
              {currentLessons.map((el, index) => {
                if (el.length > 0) {
                  const date = new Date(el[0].date);
                  return (
                    <ScheduleCard
                      lessonsOnDay={Math.max(
                        ...currentLessons.map((el) => el.length),
                      )}
                      key={index}
                      day={getDayOfWeekInRussian(date)}
                      date={date}
                      lessons={el}
                    />
                  );
                }
                return null;
              })}
            </ScheduleContainer>
          )}
        </div>
        <NotificationModule />
      </Flex>
    </>
  );
};

export default SchedulePage;
