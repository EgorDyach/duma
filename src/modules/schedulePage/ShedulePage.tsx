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
  fetchAllLessonTimes,
  fetchAllRooms,
  fetchTeacherLessons,
  fetchAdminLessons,
} from '@store/institution/thunks';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useEffect, useState } from 'react';
import DropDownMenu from '@components/DropDownMenu';

function getDayOfWeekInRussian(date: Date) {
  const daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  return daysOfWeek[date.getDay()];
}

const ScheduleHead = styled.div`
  background-color: #3c3f4c;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    color: #ffffff;
  }
`;

const WeekNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #2c2d35;
  border-radius: 10px;
  margin-top: 20px;
`;

const NoScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #2c2d35;
  border-radius: 10px;
  margin-top: 20px;
`;

const currentWeekLessons = (
  lessons: Lesson[],
  weekOffset: number = 0,
): { daysLessons: Lesson[][]; firstDay: Date; lastDay: Date } => {
  const today = new Date();

  const firstDay = new Date(today);
  const currentDayOfWeek = today.getDay();
  const daysToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

  firstDay.setDate(today.getDate() + daysToMonday + (weekOffset * 7));
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);
  lastDay.setHours(23, 59, 59, 999);

  const firstDayUTC = new Date(firstDay.toISOString().split('T')[0] + 'T00:00:00Z');
  const lastDayUTC = new Date(lastDay.toISOString().split('T')[0] + 'T23:59:59Z');

  const getAllLessons = (lessons: Lesson[]): Lesson[] => {
    return lessons.flatMap(lesson => {
      return [lesson, ...(lesson.lessons ? getAllLessons(lesson.lessons) : [])];
    });
  }

  const weekLessons = getAllLessons(lessons).filter((el) => {
    const lessonDate = new Date(el.date);
    return lessonDate >= firstDayUTC && lessonDate <= lastDayUTC;
  });

  const daysLessons: Lesson[][] = [[], [], [], [], [], [], []];

  weekLessons.forEach((el) => {
    const lessonDate = new Date(el.date);
    const day = lessonDate.getUTCDay();

    let dayIndex;
    if (day === 0) {
      dayIndex = 6;
    } else {
      dayIndex = day - 1;
    }

    if (dayIndex >= 0 && dayIndex <= 6) {
      daysLessons[dayIndex].push(el);
    }
  });

  return { daysLessons, firstDay, lastDay };
};

const getWeekLabel = (weekOffset: number): string => {
  if (weekOffset === 0) {
    return 'Текущая неделя';
  } else if (weekOffset === 1) {
    return 'Следующая неделя';
  } else if (weekOffset === -1) {
    return 'Предыдущая неделя';
  } else if (weekOffset > 1) {
    return `Через ${weekOffset} недели`;
  } else {
    return `${Math.abs(weekOffset)} недели назад`;
  }
};

const hasLessonsThisWeek = (daysLessons: Lesson[][]): boolean => {
  return daysLessons.some(dayLessons => dayLessons.length > 0);
};

const SchedulePage = () => {
  const lessons = useSelector(institutionSelectors.getLessons);
  const user = useSelector(uiSelectors.getUser);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  const [weekOffset, setWeekOffset] = useState(0);
  const groups = useSelector(institutionSelectors.getGroups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<number | undefined>(undefined);

  const isTeacher = user?.level === 2;
  const isAdmin = user?.level === 1;
  const showGroupSelector = isAdmin;
  const isLoading = requests['lessons'] === 'pending';

  useEffectOnce(() => {
    dispatch(fetchAllRooms());
    dispatch(fetchAllLessonTimes());
    dispatch(fetchAllFaculty());
  });

  useEffect(() => {
    if (isTeacher) {
      dispatch(fetchTeacherLessons());
    } else if (groupId) {
      dispatch(fetchAdminLessons(groupId));
    }
  }, [dispatch, groupId, isTeacher, user?.id, user?.level]);

  const currentLessons = currentWeekLessons(lessons, weekOffset);
  const hasLessons = hasLessonsThisWeek(currentLessons.daysLessons);

  const handlePreviousWeek = () => {
    setWeekOffset(weekOffset - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset + 1);
  };

  const renderScheduleContent = () => {
    if (isLoading) {
      return <ContentLoader size={32} />;
    }

    if (!hasLessons) {
      return (
        <NoScheduleContainer>
          <Text $color="#8a8c94" $size="header">
            На этой неделе отсутствуют занятия
          </Text>
        </NoScheduleContainer>
      );
    }

    if (isTeacher) {
      return (
        <ScheduleContainer>
          {currentLessons.daysLessons.map((el, index) => {
            const date = new Date(currentLessons.firstDay);
            date.setDate(currentLessons.firstDay.getDate() + index);

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
      );
    }

    if (isAdmin) {
      if (groupId) {
        return (
          <ScheduleContainer>
            {currentLessons.daysLessons.map((el, index) => {
              const date = new Date(currentLessons.firstDay);
              date.setDate(currentLessons.firstDay.getDate() + index);

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
        );
      } else {
        return (
          <EmptyStateContainer>
            <Text $color="#8a8c94" $size="header">
              Выберите группу
            </Text>
          </EmptyStateContainer>
        );
      }
    }

    return null;
  };

  return (
    <>
      <Flex gap="20px">
        <div style={{ width: '100%' }}>
          <ScheduleHead>
            <WeekNavigation>
              <WeekButton onClick={handlePreviousWeek} title="Предыдущая неделя">
                {'<'}
              </WeekButton>
              <Text $color="#8a8c94" $size="subheader">
                {getWeekLabel(weekOffset)}
              </Text>
              <WeekButton onClick={handleNextWeek} title="Следующая неделя">
                {'>'}
              </WeekButton>
            </WeekNavigation>

            {showGroupSelector && (
              <DropDownMenu
                groups={groups}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                setGroupId={setGroupId}
              />
            )}
          </ScheduleHead>

          {renderScheduleContent()}
        </div>
        <NotificationModule />
      </Flex>
    </>
  );
};

export default SchedulePage;