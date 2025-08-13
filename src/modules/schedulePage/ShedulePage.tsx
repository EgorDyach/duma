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
  fetchAllFaculty,
  fetchAllCourses,
  fetchAllGroups,
  fetchAllLessonTimes,
  fetchAllLessons,
  fetchAllRooms,
  fetchAllSubjects,
} from '@store/institution/thunks';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useState } from 'react';
import DropDownMenu from '@components/DropDownMenu';

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
  justify-content: space-between;
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

const WeekButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #8a8c94;
`;

const currentWeekLessons = (
  lessons: Lesson[],
  weekOffset: number = 0, // Параметр для изменения недели
): { daysLessons: Lesson[][]; firstDay: Date; lastDay: Date } => {
  const today = new Date();
  const firstDay = new Date(today);
  const lastDay = new Date(today);

  const currentDayOfWeek = today.getDay();
  const daysToAdd = weekOffset * 7;

  firstDay.setDate(today.getDate() - currentDayOfWeek + 1 + daysToAdd);

  lastDay.setMonth(firstDay.getMonth());
  lastDay.setDate(firstDay.getDate() + 6);

  console.log('week', firstDay, lastDay);

  const weekLessons = [...lessons].filter((el) => {
    return new Date(el.date) >= firstDay && new Date(el.date) <= lastDay;
  });

  console.log(
    'weeklessons',
    weekLessons.map((el) => el.date),
  );

  const daysLessons: Lesson[][] = [[], [], [], [], [], []];

  weekLessons.forEach((el) => {
    const day = new Date(el.date).getDay() - 1;
    if (day < 0) return;
    daysLessons[day].push(el);
  });

  console.log('daylessons', daysLessons);

  return { daysLessons, firstDay, lastDay };
};

const SchedulePage = () => {
  const lessons = useSelector(institutionSelectors.getLessons);
    const user = useSelector(uiSelectors.getUser);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  const [weekOffset, setWeekOffset] = useState(0);
    const groups = useSelector(institutionSelectors.getGroups);
    console.log(user, "user");

  useEffectOnce(() => {
    dispatch(fetchAllLessons());
    dispatch(fetchAllRooms());
    dispatch(fetchAllSubjects());
    dispatch(fetchAllCourses());
    dispatch(fetchAllLessonTimes());
    dispatch(fetchAllGroups());
    dispatch(fetchAllFaculty());
  });

    const faculties = useSelector(institutionSelectors.getFaculties);
    console.log(faculties, "faculties");
    


    const subjects = useSelector(institutionSelectors.getSubjects);

    console.log(subjects, "subjects")

  const currentLessons = currentWeekLessons(lessons, weekOffset);

  return (
    <>
      <Flex gap="20px">
        <div style={{ width: '100%' }}>
          <ScheduleHead>
            <WeekButton onClick={() => setWeekOffset(weekOffset - 1)}>
              {'<'}
            </WeekButton>
            <Text $color="#8a8c94" $size="subheader">
              Текущая неделя
            </Text>
            <WeekButton onClick={() => setWeekOffset(weekOffset + 1)}>
              {'>'}
            </WeekButton>
            <DropDownMenu groups={groups}/>
          </ScheduleHead>
          {requests['lessons'] === 'pending' && <ContentLoader size={32} />}
          {requests['lessons'] !== 'pending' && (
            <ScheduleContainer>
              {currentLessons.daysLessons.map((el, index) => {
                const date = new Date(currentLessons.firstDay);
                date.setDate(currentLessons.firstDay.getDate() + index);
                console.log(currentLessons.firstDay.getDate());
                return (
                  <ScheduleCard
                    lessonsOnDay={
                      Math.max(
                        ...currentLessons.daysLessons.map((el) => el.length),
                      ) || 6
                    }
                    key={index}
                    day={getDayOfWeekInRussian(date)}
                    date={date}
                    lessons={el}
                  />
                );
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
